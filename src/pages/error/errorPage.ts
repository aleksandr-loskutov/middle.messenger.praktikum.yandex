import { Component } from "core";
import { withRouter, withStore } from "../../components/hoc";

interface ErrorPageProps {
  errorText?: string;
  errorCode?: string;
}
export class ErrorPage extends Component {
  static componentName = "ErrorPage";

  constructor({ errorText, errorCode, ...rest }: ErrorPageProps) {
    super({
      ...rest,
      errorText: "Не туда попали",
      errorCode: "404",
      onBackLinkClick: () => {
        this.props.router.go("/messenger");
      }
    });
  }

  render(): string {
    // language=hbs
    return `
        <main class="main-error">
            <div class="error-box">
                <h1 class="error-box__title">{{errorCode}}</h1>
                <p class="error-box__text">{{errorText}}</p>
                {{{Link text="Назад к чатам"  onClick=onBackLinkClick}}}
            </div>
        </main>
    `;
  }
}
export default withRouter(withStore(ErrorPage));
