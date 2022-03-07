const smForm = document.createElement('template');
smForm.innerHTML = `
    <style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :host{
        display: flex;
        width: 100%;
    }
    form{
        display: grid;
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
		this.allRequiredValid = false;

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
		this.allRequiredValid = this.requiredElements.every(elem => elem.isValid)
		if (!this.submitButton) return;
		if (this.allRequiredValid) {
			this.submitButton.disabled = false;
		}
		else {
			this.submitButton.disabled = true;
		}
	}
	handleKeydown(e) {
		if (e.key === 'Enter' && !e.target.tagName.includes('TEXTAREA')) {
			if (this.allRequiredValid) {
				if (this.submitButton) {
					this.submitButton.click()
				}
				this.dispatchEvent(new CustomEvent('submit', {
					bubbles: true,
					composed: true,
				}))
			}
			else {
				this.requiredElements.find(elem => !elem.isValid).vibrate()
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
		const slot = this.shadowRoot.querySelector('slot')
		slot.addEventListener('slotchange', this.elementsChanged)
		this.addEventListener('input', this.debounce(this._checkValidity, 100));
		this.addEventListener('keydown', this.debounce(this.handleKeydown, 100));
	}
	disconnectedCallback() {
		this.removeEventListener('input', this.debounce(this._checkValidity, 100));
		this.removeEventListener('keydown', this.debounce(this.handleKeydown, 100));
	}
})