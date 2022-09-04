const smForm = document.createElement('template');
smForm.innerHTML = `
            <style>
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            :host{
                display: grid;
                width: 100%;
            }
            form{
                display: inherit;
                gap: var(--gap, 1.5rem);
                width: 100%;
            }
            </style>
            <form part="form" onsubmit="return false">
                <slot></slot>
            </form>
        `;

customElements.define('sm-form', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: 'open'
		}).append(smForm.content.cloneNode(true))

		this.form = this.shadowRoot.querySelector('form');
		this.formElements
		this.requiredElements
		this.submitButton
		this.resetButton
		this.invalidFields = false;

		this.debounce = this.debounce.bind(this)
		this._checkValidity = this._checkValidity.bind(this)
		this.handleKeydown = this.handleKeydown.bind(this)
		this.reset = this.reset.bind(this)
		this.elementsChanged = this.elementsChanged.bind(this)
	}
	debounce(callback, wait) {
		let timeoutId = null;
		return (...args) => {
			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				callback.apply(null, args);
			}, wait);
		};
	}
	_checkValidity() {
		if (!this.submitButton) return;
		this.invalidFields = this.requiredElements.filter(elem => !elem.isValid)
		this.submitButton.disabled = this.invalidFields.length;
	}
	handleKeydown(e) {
		if (e.key === 'Enter' && e.target.tagName.includes('SM-INPUT')) {
			if (!this.invalidFields.length) {
				if (this.submitButton) {
					this.submitButton.click()
				}
				this.dispatchEvent(new CustomEvent('submit', {
					bubbles: true,
					composed: true,
				}))
			} else {
				this.requiredElements.forEach(elem => { if (!elem.isValid) elem.vibrate() })
			}
		}
	}
	reset() {
		this.formElements.forEach(elem => elem.reset())
	}
	elementsChanged() {
		this.formElements = [...this.querySelectorAll('sm-input, sm-textarea, sm-checkbox, tags-input, file-input, sm-switch, sm-radio')]
		this.requiredElements = this.formElements.filter(elem => elem.hasAttribute('required'));
		this.submitButton = this.querySelector('[variant="primary"], [type="submit"]');
		this.resetButton = this.querySelector('[type="reset"]');
		if (this.resetButton) {
			this.resetButton.addEventListener('click', this.reset);
		}
		this._checkValidity()
	}
	connectedCallback() {
		this.shadowRoot.querySelector('slot').addEventListener('slotchange', this.elementsChanged)
		this.addEventListener('input', this.debounce(this._checkValidity, 100));
		this.addEventListener('keydown', this.debounce(this.handleKeydown, 100));
		const mutationObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'childList') {
					this.elementsChanged()
				}
			})
		})
		mutationObserver.observe(this, { childList: true, subtree: true })
	}
	disconnectedCallback() {
		this.removeEventListener('input', this.debounce(this._checkValidity, 100));
		this.removeEventListener('keydown', this.debounce(this.handleKeydown, 100));
		mutationObserver.disconnect()
	}
})