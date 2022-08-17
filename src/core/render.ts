import Component from "core/component";

export default function render(component: Component, query = "root") {
  const root = document.getElementById(query);
  if (root) {
    root.appendChild(component.element);
  }
  return root;
}
