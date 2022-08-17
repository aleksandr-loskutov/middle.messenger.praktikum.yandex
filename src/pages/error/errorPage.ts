import Component from "core/component";

interface ErrorPageProps {
  errorText?: string;
  errorCode?: string;
}
export class ErrorPage extends Component {
  static componentName = "ErrorPage";

  constructor({ errorText, errorCode, ...rest }: ErrorPageProps) {
    super({ errorText: "Не туда попали", errorCode: "404", ...rest });
  }

  render(): string {
    // language=hbs
    return `
        <main class="main-error">
            <div class="error-box">
                <h1 class="error-box__title">{{errorCode}}</h1>
                <p class="error-box__text">{{errorText}}</p>
                <a href="/chat" class="error-box__link">Назад к чатам</a>
            </div>
        </main>
    `;
  }
}
