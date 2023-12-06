const smSwitch = document.createElement('template')
smSwitch.innerHTML = `	
<style>
    *{
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    :host{
        display: inline-flex;
    }
    :host(:active) .thumb{
        box-shadow: 0 0.1rem 0.4rem #00000060, 0 0 0 0.2rem white inset;
    }
    label{
        display: flex;
        align-items: center;
        width: 100%;
        outline: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
    }
    .switch {
        position: relative;
        display: flex;
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
        transition: background 0.3s;
        background: rgba(var(--text-color,inherit), 0.4);
        box-shadow: 0 0.1rem 0.3rem #00000040 inset;
        border-radius: 1rem;
    }
    
    label:focus-visible .thumb::after{
        opacity: 1;
    }
    
    .thumb::after{
        content: '';
        display: flex;
        position: absolute;
        height: 2.6rem;
        width: 2.6rem;
        background: rgba(var(--text-color,inherit), 0.2);
        border-radius: 2rem;
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .thumb {
        position: relative;
        display: inline-flex;
        height: 1rem;
        width: 1rem;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        box-shadow: 0 0.1rem 0.4rem #00000060, 0 0 0 0.2rem white inset;
        transition: 0.3s ease;
        background-color: inherit;
    }
    
    input:checked ~ .thumb {
        transform: translateX(100%);
    }
    
    input:checked ~ .track {
        background: var(--accent-color, teal);
    }
</style>
<label tabindex="0">
    <slot name="left"></slot>
    <div part="switch" class="switch">
        <input type="checkbox">
        <div class="track"></div>
        <div class="thumb"></div>
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
    get value() {
        return this.isChecked
    }

    reset() {

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
        this.addEventListener('keydown', e => {
            if (e.key === ' ' && !this.isDisabled) {
                e.preventDefault()
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
                    this.inert = true
                } else {
                    this.disabled = false
                    this.inert = false
                }
            }
            else if (name === 'checked') {
                if (this.hasAttribute('checked')) {
                    this.isChecked = true
                    this.input.checked = true
                } else {
                    this.isChecked = false
                    this.input.checked = false
                }
            }
        }
    }

})