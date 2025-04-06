/**
 * Copyright 2025 FDangra
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `ddd-steps-list`
 * 
 * @demo index.html
 * @element ddd-steps-list
 */
export class DDDStepsList extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "ddd-steps-list";
  }

  constructor() {
    super();
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Steps",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/ddd-steps-list.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  static get properties() {
    return {
      ...super.properties,
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        padding: var(--ddd-spacing-2);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        position: relative;
      }
      h3 span {
        font-size: var(--ddd-steps-list-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  connectedCallback() {
    super.connectedCallback();
    this.validateChildren();
    this.updateSteps();
  }

  validateChildren() {
    Array.from(this.children).forEach(child => {
      if (child.tagName.toLowerCase() !== "ddd-steps-list-item") {
        console.warn("Removing invalid child:", child);
        this.removeChild(child);
      }
    });
  }

  updateSteps() {
    Array.from(this.children).forEach((child, index) => {
      child.setAttribute("step", index + 1);
    });
  }

  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span></h3>
        <slot></slot>
      </div>`;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(DDDStepsList.tag, DDDStepsList);

/**
 * `ddd-steps-list-item`
 * 
 * @element ddd-steps-list-item
 */
export class DDDStepsListItem extends DDDSuper(LitElement) {

  static get tag() {
    return "ddd-steps-list-item";
  }

  constructor() {
    super();
    this.step = 0;
    this.title = "";
  }

  static get properties() {
    return {
      ...super.properties,
      step: { type: Number, reflect: true },
      title: { type: String }
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: flex;
        position: relative;
        padding: var(--ddd-spacing-4) var(--ddd-spacing-4) var(--ddd-spacing-4) 56px;
        margin: var(--ddd-spacing-4) 0;
        background-color: var(--ddd-accent-1, #f9f9f9);
        border-radius: var(--ddd-radius-lg, 8px);
        border-left: 4px solid var(--ddd-primary-color, #0057b8);
      }

      .circle {
        position: absolute;
        left: 0;
        top: var(--circle-offset, 24px);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--ddd-primary-color, #0057b8);
        color: white;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        z-index: 1;
      }

      .content {
        flex: 1;
      }

      .title {
        font-weight: bold;
        font-size: var(--ddd-font-size-l, 1.25rem);
        margin-bottom: 8px;
      }

      ::slotted(p),
      ::slotted(ul) {
        margin: 0 0 8px 0;
      }

      ::slotted(ul) {
        padding-left: 20px;
      }

      ::slotted(li) {
        margin-bottom: 4px;
      }
    `];
  }

  render() {
    return html`
      <div class="circle">${this.step}</div>
      <div class="content">
        <div class="title">${this.title}</div>
        <slot></slot>
      </div>
    `;
  }
}

globalThis.customElements.define(DDDStepsListItem.tag, DDDStepsListItem);