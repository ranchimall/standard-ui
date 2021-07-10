const smRadio = document.createElement('template')
smRadio.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }  
    :host{
        --gap: 0.5rem;
        --height: 1.4rem;
    }
    :host([disabled]) {
        opacity: 0.6;
        user-select: none;
        pointer-events: none;
    }
    .hide{
        display: none !important;
    }
    .radio{
        display: flex;
        cursor: pointer;
    }
    .radio__button{
        position: relative;
        height: var(--height);
        width: var(--height);
        overflow: visible;
        padding: 0.1rem;
    }
    .outer-disc{
        fill: none;
        stroke-width: 3;
        stroke: rgba(var(--text-color), 0.7);
    }
    .inner-disc{
        fill: var(--accent-color);
        transition: transform 0.3s;
        transform: scale(0);
        transform-origin: center;
    }
    :host([checked]) .outer-disc{
        stroke: var(--accent-color);
    }
    :host([checked]) .inner-disc{
        transform: scale(1);
    }

    @media (any-hover: hover){
    }
</style>
<div class="radio">
    <slot name="left"></slot>
    <svg class="radio__button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="outer-disc" cx="12" cy="12" r="11"/><circle class="inner-disc" cx="12" cy="12" r="6"/></svg>
    <slot></slot>
</div>
`
window.customElements.define('sm-radio', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(smRadio.content.cloneNode(true))

        this.radio = this.shadowRoot.querySelector('.radio');

        this.reset = this.reset.bind(this)
        this.dispatchChangeEvent = this.dispatchChangeEvent.bind(this)
        this.dispatchGroupEvent = this.dispatchGroupEvent.bind(this)
        this.handleKeyup = this.handleKeyup.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleRadioGroup = this.handleRadioGroup.bind(this)

        this.options = {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value,
            }
        }
    }
    static get observedAttributes() {
        return ['value', 'disabled', 'checked']
    }

    get disabled() {
        return this.hasAttribute('disabled')
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }

    get checked() {
        return this.hasAttribute('checked')
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
        this.setAttribute('value', val)
    }

    get value() {
        return this.getAttribute('value')
    }

    reset() {
        this.removeAttribute('checked')
    }

    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', this.options))
    }
    dispatchGroupEvent() {
        if (this.hasAttribute('name') && this.getAttribute('name').trim() !== '') {
            this.dispatchEvent(new CustomEvent(`changed${this.getAttribute('name')}`, this.options))
        }
    }
    handleKeyup(e){
        if (e.code === "Space") {
            this.handleClick()
        }
    }
    handleClick() {
        if (!this.hasAttribute('checked')) {
            this.setAttribute('checked', '')
            this.dispatchGroupEvent()
        }
        
    }
    handleRadioGroup(e) {
        if (e.detail.value !== this.getAttribute('value')) {
            this.reset()
        }
    }

    connectedCallback() {
        if (!this.hasAttribute('disabled')) {
            this.setAttribute('tabindex', '0')
        }
        this.setAttribute('role', 'radio')
        if (!this.hasAttribute('checked')) {
            this.setAttribute('aria-checked', 'false')
        }
        this.addEventListener('keyup', this.handleKeyup)
        this.addEventListener('click', this.handleClick)
        if (this.hasAttribute('name') && this.getAttribute('name').trim() !== '') {
            document.addEventListener(`changed${this.getAttribute('name')}`, this.handleRadioGroup)
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'checked') {
                this.dispatchChangeEvent()
            }
            else if (name === 'disabled') {
                if (this.hasAttribute('disabled')) {
                    this.removeAttribute('tabindex')
                }
                else {
                    this.setAttribute('tabindex', '0')
                }
            }
        }
    }
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup)
        this.removeEventListener('change', this.handleClick)
    }
});