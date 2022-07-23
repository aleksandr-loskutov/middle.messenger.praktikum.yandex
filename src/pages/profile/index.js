import Handlebars from "handlebars";
import InputTemplate from "../../components/input/input.template";
import ButtonTemplate from "../../components/button/button.template";
import ProfilePageTemplate from "./template";
import ProfileInputTemplate from "../../components/input/profile.input.template";
//partials для страницы
Handlebars.registerPartial("button", ButtonTemplate);
Handlebars.registerPartial("input", InputTemplate);
Handlebars.registerPartial("profileInput", ProfileInputTemplate);

const ProfilePage = Handlebars.compile(ProfilePageTemplate);
export default ProfilePage({});
