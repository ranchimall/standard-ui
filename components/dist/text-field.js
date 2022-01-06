const textField = document.createElement('template')
textField.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :host{
        --accent-color: #4d2588;
        --text-color: 17, 17, 17;
        --background-color: 255, 255, 255;
    }
    .text-field{
        display: flex;
        align-items: center;
    }
    .text{
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
    .edit-button{
        display: grid;
        position: relative;
        margin-left: 0.5rem;
        background-color: transparent;
        border: none;
    }
    :host([disabled]) .edit-button{
        display: none;
    }
    .icon{
        grid-area: 1/-1;
        cursor: pointer;
        height: 1.2rem;
        width: 1.2rem;
        fill: rgba(var(--text-color), 1);
    }
    .hide{
        visibility: hidden;
    }
</style>
<div class="text-field">
    <div class="text" part="text"></div>
    <button class="edit-button">
        <svg class="icon" title="edit" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        <svg class="icon hide" title="Save" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
    </button>
</div>
`

customElements.define('text-field', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(textField.content.cloneNode(true))

        this.textField = this.shadowRoot.querySelector('.text-field')
        this.textContainer = this.textField.children[0]
        this.iconsContainer = this.textField.children[1]
        this.editButton = this.textField.querySelector('.edit-button')
        this.isTextEditable = false
        this.isDisabled = false

        this.fireEvent = this.fireEvent.bind(this)
        this.setEditable = this.setEditable.bind(this)
        this.setNonEditable = this.setNonEditable.bind(this)
        this.toggleEditable = this.toggleEditable.bind(this)
        this.revert = this.revert.bind(this)
    }

    static get observedAttributes() {
        return ['disabled', 'value']
    }

    get value() {
        return this.text
    }
    set value(val) {
        this.setAttribute('value', val)
    }
    set disabled(val) {
        this.isDisabled = val
        if (this.isDisabled)
            this.setAttribute('disabled', '')
        else
            this.removeAttribute('disabled')
    }
    fireEvent(value) {
        let event = new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                value
            }
        });
        this.dispatchEvent(event);
    }

    setEditable() {
        if (this.isTextEditable) return
        this.textContainer.contentEditable = true
        this.textContainer.classList.add('editable')
        this.textContainer.focus()
        document.execCommand('selectAll', false, null);
        this.editButton.children[0].animate(this.rotateOut, this.animOptions).onfinish = () => {
            this.editButton.children[0].classList.add('hide')
        }
        setTimeout(() => {
            this.editButton.children[1].classList.remove('hide')
            this.editButton.children[1].animate(this.rotateIn, this.animOptions)
        }, 100);
        this.isTextEditable = true
    }
    setNonEditable() {
        if (!this.isTextEditable) return
        this.textContainer.contentEditable = false
        this.textContainer.classList.remove('editable')
        const newValue = this.textContainer.textContent.trim()
        if (this.text !== newValue && newValue !== '') {
            this.setAttribute('value', this.textContainer.textContent)
            this.text = this.textContainer.textContent.trim()
            this.fireEvent(this.text)
        } else {
            this.value = this.text
        }
        this.editButton.children[1].animate(this.rotateOut, this.animOptions).onfinish = () => {
            this.editButton.children[1].classList.add('hide')
        }
        setTimeout(() => {
            this.editButton.children[0].classList.remove('hide')
            this.editButton.children[0].animate(this.rotateIn, this.animOptions)
        }, 100);
        this.isTextEditable = false
    }
    toggleEditable() {
        if (this.isTextEditable)
            this.setNonEditable()
        else
            this.setEditable()
    }

    revert() {
        if (this.textContainer.isContentEditable) {
            this.value = this.text
            this.setNonEditable()
        }
    }

    connectedCallback() {
        this.text
        if (this.hasAttribute('value')) {
            this.text = this.getAttribute('value')
            this.textContainer.textContent = this.text
        }
        if (this.hasAttribute('disabled'))
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
            this.editButton.addEventListener('click', this.toggleEditable)
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'disabled') {
            if (this.hasAttribute('disabled')) {
                this.textContainer.removeEventListener('dblclick', this.setEditable)
                this.editButton.removeEventListener('click', this.toggleEditable)
                this.revert()
            }
            else {
                this.textContainer.addEventListener('dblclick', this.setEditable)
                this.editButton.addEventListener('click', this.toggleEditable)
            }
        } else if (name === 'value') {
            this.text = newValue
            this.textContainer.textContent = newValue
        }
    }
    disconnectedCallback() {
        this.textContainer.removeEventListener('dblclick', this.setEditable)
        this.editButton.removeEventListener('click', this.toggleEditable)
    }
})