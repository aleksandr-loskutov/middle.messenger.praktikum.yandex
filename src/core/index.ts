import { Component } from "./component";
import EventBus from "./event-bus";
import registerComponent from "./registerComponent";
import render from "./render";
import { Router } from "./router";
import { Store } from "./store";
export type { ComponentClass } from "./component";
export type { Dispatch } from "./store";
export { Component, EventBus, registerComponent, render, Router, Store };
