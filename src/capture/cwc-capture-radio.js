import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';
import '../overlay/cwc-overlay-help.js';

/**
 *
 * @public @name CWCCaptureRadio
 * @extends CustomHTMLElement
 * @description Custom Web Component, radio button
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event change The value is updated
 *
 * @method validate(String value) The value selected
 *
 * @property {string} value The initial value (overrides attribute value)
 *
 * @attribute {String} label The checkbox label
 * @attribute {String} name The checkbox name
 * @attribute {String} invalid-message The message to show when capture is invalid
 * @attribute {String} value The initial value, if set
 * @attribute {String} help The help text to display with a little hover icon
 * @attribute {String} justify The justification as left, right, center
 * @attribute {Flag} disabled To disable the capture
 * @attribute {Flag} invalid The capture is invalid
 * @attribute {Flag} required The capture is required
 * @attribute {Flag} validate-on-load Validate the capture when it loads in the dom
 *
 * @style_variable --cwc-capture-radio--fill
 * @style_variable --cwc-capture-radio--color
 * @style_variable --cwc-capture-radio--text-align
 * @style_variable --cwc-capture-radio--padding
 *
 * @style_variable --cwc-capture-radio--fill--hover
 * @style_variable --cwc-capture-radio--color--hover
 *
 * @style_variable --cwc-capture-radio--label--text-align
 * @style_variable --cwc-capture-radio--label--color
 * @style_variable --cwc-capture-radio--label--font-weight
 *
 * @style_variable --cwc-capture-radio--invalid--fill
 * @style_variable --cwc-capture-radio--invalid--color
 *
 * @style_variable --cwc-capture-radio--disabled--opacity
 *
 * @slot root Single root slot to show all cwc-capture-radio-option elements
 *
 * @example
 * <cwc-capture-radio
 * 		label="A input"
 * 		name="something"
 * 		invalid-message="Please check me"
 * 		help="Blah blah blah"
 * 		disabled
 * 		invalid
 * 		required
 * 		validate-on-load
 * >
 * 		<cwc-capture-radio-option value="one" selected>One</cwc-capture-radio-option>
 * 		<cwc-capture-radio-option value="two">Two</cwc-capture-radio-option>
 * </cwc-capture-radio>
 */
class CWCCaptureRadio extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? this.getAttribute('value') : this.value;
		this.invalid = this.hasAttribute('invalid') ? true : false;
	}

	/**
	 * @public @static @name template
	 * @description Template function to return web component UI
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>
                :host {
					display: inline-block;
					width: 100%;
					min-height: 62px;
					box-sizing: border-box;
				}

				[hidden] { display: none !important; }

				.cwc-radio-container {
					position: relative;
					width: inherit;
					height: inherit;
					display: inline-block;
					padding: var(--cwc-capture-radio--padding, 0);
					box-sizing: border-box;
					position: relative;
					text-align: var(--cwc-capture-radio--text-align, left);
				}

				.cwc-radio-container [invisible] { opacity: 0; }

				.cwc-radio-container label {
					display: block;
					min-height: 20px;
					font-size: 14px;
					padding-right: 25px;
					overflow: hidden;
					text-align: var(--cwc-capture-radio--label--text-align, left);
					color: var(--cwc-capture-radio--label--color, black);
					font-weight: var(--cwc-capture-radio--label--font-weight, normal);
				}

				.cwc-radio-container .cwc-radio-buttons {
					font-size: 14px;
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					display: block;
					min-height: 30px;
				}

				.cwc-radio-container .cwc-error {
					display: block;
					font-size: 11px;
					line-height: 12px;
					overflow: hidden;
					position: absolute;
					bottom: 0;
					left: 0;
					opacity: 0;
				}

				.cwc-radio-container[invalid] .cwc-error { opacity: 1; }

				.cwc-radio-container .cwc-help {
					position: absolute;
					top: 6px;
					right: 0px;
				}

				.cwc-radio-container .cwc-help .help-tip { vertical-align: top; }

				:host .cwc-radio-buttons { fill: var(--cwc-capture-radio--fill, black); color: var(--cwc-capture-radio--color, black); }
				:host(:hover) .cwc-radio-buttons { fill: var(--cwc-capture-radio--fill--hover, black); color: var(--cwc-capture-radio--color--hover, black); }

				:host .cwc-radio-container[invalid] .cwc-radio-buttons { fill: var(--cwc-capture-radio--invalid--fill, red); color: var(--cwc-capture-radio--invalid--color, red); }
				:host .cwc-radio-container[invalid] .cwc-error { color: var(--cwc-capture-radio--invalid--color, red); }

				:host([justify="center"]) .cwc-radio-container { text-align: center; }
				:host([justify="right"]) .cwc-radio-container { text-align: right; }

				:host([disabled]) { pointer-events: none; cursor: not-allowed; opacity: var(--cwc-capture-radio--disabled--opacity, 0.6); }
			</style>

			<div class="cwc-radio-container" ?invalid="${this.hasAttribute('invalid')}">
				<label ?hidden="${!this.hasAttribute('label')}">
					${this.getAttribute('label')}${this.hasAttribute('required') && this.hasAttribute('required-marker') ? ' ' + this.getAttribute('required-marker') : ''}
				</label>
				<div class="cwc-help" ?hidden="${!this.hasAttribute('help')}">
					<cwc-overlay-help class="help-tip">${this.getAttribute('help')}</cwc-overlay-help>
				</div>
				<div id="radio-buttons" class="cwc-radio-buttons" @change="${this._change.bind(this)}">
					<slot></slot>
				</div>
				<span class="cwc-error">${this.hasAttribute('invalid-message') ? this.getAttribute('invalid-message') : (this.hasAttribute('required') ? 'Required' : 'Invalid')}</span>
			</div>
		`;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Provide properties to watch for changes
	 * @return {Array} Array of property names as strings
	 */
	static get observedProperties() { return ['value'] }

	/**
	 * @public @name propertyChanged
	 * @description Callback run when a custom elements properties change
	 * @param {String} property The property name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	propertyChanged(property, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide attributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['label', 'name', 'invalid-message', 'disabled', 'invalid', 'required', 'required-marker'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		if (this.hasAttribute('validate-on-load') || (!!this.value)) {
			this.validate(this.value);
			this.updateTemplate();
		}
	}

	/**
	 * @public @name templateUpdated
	 * @description Callback run once the template has complete re-render
	 */
	templateUpdated() {
		for (let key in this.childNodes) {
			if (!this.childNodes[key].value) continue;
			if (this.value === this.childNodes[key].value) this.childNodes[key].setAttribute('selected', '');
			else this.childNodes[key].removeAttribute('selected');
		}
	}

	/**
	 * @private @name validate
	 * @description Validate any text for errors based on required or regex
     * @param {Event} ev Any event that kicks the function
	 */
	validate(value) {
		value = value !== undefined ? value : this.value;
		this.invalid = this.hasAttribute('required') ? (!value || value.length < 1 ? true : false) : false;

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');
		this.updateTemplate();

		return !this.invalid;
	}

	/**
	 * @private @name _change
	 * @description Detect an event, update a property and dispatch an event
     * @param {Event} ev Any event that kicks the function
	 */
	_change(ev) {
		if (this.hasAttribute('disabled')) return;

		if (this.value === ev.detail.value) return;

		for (let key in this.childNodes) {
			if (!this.childNodes[key].hasAttribute || !this.childNodes[key].hasAttribute('selected')) continue;
			this.childNodes[key].removeAttribute('selected');
		}

		this.value = ev.detail.value;
		ev.detail.setAttribute('selected', '');

		this.validate(this.value);
		this.updateTemplate();
		this.dispatchEvent(new CustomEvent('validated'));

		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent('change', { detail: ev }));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-capture-radio', CWCCaptureRadio);

/**
 * @public @name CWCCaptureRadioOption
 * @extends CustomHTMLElement
 * @description Custom Web Component, radio button options for radio button
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @property {string} value The initial value (overrides attribute value)
 *
 * @attribute {String} value The initial value, if set
 * @attribute {Flag} selected Is this option selected
 *
 * @slot root Single root slot to show option label/text/icon etc.
 *
 * @example
 * <cwc-capture-radio-option value="one" selected>One</cwc-capture-radio-option>
 */
class CWCCaptureRadioOption extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? this.getAttribute('value') : this.value;
	}

	/**
	 * @public @static @name template
	 * @description Template function to return web component UI
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>
                :host {
					display: inline-block;
					width: fit-content;
					line-height: 40px;
					height: 30px;
					cursor: default;
					user-select: none;
					fill: inherit;
					color: inherit;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
				}

				.cwc-capture-radio-option { display: inline-block; height: 30px; padding: 0 5px 0 0; }
				.cwc-capture-radio-option .cwc-radio-button-icon { display: inline-block; padding: 2px; fill: inherit; vertical-align: sub; }
				.cwc-capture-radio-option .cwc-radio-button-label { display: inline-block; font-size: 14px; color: inherit; position: relative; top: -7px; }
			</style>

			<div class="cwc-capture-radio-option">
				<cwc-icon-material-general class="cwc-radio-button-icon" @click="${this._click.bind(this)}"type="icons" name="${this.hasAttribute('selected') ? 'radioButtonChecked' : 'radioButtonUnchecked'}"></cwc-icon-material-general>
				<span class="cwc-radio-button-label" @click="${this._click.bind(this)}"><slot></slot></span>
			</div>
		`;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Provide properties to watch for changes
	 * @return {Array} Array of property names as strings
	 */
	static get observedProperties() { return ['value'] }

	/**
	 * @public @name propertyChanged
	 * @description Callback run when a custom elements properties change
	 * @param {String} property The property name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	propertyChanged(property, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide attributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['selected'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @private @name _click
	 * @description Detect click, update a property and dispatch an event
     * @param {Event} ev Any event that kicks the function
	 */
	_click(ev) {
        if (this.hasAttribute('selected')) return;
        ev.stopPropagation();
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, detail: this }));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-capture-radio-option', CWCCaptureRadioOption);
