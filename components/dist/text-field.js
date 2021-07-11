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
        margin-left: 0.5rem;
        height: 1.8rem;
        width: 1.8rem;
    }
    .icon{
        position: absolute;
        cursor: pointer;
        fill: none;
        stroke-width: 8;
        stroke: rgba(var(--text-color), 1);
        height: 1.8rem;
        width: 1.8rem;
        padding: 0.4rem;
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
    }
    .hide{
        display: none;
    }
</style>
<div class="text-field">
    <div class="text" part="text"></div>
    <div class="icon-container">
        <svg class="edit-button icon" viewBox="0 0 64 64">
            <title>Edit</title>
            <path d="M46.73,14.81l7,7,7.65-7.6A7.15,7.15,0,0,0,61.39,4L60.11,2.77a7.23,7.23,0,0,0-10.19,0L3.87,48.57a5,5,0,0,0-1.39,2.6L.53,61.27a1.74,1.74,0,0,0,2,2l10.15-1.94A5.06,5.06,0,0,0,15.34,60L49.6,25.9"/>
        </svg>
        <svg class="save-button icon hide" viewBox="0 0 64 64">
            <title>Save</title>
            <polyline points="0.35 31.82 21.45 52.98 63.65 10.66"/>
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
    fireEvent(value){
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