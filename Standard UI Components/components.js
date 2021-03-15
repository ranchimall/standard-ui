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
:host([disable]) .button{
    cursor: not-allowed;
    opacity: 0.6;
    background: rgba(var(--text-color), 0.3) !important;
    color: rgba(var(--foreground-color), 0.6);
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
    text-transform: capitalize;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    background: var(--background); 
    -webkit-tap-highlight-color: transparent;
    outline: none;
    overflow: hidden;
    border: none;
    color: inherit;
}
:host(:not([disable])) .button:focus-visible{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color);
}
:host([variant='outlined']) .button:focus-visible{
    -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0 0 0.1rem var(--accent-color);
}
@media (hover: hover){
    :host(:not([disable])) .button:hover{
        -webkit-box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
                box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
    }
    :host([variant='outlined']) .button:hover{
        -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
                box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
    }
}
@media (hover: none){
    :host(:not([disable])) .button:active{
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
                this.setAttribute('disable', '')
                this.button.removeAttribute('tabindex')
            } else if (!value && this.isDisabled) {
                this.isDisabled = false
                this.removeAttribute('disable')
            }
        }

        dispatch() {
            if (this.isDisabled) {
                this.dispatchEvent(new CustomEvent('disable', {
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
            if (this.hasAttribute('disable') && !this.isDisabled)
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
    --font-size: 1rem;
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
    gap: 0.5rem;
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
    width: 100%;
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

        static formAssociated = true;
        
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(smInput.content.cloneNode(true))
        }

        static get observedAttributes() {
            return ['placeholder']
        }

        get value() {
            return this.shadowRoot.querySelector('input').value
        }

        set value(val) {
            this.shadowRoot.querySelector('input').value = val;
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

        get isValid() {
            return this.shadowRoot.querySelector('input').checkValidity()
        }

        get validity() {
            return this.shadowRoot.querySelector('input').validity
        }

        set disabled(value) {
            if (value)
                this.shadowRoot.querySelector('.input').classList.add('disabled')
            else
                this.shadowRoot.querySelector('.input').classList.remove('disabled')
        }
        set readOnly(value) {
            if (value) {
                this.shadowRoot.querySelector('input').setAttribute('readonly', '')
                this.shadowRoot.querySelector('.input').classList.add('readonly')
            } else {
                this.shadowRoot.querySelector('input').removeAttribute('readonly')
                this.shadowRoot.querySelector('.input').classList.remove('readonly')
            }
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
            if (!this.readonly) {                
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
            this.inputParent = this.shadowRoot.querySelector('.input')
            this.clearBtn = this.shadowRoot.querySelector('.clear')
            this.label = this.shadowRoot.querySelector('.label')
            this.feedbackText = this.shadowRoot.querySelector('.feedback-text')
            this.valueChanged = false;
            this.readonly = false
            this.isNumeric = false
            this.min
            this.max
            this.animate = this.hasAttribute('animate')
            this.input = this.shadowRoot.querySelector('input')
            this.shadowRoot.querySelector('.label').textContent = this.getAttribute('placeholder')
            if (this.hasAttribute('value')) {
                this.input.value = this.getAttribute('value')
                this.checkInput()
            }
            if (this.hasAttribute('required')) {
                this.input.setAttribute('required', '')
            }
            if (this.hasAttribute('min')) {
                let minValue = this.getAttribute('min')
                this.input.setAttribute('min', minValue)
                this.min = parseInt(minValue)
            }
            if (this.hasAttribute('max')) {
                let maxValue = this.getAttribute('max')
                this.input.setAttribute('max', maxValue)
                this.max = parseInt(maxValue)
            }
            if (this.hasAttribute('minlength')) {
                const minValue = this.getAttribute('minlength')
                this.input.setAttribute('minlength', minValue)
            }
            if (this.hasAttribute('maxlength')) {
                const maxValue = this.getAttribute('maxlength')
                this.input.setAttribute('maxlength', maxValue)
            }
            if (this.hasAttribute('step')) {
                const steps = this.getAttribute('step')
                this.input.setAttribute('step', steps)
            }
            if (this.hasAttribute('pattern')) {
                this.input.setAttribute('pattern', this.getAttribute('pattern'))
            }
            if (this.hasAttribute('readonly')) {
                this.input.setAttribute('readonly', '')
                this.readonly = true
            }
            if (this.hasAttribute('disabled')) {
                this.inputParent.classList.add('disabled')
            }
            if (this.hasAttribute('error-text')) {
                this.feedbackText.textContent = this.getAttribute('error-text')
            }
            if (this.hasAttribute('type')) {
                if (this.getAttribute('type') === 'number') {
                    this.input.setAttribute('inputmode', 'numeric')
                    this.input.setAttribute('type', 'number')
                    this.isNumeric = true
                } else
                    this.input.setAttribute('type', this.getAttribute('type'))
            } else
                this.input.setAttribute('type', 'text')
            this.input.addEventListener('input', e => {
                this.checkInput(e)
            })
            this.clearBtn.addEventListener('click', e => {
                this.value = ''
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (name === 'placeholder') {
                    this.shadowRoot.querySelector('.label').textContent = newValue;
                    this.setAttribute('aria-label', newValue);
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
    --border-radius: 0.3s;
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
        }
        get value() {
            return this.textarea.value
        }
        set value(val) {
            this.textarea.value = val;
            this.textareaBox.dataset.value = val
            this.checkInput()
            this.fireEvent()
        }
        focusIn = () => {
            this.textarea.focus()
        }
        fireEvent() {
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
            this.textareaBox = this.shadowRoot.querySelector('.textarea')
            this.placeholder = this.shadowRoot.querySelector('.placeholder')

            if(this.hasAttribute('placeholder'))
                this.placeholder.textContent = this.getAttribute('placeholder')

            if (this.hasAttribute('value')) {
                this.textarea.value = this.getAttribute('value')
                this.checkInput()
            }
            if (this.hasAttribute('required')) {
                this.textarea.setAttribute('required', '')
            }
            if (this.hasAttribute('readonly')) {
                this.textarea.setAttribute('readonly', '')
            }
            if (this.hasAttribute('rows')) {
                this.textarea.setAttribute('rows', this.getAttribute('rows'))
            }
            this.textarea.addEventListener('input', e => {
                this.textareaBox.dataset.value = this.textarea.value
                this.checkInput()
            })
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
    .disabled {
        opacity: 0.6;
        pointer-events: none;
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
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        this.setAttribute('disabled', val)
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
                    this.checkbox.classList.add('disabled')
                    this.isDisabled = true
                } else {
                    this.checkbox.classList.remove('disabled')
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
    :host(:not([disable])) label:focus-visible{
        -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color);
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
    .disabled {
        opacity: 0.6;
        pointer-events: none;
    }
</style>
<label tabindex="0">
    <slot name="left"></slot>
    <div part="switch" class="switch">
        <input type="checkbox">
        <div class="track"></div>
        <div class="button"></div>
    </div>
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

    get disabled() {
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        if (val) {
            this.disabled = true
            this.setAttribute('disabled', '')
            this.switch.classList.add('disabled')
        } else {
            this.disabled = false
            this.removeAttribute('disabled')
            this.switch.classList.remove('disabled')

        }
    }

    get checked() {
        return this.isChecked
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
            this.isChecked = true
            this.input.checked = true
        } else {
            this.removeAttribute('checked')
            this.isChecked = false
            this.input.checked = false
        }
    }

    dispatch = () => {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true
        }))
    }

    connectedCallback() {
        if (this.hasAttribute('disabled'))
            this.switch.classList.add('disabled')
        if (this.hasAttribute('checked'))
            this.input.checked = true
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
}
.hide{
    opacity: 0;
    pointer-events: none;
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
    min-width: 100%;
    background: rgba(var(--foreground-color), 1);
    -webkit-transition: opacity 0.3s, top 0.3s;
    -o-transition: opacity 0.3s, top 0.3s;
    transition: opacity 0.3s, top 0.3s;
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

    collapse() {
        this.optionList.animate(this.slideUp, this.animationOptions)
        this.optionList.classList.add('hide')
        this.chevron.classList.remove('rotate')
        this.open = false
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
                    transform: `translateY(-0.5rem)`
                },
                {
                    transform: `translateY(0)`
                }
            ],
            this.slideUp = [{
                    transform: `translateY(0)`
                },
                {
                    transform: `translateY(-0.5rem)`
                }
            ],
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

// select
const smStripSelect = document.createElement('template')
smStripSelect.innerHTML = `
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
.icon {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    fill: none;
    height: 2.6rem;
    width: 2.6rem;
    padding: 0.9rem;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 10;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: pointer;
    min-width: 0;
    z-index: 1;
    background: rgba(var(--foreground-color), 1);
    -webkit-tap-highlight-color: transparent;
    -webkit-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s; 
}
.hide{
    pointer-events: none;
    opacity: 0;
}
.select-container{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.select{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 0.5rem;
    max-width: 100%;
    overflow: auto hidden;
}
.previous-item{
    left: 0;
}
.next-item{
    right: 0;
}
.left,.right{
    position: absolute;
    width: 1rem;
    height: 100%; 
    -webkit-transition: opacity 0.3s; 
    -o-transition: opacity 0.3s; 
    transition: opacity 0.3s;
    z-index: 1;
}
.left{
    background: -webkit-gradient(linear, right top, left top, from(transparent), to(rgba(var(--foreground-color), 1)));
    background: -o-linear-gradient(right, transparent, rgba(var(--foreground-color), 1));
    background: linear-gradient(to left, transparent, rgba(var(--foreground-color), 1))
}
.right{
    right: 0;
    background: -webkit-gradient(linear, left top, right top, from(transparent), to(rgba(var(--foreground-color), 1)));
    background: -o-linear-gradient(left, transparent, rgba(var(--foreground-color), 1));
    background: linear-gradient(to right, transparent, rgba(var(--foreground-color), 1))
}
slot::slotted(.active){
    border-radius: 2rem;
    opacity: 1;
    background-color: rgba(var(--text-color), .6);  
    color: rgba(var(--foreground-color), 1);
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
    .icon{
        display: none;
    }
    .left,.right{
        display: block;
    }
}
@media (hover: hover){
    .select{
        overflow: hidden;
    }
    .left,.right{
        display: none;
    }
}
</style>
<div class="select-container">
    <div class="left hide"></div>
    <svg class="icon previous-item hide" viewBox="4 0 64 64">
        <title>Previous</title>
        <polyline points="48.01 0.35 16.35 32 48.01 63.65"/>
    </svg>
    <div class="select">
        <slot></slot> 
    </div>
    <svg class="icon next-item hide" viewBox="-6 0 64 64">
        <title>Next</title>
        <polyline points="15.99 0.35 47.65 32 15.99 63.65"/>
    </svg>
    <div class="right hide"></div>
</div>`;
customElements.define('sm-strip-select', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smStripSelect.content.cloneNode(true))
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
    scrollLeft = () => {
        this.select.scrollBy({
            top: 0,
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.select.scrollBy({
            top: 0,
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }
    connectedCallback() {
        let previousOption,
            slot = this.shadowRoot.querySelector('slot');
        this.selectContainer = this.shadowRoot.querySelector('.select-container')
        this.select = this.shadowRoot.querySelector('.select')
        this.nextArrow = this.shadowRoot.querySelector('.next-item')
        this.previousArrow = this.shadowRoot.querySelector('.previous-item')
        this.nextGradient = this.shadowRoot.querySelector('.right')
        this.previousGradient = this.shadowRoot.querySelector('.left')
        this.selectOptions
        this.scrollDistance = this.selectContainer.getBoundingClientRect().width
        const firstElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.previousArrow.classList.add('hide')
                this.previousGradient.classList.add('hide')
            } else {
                this.previousArrow.classList.remove('hide')
                this.previousGradient.classList.remove('hide')
            }
        }, {
            root: this.selectContainer,
            threshold: 0.95
        })
        const lastElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.nextArrow.classList.add('hide')
                this.nextGradient.classList.add('hide')
            } else {
                this.nextArrow.classList.remove('hide')
                this.nextGradient.classList.remove('hide')
            }
        }, {
            root: this.selectContainer,
            threshold: 0.95
        })

        const selectObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.scrollDistance = this.selectContainer.getBoundingClientRect().width
            }
        })

        selectObserver.observe(this.selectContainer)
        this.addEventListener('optionSelected', e => {
            if (previousOption === e.target) return;
            if (previousOption)
                previousOption.classList.remove('active')
            e.target.classList.add('active')
            e.target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            })
            this.setAttribute('value', e.detail.value)
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true
            }))
            previousOption = e.target;
        })
        slot.addEventListener('slotchange', e => {
            this.selectOptions = slot.assignedElements()
            firstElementObserver.observe(this.selectOptions[0])
            lastElementObserver.observe(this.selectOptions[this.selectOptions.length - 1])
            if (this.selectOptions[0]) {
                let firstElement = this.selectOptions[0];
                this.setAttribute('value', firstElement.getAttribute('value'))
                firstElement.classList.add('active')
                previousOption = firstElement;
            }
        });
        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
    }
})

// option
const smStripOption = document.createElement('template')
smStripOption.innerHTML = `
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
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    overflow-wrap: break-word;
    white-space: nowrap;
    outline: none;
    border-radius: 2rem;
    text-transform: capitalize;
    border: solid 1px rgba(var(--text-color), .3);
    opacity: 0.9;
}
.option:focus{
    background: rgba(var(--text-color), 0.1);
}

@media (hover: hover){
    .option{
        -webkit-transition: background 0.3s;
        -o-transition: background 0.3s;
        transition: background 0.3s;
    }
    .option:hover{
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="option" tabindex="0">
    <slot></slot> 
</div>`;
customElements.define('sm-strip-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smStripOption.content.cloneNode(true))
    }
    sendDetails() {
        let optionSelected = new CustomEvent('optionSelected', {
            bubbles: true,
            composed: true,
            detail: {
                text: this.textContent,
                value: this.getAttribute('value')
            }
        })
        this.dispatchEvent(optionSelected)
    }

    connectedCallback() {
        this.addEventListener('click', e => {
            this.sendDetails()
        })
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.sendDetails(false)
            }
        })
        if (this.hasAttribute('default')) {
            setTimeout(() => {
                this.sendDetails()
            }, 0);
        }
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
    --min-width: auto;
    --body-padding: 1.5rem;
    --border-radius: 0.8rem 0.8rem 0 0;
}
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
.popup-container{
    display: -ms-grid;
    display: grid;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    place-items: center;
    background: rgba(0, 0, 0, 0.6);
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
    max-height: 90vh;
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
        height: auto;
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
}
.icon {
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    fill: none;
    height: 2.6rem;
    width: 2.6rem;
    border-radius: 3rem;
    padding: 0.9rem;
    stroke: rgba(var(--foreground-color), 0.8);
    stroke-width: 14;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: pointer;
    min-width: 0;
    background: rgba(var(--text-color), 1);
    -webkit-box-shadow: 0 0.2rem 0.2rem #00000020, 
                0 0.5rem 1rem #00000040;
            box-shadow: 0 0.2rem 0.2rem #00000020, 
                0 0.5rem 1rem #00000040; 
    -webkit-tap-highlight-color: transparent;
    -webkit-transform: scale(0);
        -ms-transform: scale(0);
            transform: scale(0);
    z-index: 1;
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
.previous-item{
    left: 1rem;
}
.next-item{
    right: 1rem;
}
.carousel-container{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
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
    bottom: -1rem;
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
}
.dot.active{
    -webkit-transform: scale(1.5);
        -ms-transform: scale(1.5);
            transform: scale(1.5);
    background: var(--accent-color);
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
.icon{
    display: none;
}
.left,.right{
    display: block;
}
}
</style>
<div class="carousel-container">
    <svg class="icon previous-item" viewBox="4 0 64 64">
        <title>Previous</title>
        <polyline points="48.01 0.35 16.35 32 48.01 63.65"/>
    </svg>
    <div part="carousel" class="carousel">
        <slot></slot>
    </div>
    <svg class="icon next-item" viewBox="-6 0 64 64">
        <title>Next</title>
        <polyline points="15.99 0.35 47.65 32 15.99 63.65"/>
    </svg>
    <div class="indicators"></div>
</div>
`;

customElements.define('sm-carousel', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smCarousel.content.cloneNode(true))
    }

    static get observedAttributes() {
        return ['indicator']
    }

    scrollLeft = () => {
        this.carousel.scrollBy({
            top: 0,
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.carousel.scrollBy({
            top: 0,
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }

    connectedCallback() {
        this.carousel = this.shadowRoot.querySelector('.carousel')
        this.carouselContainer = this.shadowRoot.querySelector('.carousel-container')
        this.carouselSlot = this.shadowRoot.querySelector('slot')
        this.nextArrow = this.shadowRoot.querySelector('.next-item')
        this.previousArrow = this.shadowRoot.querySelector('.previous-item')
        this.indicatorsContainer = this.shadowRoot.querySelector('.indicators')
        this.carouselItems
        this.indicators
        this.showIndicator = false
        this.scrollDistance = this.carouselContainer.getBoundingClientRect().width / 3
        let frag = document.createDocumentFragment();
        if (this.hasAttribute('indicator'))
            this.showIndicator = true


        let firstVisible = false,
            lastVisible = false
        const allElementsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (this.showIndicator)
                    if (entry.isIntersecting) {
                        this.indicators[parseInt(entry.target.attributes.rank.textContent)].classList.add('active')
                    }
                else
                    this.indicators[parseInt(entry.target.attributes.rank.textContent)].classList.remove('active')
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
                    frag.append(dot)
                    item.setAttribute('rank', index)
                })
                this.indicatorsContainer.append(frag)
                this.indicators = this.indicatorsContainer.children
            }
        })

        this.addEventListener('keyup', e => {
            if (e.code === 'ArrowLeft')
                this.scrollRight()
            else
                this.scrollRight()
        })

        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'indicator') {
            if (this.hasAttribute('indicator'))
                this.showIndicator = true
            else
                this.showIndicator = false
        }
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
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


const slidingSection = document.createElement('template')
slidingSection.innerHTML = `
<style>
*{
    margin: 0;
    padding: 0;
    box-sizzing: border-box;
}
:host{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    width: 100%;
}
.section{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    max-width: 100%;
    overflow: hidden auto;
    -ms-scroll-snap-type: mandatory x;
        scroll-snap-type: mandatory x;
}

</style>
<section class="section">
    <slot></slot>
</section>
`

customElements.define('sm-sliding-section', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(slidingSection.content.cloneNode(true))
    }
    connectedCallback() {

    }
})

const section = document.createElement('template')
section.innerHTML = `
<style>
*{
    margin: 0;
    padding: 0;
    box-sizzing: border-box;
}
:host{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.section{
    min-width: 100%;
    scroll-snap-align: start;
}
</style>
<section class="section">
    <slot></slot>
</section>
`

customElements.define('sm-section', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(section.content.cloneNode(true))
    }
})

const textField = document.createElement('template')
textField.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 
    .text-field{
        display: flex;
        align-items: center;
    }
    .text{
        padding: 0.6rem 0;
        transition: background-color 0.3s;
        border-bottom: 0.15rem solid transparent;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;
        word-break: break-word;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
    }
    .text:focus{
        outline: none;
        border-bottom: 0.15rem solid var(--accent-color);
    }
    .text:focus-visible{
        outline: none;
        background: solid rgba(var(--text-color), 0.06);
    }
    .editable{
        border-bottom: 0.15rem solid rgba(var(--text-color), 0.6);
    }
    .icon-container{
        position: relative;
        margin-left: 0.8rem;
        height: 1.8rem;
        width: 1.8rem;
    }
    .icon{
        position: absolute;
        cursor: pointer;
        fill: rgba(var(--text-color), 0.7);
        height: 1.8rem;
        width: 1.8rem;
        padding: 0.2rem;
    }
    .save-button{
        padding: 0;
    }
    .hide{
        display: none;
    }
</style>
<div class="text-field">
    <div class="text" part="text"></div>
    <div class="icon-container">
        <svg class="edit-button icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Edit</title>
            <path fill="none" d="M0 0h24v24H0z"/><path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"/>
        </svg>
        <svg class="save-button icon hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Save</title>
            <path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/>
        </svg>
    </div>
</div>
`

customElements.define('text-field', class extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({
            mode: 'open'
        }).append(textField.content.cloneNode(true))

        this.textField = this.shadowRoot.querySelector('.text-field')
        this.textContainer = this.textField.children[0]
        this.iconsContainer = this.textField.children[1]
        this.editButton = this.textField.querySelector('.edit-button')
        this.saveButton = this.textField.querySelector('.save-button')
        this.isTextEditable = false
        this.isDisabled = false
    }

    static get observedAttributes(){
        return ['disable']
    }

    get value(){
        return this.text
    }
    set value(val) {
        this.text = val
        this.textContainer.textContent = val
        this.setAttribute('value', val)
    }
    set disabled(val) {
        this.isDisabled = val
        if(this.isDisabled)
            this.setAttribute('disable', '')
        else
            this.removeAttribute('disable')
    }
    fireEvent = (value) => {
        let event = new CustomEvent('contentchanged', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                value
            }
        });
        this.dispatchEvent(event);
    }
    
    setEditable = () => {
        if(this.isTextEditable) return
        this.textContainer.contentEditable = true
        this.textContainer.classList.add('editable')
        this.textContainer.focus()
        document.execCommand('selectAll', false, null);
        this.editButton.animate(this.rotateOut, this.animOptions).onfinish = () => {
            this.editButton.classList.add('hide')
        }
        setTimeout(() => {
            this.saveButton.classList.remove('hide')
            this.saveButton.animate(this.rotateIn, this.animOptions)
        }, 100);
        this.isTextEditable = true
    }
    setNonEditable = () => {   
        if (!this.isTextEditable) return
        this.textContainer.contentEditable = false
        this.textContainer.classList.remove('editable')
        
        if (this.text !== this.textContainer.textContent.trim()) {
            this.setAttribute('value', this.textContainer.textContent)
            this.text = this.textContainer.textContent.trim()
            this.fireEvent(this.text)
        }
        this.saveButton.animate(this.rotateOut, this.animOptions).onfinish = () => {
            this.saveButton.classList.add('hide')
        }
        setTimeout(() => {
            this.editButton.classList.remove('hide')
            this.editButton.animate(this.rotateIn, this.animOptions)
        }, 100);
        this.isTextEditable = false
    }

    revert = () => {
        if (this.textContainer.isContentEditable) {
            this.value = this.text
            this.setNonEditable()
        }
    }

    connectedCallback(){
        this.text
        if (this.hasAttribute('value')) {
            this.text = this.getAttribute('value')
            this.textContainer.textContent = this.text
        }
        if(this.hasAttribute('disable'))
            this.isDisabled = true
        else
            this.isDisabled = false
        
        this.rotateOut = [
            {
                transform: 'rotate(0)',
                opacity: 1
            },
            {
                transform: 'rotate(90deg)',
                opacity: 0
            },
        ]
        this.rotateIn = [
            {
                transform: 'rotate(-90deg)',
                opacity: 0
            },
            {
                transform: 'rotate(0)',
                opacity: 1
            },
        ]
        this.animOptions = {
            duration: 300,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fill: 'forwards'
        }
        if (!this.isDisabled) {
            this.iconsContainer.classList.remove('hide')
            this.textContainer.addEventListener('dblclick', this.setEditable)
            this.editButton.addEventListener('click', this.setEditable)
            this.saveButton.addEventListener('click', this.setNonEditable)
        }
    }
    attributeChangedCallback(name) {
        if (name === 'disable') {
            if (this.hasAttribute('disable')) {
                this.iconsContainer.classList.add('hide')
                this.textContainer.removeEventListener('dblclick', this.setEditable)
                this.editButton.removeEventListener('click', this.setEditable)
                this.saveButton.removeEventListener('click', this.setNonEditable)
                this.revert()
            }
            else {
                this.iconsContainer.classList.remove('hide')
                this.textContainer.addEventListener('dblclick', this.setEditable)
                this.editButton.addEventListener('click', this.setEditable)
                this.saveButton.addEventListener('click', this.setNonEditable)
            }
        }
    }
    disconnectedCallback() {
        this.textContainer.removeEventListener('dblclick', this.setEditable)
        this.editButton.removeEventListener('click', this.setEditable)
        this.saveButton.removeEventListener('click', this.setNonEditable)
    }
})

//Color Grid
const colorGrid = document.createElement('template');
colorGrid.innerHTML =`
<style>
    *{
        padding:0;
        margin:0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }
    :host{
        display: flex;
    }
    .color-tile-container{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .color-tile{
        position: relative;
        cursor: pointer;
        display: flex;
        height: 3rem;
        width: 3rem;
        border-radius: 0.5rem;
    }
    .color-tile input[type="radio"]{
        display: none;
    }
    .border{
        position: absolute;
        z-index: 1;
        border-radius: 0.5rem;
        box-shadow: 0 0 0 0.5rem rgba(var(--text-color), 0.8) inset;
        display: none;
        height: 100%;
        width: 100%;
    }
    .color-tile input[type="radio"]:checked ~ .border{
        display: flex;
    }

</style>
<div class="color-tile-container">
</div>`;

customElements.define('color-grid',
class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(colorGrid.content.cloneNode(true))

        this.colorArray = []
        this.container = this.shadowRoot.querySelector('.color-tile-container')
    }

    set colors(arr) {
        this.colorArray = arr
        this.renderTiles()
    }

    set selectedColor(color) {
        if (this.colorArray.includes(color) && this.container.querySelector(`[data-color="${color}"]`)) {
            this.container.querySelector(`[data-color="${color}"] input`).checked = true
        }
    }

    randString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    renderTiles() {
        this.container.innerHTML = ''
        const frag = document.createDocumentFragment()
        const groupName = this.randString(6)
        this.colorArray.forEach(color => {
            const label = document.createElement('label')
            label.classList.add('color-tile')
            label.setAttribute('data-color', color)
            if(color.includes('--'))
                label.setAttribute('style', `background-color: var(${color})`)
            else
                label.setAttribute('style', `background-color: ${color}`)
            label.innerHTML = `
                <input type="radio" name="${groupName}">
                <div class="border"></div>
                `
            frag.append(label)
        })
        this.container.append(frag)
    }
    
    handleChange(e) {
        const clickedTile = e.target.closest('.color-tile')
        const clickedTileColor = clickedTile.dataset.color
        const tileSelected = new CustomEvent('colorselected', {
            bubbles: true,
            composed: true,
            detail: {
                value: clickedTileColor,
            }
        })
        this.dispatchEvent(tileSelected)
    }

    connectedCallback() {
        this.container.addEventListener('change', this.handleChange)
    }

    disconnectedCallback() {
        this.container.removeEventListener('change', this.handleChange)
    }
})

const pinInput = document.createElement('template');
pinInput.innerHTML = `

<style>
		*{
		padding:0;
		margin:0;
		-webkit-box-sizing: border-box;
					box-sizing: border-box;
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
			--border-radius: 0.5rem;
			--pin-length: 4;
		}
		.component{
			display: flex;
			align-items: center;
		}
		.pin-container{
			display: grid;
			grid-template-columns: repeat(var(--pin-length), 3rem);
			width: auto;
			gap: 0.5rem;
		}
		input{
			width: 100%;
			display: flex;
			padding: 0.8rem 0.6rem;
			border: none;
			font-size: 1.5rem;
			text-align: center;
			color: rgba(var(--text-color), 1);
			background: rgba(var(--text-color), 0.1);
			border-radius: var(--border-radius);
		}
		
		input:valid{
			background-color: transparent;
		}
		input:focus,
		button:focus{
			outline: none;
			box-shadow: 0 0 0 0.2rem var(--accent-color) inset;
		}
		button{
            display: flex;
            align-items: center;
			background: none;
			border: none;
			cursor: pointer;
            color: inherit;
            font-family: inherit;
            margin: 0 1rem;
		}
		svg{
			margin: 0 0.5rem 0 0;
			height: 1.5rem;
			width: 1.5rem;
			fill: rgba(var(--text-color), 1);
		}
</style>
<div class="component">
	<div class="pin-container"></div>
	<button>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="9.95"/><path d="M32,12.28C11.7,12.28,0,32,0,32S11.7,51.72,32,51.72,64,32,64,32,52.3,12.28,32,12.28Zm0,33.35A13.63,13.63,0,1,1,45.63,32,13.64,13.64,0,0,1,32,45.63Z"/></svg>
        Show
    </button>
</div>
`;

customElements.define('pin-input',

	class extends HTMLElement {
		constructor() {
			super()
			this.attachShadow({
				mode: 'open'
			}).append(pinInput.content.cloneNode(true))

			this.pinDigits = 4

			this.arrayOfInput = [];
			this.container = this.shadowRoot.querySelector('.pin-container');
			this.toggleButton = this.shadowRoot.querySelector('button')
		}

        set value(val) {
			this.arrayOfInput.forEach((input, index) => input.value = val[index] ? val[index] : '')
        }
        
		get value() {
			return this.getValue()
		}

		set pinLength(val) {
			this.pinDigits = val
			this.setAttribute('pin-length', val)
			this.style.setProperty('--pin-length', val)
			this.render()
        }

        get isValid(){
            return this.arrayOfInput.every(input => input.value.trim().length)
        }
        
        clear = () => {
            this.value = ''
        }
        
        focusIn = () => {
            this.arrayOfInput[0].focus();
        }

		getValue = () => {
			return this.arrayOfInput.reduce((acc, val) => {
				return acc += val.value
			}, '')
		}

		render = () => {
			this.container.innerHTML = ''
			const frag = document.createDocumentFragment();

			for (let i = 0; i < this.pinDigits; i++) {
				const inputBox = document.createElement('input')
				inputBox.setAttribute('type', 'password')
				inputBox.setAttribute('inputmode', 'numeric')
				inputBox.setAttribute('maxlength', '1')
				inputBox.setAttribute('required', '')
				this.arrayOfInput.push(inputBox);
				frag.append(inputBox);
			}
			this.container.append(frag);
		}

		handleKeydown = (e) => {
            const activeInput = e.target.closest('input')
			if (/[0-9]/.test(e.key)) {
                if (activeInput.value.trim().length > 2) {
                    e.preventDefault();
				}
				else {
                    if (activeInput.value.trim().length === 1) {
                        activeInput.value = e.key
                    }
					if (activeInput.nextElementSibling) {
						setTimeout(() => {
							activeInput.nextElementSibling.focus();
						}, 0)
					}
				}
			}
			else if (e.key === "Backspace") {
				if(activeInput.previousElementSibling)
					setTimeout(() => {
						activeInput.previousElementSibling.focus();
					}, 0)
			}
			else if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
				e.preventDefault();
			}
		}
		
		handleInput = () => {			
			if (this.isValid) {
				this.fireEvent(this.getValue())
			}
		}

		fireEvent = (value) => {
			let event = new CustomEvent('pincomplete', {
				bubbles: true,
				cancelable: true,
				composed: true,
				detail: {
					value
				}
			});
			this.dispatchEvent(event);
		}

		toggleVisiblity = () => {
			if (this.arrayOfInput[0].getAttribute('type') === 'password') {
				this.toggleButton.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22.05,31.44a10.12,10.12,0,0,0,.1,1.36L33.36,21.59a10.12,10.12,0,0,0-1.36-.1A10,10,0,0,0,22.05,31.44Z"/><path d="M19.11,35.84A13.6,13.6,0,0,1,36.4,18.55l5.28-5.27A31,31,0,0,0,32,11.72c-20.3,0-32,19.72-32,19.72A48.48,48.48,0,0,0,11.27,43.69Z"/><path d="M52.73,19.2l6.14-6.14L54.63,8.81l-7,7h0l-6,6h0L39,24.41h0l-7,7L20.09,43.35,16.4,47h0l-7,7,4.25,4.24,8.71-8.71A31.15,31.15,0,0,0,32,51.16c20.3,0,32-19.72,32-19.72A48.54,48.54,0,0,0,52.73,19.2ZM32,45.07a13.63,13.63,0,0,1-4.4-.74l3-3a10.12,10.12,0,0,0,1.36.1,10,10,0,0,0,10-9.95,10.12,10.12,0,0,0-.1-1.36l3-3A13.6,13.6,0,0,1,32,45.07Z"/></svg>
                    Hide    
                    `
                    this.arrayOfInput.forEach(input => input.setAttribute('type', 'text'))
                }
                else {
                    this.toggleButton.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="9.95"/><path d="M32,12.28C11.7,12.28,0,32,0,32S11.7,51.72,32,51.72,64,32,64,32,52.3,12.28,32,12.28Zm0,33.35A13.63,13.63,0,1,1,45.63,32,13.64,13.64,0,0,1,32,45.63Z"/></svg>
                    Show
                `
				this.arrayOfInput.forEach(input => input.setAttribute('type', 'password'))
				
			}
		}

		connectedCallback() {
			if (this.hasAttribute('pin-length')) {
				const pinLength = parseInt(this.getAttribute('pin-length'))
				this.pinDigits = pinLength
				this.style.setProperty('--pin-length', pinLength)
			}

			this.render()

			this.toggleButton.addEventListener('click', this.toggleVisiblity)
			
			this.container.addEventListener('input', this.handleInput);
			this.container.addEventListener('keydown', this.handleKeydown);
		}
		disconnectedCallback() {
			this.toggleButton.removeEventListener('click', this.toggleVisiblity)

			this.container.removeEventListener('input', this.handleInput);
			this.container.removeEventListener('keydown', this.handleKeydown);
		}
	})
