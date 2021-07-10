/*jshint esversion: 6 */
//Button
const smButton = document.createElement('template')
smButton.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}       
:host{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    --padding: 0.6rem 1.2rem;
    --border-radius: 0.3rem;
    --background: rgba(var(--text-color), 0.1);
}
:host([disabled]) .button{
    cursor: not-allowed;
    opacity: 0.6;
    background: rgba(var(--text-color), 0.3) !important;
    color: rgba(var(--foreground-color), 0.6);
}
:host([disabled][variant="primary"]) .button{
    color: rgba(var(--text-color), 1);
}
:host([variant='primary']) .button{
    background: var(--accent-color);
    color: rgba(var(--foreground-color), 1);
}
:host([variant='outlined']) .button{
    -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
    background: transparent; 
    color: var(--accent-color);
}
:host([variant='no-outline']) .button{
    background: rgba(var(--foreground-color), 1); 
    color: var(--accent-color);
}
:host(.small) .button{
    padding: 0.4rem 0.8rem;
}
:host(.round) .button{
    border-radius: 10rem;
}
.button {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    padding: var(--padding);
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    border-radius: var(--border-radius); 
    -webkit-box-pack: center; 
        -ms-flex-pack: center; 
            justify-content: center;
    -webkit-transition: -webkit-box-shadow 0.3s;
    transition: -webkit-box-shadow 0.3s;
    -o-transition: box-shadow 0.3s;
    transition: box-shadow 0.3s;
    transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    background: var(--background); 
    -webkit-tap-highlight-color: transparent;
    outline: none;
    overflow: hidden;
    border: none;
    color: inherit;
    align-items: center;
}
:host(:not([disabled])) .button:focus-visible{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color);
}
:host([variant='outlined']) .button:focus-visible{
    -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0 0 0.1rem var(--accent-color);
}
@media (hover: hover){
    :host(:not([disabled])) .button:hover{
        -webkit-box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
                box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
    }
    :host([variant='outlined']) .button:hover{
        -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
                box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
    }
}
@media (hover: none){
    :host(:not([disabled])) .button:active{
        -webkit-box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
                box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
    }
    :host([variant='outlined']) .button:active{
        -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
                box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    }
}
</style>
<button part="button" class="button">
    <slot></slot>   
</button>`;
customElements.define('sm-button',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(smButton.content.cloneNode(true))
        }

        get disabled() {
            return this.isDisabled
        }

        set disabled(value) {
            if (value && !this.isDisabled) {
                this.isDisabled = true
                this.setAttribute('disabled', '')
                this.button.removeAttribute('tabindex')
            } else if (!value && this.isDisabled) {
                this.isDisabled = false
                this.removeAttribute('disabled')
            }
        }

        dispatch() {
            if (this.isDisabled) {
                this.dispatchEvent(new CustomEvent('disabled', {
                    bubbles: true,
                    composed: true
                }))
            } else {
                this.dispatchEvent(new CustomEvent('clicked', {
                    bubbles: true,
                    composed: true
                }))
            }
        }

        connectedCallback() {
            this.isDisabled = false
            this.button = this.shadowRoot.querySelector('.button')
            if (this.hasAttribute('disabled') && !this.isDisabled)
                this.isDisabled = true
            this.addEventListener('click', (e) => {
                this.dispatch()
            })
        }
    })

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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    --width: 100%;
    --font-size: 1rem;
    --icon-gap: 0.5rem;
    --border-radius: 0.3rem;
    --padding: 0.7rem 1rem;
    --background: rgba(var(--text-color), 0.06);
}
.hide{
   opacity: 0 !important;
   pointer-events: none !important;
}
.hide-completely{
    display: none;
}
.icon {
    fill: rgba(var(--text-color), 0.6);
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 1rem;
    cursor: pointer;
    min-width: 0;
}

:host(.round) .input{
    border-radius: 10rem;
}
.input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: text;
    min-width: 0;
    text-align: left;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    position: relative;
    gap: var(--icon-gap);
    padding: var(--padding);
    border-radius: var(--border-radius);
    -webkit-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s;
    background: var(--background);
    width: 100%;
    outline: none;
}
.input.readonly .clear{
    opacity: 0 !important;
    margin-right: -2rem;
    pointer-events: none !important;
}
.readonly{
    pointer-events: none;
}
.input:focus-within:not(.readonly){
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset !important;
}
.disabled{
    pointer-events: none;
    opacity: 0.6;
}
.label {
    opacity: .7;
    font-weight: 400;
    font-size: var(--font-size);
    position: absolute;
    top: 0;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    -o-transition: transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    -webkit-transform-origin: left;
    -ms-transform-origin: left;
        transform-origin: left;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
}    
input{
    font-size: var(--font-size);
    border: none;
    background: transparent;
    outline: none;
    color: rgba(var(--text-color), 1);
    width: 100%;
}
:host(:not(.outlined)) .animate-label .container input {
    -webkit-transform: translateY(0.6rem);
            -ms-transform: translateY(0.6rem);
        transform: translateY(0.6rem);
    }
  
:host(:not(.outlined)) .animate-label .label {
    -webkit-transform: translateY(-0.7em) scale(0.8);
            -ms-transform: translateY(-0.7em) scale(0.8);
        transform: translateY(-0.7em) scale(0.8);
    opacity: 1;
    color: var(--accent-color)
}
:host(.outlined) .input {
    box-shadow: 0 0 0 0.1rem rgba(var(--text-color), 0.4) inset;
    background: rgba(var(--foreground-color), 1);
}
:host(.outlined) .label {
    width: max-content;
    margin-left: -0.5rem;
    padding: 0 0.5rem;
}
:host(.outlined) .animate-label .label {
    -webkit-transform: translate(0.1rem, -1.5rem) scale(0.8);
            -ms-transform: translate(0.1rem, -1.5rem) scale(0.8);
        transform: translate(0.1rem, -1.5rem) scale(0.8);
    opacity: 1;
    background: rgba(var(--foreground-color), 1);
}
.animate-label:focus-within:not(.readonly) .label{
    color: var(--accent-color)
}
.feedback-text{
    font-size: 0.9rem;
    width: 100%;
    color: var(--error-color);
    padding: 0.6rem 1rem;
    text-align: left;
}
.feedback-text:empty{
    padding: 0;
}
@media (any-hover: hover){
    .icon:hover{
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="outer-container">
    <label part="input" class="input">
        <slot name="icon"></slot>
        <div class="container">
            <input/>
            <div part="placeholder" class="label"></div>
        </div>
        <svg class="icon clear hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/></svg>
    </label>
    <div class="feedback-text"></div>
</div>
`;
customElements.define('sm-input',
    class extends HTMLElement {

        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(smInput.content.cloneNode(true))

            this.inputParent = this.shadowRoot.querySelector('.input')
            this.input = this.shadowRoot.querySelector('input')
            this.clearBtn = this.shadowRoot.querySelector('.clear')
            this.label = this.shadowRoot.querySelector('.label')
            this.feedbackText = this.shadowRoot.querySelector('.feedback-text')
            this.validationFunction
            this.observeList = ['type', 'required', 'disabled', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step']
        }

        static get observedAttributes() {
            return ['placeholder', 'type', 'required', 'disabled', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step']
        }

        get value() {
            return this.input.value
        }

        set value(val) {
            this.input.value = val;
            this.checkInput()
            this.fireEvent()
        }

        get placeholder() {
            return this.getAttribute('placeholder')
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val)
        }

        get type() {
            return this.getAttribute('type')
        }

        set type(val) {
            this.setAttribute('type', val)
        }

        get isValid() {
            if (this.hasAttribute('data-flo-id') || this.hasAttribute('data-private-key')) {
                return this.validationFunction(this.input.value)
            }
            else {
                return this.input.checkValidity()
            }
        }

        get validity() {
            return this.input.validity
        }

        set disabled(value) {
            if (value)
                this.inputParent.classList.add('disabled')
            else
                this.inputParent.classList.remove('disabled')
        }
        set readOnly(value) {
            if (value) {
                this.setAttribute('readonly', '')
            } else {
                this.removeAttribute('readonly')
            }
        }
        set customValidation(val) {
            this.validationFunction = val
        }
        reset = () => {
            this.value = ''
        }

        setValidity = (message) => {
            this.feedbackText.textContent = message
        }

        showValidity = () => {
            this.feedbackText.classList.remove('hide-completely')
        }

        hideValidity = () => {
            this.feedbackText.classList.add('hide-completely')
        }

        focusIn = () => {
            this.input.focus()
        }

        focusOut = () => {
            this.input.blur()
        }

        fireEvent = () => {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }

        checkInput = (e) => {
            if (!this.hasAttribute('readonly')) {
                if (this.input.value !== '') {
                    this.clearBtn.classList.remove('hide')
                } else {
                    this.clearBtn.classList.add('hide')
                }
            }
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '') return;
            if (this.input.value !== '') {
                if (this.animate)
                    this.inputParent.classList.add('animate-label')
                else
                    this.label.classList.add('hide')
            } else {
                if (this.animate)
                    this.inputParent.classList.remove('animate-label')
                else
                    this.label.classList.remove('hide')
            }
        }


        connectedCallback() {
            this.animate = this.hasAttribute('animate')
            if (this.hasAttribute('value')) {
                this.input.value = this.getAttribute('value')
                this.checkInput()
            }
            if (this.hasAttribute('error-text')) {
                this.feedbackText.textContent = this.getAttribute('error-text')
            }
            if (!this.hasAttribute('type')) {
                this.setAttribute('type', 'text')
            }

            this.input.addEventListener('input', e => {
                this.checkInput(e)
            })
            this.clearBtn.addEventListener('click', this.reset)
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (this.observeList.includes(name)) {
                    if (this.hasAttribute(name)) {
                        this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '')
                    }
                    else {
                        this.input.removeAttribute(name)
                    }
                }
                if (name === 'placeholder') {
                    this.label.textContent = newValue;
                    this.setAttribute('aria-label', newValue);
                }
                else if (name === 'type') {
                    if (this.hasAttribute('type') && this.getAttribute('type') === 'number') {
                        this.input.setAttribute('inputmode', 'numeric')
                    }
                }
                else if (name === 'readonly') {
                    if (this.hasAttribute('readonly')) {
                        this.inputParent.classList.add('readonly')
                    } else {
                        this.inputParent.classList.remove('readonly')
                    }
                }
                else if (name === 'disabled') {
                    if (this.hasAttribute('disabled')) {
                        this.inputParent.classList.add('disabled')
                    }
                    else {
                        this.inputParent.classList.remove('disabled')
                    }
                }
            }
        }
    })

//textarea
const smTextarea = document.createElement('template')
smTextarea.innerHTML = `
<style>
*,
*::before,
*::after { 
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
::-moz-focus-inner{
    border: none;
}
.hide{
    opacity: 0 !important;
}
:host{
    display: grid;
    --border-radius: 0.3rem;
    --background: rgba(var(--text-color), 0.06);
    --padding-right: initial;
    --padding-left: initial;
    --max-height: 8rem;
}
:host(.outlined) .textarea {
    box-shadow: 0 0 0 0.1rem rgba(var(--text-color), 0.4) inset;
    background: rgba(var(--foreground-color), 1);
}
.textarea{
    display: grid;
    position: relative;
    cursor: text;
    min-width: 0;
    text-align: left;
    overflow: hidden auto;
    grid-template-columns: 1fr;
    align-items: stretch;
    max-height: var(--max-height);
    background: var(--background);
    border-radius: var(--border-radius);
    padding-left: var(--padding-left);
    padding-right: var(--padding-right);
}
.textarea::after,
textarea{
    padding: 0.7rem 1rem;
    width: 100%;
    min-width: 1em;
    font: inherit;
    color: inherit;
    resize: none;
    grid-area: 2/1;
    justify-self: stretch;
    background: none;
    appearance: none;
    border: none;
    outline: none;
    line-height: 1.5;
    overflow: hidden;
}
.textarea::after{
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
}
.readonly{
    pointer-events: none;
}
.textarea:focus-within:not(.readonly){
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
}
.disabled{
    pointer-events: none;
    opacity: 0.6;
}
.placeholder{
    position: absolute;
    margin: 0.7rem 1rem;
    opacity: .7;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    pointer-events: none;
    user-select: none;
}
@media (any-hover: hover){
    ::-webkit-scrollbar{
        width: 0.5rem;
        height: 0.5rem;
    }
    
    ::-webkit-scrollbar-thumb{
        background: rgba(var(--text-color), 0.3);
        border-radius: 1rem;
        &:hover{
            background: rgba(var(--text-color), 0.5);
        }
    }
}
</style>
<label class="textarea" part="textarea">
    <span class="placeholder"></span>
    <textarea rows="1"></textarea>
</label>
`;
customElements.define('sm-textarea',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(smTextarea.content.cloneNode(true))

            this.textarea = this.shadowRoot.querySelector('textarea')
            this.textareaBox = this.shadowRoot.querySelector('.textarea')
            this.placeholder = this.shadowRoot.querySelector('.placeholder')
            this.observeList = ['required', 'readonly', 'rows', 'minlength', 'maxlength']
        }
        static get observedAttributes() {
            return ['value', 'placeholder', 'required', 'readonly', 'rows', 'minlength', 'maxlength']
        }
        get value() {
            return this.textarea.value
        }
        set value(val) {
            this.setAttribute('value', val)
            this.fireEvent()
        }
        get isValid() {
            return this.textarea.checkValidity()
        }
        reset = () => {
            this.setAttribute('value', '')
        }
        focusIn = () => {
            this.textarea.focus()
        }
        fireEvent = () => {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }
        checkInput = () => {
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '')
                return;
            if (this.textarea.value !== '') {
                this.placeholder.classList.add('hide')
            } else {
                this.placeholder.classList.remove('hide')
            }
        }
        connectedCallback() {
            this.textarea.addEventListener('input', e => {
                this.textareaBox.dataset.value = this.textarea.value
                this.checkInput()
            })
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (this.observeList.includes(name)) {
                if (this.hasAttribute(name)) {
                    this.textarea.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '')
                }
                else {
                    this.input.removeAttribute(name)
                }
            }
            else if (name === 'placeholder') {
                this.placeholder.textContent = this.getAttribute('placeholder')
            }
            else if (name === 'value') {
                this.textarea.value = newValue;
                this.textareaBox.dataset.value = newValue
                this.checkInput()
            }
        }
    })

//chcekbox

const smCheckbox = document.createElement('template')
smCheckbox.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    } 
    :host{
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        --height: 1.6rem;
        --width: 1.6rem;
        --border-radius: 0.2rem;
        --border-color: rgba(var(--text-color), 0.7);
    }
    :host([disabled]) {
        opacity: 0.6;
        pointer-events: none;
    }
    .checkbox {
        position: relative;
        display:-webkit-box;
        display:-ms-flexbox;
        display:flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        cursor: pointer;
        height: 1.5rem;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
    
    .checkbox:active .icon,
    .checkbox:focus-within .icon{
        box-shadow: 0 0 0 0.3rem var(--accent-color) inset;
    }
    
    .checkbox input {
        display: none;
    }
    
    .checkbox .checkmark {
        stroke-dashoffset: -65;
        stroke-dasharray: 65;
        -webkit-transition: stroke-dashoffset 0.3s; 
        -o-transition: stroke-dashoffset 0.3s; 
        transition: stroke-dashoffset 0.3s;
    }
    
    .checkbox input:checked ~ svg .checkmark {
        stroke-dashoffset: 0;
        stroke: rgba(var(--foreground-color), 1);
    }
    .checkbox input:checked ~ .icon {
        stroke-width: 8; 
        stroke: var(--accent-color);
        background: var(--accent-color);
    }
    .checkbox input:not(:checked) ~ .icon {
        box-shadow: 0 0 0 0.2rem var(--border-color) inset;
    }
    
    .icon {
        fill: none;
        height: var(--height);
        width: var(--width);
        padding: 0.2rem;
        stroke: rgba(var(--text-color), 0.7);
        stroke-width: 6;
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
        -webkit-transition: background 0.3s;
        -o-transition: background 0.3s;
        transition: background 0.3s;
        border-radius: var(--border-radius);
    }
</style>
<label class="checkbox" tabindex="0">
    <input type="checkbox">
    <svg class="icon" viewBox="0 0 64 64">
        <title>checkbox</title>
        <path class="checkmark" d="M50.52,19.56,26,44.08,13.48,31.56" />
    </svg>
    <slot></slot>
</label>`
customElements.define('sm-checkbox', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smCheckbox.content.cloneNode(true))

        this.checkbox = this.shadowRoot.querySelector('.checkbox');
        this.input = this.shadowRoot.querySelector('input')

        this.isChecked = false
        this.isDisabled = false
    }

    static get observedAttributes() {
        return ['disabled', 'checked']
    }

    get disabled() {
        return this.isDisabled
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }

    get checked() {
        return this.isChecked
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
        }
        else {
            this.removeAttribute('checked')
        }
    }

    set value(val) {
        this.val = val
        this.setAttribute('value', value)
    }

    get value() {
        return getAttribute('value')
    }

    dispatch = () => {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true
        }))
    }
    handleKeyup = e => {
        if ((e.code === "Enter" || e.code === "Space") && this.isDisabled == false) {
            if (this.hasAttribute('checked')) {
                this.input.checked = false
                this.removeAttribute('checked')
            }
            else {
                this.input.checked = true
                this.setAttribute('checked', '')
            }
        }
    }
    handleChange = e => {
        if (this.input.checked) {
            this.setAttribute('checked', '')
        }
        else {
            this.removeAttribute('checked')
        }
    }
    
    connectedCallback() {
        this.val = ''
        this.addEventListener('keyup', this.handleKeyup)
        this.input.addEventListener('change', this.handleChange)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (newValue === 'true') {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            }
            else if (name === 'checked') {
                if (this.hasAttribute('checked')) {
                    this.isChecked = true
                    this.input.checked = true
                }
                else {
                    this.input.checked = false
                    this.isChecked = false
                }
                this.dispatch()
            }
        }
    }
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup)
        this.removeEventListener('change', this.handleChange)
    }
})

//switch

const smSwitch = document.createElement('template')
smSwitch.innerHTML = `	
<style>
    *{
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    :host{
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
    }
    label{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        width: 100%;
        outline: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    :host(:not([disabled])) label:focus-visible{
        -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color);
    }
    :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
    }
    .switch {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        width: 2.4rem;
        flex-shrink: 0;
        margin-left: auto;
        padding: 0.2rem;
        cursor: pointer;
        border-radius: 2rem;
    }
    
    input {
        display: none;
    }
    
    .track {
        position: absolute;
        left: 0;
        right: 0;
        height: 1.4rem;
        -webkit-transition: background 0.3s;
        -o-transition: background 0.3s;
        transition: background 0.3s;
        background: rgba(var(--text-color), 0.4);
        -webkit-box-shadow: 0 0.1rem 0.3rem #00000040 inset;
                box-shadow: 0 0.1rem 0.3rem #00000040 inset;
        border-radius: 1rem;
    }
    
    .switch:active .button::after,
    .switch:focus .button::after{
        opacity: 1
    }
    .switch:focus-visible .button::after{
        opacity: 1
    }
    
    .button::after{
        content: '';
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        height: 2.6rem;
        width: 2.6rem;
        background: rgba(var(--text-color), 0.2);
        border-radius: 2rem;
        opacity: 0;
        -webkit-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
    }
    
    .button {
        position: relative;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        height: 1rem;
        width: 1rem;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        border-radius: 1rem;
        -webkit-box-shadow: 0 0.1rem 0.4rem #00000060;
                box-shadow: 0 0.1rem 0.4rem #00000060;
        -webkit-transition: -webkit-transform 0.3s;
        transition: -webkit-transform 0.3s;
        -o-transition: transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
        border: solid 0.3rem white;
    }
    
    input:checked ~ .button {
        -webkit-transform: translateX(100%);
            -ms-transform: translateX(100%);
                transform: translateX(100%);
    }
    
    input:checked ~ .track {
        background: var(--accent-color);
    }
</style>
<label tabindex="0">
    <slot name="left"></slot>
    <div part="switch" class="switch">
        <input type="checkbox">
        <div class="track"></div>
        <div class="button"></div>
    </div>
    <slot name="right"></slot>
</label>`

customElements.define('sm-switch', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smSwitch.content.cloneNode(true))
        this.switch = this.shadowRoot.querySelector('.switch');
        this.input = this.shadowRoot.querySelector('input')
        this.isChecked = false
        this.isDisabled = false
    }

    static get observedAttributes() {
        return ['disabled', 'checked']
    }

    get disabled() {
        return this.isDisabled
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }

    get checked() {
        return this.isChecked
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
        } else {
            this.removeAttribute('checked')
        }
    }

    dispatch = () => {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.isChecked 
            }
        }))
    }

    connectedCallback() {
        this.addEventListener('keyup', e => {
            if ((e.code === "Enter" || e.code === "Space") && !this.isDisabled) {
                this.input.click()
            }
        })
        this.input.addEventListener('click', e => {
            if (this.input.checked)
                this.checked = true
            else
                this.checked = false
            this.dispatch()
        })
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (this.hasAttribute('disabled')) {
                    this.disabled = true                
                }
                else {
                    this.disabled = false                
                }
            }
            else if (name === 'checked') {
                if (this.hasAttribute('checked')) {
                    this.isChecked = true
                    this.input.checked = true            
                }
                else {
                    this.isChecked = false
                    this.input.checked = false               
                } 
            }
        }
    }

})

// select
const smSelect = document.createElement('template')
smSelect.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
.icon {
    fill: none;
    height: 0.8rem;
    width: 0.8rem;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 6;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
}      
:host{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    --max-height: auto;
    --min-width: 100%;
}
.hide{
    display: none !important;
}
.select{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    cursor: pointer;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
}
.option-text{
    font-size: 0.9rem;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    white-space: nowrap;
}
.selection{
    border-radius: 0.3rem;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr auto;
    grid-template-columns: 1fr auto;
        grid-template-areas: 'heading heading' '. .';
    padding: 0.4rem 1rem;
    background: rgba(var(--text-color), 0.06);
    border: solid 1px rgba(var(--text-color), 0.2);
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    outline: none;
}
.selection:focus{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color) 
}
.icon{
    margin-left: 1rem;
}
:host([align-select="left"]) .options{
    left: 0;
}
:host([align-select="right"]) .options{
    right: 0;
}
.options{
    top: 100%;
    margin-top: 0.5rem; 
    overflow: hidden auto;
    position: absolute;
    grid-area: options;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    min-width: var(--min-width);
    max-height: var(--max-height);
    background: rgba(var(--foreground-color), 1);
    border: solid 1px rgba(var(--text-color), 0.2);
    border-radius: 0.3rem;
    z-index: 2;
    -webkit-box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
            box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
}
.rotate{
    -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
            transform: rotate(180deg)
}
@media (any-hover: hover){
    ::-webkit-scrollbar{
        width: 0.5rem;
        height: 0.5rem;
    }
    
    ::-webkit-scrollbar-thumb{
        background: rgba(var(--text-color), 0.3);
        border-radius: 1rem;
        &:hover{
            background: rgba(var(--text-color), 0.5);
        }
    }
}
</style>
<div class="select" >
    <div class="selection" tabindex="0">
        <div class="option-text"></div>
        <svg class="icon toggle" viewBox="0 0 64 64">
            <polyline points="63.65 15.99 32 47.66 0.35 15.99"/>
        </svg>
    </div>
    <div part="options" class="options hide">
        <slot></slot> 
    </div>
</div>`;
customElements.define('sm-select', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smSelect.content.cloneNode(true))
    }
    static get observedAttributes() {
        return ['value']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }

    reset = () => {

    }

    collapse() {
        this.chevron.classList.remove('rotate')
        this.optionList.animate(this.slideUp, this.animationOptions)
        .onfinish = () => {
            this.optionList.classList.add('hide')
            this.open = false
        }
    }
    connectedCallback() {
        this.availableOptions
        this.optionList = this.shadowRoot.querySelector('.options')
        this.chevron = this.shadowRoot.querySelector('.toggle')
        let slot = this.shadowRoot.querySelector('.options slot'),
            selection = this.shadowRoot.querySelector('.selection'),
            previousOption
        this.open = false;
        this.slideDown = [{
                transform: `translateY(-0.5rem)`,
                opacity: 0
            },
            {
                transform: `translateY(0)`,
                opacity: 1
            }
        ]
        this.slideUp = [{
                transform: `translateY(0)`,
                opacity: 1
            },
            {
                transform: `translateY(-0.5rem)`,
                opacity: 0
            }
        ]
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: 'ease'
        }
        selection.addEventListener('click', e => {
            if (!this.open) {
                this.optionList.classList.remove('hide')
                this.optionList.animate(this.slideDown, this.animationOptions)
                this.chevron.classList.add('rotate')
                this.open = true
            } else {
                this.collapse()
            }
        })
        selection.addEventListener('keydown', e => {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            if (e.code === 'Enter' || e.code === 'Space')
                if (!this.open) {
                    this.optionList.classList.remove('hide')
                    this.optionList.animate(this.slideDown, this.animationOptions)
                    this.chevron.classList.add('rotate')
                    this.open = true
                } else {
                    this.collapse()
                }
        })
        this.optionList.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                }
            }
            if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling)
                    document.activeElement.nextElementSibling.focus()
            }
        })
        this.addEventListener('optionSelected', e => {
            if (previousOption !== e.target) {
                this.setAttribute('value', e.detail.value)
                this.shadowRoot.querySelector('.option-text').textContent = e.detail.text;
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: e.detail.value
                    }
                }))
                if (previousOption) {
                    previousOption.classList.remove('check-selected')
                }
                previousOption = e.target;
            }
            if (!e.detail.switching)
                this.collapse()

            e.target.classList.add('check-selected')
        })
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            if (this.availableOptions[0]) {
                let firstElement = this.availableOptions[0];
                previousOption = firstElement;
                firstElement.classList.add('check-selected')
                this.setAttribute('value', firstElement.getAttribute('value'))
                this.shadowRoot.querySelector('.option-text').textContent = firstElement.textContent
                this.availableOptions.forEach((element, index) => {
                    element.setAttribute('data-rank', index + 1);
                    element.setAttribute('tabindex', "0");
                })
            }
        });
        document.addEventListener('mousedown', e => {
            if (!this.contains(e.target) && this.open) {
                this.collapse()
            }
        })
    }
})

// option
const smOption = document.createElement('template')
smOption.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}     
:host{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.option{
    min-width: 100%;
    padding: 0.8rem 1.2rem;
    cursor: pointer;
    overflow-wrap: break-word;
    outline: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color), 0.1);
}
:host(:focus) .option .icon{
    opacity: 0.4
}
:host(.check-selected) .icon{
    opacity: 1 !important
}
.icon {
    margin-right: 0.8rem;
    fill: none;
    height: 0.8rem;
    width: 0.8rem;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 10;
    overflow: visible;
    stroke-linecap: round;
    border-radius: 1rem;
    stroke-linejoin: round;
    opacity: 0;
}
@media (hover: hover){
    .option:hover{
        background: rgba(var(--text-color), 0.1);
    }
    .option:hover .icon{
        opacity: 0.4
    }
}
</style>
<div class="option">
    <svg class="icon" viewBox="0 0 64 64">
        <polyline points="0.35 31.82 21.45 52.98 63.65 10.66"/>
    </svg>
    <slot></slot> 
</div>`;
customElements.define('sm-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smOption.content.cloneNode(true))
    }

    sendDetails(switching) {
        let optionSelected = new CustomEvent('optionSelected', {
            bubbles: true,
            composed: true,
            detail: {
                text: this.textContent,
                value: this.getAttribute('value'),
                switching: switching
            }
        })
        this.dispatchEvent(optionSelected)
    }

    connectedCallback() {
        let validKey = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ]
        this.addEventListener('click', e => {
            this.sendDetails()
        })
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.sendDetails(false)
            }
            if (validKey.includes(e.code)) {
                e.preventDefault()
                this.sendDetails(true)
            }
        })
        if (this.hasAttribute('default')) {
            setTimeout(() => {
                this.sendDetails()
            }, 0);
        }
    }
})

// strip select
const stripSelect = document.createElement('template')
stripSelect.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }  
    :host{
        --gap: 0.5rem;
    }
    .hide{
        display: none !important;
    }
    input[type="radio"]{
        display: none;
    }
    .scrolling-container{
        position: relative;
        display: flex;
        align-items: center;
        padding: 1rem 0;
    }
    .strip-select{
        display: grid;
        grid-auto-flow: column;
        gap: var(--gap);
        position: relative;
        max-width: 100%;   
        align-items: center;
        overflow: auto hidden;
    }
    .nav-button{
        display: flex;
        top: 50%;
        z-index: 2;
        border: none;
        padding: 0.3rem;
        cursor: pointer;
        position: absolute;
        align-items: center;
        background: var(--background-color);
        transform: translateY(-50%);
    }
    .nav-button--right{
        right: 0;
    }
    .cover{
        position: absolute;
        z-index: 1;
        width: 5rem;
        height: 100%;
        pointer-events: none;
    }
    .cover--left{
        background: linear-gradient(90deg, var(--background-color) 60%, transparent);
    }
    .cover--right{
        right: 0;
        background: linear-gradient(90deg, transparent 0%, var(--background-color) 40%);
    }
    .nav-button--right::before{
        background-color: red;
    }
    .icon{
        height: 1.5rem;
        width: 1.5rem;
        fill: rgba(var(--text-color), .8);
    }
    @media (hover: none){
        ::-webkit-scrollbar-track {
            background-color: transparent !important;
        }
        ::-webkit-scrollbar {
            height: 0;
            background-color: transparent;
        }
        .nav-button{
            display: none;
        }
        .strip-select{
            overflow: auto hidden;
        }
        .cover{
            width: 2rem;
        }
    }
    @media (hover: hover){
        .strip-select{
            overflow: hidden;
        }
    }
</style>
<section class="scrolling-container">
    <div class="cover cover--left hide"></div>
    <button class="nav-button nav-button--left hide">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>
    </button>
    <section class="strip-select">
        <slot></slot>
    </section>
    <button class="nav-button nav-button--right hide">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
    </button>
    <div class="cover cover--right hide"></div>
</section>

`
customElements.define('strip-select', class extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(stripSelect.content.cloneNode(true))
        this.stripSelect = this.shadowRoot.querySelector('.strip-select')
        this.slottedOptions
        this._value
        this.scrollDistance
    }
    get value() {
        return this._value
    }
    scrollLeft = () => {
        this.stripSelect.scrollBy({
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.stripSelect.scrollBy({
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }
    fireEvent = () => {
        this.dispatchEvent(
            new CustomEvent("change", {
                bubbles: true,
                composed: true,
                detail: {
                    value: this._value
                }
            })
        )
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot')
        const coverLeft = this.shadowRoot.querySelector('.cover--left')
        const coverRight = this.shadowRoot.querySelector('.cover--right')
        const navButtonLeft = this.shadowRoot.querySelector('.nav-button--left')
        const navButtonRight = this.shadowRoot.querySelector('.nav-button--right')
        slot.addEventListener('slotchange', e => {
            const assignedElements = slot.assignedElements()
            assignedElements.forEach(elem => {
                if (elem.hasAttribute('selected')) {
                    elem.setAttribute('active', '')
                    this._value = elem.value
                }
            })
            if (assignedElements.length > 0) {
                firstOptionObserver.observe(slot.assignedElements()[0])
                lastOptionObserver.observe(slot.assignedElements()[slot.assignedElements().length - 1])
            }
            else {
                navButtonLeft.classList.add('hide')
                navButtonRight.classList.add('hide')
                coverLeft.classList.add('hide')
                coverRight.classList.add('hide')
                firstOptionObserver.disconnect()
                lastOptionObserver.disconnect()
            }
        })
        const resObs = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if(entry.contentBoxSize) {
                    // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                    const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
                    
                    this.scrollDistance = contentBoxSize.inlineSize * 0.6
                } else {
                    this.scrollDistance = entry.contentRect.width * 0.6
                  }
            })
        })
        resObs.observe(this)
        this.stripSelect.addEventListener('option-clicked', e => {
            if (this._value !== e.target.value) {
                this._value = e.target.value
                slot.assignedElements().forEach(elem => elem.removeAttribute('active'))
                e.target.setAttribute('active', '')
                e.target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
                this.fireEvent()
            }
        })
        const firstOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navButtonLeft.classList.add('hide')
                    coverLeft.classList.add('hide')
                }
                else {
                    navButtonLeft.classList.remove('hide')
                    coverLeft.classList.remove('hide')
                }
            })
        },
        {
            threshold: 0.9,
            root: this
        })
        const lastOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navButtonRight.classList.add('hide')
                    coverRight.classList.add('hide')
                }
                else {
                    navButtonRight.classList.remove('hide')
                    coverRight.classList.remove('hide')
                }
            })
        },
        {
            threshold: 0.9,
            root: this
        })
        navButtonLeft.addEventListener('click', this.scrollLeft)
        navButtonRight.addEventListener('click', this.scrollRight)
    }
})

//Strip option
const stripOption = document.createElement('template')
stripOption.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }  
    :host{
        --border-radius: 2rem;
        --background-color: inherit;
        --active-option-color: inherit;
        --active-option-backgroud-color: rgba(var(--text-color), .2);
    }
    .hide{
        display: none !important;
    }
    .strip-option{
        display: flex;
        flex-shrink: 0;
        cursor: pointer;
        white-space: nowrap;
        padding: 0.5rem 0.8rem;
        transition: background 0.3s;
        border-radius: var(--border-radius);
        -webkit-tap-highlight-color: transparent;
    }
    :host([active]) .strip-option{
        color: var(--active-option-color);
        background-color: var(--active-option-backgroud-color);
    }
    :host(:hover:not([active])) .strip-option{
        background-color: rgba(var(--text-color), 0.06);
    }
</style>
<label class="strip-option" tabindex="0">
    <slot></slot>
</label>
`
customElements.define('strip-option', class extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(stripOption.content.cloneNode(true))
        this._value
        this.radioButton = this.shadowRoot.querySelector('input')
    }
    get value() {
        return this._value
    }
    fireEvent = () => {
        this.dispatchEvent(
            new CustomEvent("option-clicked", {
                bubbles: true,
                composed: true,
                detail: {
                    value: this._value
                }
            })
        )
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === 'Space') {
            this.fireEvent()
        }
    }
    connectedCallback() {
        this._value = this.getAttribute('value')
        this.addEventListener('click', this.fireEvent)
        this.addEventListener('keydown', this.handleKeyDown)
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.fireEvent)
        this.removeEventListener('keydown', this.handleKeyDown)
    }
})


//popup
const smPopup = document.createElement('template')
smPopup.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
:host{
    position: fixed;
    display: -ms-grid;
    display: grid;
    z-index: 10;
    --width: 100%;
    --height: auto;
    --min-width: auto;
    --min-height: auto;
    --body-padding: 1.5rem;
    --backdrop: rgba(0, 0, 0, 0.6);
    --border-radius: 0.8rem 0.8rem 0 0;
}
.popup-container{
    display: -ms-grid;
    display: grid;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    place-items: center;
    background: var(--backdrop);
    -webkit-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s;
    z-index: 10;
    touch-action: none;
}
:host(.stacked) .popup{
    -webkit-transform: scale(0.9) translateY(-2rem) !important;
            transform: scale(0.9) translateY(-2rem) !important;
}
.popup{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
            flex-direction: column;
    position: relative;
    -ms-flex-item-align: end;
        align-self: flex-end;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    width: var(--width);
    min-width: var(--min-width);
    height: var(--height);
    min-height: var(--min-height);
    max-height: 90vh;
    border-radius: var(--border-radius);
    -webkit-transform: scale(1) translateY(100%);
            transform: scale(1) translateY(100%);
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    -o-transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    transition: transform 0.3s;
    background: rgba(var(--foreground-color), 1);
    -webkit-box-shadow: 0 -1rem 2rem #00000020;
            box-shadow: 0 -1rem 2rem #00000020;
    content-visibility: auto;
}
.container-header{
    display: -webkit-box;
    display: flex;
    width: 100%;
    touch-action: none;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.popup-top{
    display: -webkit-box;
    display: flex;
    width: 100%;
}
.popup-body{
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    width: 100%;
    padding: var(--body-padding);
    overflow-y: auto;
}
.hide{
    opacity: 0;
    pointer-events: none;
    visiblity: none;
}
@media screen and (min-width: 640px){
    :host{
        --border-radius: 0.4rem;
    }
    .popup{
        -ms-flex-item-align: center;
            -ms-grid-row-align: center;
            align-self: center;
        border-radius: var(--border-radius);
        height: var(--height);
        -webkit-transform: scale(1) translateY(3rem);
                transform: scale(1) translateY(3rem);
        -webkit-box-shadow: 0 3rem 2rem -0.5rem #00000040;
                box-shadow: 0 3rem 2rem -0.5rem #00000040;
    }
}
@media screen and (max-width: 640px){
    .popup-top{
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
                flex-direction: column;
        -webkit-box-align: center;
                align-items: center;
    }
    .handle{
        height: 0.3rem;
        width: 2rem;
        background: rgba(var(--text-color), .4);
        border-radius: 1rem;
        margin: 0.5rem 0;
    }
}
@media (any-hover: hover){
    ::-webkit-scrollbar{
        width: 0.5rem;
    }
    
    ::-webkit-scrollbar-thumb{
        background: rgba(var(--text-color), 0.3);
        border-radius: 1rem;
        &:hover{
            background: rgba(var(--text-color), 0.5);
        }
    }
}
</style>
<div part="background" class="popup-container hide" role="dialog">
    <div part="popup" class="popup">
        <div part="popup-header" class="popup-top">
            <div class="handle"></div>
            <slot name="header"></slot>
        </div>
        <div part="popup-body" class="popup-body">
            <slot></slot>
        </div>
    </div>
</div>
`;
customElements.define('sm-popup', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smPopup.content.cloneNode(true))

        this.allowClosing = false
        this.isOpen = false
    }

    get open() {
        return this.isOpen
    }

    resumeScrolling = () => {
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.body.style.top= 'initial'
        }, 300);
    }

    show = (pinned, popupStack) => {
        if (popupStack)
            this.popupStack = popupStack
        if (this.popupStack && !this.hasAttribute('open')) {
            this.popupStack.push({
                popup: this,
                permission: pinned
            })
            if (this.popupStack.items.length > 1) {
                this.popupStack.items[this.popupStack.items.length - 2].popup.classList.add('stacked')
            }
            this.dispatchEvent(
                new CustomEvent("popupopened", {
                    bubbles: true,
                    detail: {
                        popup: this,
                        popupStack: this.popupStack
                    }
                })
            )
            this.setAttribute('open', '')
            this.pinned = pinned
            this.isOpen = true
        }
        this.popupContainer.classList.remove('hide')
        this.popup.style.transform = 'none';
        document.body.style.overflow = 'hidden';
        document.body.style.top= `-${window.scrollY}px`
        return this.popupStack
    }
    hide = () => {
        if (window.innerWidth < 640)
            this.popup.style.transform = 'translateY(100%)';
        else
            this.popup.style.transform = 'translateY(3rem)';
        this.popupContainer.classList.add('hide')
        this.removeAttribute('open')
        if (typeof this.popupStack !== 'undefined') {
            this.popupStack.pop()
            if (this.popupStack.items.length) {
                this.popupStack.items[this.popupStack.items.length - 1].popup.classList.remove('stacked')
            } else {
                this.resumeScrolling()
            }
        } else {
            this.resumeScrolling()
        }

        if (this.inputFields.length) {
            setTimeout(() => {
                this.inputFields.forEach(field => {
                    if (field.type === 'radio' || field.tagName === 'SM-CHECKBOX')
                        field.checked = false
                    if (field.tagName === 'SM-INPUT' || field.tagName === 'TEXTAREA'|| field.tagName === 'SM-TEXTAREA')
                        field.value = ''
                })
            }, 300);
        }
        setTimeout(() => {            
            this.dispatchEvent(
                new CustomEvent("popupclosed", {
                    bubbles: true,
                    detail: {
                        popup: this,
                        popupStack: this.popupStack
                    }
                })
            )
            this.isOpen = false
        }, 300);
    }

    handleTouchStart = (e) => {
        this.touchStartY = e.changedTouches[0].clientY
        this.popup.style.transition = 'transform 0.1s'
        this.touchStartTime = e.timeStamp
    }

    handleTouchMove = (e) => {
        if (this.touchStartY < e.changedTouches[0].clientY) {
            this.offset = e.changedTouches[0].clientY - this.touchStartY;
            this.touchEndAnimataion = window.requestAnimationFrame(() => this.movePopup())
        }
        /*else {
            this.offset = this.touchStartY - e.changedTouches[0].clientY;
            this.popup.style.transform = `translateY(-${this.offset}px)`
        }*/
    }

    handleTouchEnd = (e) => {
        this.touchEndTime = e.timeStamp
        cancelAnimationFrame(this.touchEndAnimataion)
        this.touchEndY = e.changedTouches[0].clientY
        this.popup.style.transition = 'transform 0.3s'
        this.threshold = this.popup.getBoundingClientRect().height * 0.3
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndY - this.touchStartY > this.threshold) {
                if (this.pinned) {
                    this.show()
                    return
                } else
                    this.hide()
            } else {
                this.show()
            }
        } else {
            if (this.touchEndY > this.touchStartY)
                if (this.pinned) {
                    this.show()
                    return
                }
            else
                this.hide()
        }
    }

    movePopup = () => {
        this.popup.style.transform = `translateY(${this.offset}px)`
    }

    connectedCallback() {
        this.pinned = false
        this.popupStack
        this.popupContainer = this.shadowRoot.querySelector('.popup-container')
        this.popup = this.shadowRoot.querySelector('.popup')
        this.popupBodySlot = this.shadowRoot.querySelector('.popup-body slot')
        this.offset
        this.popupHeader = this.shadowRoot.querySelector('.popup-top')
        this.touchStartY = 0
        this.touchEndY = 0
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.touchEndAnimataion;
        this.threshold = this.popup.getBoundingClientRect().height * 0.3

        if (this.hasAttribute('open'))
            this.show()
        this.popupContainer.addEventListener('mousedown', e => {
            if (e.target === this.popupContainer && !this.pinned) {
                if (this.pinned) {
                    this.show()
                    return
                } else
                    this.hide()
            }
        })

        this.popupBodySlot.addEventListener('slotchange', () => {
            setTimeout(() => {
                this.threshold = this.popup.getBoundingClientRect().height * 0.3
            }, 200);
            this.inputFields = this.querySelectorAll('sm-input', 'sm-checkbox', 'textarea', 'sm-textarea', 'radio')
        })

        this.popupHeader.addEventListener('touchstart', (e) => { this.handleTouchStart(e) }, {passive: true})
        this.popupHeader.addEventListener('touchmove', (e) => {this.handleTouchMove(e)}, {passive: true})
        this.popupHeader.addEventListener('touchend', (e) => {this.handleTouchEnd(e)}, {passive: true})
    }
    disconnectedCallback() {
        this.popupHeader.removeEventListener('touchstart', this.handleTouchStart, {passive: true})
        this.popupHeader.removeEventListener('touchmove', this.handleTouchMove, {passive: true})
        this.popupHeader.removeEventListener('touchend', this.handleTouchEnd, {passive: true})
    }
})

//carousel

const smCarousel = document.createElement('template')
smCarousel.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
:host{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    --arrow-left: 1rem;
    --arrow-right: 1rem;
    --arrow-top: auto;
    --arrow-bottom: auto;
    --arrow-fill: rgba(var(--foreground-color), 1);
    --arrow-background: rgba(var(--text-color), 1);
    --arrow-box-shadow: 0 0.2rem 0.2rem #00000020, 0 0.5rem 1rem #00000040;
    --indicator-top: auto;
    --indicator-bottom: -1rem;
    --active-indicator-color: var(--accent-color);
}
.carousel__button{
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    min-width: 0;
    top:  var(--arrow-top);
    bottom:  var(--arrow-bottom);
    border: none;
    background: var(--arrow-background);
    -webkit-box-shadow: var(--arrow-box-shadow);
            box-shadow:  var(--arrow-box-shadow); 
    -webkit-tap-highlight-color: transparent;
    -webkit-transform: scale(0);
        -ms-transform: scale(0);
            transform: scale(0);
    z-index: 1;
    border-radius: 3rem;
    padding: 0.5rem;
}
.carousel__button:active{
    background: rgba(var(--text-color), 0.1);
}
button:focus{
    outline: none;
}
button:focus-visible{
    outline: rgba(var(--text-color), 1) 0.1rem solid;
}
.carousel__button--left{
    left: var(--arrow-left);
}
.carousel__button--right{
    right: var(--arrow-right);
}
.icon {
    height: 1.5rem;
    width: 1.5rem;
    fill: var(--arrow-fill);
}
.hide{
    pointer-events: none;
    opacity: 0;
}
.expand{
    -webkit-transform: scale(1);
        -ms-transform: scale(1);
            transform: scale(1)
}
.carousel-container{
    position: relative;
    display: grid;
    width: 100%;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.carousel{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    max-width: 100%;
    width: 100%;
    overflow: auto hidden;
    -ms-scroll-snap-type: x mandatory;
        scroll-snap-type: x mandatory;
}
.indicators{
    display: -ms-grid;
    display: grid;
    grid-auto-flow: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    position: absolute;
    top: var(--indicator-top);
    bottom: var(--indicator-bottom);
    gap: 0.5rem;
    width: 100%;
}
.dot{
    position: relative;
    padding: 0.2rem;
    background: rgba(var(--text-color), 0.3);
    border-radius: 1rem;
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    cursor: pointer;
}
.dot.active{
    -webkit-transform: scale(1.5);
        -ms-transform: scale(1.5);
            transform: scale(1.5);
    background: var(--active-indicator-color);
}
slot::slotted(*){
    scroll-snap-align: center;
}
:host([align-items="start"]) slot::slotted(*){
    scroll-snap-align: start;
}
:host([align-items="center"]) slot::slotted(*){
    scroll-snap-align: center;
}
:host([align-items="end"]) slot::slotted(*){
    scroll-snap-align: end;
}
@media (hover: hover){
    .carousel{
        overflow: hidden;
    }
    .left,.right{
        display: none;
    }
    .carousel__button:hover{
        background: rgba(var(--text-color), 0.06);
    }
}
@media (hover: none){
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: none !important;
        background-color: transparent !important;
    }
    ::-webkit-scrollbar {
        height: 0;
        background-color: transparent;
    }
    .carousel{
        overflow: auto none;
    }
    .carousel__button{
        display: none;
    }
    .left,.right{
        display: block;
    }
}
</style>
<div class="carousel-container">
    <button class="carousel__button carousel__button--left">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>
    </button>
    <div part="carousel" class="carousel">
        <slot></slot>
    </div>
    <button class="carousel__button carousel__button--right">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
    </button>
    <div class="indicators"></div>
</div>
`;

customElements.define('sm-carousel', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smCarousel.content.cloneNode(true))

        this.isAutoPlaying = false
        this.autoPlayInterval = 5000
        this.autoPlayTimeout
        this.initialTimeout
        this.activeSlideNum = 0
        this.carouselItems
        this.indicators
        this.showIndicator = false
        this.carousel = this.shadowRoot.querySelector('.carousel')
        this.carouselContainer = this.shadowRoot.querySelector('.carousel-container')
        this.carouselSlot = this.shadowRoot.querySelector('slot')
        this.nextArrow = this.shadowRoot.querySelector('.carousel__button--right')
        this.previousArrow = this.shadowRoot.querySelector('.carousel__button--left')
        this.indicatorsContainer = this.shadowRoot.querySelector('.indicators')
    }

    static get observedAttributes() {
        return ['indicator', 'autoplay', 'interval']
    }

    scrollLeft = () => {
        this.carousel.scrollBy({
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.carousel.scrollBy({
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }

    handleIndicatorClick = (e) => {
        if (e.target.closest('.dot')) {
            const slideNum = parseInt(e.target.closest('.dot').dataset.rank)
            if (this.activeSlideNum !== slideNum) {
                this.showSlide(slideNum)
            }
        }
    }

    showSlide = (slideNum) => {
        this.carousel.scrollTo({
            left: (this.carouselItems[slideNum].getBoundingClientRect().left - this.carousel.getBoundingClientRect().left + this.carousel.scrollLeft),
            behavior: 'smooth'
        })
    }

    nextSlide = () => {
        if (!this.carouselItems) return
        let showSlideNo = (this.activeSlideNum + 1) < this.carouselItems.length ? this.activeSlideNum + 1 : 0
        this.showSlide(showSlideNo)
    }
    
    autoPlay = () => {
        this.nextSlide()
        if (this.isAutoPlaying) {
            this.autoPlayTimeout = setTimeout(() => {
                this.autoPlay()
            }, this.autoPlayInterval);
        }
    }

    startAutoPlay = () => {
        this.setAttribute('autoplay', '')
    }

    stopAutoPlay = () => {
        this.removeAttribute('autoplay')
    }

    connectedCallback() {
        this.scrollDistance = this.carouselContainer.getBoundingClientRect().width / 3
        let frag = document.createDocumentFragment();
        if (this.hasAttribute('indicator'))
            this.showIndicator = true


        let firstVisible = false,
            lastVisible = false
        const allElementsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (this.showIndicator) {                    
                    const activeRank = parseInt(entry.target.dataset.rank)
                    if (entry.isIntersecting) {
                        this.indicators[activeRank].classList.add('active')
                        this.activeSlideNum = activeRank
                    }
                    else
                        this.indicators[activeRank].classList.remove('active')
                }
                if (!entry.target.previousElementSibling)
                    if (entry.isIntersecting) {
                        this.previousArrow.classList.remove('expand')
                        firstVisible = true
                    }
                else {
                    this.previousArrow.classList.add('expand')
                    firstVisible = false
                }
                if (!entry.target.nextElementSibling)
                    if (entry.isIntersecting) {
                        this.nextArrow.classList.remove('expand')
                        lastVisible = true
                    }
                else {
                    this.nextArrow.classList.add('expand')
                    lastVisible = false
                }
                if (firstVisible && lastVisible)
                    this.indicatorsContainer.classList.add('hide')
                else
                    this.indicatorsContainer.classList.remove('hide')
            })
        }, {
            root: this.carouselContainer,
            threshold: 0.9
        })

        const carouselObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.scrollDistance = this.carouselContainer.getBoundingClientRect().width / 3
            }
        })

        carouselObserver.observe(this.carouselContainer)

        this.carouselSlot.addEventListener('slotchange', e => {
            this.carouselItems = this.carouselSlot.assignedElements()
            this.carouselItems.forEach(item => allElementsObserver.observe(item))
            if (this.showIndicator) {
                this.indicatorsContainer.innerHTML = ``
                this.carouselItems.forEach((item, index) => {
                    let dot = document.createElement('div')
                    dot.classList.add('dot')
                    dot.dataset.rank = index
                    frag.append(dot)
                    item.dataset.rank = index
                })
                this.indicatorsContainer.append(frag)
                this.indicators = this.indicatorsContainer.children
            }
        })

        this.addEventListener('keyup', e => {
            if (e.code === 'ArrowLeft')
                this.scrollRight()
            else if (e.code === 'ArrowRight')
                this.scrollRight()
        })

        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
        this.indicatorsContainer.addEventListener('click', this.handleIndicatorClick)
    }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {            
            if (name === 'indicator') {
                if (this.hasAttribute('indicator'))
                    this.showIndicator = true
                else
                    this.showIndicator = false
                }
            if (name === 'autoplay') {
                if (this.hasAttribute('autoplay')) {
                    this.initialTimeout = setTimeout(() => {
                        this.isAutoPlaying = true
                        this.autoPlay()
                    }, this.autoPlayInterval);
                }
                else {
                    this.isAutoPlaying = false
                    clearTimeout(this.autoPlayTimeout)
                    clearTimeout(this.initialTimeout)
                }
                
            }
            if (name === 'interval') {
                if (this.hasAttribute('interval') && this.getAttribute('interval').trim() !== '') {
                    this.autoPlayInterval = Math.abs(parseInt(this.getAttribute('interval').trim()))
                }
                else {
                    this.autoPlayInterval = 5000
                }
            }
        }
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
        this.indicatorsContainer.removeEventListener('click', this.handleIndicatorClick)
    }
})

//notifications

const smNotifications = document.createElement('template')
smNotifications.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    } 
    :host{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .hide{
        opacity: 0 !important;
        pointer-events: none !important;
    }
    .notification-panel{
        display: -ms-grid;
        display: grid;
        width: 100%;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
        max-height: 100%;
        overflow: hidden auto;
        -ms-scroll-chaining: none;
            overscroll-behavior: contain;
        }
        .no-transformations{
        -webkit-transform: none;
            -ms-transform: none;
                transform: none;
        opacity: 1;
    }
    .notification-panel:empty{
        display:none;
    }
    .notification{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        opacity: 0;
        padding: 1rem 1.5rem;
        margin-bottom: 0.5rem;
        -webkit-transform: translateY(-1rem);
            -ms-transform: translateY(-1rem);
                transform: translateY(-1rem);
        position: relative;
        border-radius: 0.3rem;
        -webkit-box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1),
                    0.5rem 1rem 2rem rgba(0, 0, 0, 0.1);
                box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.1),
                    0.5rem 1rem 2rem rgba(0, 0, 0, 0.1);
        background: rgba(var(--foreground-color), 1);
        -webkit-transition: height 0.3s, opacity 0.3s, -webkit-transform 0.3s;
        transition: height 0.3s, opacity 0.3s, -webkit-transform 0.3s;
        -o-transition: height 0.3s, transform 0.3s, opacity 0.3s;
        transition: height 0.3s, transform 0.3s, opacity 0.3s;
        transition: height 0.3s, transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
        overflow: hidden;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        max-width: 100%;
        touch-action: none;
    }
    h4:first-letter,
    p:first-letter{
        text-transform: uppercase;
    }
    h4{
        font-weight: 400;
    }
    p{
        line-height: 1.6;
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        color: rgba(var(--text-color), 0.9);
        overflow-wrap: break-word;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        max-width: 100%;
    }
    .notification:last-of-type{
        margin-bottom: 0;
    }
    .icon {
        fill: none;
        height: 1.6rem;
        width: 1.6rem;
        stroke: rgba(var(--text-color), 0.7);
        overflow: visible;
        stroke-linecap: round;
        border-radius: 1rem;
        stroke-linejoin: round;
        cursor: pointer;
    }
    .error-icon{
        stroke: #E53935;
    }
    .success-icon{
        stroke: #00C853;
    }
    .close{
        margin-left: 1rem;
        padding: 0.5rem;
        stroke-width: 10;
    }
    .notification-icon{
        height: 1.4rem;
        width: 1.4rem;
        margin: 0.3em 1rem 0 0;
        stroke-width: 6;
    }
    @media screen and (min-width: 640px){
        .notification-panel{
            max-width: 28rem;
            width: max-content;
            -webkit-box-pack: end;
                -ms-flex-pack: end;
            justify-content: flex-end;
        }
        .notification{
            -ms-grid-column-align: end;
                justify-self: end;
            width: auto;
            margin-right: 1.5rem;
            margin-bottom: 1rem;
            border-bottom: none;
            border: solid 1px rgba(var(--text-color), 0.2);
            -webkit-transform: translateX(1rem);
                -ms-transform: translateX(1rem);
                    transform: translateX(1rem);
        }
    }
    @media screen and (any-hover: none){
        .close{
            display: none
        }
    }
</style>
<div class="notification-panel"></div>
`

customElements.define('sm-notifications', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open'
        }).append(smNotifications.content.cloneNode(true))
    }

    handleTouchStart = (e) => {
        this.notification = e.target.closest('.notification')
        this.touchStartX = e.changedTouches[0].clientX
        this.notification.style.transition = 'initial'
        this.touchStartTime = e.timeStamp
    }

    handleTouchMove = (e) => {
        e.preventDefault()
        if (this.touchStartX < e.changedTouches[0].clientX) {
            this.offset = e.changedTouches[0].clientX - this.touchStartX;
            this.touchEndAnimataion = requestAnimationFrame(this.movePopup)
        } else {
            this.offset = -(this.touchStartX - e.changedTouches[0].clientX);
            this.touchEndAnimataion = requestAnimationFrame(this.movePopup)
        }
    }

    handleTouchEnd = (e) => {
        this.notification.style.transition = 'transform 0.3s, opacity 0.3s'
        this.touchEndTime = e.timeStamp
        cancelAnimationFrame(this.touchEndAnimataion)
        this.touchEndX = e.changedTouches[0].clientX
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndX - this.touchStartX > this.threshold) {
                this.removeNotification(this.notification)
            } else if (this.touchStartX - this.touchEndX > this.threshold) {
                this.removeNotification(this.notification, true)
            } else {
                this.resetPosition()
            }
        } else {
            if (this.touchEndX > this.touchStartX) {
                this.removeNotification(this.notification)
            } else {
                this.removeNotification(this.notification, true)
            }
        }
    }

    movePopup = () => {
        this.notification.style.transform = `translateX(${this.offset}px)`
    }

    resetPosition = () => {
        this.notification.style.transform = `translateX(0)`
    }

    push = (messageBody, type, pinned) => {
        let notification = document.createElement('div'),
            composition = ``
        notification.classList.add('notification')
        if (pinned)
            notification.classList.add('pinned')
        if (type === 'error') {
            composition += `
    <svg class="notification-icon icon error-icon" viewBox="0 0 64 64">
            <path d="M32,4.73a3.17,3.17,0,0,1,2.76,1.59l13.9,24.09L62.57,54.49a3.19,3.19,0,0,1-2.76,4.78H4.19a3.19,3.19,0,0,1-2.76-4.78L15.34,30.41,29.24,6.32A3.17,3.17,0,0,1,32,4.73m0-1a4.14,4.14,0,0,0-3.62,2.09L14.47,29.91.57,54a4.19,4.19,0,0,0,3.62,6.28H59.81A4.19,4.19,0,0,0,63.43,54L49.53,29.91,35.62,5.82A4.14,4.14,0,0,0,32,3.73Z"/>
            <line x1="32" y1="24" x2="32" y2="36"/>
            <line x1="32" y1="46" x2="32" y2="48"/>
    </svg>`
        } else if (type === 'success') {
            composition += `
        <svg class="notification-icon icon success-icon" viewBox="0 0 64 64">
            <polyline points="0.35 31.82 21.45 52.98 63.65 10.66"/>
        </svg>`
        }
        composition += `
                    <p>${messageBody}</p>
                    <svg class="icon close" viewBox="0 0 64 64">
                        <title>Close</title>
                        <line x1="64" y1="0" x2="0" y2="64"/>
                        <line x1="64" y1="64" x2="0" y2="0"/>
                    </svg>`
        notification.innerHTML = composition
        this.notificationPanel.prepend(notification)
        if (window.innerWidth > 640) {
            notification.animate([{
                    transform: `translateX(1rem)`,
                    opacity: '0'
                },
                {
                    transform: 'translateX(0)',
                    opacity: '1'
                }
            ], this.animationOptions).onfinish = () => {
                notification.setAttribute('style', `transform: none;`);
            }
        } else {
            notification.setAttribute('style', `transform: translateY(0); opacity: 1`)
        }
        notification.addEventListener('touchstart', this.handleTouchStart)
        notification.addEventListener('touchmove', this.handleTouchMove)
        notification.addEventListener('touchend', this.handleTouchEnd)
    }

    removeNotification = (notification, toLeft) => {
        if (!this.offset)
            this.offset = 0;

        if (toLeft)
            notification.animate([{
                    transform: `translateX(${this.offset}px)`,
                    opacity: '1'
                },
                {
                    transform: `translateX(-100%)`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove()
            }
        else {
            notification.animate([{
                    transform: `translateX(${this.offset}px)`,
                    opacity: '1'
                },
                {
                    transform: `translateX(100%)`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove()
            }
        }
    }

    clearAll = () => {
        Array.from(this.notificationPanel.children).forEach(child => {
            this.removeNotification(child)
        })
    }

    connectedCallback() {
        this.notificationPanel = this.shadowRoot.querySelector('.notification-panel')
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: "ease"
        }
        this.fontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
        this.notification
        this.offset
        this.touchStartX = 0
        this.touchEndX = 0
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.threshold = this.notificationPanel.getBoundingClientRect().width * 0.3
        this.touchEndAnimataion;

        this.notificationPanel.addEventListener('click', e => {
            if (e.target.closest('.close'))(
                this.removeNotification(e.target.closest('.notification'))
            )
        })

        const observer = new MutationObserver(mutationList => {
            mutationList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length) {
                        if (!mutation.addedNodes[0].classList.contains('pinned'))
                            setTimeout(() => {
                                this.removeNotification(mutation.addedNodes[0])
                            }, 5000);
                        if (window.innerWidth > 640)
                            this.notificationPanel.style.padding = '1.5rem 0 3rem 1.5rem';
                        else
                            this.notificationPanel.style.padding = '1rem 1rem 2rem 1rem';
                    } else if (mutation.removedNodes.length && !this.notificationPanel.children.length) {
                        this.notificationPanel.style.padding = 0;
                    }
                }
            })
        })
        observer.observe(this.notificationPanel, {
            attributes: true,
            childList: true,
            subtree: true
        })
    }
})



// sm-menu
const smMenu = document.createElement('template')
smMenu.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
.menu{
    display: -ms-grid;
    display: grid;
    place-items: center;
    position: relative;
    height: 2rem;
    width: 2rem;
    outline: none;
}
.icon {
    position: absolute;
    fill: rgba(var(--text-color), 0.7);
    height: 2.4rem;
    width: 2.4rem;
    padding: 0.7rem;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 6;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    border-radius: 2rem;
    -webkit-transition: background 0.3s;
    -o-transition: background 0.3s;
    transition: background 0.3s;
}      
:host{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
.hide{
    opacity: 0;
    pointer-events: none;
    user-select: none;
}
.select{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    cursor: pointer;
    width: 100%;
    -webkit-tap-highlight-color: transparent;
}
.menu:focus .icon,
.focused{
    background: rgba(var(--text-color), 0.1); 
}
:host([align-options="left"]) .options{
    left: 0;
}
:host([align-options="right"]) .options{
    right: 0;
}
.options{
    padding: 0.5rem 0;
    overflow: hidden auto;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-width: -webkit-max-content;
    min-width: -moz-max-content;
    min-width: max-content;
    -webkit-transform: translateY(-1rem);
        -ms-transform: translateY(-1rem);
            transform: translateY(-1rem);
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    background: rgba(var(--foreground-color), 1);
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: opacity 0.3s, -webkit-transform 0.3s;
    -o-transition: opacity 0.3s, transform 0.3s;
    transition: opacity 0.3s, transform 0.3s;
    transition: opacity 0.3s, transform 0.3s, -webkit-transform 0.3s;
    border: solid 1px rgba(var(--text-color), 0.2);
    border-radius: 0.3rem;
    z-index: 2;
    -webkit-box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
            box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
    top: 100%;
    bottom: auto;
}
.moveUp{
    top: auto;
    bottom: 100%;
    -webkit-transform: translateY(3rem);
        -ms-transform: translateY(3rem);
            transform: translateY(3rem);
}
.moveLeft{
    left: auto;
    right: 0;
}
.no-transformations{
    -webkit-transform: none !important;
        -ms-transform: none !important;
            transform: none !important;
}
@media (hover: hover){
    .menu:hover .icon{
        background: rgba(var(--text-color), 0.1); 
    }
}
</style>
<div class="select">
    <div class="menu" tabindex="0">
        <svg class="icon" viewBox="0 0 64 64">
            <title>options</title>
            <circle cx="32" cy="6" r="5.5"/>
            <circle cx="32" cy="58" r="5.5"/>
            <circle cx="32" cy="31.89" r="5.5"/>
        </svg>
    </div>
    <div class="options hide">
        <slot></slot> 
    </div>
</div>`;
customElements.define('sm-menu', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smMenu.content.cloneNode(true))
    }
    static get observedAttributes() {
        return ['value']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }
    expand = () => {
        if (!this.open) {
            this.optionList.classList.remove('hide')
            this.optionList.classList.add('no-transformations')
            this.open = true
            this.icon.classList.add('focused')
            this.availableOptions.forEach(option => {
                option.setAttribute('tabindex', '0')
            })
        }
    }
    collapse() {
        if (this.open) {
            this.open = false
            this.icon.classList.remove('focused')
            this.optionList.classList.add('hide')
            this.optionList.classList.remove('no-transformations')
            this.availableOptions.forEach(option => {
                option.removeAttribute('tabindex')
            })
        }
    }
    connectedCallback() {
        this.availableOptions
        this.containerDimensions
        this.optionList = this.shadowRoot.querySelector('.options')
        let slot = this.shadowRoot.querySelector('.options slot'),
            menu = this.shadowRoot.querySelector('.menu')
        this.icon = this.shadowRoot.querySelector('.icon')
        this.open = false;
        menu.addEventListener('click', e => {
            if (!this.open) {
                this.expand()
            } else {
                this.collapse()
            }
        })
        menu.addEventListener('keydown', e => {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                if (!this.open) {
                    this.expand()
                } else {
                    this.collapse()
                }
            }
        })
        this.optionList.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                }
            }
            if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling)
                    document.activeElement.nextElementSibling.focus()
            }
        })
        this.optionList.addEventListener('click', e => {
            this.collapse()
        })
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            this.containerDimensions = this.optionList.getBoundingClientRect()
        });
        window.addEventListener('mousedown', e => {
            if (!this.contains(e.target) && e.button !== 2) {
                this.collapse()
            }
        })
    }
})

// option
const smMenuOption = document.createElement('template')
smMenuOption.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}     
:host{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.option{
    opacity: 0.9;
    min-width: 100%;
    padding: 0.6rem 2rem;
    cursor: pointer;
    overflow-wrap: break-word;
    white-space: nowrap;
    outline: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    user-select: none;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color), 0.1);
}
@media (hover: hover){
    .option:hover{
        opacity: 1;
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="option">
    <slot></slot> 
</div>`;
customElements.define('sm-menu-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smMenuOption.content.cloneNode(true))
    }

    connectedCallback() {
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.click()
            }
        })
    }
})


// tags input
const tagsInput = document.createElement('template')
tagsInput.innerHTML = `
  <style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  :host{
    --border-radius: 0.3rem;
    }
.hide{
    display: none !important;
}
.tags-wrapper{
    position: relative;
    display: flex;
    cursor: text;
    flex-wrap: wrap;
    justify-items: flex-start;
    align-items: center;
    padding: 0.5rem 0.5rem 0 0.5rem;
    border-radius: var(--border-radius);
    background-color: rgba(var(--text-color), 0.06);
  }
  .tags-wrapper:focus-within{
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset !important;
  }
  
  .tag {
    cursor: pointer;
    user-select: none;
    align-items: center;
    display: inline-flex;
    border-radius: 0.3rem;
    padding: 0.3rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    background-color: rgba(var(--text-color), 0.06);
  }
  
  .icon {
    height: 1.2rem;
    width: 1.2rem;
    margin-left: 0.3rem;
    fill: rgba(var(--text-color), 0.8);
  }
  
  input,
  input:focus {
    outline: none;
    border: none;
  }
  
  input {
    display: inline-flex;
    width: auto;
    color: inherit;
    max-width: inherit;
    font-size: inherit;
    font-family: inherit;
    padding: 0.4rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    background-color: transparent;
  }
  .placeholder{
      position: absolute;
      padding: 0 0.5rem;
      top: 50%;
      font-weight: 500;
      transform: translateY(-50%);
      color: rgba(var(--text-color), 0.6);
  }
  </style>
  <div class="tags-wrapper">
    <input type="text" size="3"/>
    <p class="placeholder"></p>
  </div>
`

customElements.define('tags-input', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: 'open'
		}).append(tagsInput.content.cloneNode(true))
		this.input = this.shadowRoot.querySelector('input')
		this.tagsWrapper = this.shadowRoot.querySelector('.tags-wrapper')
		this.placeholder = this.shadowRoot.querySelector('.placeholder')
        this.observeList = ['placeholder', 'limit']
        this.limit = undefined
        this.tags = new Set()
    }
    static get observedAttributes() {
        return ['placeholder', 'limit']
    }
	get value() {
		return [...this.tags].join()
    }
    reset = () => {
        this.input.value = ''
        this.tags.clear()
        while (this.input.previousElementSibling) {
            this.input.previousElementSibling.remove()
        }
    }
    handleInput = e => {
        const inputValueLength = e.target.value.trim().length
        e.target.setAttribute('size', inputValueLength ? inputValueLength : '3')
        if (inputValueLength) {
            this.placeholder.classList.add('hide')
        }
        else if (!inputValueLength && !this.tags.size) {
            this.placeholder.classList.remove('hide')
        }
	}
    handleKeydown = e => {
		if (e.key === ',' || e.key === '/') {
			e.preventDefault()
		}
		if (e.target.value.trim() !== '') {
            if (e.key === 'Enter' || e.key === ',' || e.key === '/' || e.code === 'Space') {
				const tagValue = e.target.value.trim()
				if (this.tags.has(tagValue)) {
					this.tagsWrapper.querySelector(`[data-value="${tagValue}"]`).animate([
						{
							backgroundColor: 'initial'
						},
						{
							backgroundColor: 'var(--accent-color)'
						},
						{
							backgroundColor: 'initial'
						},
					], {
						duration: 300
					})
				}
				else {
					const tag = document.createElement('span')
					tag.dataset.value = tagValue
					tag.className = 'tag'
					tag.innerHTML = `
                        <span class="tag-text">${tagValue}</span>
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                        `
					this.input.before(tag)
					this.tags.add(tagValue)
				}
                e.target.value = ''
                e.target.setAttribute('size', '3')
                if (this.limit && this.limit < this.tags.size + 1) {
                    this.input.readOnly = true
                    return
                }
			}
		}
		else {
            if (e.key === 'Backspace' && this.input.previousElementSibling) {
                this.removeTag(this.input.previousElementSibling)
			}
            if (this.limit && this.limit > this.tags.size){
                this.input.readOnly = false
            }
		}
	}
	handleClick = e => {
		if (e.target.closest('.tag')) {
			this.removeTag(e.target.closest('.tag'))
		}
		else {
			this.input.focus()
		}
	}
	removeTag = (tag) => {
		this.tags.delete(tag.dataset.value)
        tag.remove()
        if (!this.tags.size) {
            this.placeholder.classList.remove('hide')
        }
	}
    connectedCallback() {
		this.input.addEventListener('input', this.handleInput)
		this.input.addEventListener('keydown', this.handleKeydown)
		this.tagsWrapper.addEventListener('click', this.handleClick)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder') {
            this.placeholder.textContent = newValue
        }
        if (name === 'limit') {
            this.limit = parseInt(newValue)
        }
    }
	disconnectedCallback() {
		this.input.removeEventListener('input', this.handleInput)
		this.input.removeEventListener('keydown', this.handleKeydown)
		this.tagsWrapper.removeEventListener('click', this.handleClick)
	}
})

// file input
const fileInput = document.createElement('template')
fileInput.innerHTML = `
  	<style>
		*{
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host{
			--border-radius: 0.3rem;
			--button-color: inherit;
			--button-font-weight: 500;
			--button-background-color: var(--accent-color);
		}
		.file-input {
			display: flex;
		}
		
		.file-picker {
            display: flex;
			cursor: pointer;
			user-select: none;
            align-items: center;
			padding: 0.5rem 0.8rem;
			color: var(--button-color);
			border-radius: var(--border-radius);
			font-weight: var(--button-font-weigh);
			background-color: var(--button-background-color);
		}
		.files-preview-wrapper{
			display: grid;
			gap: 0.5rem;
			list-style: none;
		}
		.files-preview-wrapper:not(:empty){
            margin-bottom: 1rem;
		}
		.file-preview{
			display: grid;
            gap: 0.5rem;
            align-items: center;
			padding: 0.5rem 0.8rem;
			border-radius: var(--border-radius);
			background-color: rgba(var(--text-color), 0.06)
		}
		.file-name{
		}
        .file-size{
            font-size: 0.8rem;
            font-weight: 400;
            color: rgba(var(--text-color), 0.8);
        }
		input[type=file] {
			display: none;
		}
  	</style>
	<ul class="files-preview-wrapper"></ul>
  	<label tabindex="0" class="file-input">
		<div class="file-picker"><slot>Choose file</slot></div>
		<input type="file">
	</label>
`

customElements.define('file-input', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: 'open'
		}).append(fileInput.content.cloneNode(true))
		this.input = this.shadowRoot.querySelector('input')
		this.fileInput = this.shadowRoot.querySelector('.file-input')
		this.filesPreviewWraper = this.shadowRoot.querySelector('.files-preview-wrapper')
		this.observeList = ['accept', 'multiple', 'capture']
	}
	static get observedAttributes() {
		return ['accept', 'multiple', 'capture']
	}
	get files() {
		return this.input.files
	}
	set accept(val) {
		this.setAttribute('accept', val)
	}
	set multiple(val) {
		if (val) {
			this.setAttribute('mutiple', '')
		}
		else {
			this.removeAttribute('mutiple')
		}
	}
	set capture(val) {
		this.setAttribute('capture', val)
	}
	set value(val) {
		this.input.value = val
    }
    get isValid() {
        return this.input.value !== ''
    }
    reset = () => {
        this.input.value = ''
        this.filesPreviewWraper.innerHTML = ''
    }
    formatBytes = (a,b=2) => {if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}
	createFilePreview = (file) => {
        const filePreview = document.createElement('li')
        const {name, size} = file
		filePreview.className = 'file-preview'
		filePreview.innerHTML = `
			<div class="file-name">${name}</div>
            <h5 class="file-size">${this.formatBytes(size)}</h5>
		`
		return filePreview
	}
	handleChange = (e) => {
		this.filesPreviewWraper.innerHTML = ''
		const frag = document.createDocumentFragment()
		Array.from(e.target.files).forEach(file => {
			frag.append(
				this.createFilePreview(file)
			)
		});
		this.filesPreviewWraper.append(frag)
    }
    handleKeyDown = e => {
        if (e.key === 'Enter' || e.code === 'Space') {
            e.preventDefault()
            this.input.click()
        }
    }
    connectedCallback() {
        this.setAttribute('role', 'button')
        this.setAttribute('aria-label', 'File upload')
        this.input.addEventListener('change', this.handleChange)
        this.fileInput.addEventListener('keydown', this.handleKeyDown)
	}
	attributeChangedCallback(name) {
		if (this.observeList.includes(name)){
            if (this.hasAttribute(name)) {
                this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '')
			}
			else {
                this.input.removeAttribute(name)
			}
		}
	}
	disconnectedCallback() {
        this.input.removeEventListener('change', this.handleChange)
        this.fileInput.removeEventListener('keydown', this.handleKeyDown)
	}
})

// sm-form
const smForm = document.createElement('template')
smForm.innerHTML = `
    <style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :host{
        --gap: 1rem;
        width: 100%;
    }
    form{
        display: grid;
        gap: var(--gap);
        width: 100%;
    }
    </style>
	<form onsubmit="return false">
		<slot></slot>
	</form>
`

customElements.define('sm-form', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: 'open'
		}).append(smForm.content.cloneNode(true))

		this.form = this.shadowRoot.querySelector('form')
		this.formElements
		this.requiredElements
		this.submitButton
		this.resetButton
		this.allRequiredValid = false
	}
	debounce = (callback, wait) => {
		let timeoutId = null;
		return (...args) => {
			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				callback.apply(null, args);
			}, wait);
		};
	}
	handleInput = this.debounce((e) => {
		this.allRequiredValid = this.requiredElements.every(elem => elem.isValid)
		if (!this.submitButton) return;
		if (this.allRequiredValid) {
			this.submitButton.disabled = false;
		}
		else {
			this.submitButton.disabled = true;
		}
	}, 100)
	handleKeydown = this.debounce((e) => {
		if (e.key === 'Enter') {
			if (this.allRequiredValid) {
				this.submitButton.click()
			}
			else {
				// implement show validity logic 
			}
		}
	}, 100)
	reset = () => {
		this.formElements.forEach(elem => elem.reset())
	}
	connectedCallback() {
		const slot = this.shadowRoot.querySelector('slot')
		slot.addEventListener('slotchange', e => {
			this.formElements = [...this.querySelectorAll('sm-input, sm-textarea, sm-checkbox, tags-input, file-input, sm-switch, sm-checkbox')]
			this.requiredElements = this.formElements.filter(elem => elem.hasAttribute('required'))
			this.submitButton = e.target.assignedElements().find(elem => elem.getAttribute('variant') === 'primary' || elem.getAttribute('type') === 'submit');
			this.resetButton = e.target.assignedElements().find(elem => elem.getAttribute('type') === 'reset');
            if (this.resetButton) {
				this.resetButton.addEventListener('click', this.reset)
			}
		})
		this.addEventListener('input', this.handleInput)
		this.addEventListener('keydown', this.handleKeydown)
	}
	disconnectedCallback() {
		this.removeEventListener('input', this.handleInput)
	}
})

// tab-header

const smTabHeader = document.createElement('template')
smTabHeader.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    } 
    :host{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }
    .tabs{
        position: relative;
        display: -ms-grid;
        display: grid;
        width: 100%;
    }
    .tab-header{
        display: -ms-grid;
        display: grid;
        grid-auto-flow: column;
        -webkit-box-pack: start;
            -ms-flex-pack: start;
                justify-content: flex-start;
        gap: 1rem;
        position: relative;
        overflow: auto hidden;
        max-width: 100%;
        scrollbar-width: 0;
    }
    .indicator{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.15rem;
        border-radius: 1rem 1rem 0 0;  
        background: var(--accent-color);
        -webkit-transition: width 0.3s, -webkit-transform 0.3s;
        transition: width 0.3s, -webkit-transform 0.3s;
        -o-transition: transform 0.3s, width 0.3s;
        transition: transform 0.3s, width 0.3s;
        transition: transform 0.3s, width 0.3s, -webkit-transform 0.3s;
        pointer-events: none;
    }
    :host([variant="tab"]) .indicator{
        height: 100%;
        border-radius: 0.3rem;
    }
    :host(.round) .indicator{
        border-radius: 3rem;
    }
    :host([variant="tab"]) .tab-header{
        border-bottom: none; 
    }
    .hide-completely{
        display: none;
    }
    :host([variant="tab"]) .tab-header{
        gap: 0.2rem;
        display: -ms-inline-grid;
        display: inline-grid;
        justify-self: flex-start;
        border-radius: 0.3rem;
    }
    :host([variant="tab"]) slot::slotted(.active){
        color: rgba(var(--foreground-color), 1);
    }
    slot::slotted(.active){
        color: var(--accent-color);
        opacity: 1;
    }
    @media (hover: none){
        .tab-header::-webkit-scrollbar-track {
            -webkit-box-shadow: none !important;
            background-color: transparent !important;
        }
        .tab-header::-webkit-scrollbar {
            height: 0;
            background-color: transparent;
        }
    }         
</style>
<div part="tab-container" class="tabs">
    <div part="tab-header" class="tab-header">
        <slot></slot>
        <div part="indicator" class="indicator"></div>
    </div>
</div>
`;

customElements.define('sm-tab-header', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smTabHeader.content.cloneNode(true))

        this.indicator = this.shadowRoot.querySelector('.indicator');
        this.tabSlot = this.shadowRoot.querySelector('slot');
        this.tabHeader = this.shadowRoot.querySelector('.tab-header');
    }

    sendDetails(element) {
        this.dispatchEvent(
            new CustomEvent("switchtab", {
                bubbles: true,
                detail: {
                    target: this.target,
                    rank: parseInt(element.getAttribute('rank'))
                }
            })
        )
    }

    moveIndiactor(tabDimensions) {
        //if(this.isTab)
        this.indicator.setAttribute('style', `width: ${tabDimensions.width}px; transform: translateX(${tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)
        //else
        //this.indicator.setAttribute('style', `width: calc(${tabDimensions.width}px - 1.6rem); transform: translateX(calc(${ tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px + 0.8rem)`)
    }

    connectedCallback() {
        if (!this.hasAttribute('target') || this.getAttribute('target').value === '') return;
        this.prevTab
        this.allTabs
        this.activeTab
        this.isTab = false
        this.target = this.getAttribute('target')

        if (this.hasAttribute('variant') && this.getAttribute('variant') === 'tab') {
            this.isTab = true
        }

        this.tabSlot.addEventListener('slotchange', () => {
            this.tabSlot.assignedElements().forEach((tab, index) => {
                tab.setAttribute('rank', index)
            })
        })
        this.allTabs = this.tabSlot.assignedElements();

        this.tabSlot.addEventListener('click', e => {
            if (e.target === this.prevTab || !e.target.closest('sm-tab'))
                return
            if (this.prevTab)
                this.prevTab.classList.remove('active')
            e.target.classList.add('active')

            e.target.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            })
            this.moveIndiactor(e.target.getBoundingClientRect())
            this.sendDetails(e.target)
            this.prevTab = e.target;
            this.activeTab = e.target;
        })
        let resizeObserver = new ResizeObserver(entries => {
            entries.forEach((entry) => {
                if (this.prevTab) {
                    let tabDimensions = this.activeTab.getBoundingClientRect();
                    this.moveIndiactor(tabDimensions)
                }
            })
        })
        resizeObserver.observe(this)
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.indicator.style.transition = 'none'
                    if (this.activeTab) {
                        let tabDimensions = this.activeTab.getBoundingClientRect();
                        this.moveIndiactor(tabDimensions)
                    } else {
                        this.allTabs[0].classList.add('active')
                        let tabDimensions = this.allTabs[0].getBoundingClientRect();
                        this.moveIndiactor(tabDimensions)
                        this.sendDetails(this.allTabs[0])
                        this.prevTab = this.tabSlot.assignedElements()[0];
                        this.activeTab = this.prevTab;
                    }
                }
            })
        }, {
            threshold: 1.0
        })
        observer.observe(this)
    }
})

// tab
const smTab = document.createElement('template')
smTab.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    } 
    :host{
        position: relative;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        z-index: 1;
    }
    .tab{
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        white-space: nowrap;
        padding: 0.4rem 0.8rem;
        font-weight: 500;
        word-spacing: 0.1rem;
        text-align: center;
        -webkit-transition: color 0.3s;
        -o-transition: color 0.3s;
        transition: color 0.3s;
        text-transform: capitalize;
        height: 100%;
    }
    @media (hover: hover){
        :host(.active) .tab{
            opacity: 1;
        }
        .tab{
            opacity: 0.7
        }
        .tab:hover{
            opacity: 1
        }
    }
</style>
<div part="tab" class="tab">
<slot></slot>
</div>
`;

customElements.define('sm-tab', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open'
        }).append(smTab.content.cloneNode(true))
    }
})

// tab-panels

const smTabPanels = document.createElement('template')
smTabPanels.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
:host{
    width: 100%;
}
.panel-container{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden auto;
}
slot::slotted(.hide-completely){
    display: none;
}
@media (hover: none){
    .tab-header::-webkit-scrollbar-track {
        -webkit-box-shadow: none !important;
        background-color: transparent !important;
    }
    .tab-header::-webkit-scrollbar {
        height: 0;
        background-color: transparent;
    }
}         
</style>
<div part="panel-container" class="panel-container">
    <slot>Nothing to see here.</slot>
</div>
`;

customElements.define('sm-tab-panels', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smTabPanels.content.cloneNode(true))
        this.panelSlot = this.shadowRoot.querySelector('slot');
    }
    connectedCallback() {

        //animations
        let flyInLeft = [{
                    opacity: 0,
                    transform: 'translateX(-1rem)'
                },
                {
                    opacity: 1,
                    transform: 'none'
                }
            ],
            flyInRight = [{
                    opacity: 0,
                    transform: 'translateX(1rem)'
                },
                {
                    opacity: 1,
                    transform: 'none'
                }
            ],
            flyOutLeft = [{
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(-1rem)'
                }
            ],
            flyOutRight = [{
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(1rem)'
                }
            ],
            animationOptions = {
                duration: 300,
                fill: 'forwards',
                easing: 'ease'
            }
        this.prevPanel
        this.allPanels
        this.previousRank

        this.panelSlot.addEventListener('slotchange', () => {
            this.panelSlot.assignedElements().forEach((panel) => {
                panel.classList.add('hide-completely')
            })
        })
        this.allPanels = this.panelSlot.assignedElements()
        this._targetBodyFlyRight = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInRight, animationOptions)
        }
        this._targetBodyFlyLeft = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInLeft, animationOptions)
        }
        document.addEventListener('switchtab', e => {
            if (e.detail.target !== this.id)
                return

            if (this.prevPanel) {
                let targetBody = this.allPanels[e.detail.rank],
                    currentBody = this.prevPanel;
                if (this.previousRank < e.detail.rank) {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyRight(targetBody)
                    } else if (currentBody && targetBody) {
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyRight(targetBody)
                        }
                    }
                } else {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyLeft(targetBody)
                    } else if (currentBody && targetBody) {
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyLeft(targetBody)
                        }
                    }
                }
            } else {
                this.allPanels[e.detail.rank].classList.remove('hide-completely')
            }
            this.previousRank = e.detail.rank
            this.prevPanel = this.allPanels[e.detail.rank];
        })
    }
})
