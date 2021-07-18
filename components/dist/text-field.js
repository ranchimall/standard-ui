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
        margin-left: 0.5rem;
        height: 1.8rem;
        width: 1.8rem;
    }
    :host([disabled]) .icon-container{
        display: none;
    }
    .icon{
        position: absolute;
        cursor: pointer;
        height: 2rem;
        width: 2rem;
        padding: 0.3rem;
        fill: rgba(var(--text-color), 1);
    }
    .hide{
        display: none;
    }
</style>
<div class="text-field">
    <div class="text" part="text"></div>
    <div tabindex="0" class="icon-container">
        <svg class="edit-button icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <title>Edit</title>
            <path fill="none" d="M0 0h24v24H0z"/><path d="M12.9 6.858l4.242 4.243L7.242 21H3v-4.243l9.9-9.9zm1.414-1.414l2.121-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"/>
        </svg>
        <svg class="save-button icon hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
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

        this.fireEvent = this.fireEvent.bind(this)
        this.setEditable = this.setEditable.bind(this)
        this.setNonEditable = this.setNonEditable.bind(this)
        this.revert = this.revert.bind(this)
    }

    static get observedAttributes(){
        return ['disabled']
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
            this.setAttribute('disabled', '')
        else
            this.removeAttribute('disabled')
    }
    fireEvent(value){
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
    
    setEditable(){
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
    setNonEditable(){   
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

    revert(){
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
        if (name === 'disabled') {
            if (this.hasAttribute('disabled')) {
                this.textContainer.removeEventListener('dblclick', this.setEditable)
                this.editButton.removeEventListener('click', this.setEditable)
                this.saveButton.removeEventListener('click', this.setNonEditable)
                this.revert()
            }
            else {
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