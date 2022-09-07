import { EventBus } from "core";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";
import { cloneDeep, compareObjects } from "utils/helpers";

type Events = Values<typeof Component.EVENTS>;

export interface ComponentClass<P> extends Function {
  new (props: P): Component<P>;
  componentName?: string;
}

export class Component<P = any> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_CWU: "flow:component-will-unmount",
    FLOW_RENDER: "flow:render"
  } as const;

  public static componentName?: string;
  public id = nanoid(6);
  protected _element: Nullable<HTMLElement> = null;
  protected readonly props: P;
  protected children: { [id: string]: Component } = {};
  eventBus: () => EventBus<Events>;
  protected state: any = {};
  protected refs: { [key: string]: Component } = {};

  public constructor(props?: P) {
    const eventBus = new EventBus<Events>();

    this.getStateFromProps();
    this.props = this._makePropsProxy(props || ({} as P));
    this.state = this._makePropsProxy(this.state);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT, this.props);
  }

  _checkInDom() {
    const elementInDOM = document.body.contains(this._element);

    if (elementInDOM) {
      setTimeout(() => this._checkInDom(), 1000);
      return;
    }

    this.eventBus().emit(Component.EVENTS.FLOW_CWU, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(
      Component.EVENTS.FLOW_CWU,
      this._componentWillUnmount.bind(this)
    );
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    this._element = this._createDocumentElement("div");
  }

  //eslint-disable-next-line
  protected getStateFromProps(): void {
    this.state = {};
  }

  init() {
    this._createResources();
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount() {
    this._checkInDom();
    this.componentDidMount();
  }
  //eslint-disable-next-line
  componentDidMount() {}

  _componentWillUnmount() {
    this.eventBus().destroy();
    this.componentWillUnmount();
  }
  //eslint-disable-next-line
  componentWillUnmount() {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P) {
    return compareObjects(oldProps, newProps);
  }

  setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: any) => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this._compile();
    this._removeEvents();
    const newElement = fragment.firstElementChild!;
    this._element!.replaceWith(newElement);
    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  protected render(): string {
    return "";
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Component.EVENTS.FLOW_CDM);
        }
      }, 100);
    }
    return this.element!;
  }

  private _makePropsProxy(props: any): any {
    const self = this;
    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        // Запускаем обновление компоненты
        self
          .eventBus()
          .emit(Component.EVENTS.FLOW_CDU, cloneDeep(target), target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    }) as unknown as P;
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events || !this._element) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  private _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    if (!events) {
      return;
    }
    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  private _compile(): DocumentFragment {
    const fragment = document.createElement("template");
    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({
      ...this.state,
      ...this.props,
      children: this.children,
      refs: this.refs
    });
    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);
      if (!stub) {
        return;
      }
      const stubChilds = stub.childNodes.length ? stub.childNodes : [];
      /**
       * Заменяем заглушку на component._element
       */
      const content = component.getContent();
      stub.replaceWith(content);
      /**
       * Ищем элемент layout-а, куда вставлять детей
       */
      const layoutContent = content.querySelector("[data-layout=\"1\"]");
      if (layoutContent && stubChilds.length) {
        layoutContent.append(...stubChilds);
      }
    });
    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show() {
    this.getContent().style.display = "flex";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
