import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCOverlayToTop
 * @extends CustomHTMLElement
 * @description Application Web Component, common component, overlay top top button
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @example
 * <cwc-overlay-to-top></cwc-overlay-to-top>
 */
class CWCOverlayToTop extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._windowEvent;
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
					opacity: 0;
					position: fixed;
					bottom: 10px;
					left: 50%;
					width: 50px;
					height: 50px;
					margin-left: -25px;
					transition: opacity 100ms ease-in-out;
				}

				.cwc-topper {
					display: block;
					height: 50px;
					width: 50px;
					fill: white;
					padding: 10px;
					background-color: #4b7cb9;
					border-radius: 50px;
					box-sizing: border-box;
					box-shadow: 0px 0px 20px -4px rgba(0,0,0,0.75);
					opacity: 0.8;
				}
			</style>

			<cwc-icon-material-general name="arrowUpward" class="cwc-topper" @click="${this.goToTop.bind(this)}"></cwc-icon-material-general>

        `;
	}

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		this.style.opacity = 0;
		this.style.display = 'none';
		this.style.zIndex = -1;

		this._windowEvent = window.addEventListener('scroll', this._visibility.bind(this));
	}

	/**
	 * @public @name disconnected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	disconnected() {
		window.removeEventListener('scroll', this._windowEvent);
	}

	/**
     * @public @name goToTop
	 * @description Ermmm go to top
     * @param {Event} ev Any event that kicks the function
	 */
	goToTop(ev) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		this.hide();
	}

	/**
     * @public @name show
	 * @description Show the button
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this.style.display == 'block') return;

		this.dispatchEvent(new CustomEvent('show'));
		this.style.display = 'block';
		this.style.zIndex = 10;

		setTimeout(() => this.style.opacity = 1, 50);
	}

	/**
     * @public @name hide
	 * @description Hide the button
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		if (this.style.display === 'none') return;

		this.dispatchEvent(new CustomEvent('hide'));
		this.style.opacity = 0;

		setTimeout(() => {
			this.style.display = 'none';
			this.style.zIndex = -1;
		}, 110);
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	_visibility(ev) {
		if (window.pageYOffset < 50) return this.hide();
		else this.show();
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-to-top', CWCOverlayToTop);