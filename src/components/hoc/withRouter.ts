import { Component } from "core";
import { Router } from "core";

type WithRouterProps = { router: Router };

export function withRouter<P extends WithRouterProps>(WrappedBlock:any): Component {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName =
      WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as Component<Omit<P, "router">>;
}
