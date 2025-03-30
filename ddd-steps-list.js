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

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        border-left: 4px solid var(--ddd-primary-color, #0057b8);
        padding: var(--ddd-spacing-2);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
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

  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <h3><span>${this.t.title}:</span></h3>
        <slot></slot>
      </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
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
    return [super.styles,
    css`
      :host {
        display: block;
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-lg);
        background-color: var(--ddd-accent-2);
        color: var(--ddd-primary-17);
      }
      .step {
        font-weight: bold;
      }
    `];
  }

  render() {
    return html`
      <div class="step">Step ${this.step}: ${this.title}</div>
      <slot></slot>
    `;
  }
}

globalThis.customElements.define(DDDStepsListItem.tag, DDDStepsListItem);