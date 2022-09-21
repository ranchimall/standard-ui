//Input
const smInput = document.createElement('template')
smInput.innerHTML = `
    <style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    } 
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration { display: none; }
    input[type=number] {
    -moz-appearance:textfield;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        margin: 0; 
    }
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
    input:invalid{
        outline: none;
        -webkit-box-shadow: none;
                box-shadow: none;
    }
    ::-moz-focus-inner{
        border: none;
    }
    :host{
        display: flex;
        --success-color: #00C853;
        --danger-color: red;
        --width: 100%;
        --icon-gap: 0.5rem;
        --min-height: 3.2rem;
        --background: rgba(var(--text-color, (17,17,17)), 0.06);
    }
    .hide{
       display: none !important;
    }

    button{
        display: flex;
        border: none;
        background: none;
        padding: 0;
        border-radius: 1rem;
        min-width: 0;
        cursor: pointer;
    }
    button:focus{
        outline: var(--accent-color, teal) solid medium;
    }
    .icon {
        height: 1.2rem;
        width: 1.2rem;
        fill: rgba(var(--text-color, (17,17,17)), 0.6);
    }
    
    :host(.round) .input{
        border-radius: 10rem;
    }
    .input {
        display: flex;
        cursor: text;
        min-width: 0;
        text-align: left;
                align-items: center;
        position: relative;
        gap: var(--icon-gap);
        padding: var(--padding, 0.6rem 0.8rem);
        border-radius: var(--border-radius,0.3rem);
        transition: opacity 0.3s, box-shadow 0.2s;
        background: var(--background);
        width: 100%;
        outline: none;
        min-height: var(--min-height);
    }
    .input.readonly .clear{
        opacity: 0 !important;
        margin-right: -2rem;
        pointer-events: none !important;
    }
    .clear{
        visibility: hidden;
    }
    .readonly{
        pointer-events: none;
    }
    .input:focus-within:not(.readonly){
        box-shadow: 0 0 0 0.1rem var(--accent-color,teal) inset !important;
    }
    .disabled{
        pointer-events: none;
        opacity: 0.6;
    }
    .label {
        grid-area: 1/1/2/2;
        font-size: inherit;
        opacity: .7;
        font-weight: 400;
        transition: -webkit-transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s, color .03;
            transform-origin: left;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        user-select: none;
        will-change: transform;
    }
    .outer-container{
        position: relative;
        width: var(--width);
    }
    .container{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        position: relative;
        align-items: center;
    }    
    input{
        grid-area: 1/1/2/2;
        font-size: inherit;
        border: none;
        background: transparent;
        outline: none;
        color: inherit;
        font-family: inherit;
        width: 100%;
        caret-color: var(--accent-color, teal);
    }
    :host([animate]) .input:focus-within .container input,
    .animate-placeholder .container input {
        -webkit-transform: translateY(0.6rem);
                -ms-transform: translateY(0.6rem);
            transform: translateY(0.6rem);
        }
      
        :host([animate]) .input:focus-within .label,
        .animate-placeholder .label {
        -webkit-transform: translateY(-0.7em) scale(0.8);
                -ms-transform: translateY(-0.7em) scale(0.8);
            transform: translateY(-0.7em) scale(0.8);
        opacity: 1;
        color: var(--accent-color,teal)
    }
    :host([variant="outlined"]) .input {
        box-shadow: 0 0 0 1px var(--border-color, rgba(var(--text-color, (17,17,17)), 0.3)) inset;
        background: rgba(var(--background-color, (255,255,255)), 1);
    }
    .animate-placeholder:focus-within:not(.readonly) .label{
        color: var(--accent-color,teal)
    }
    .feedback-text:not(:empty){
        display: flex;
        width: 100%;
        text-align: left;
        font-size: 0.9rem;
        align-items: center;
        padding: 0.8rem 0;
        color: rgba(var(--text-color, (17,17,17)), 0.8);
    }
    .success{
        color: var(--success-color);
    }
    .error{
        color: var(--danger-color);
    }
    .status-icon{
        margin-right: 0.2rem;
    }
    .status-icon--error{
        fill: var(--danger-color);
    }
    .status-icon--success{
        fill: var(--success-color);
    }
    @media (any-hover: hover){
        .icon:hover{
            background: rgba(var(--text-color, (17,17,17)), 0.1);
        }
    }
    </style>
    <div class="outer-container">
        <label part="input" class="input">
            <slot name="icon"></slot>
            <div class="container">
                <input type="text"/>
                <div part="placeholder" class="label"></div>
                <button class="clear" title="Clear" tabindex="-1">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/></svg>
                </button>
            </div>
            <slot name="right"></slot>
        </label>
        <p class="feedback-text"></p>
    </div>
    `;
customElements.define('sm-input',
    class extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            }).append(smInput.content.cloneNode(true));

            this.inputParent = this.shadowRoot.querySelector('.input');
            this.input = this.shadowRoot.querySelector('input');
            this.clearBtn = this.shadowRoot.querySelector('.clear');
            this.label = this.shadowRoot.querySelector('.label');
            this.feedbackText = this.shadowRoot.querySelector('.feedback-text');
            this.outerContainer = this.shadowRoot.querySelector('.outer-container');
            this._helperText = '';
            this._errorText = '';
            this.isRequired = false;
            this.validationFunction = undefined;
            this.reflectedAttributes = ['value', 'required', 'disabled', 'type', 'inputmode', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step', 'list', 'autocomplete'];

            this.reset = this.reset.bind(this);
            this.clear = this.clear.bind(this);
            this.focusIn = this.focusIn.bind(this);
            this.focusOut = this.focusOut.bind(this);
            this.fireEvent = this.fireEvent.bind(this);
            this.checkInput = this.checkInput.bind(this);
            this.allowOnlyNum = this.allowOnlyNum.bind(this);
            this.vibrate = this.vibrate.bind(this);
        }

        static get observedAttributes() {
            return ['value', 'placeholder', 'required', 'disabled', 'type', 'inputmode', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step', 'helper-text', 'error-text'];
        }

        get value() {
            return this.input.value;
        }

        set value(val) {
            if (val === this.input.value) return;
            this.input.value = val;
            this.checkInput();
        }

        get placeholder() {
            return this.getAttribute('placeholder');
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val);
        }

        get type() {
            return this.getAttribute('type');
        }

        set type(val) {
            this.setAttribute('type', val);
        }

        get validity() {
            return this.input.validity;
        }

        get disabled() {
            return this.hasAttribute('disabled');
        }
        set disabled(value) {
            if (value)
                this.inputParent.classList.add('disabled');
            else
                this.inputParent.classList.remove('disabled');
        }
        get readOnly() {
            return this.hasAttribute('readonly');
        }
        set readOnly(value) {
            if (value) {
                this.setAttribute('readonly', '');
            } else {
                this.removeAttribute('readonly');
            }
        }
        set customValidation(val) {
            this.validationFunction = val;
        }
        set errorText(val) {
            this._errorText = val;
        }
        set helperText(val) {
            this._helperText = val;
        }
        get isValid() {
            if (this.input.value !== '') {
                const _isValid = this.input.checkValidity();
                let _customValid = true;
                if (this.validationFunction) {
                    _customValid = Boolean(this.validationFunction(this.input.value));
                }
                if (_isValid && _customValid) {
                    this.feedbackText.classList.remove('error');
                    this.feedbackText.classList.add('success');
                    this.feedbackText.textContent = '';
                } else {
                    if (this._errorText) {
                        this.feedbackText.classList.add('error');
                        this.feedbackText.classList.remove('success');
                        this.feedbackText.innerHTML = `
                                <svg class="status-icon status-icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/></svg>
                            ${this._errorText}
                            `;
                    }
                }
                return (_isValid && _customValid);
            }
        }
        reset() {
            this.value = '';
        }
        clear() {
            this.value = '';
            this.input.focus();
            this.fireEvent();
        }

        focusIn() {
            this.input.focus();
        }

        focusOut() {
            this.input.blur();
        }

        fireEvent() {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }

        checkInput(e) {
            if (!this.hasAttribute('readonly')) {
                this.clearBtn.style.visibility = this.input.value !== '' ? 'visible' : 'hidden';
            }
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder').trim() === '') return;
            if (this.input.value !== '') {
                if (this.animate)
                    this.inputParent.classList.add('animate-placeholder');
                else
                    this.label.classList.add('hide');
            } else {
                if (this.animate)
                    this.inputParent.classList.remove('animate-placeholder');
                else
                    this.label.classList.remove('hide');
                this.feedbackText.textContent = '';
            }
        }
        allowOnlyNum(e) {
            if (e.key.length === 1) {
                if (e.key === '.' && (e.target.value.includes('.') || e.target.value.length === 0)) {
                    e.preventDefault();
                } else if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
                    e.preventDefault();
                }
            }
        }
        vibrate() {
            this.outerContainer.animate([
                { transform: 'translateX(-1rem)' },
                { transform: 'translateX(1rem)' },
                { transform: 'translateX(-0.5rem)' },
                { transform: 'translateX(0.5rem)' },
                { transform: 'translateX(0)' },
            ], {
                duration: 300,
                easing: 'ease'
            });
        }


        connectedCallback() {
            this.animate = this.hasAttribute('animate');
            this.setAttribute('role', 'textbox');
            this.input.addEventListener('input', this.checkInput);
            this.clearBtn.addEventListener('click', this.clear);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (this.reflectedAttributes.includes(name)) {
                    if (this.hasAttribute(name)) {
                        this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '');
                    }
                    else {
                        this.input.removeAttribute(name);
                    }
                }
                if (name === 'placeholder') {
                    this.label.textContent = newValue;
                    this.setAttribute('aria-label', newValue);
                }
                else if (this.hasAttribute('value')) {
                    this.checkInput();
                }
                else if (name === 'type') {
                    if (this.hasAttribute('type') && this.getAttribute('type') === 'number') {
                        this.input.setAttribute('inputmode', 'decimal');
                        this.input.addEventListener('keydown', this.allowOnlyNum);
                    } else {
                        this.input.removeEventListener('keydown', this.allowOnlyNum);

                    }
                }
                else if (name === 'helper-text') {
                    this._helperText = this.getAttribute('helper-text');
                }
                else if (name === 'error-text') {
                    this._errorText = this.getAttribute('error-text');
                }
                else if (name === 'required') {
                    this.isRequired = this.hasAttribute('required');
                    if (this.isRequired) {
                        this.setAttribute('aria-required', 'true');
                    }
                    else {
                        this.setAttribute('aria-required', 'false');
                    }
                }
                else if (name === 'readonly') {
                    if (this.hasAttribute('readonly')) {
                        this.inputParent.classList.add('readonly');
                    } else {
                        this.inputParent.classList.remove('readonly');
                    }
                }
                else if (name === 'disabled') {
                    if (this.hasAttribute('disabled')) {
                        this.inputParent.classList.add('disabled');
                    }
                    else {
                        this.inputParent.classList.remove('disabled');
                    }
                }
            }
        }
        disconnectedCallback() {
            this.input.removeEventListener('input', this.checkInput);
            this.clearBtn.removeEventListener('click', this.clear);
            this.input.removeEventListener('keydown', this.allowOnlyNum);
        }
    })