export default function render(component, query = "root") {
  const root = document.getElementById(query);
  if (root) {
    root.appendChild(component.element);
  }
  return root;
}
