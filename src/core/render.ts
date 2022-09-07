import { Component } from "core";

export default function render(component: Component, query = "#root") {
  const root = document.querySelector(query);
  if (root) {
    root.appendChild(component.element!);
  }
  return root;
}
