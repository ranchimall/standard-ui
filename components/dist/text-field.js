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
    .edit-button{
        display: inline-flex;
        justify-content: center;
        cursor: pointer;
        border: none;
        padding: 0.4rem;
        background-color: rgba(var(--text-color, (17,17,17)), 0.06);
        border-radius: var(--button-border-radius, 0.3rem);
        transition: background-color 0.2s;
        font-family: inherit;
        color: inherit;
        font-size: 0.7rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        margin-left: 0.3rem;
    }
    .edit-button:active{
        background-color: var(--button-background-color);
    }
    :host([editable]){
        border-bottom: 0.15rem solid rgba(var(--text-color), 0.6);
    }
    .hide{
        display: none;
    }
    @media (any-hover: hover){
        .edit-button:hover{
            background-color: var(--button-background-color);
        }
    }
</style>
<div class="text-field">
    <div class="text" part="text"></div>
    <button class="edit-button" part="edit-button">Edit</button>
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
        this.editButton = this.textField.querySelector('.edit-button')
        this.isTextEditable = false
        this.isDisabled = false

        this.setEditable = this.setEditable.bind(this)
        this.setNonEditable = this.setNonEditable.bind(this)
        this.toggleEditable = this.toggleEditable.bind(this)
        this.revert = this.revert.bind(this)
    }

    static get observedAttributes() {
        return ['disable']
    }

    get value() {
        return this.text
    }
    set value(val) {
        this.text = val
        this.textContainer.textContent = val
        this.setAttribute('value', val)
    }
    set disabled(val) {
        this.isDisabled = val
        if (this.isDisabled)
            this.setAttribute('disable', '')
        else
            this.removeAttribute('disable')
    }
    setEditable() {
        if (this.isTextEditable) return
        this.textContainer.contentEditable = true
        this.setAttribute('editable', '')
        this.textContainer.focus()
        document.execCommand('selectAll', false, null);
        this.editButton.textContent = 'Done'
        this.isTextEditable = true
    }
    setNonEditable() {
        if (!this.isTextEditable) return
        this.textContainer.contentEditable = false
        this.removeAttribute('editable')

        if (this.text !== this.textContainer.textContent.trim()) {
            this.setAttribute('value', this.textContainer.textContent)
            this.text = this.textContainer.textContent.trim()
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                cancelable: true,
                composed: true
            }));
        }
        this.editButton.textContent = 'Edit'
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
        if (this.hasAttribute('disable'))
            this.isDisabled = true
        else
            this.isDisabled = false
        if (!this.isDisabled) {
            this.textContainer.addEventListener('dblclick', this.setEditable)
            this.editButton.addEventListener('click', this.toggleEditable)
        }
    }
    attributeChangedCallback(name) {
        if (name === 'disable') {
            if (this.hasAttribute('disable')) {
                this.editButton.classList.add('hide')
                this.textContainer.removeEventListener('dblclick', this.setEditable)
                this.editButton.removeEventListener('click', this.toggleEditable)
                this.revert()
            }
            else {
                this.editButton.classList.remove('hide')
                this.textContainer.addEventListener('dblclick', this.setEditable)
                this.editButton.addEventListener('click', this.toggleEditable)
            }
        }
    }
    disconnectedCallback() {
        this.textContainer.removeEventListener('dblclick', this.setEditable)
        this.editButton.removeEventListener('click', this.toggleEditable)
    }
})