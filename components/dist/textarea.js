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
        --danger-color: red;
        --border-radius: 0.3rem;
        --background: rgba(var(--text-color,(17,17,17)), 0.06);
        --padding: initial;
        --max-height: 8rem;
    }
    :host([variant="outlined"]) .textarea {
        box-shadow: 0 0 0 0.1rem rgba(var(--text-color,(17,17,17)), 0.4) inset;
        background: rgba(var(--background-color,(255,255,255)), 1);
    }
    .textarea{
        display: grid;
        position: relative;
        cursor: text;
        min-width: 0;
        text-align: left;
        grid-template-columns: 1fr;
        align-items: stretch;
        max-height: var(--max-height);
        background: var(--background);
        border-radius: var(--border-radius);
        padding: var(--padding);
        transition: opacity 0.3s, box-shadow 0.2s;
    }
    .textarea::after,
    textarea{
        padding: var(--padding,0.6rem 0.8rem);
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
        overflow: hidden auto;
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
        box-shadow: 0 0 0 0.1rem var(--accent-color,teal) inset;
    }
    .placeholder{
        margin: var(--padding,0.6rem 0.8rem);
        opacity: .7;
        font-weight: inherit;
        font-size: inherit;
        line-height: 1.5;
        pointer-events: none;
        user-select: none;
        grid-area: 2/1;
        align-self: center;
    }
    :host([disabled]) .textarea{
        cursor: not-allowed;
        opacity: 0.6;
    }
    @media (any-hover: hover){
        ::-webkit-scrollbar{
            width: 0.5rem;
            height: 0.5rem;
        }
        
        ::-webkit-scrollbar-thumb{
            background: rgba(var(--text-color,(17,17,17)), 0.3);
            border-radius: 1rem;
            &:hover{
                background: rgba(var(--text-color,(17,17,17)), 0.5);
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
            this.reflectedAttributes = ['disabled', 'required', 'readonly', 'rows', 'minlength', 'maxlength']

            this.reset = this.reset.bind(this)
            this.focusIn = this.focusIn.bind(this)
            this.fireEvent = this.fireEvent.bind(this)
            this.checkInput = this.checkInput.bind(this)
        }
        static get observedAttributes() {
            return ['disabled', 'value', 'placeholder', 'required', 'readonly', 'rows', 'minlength', 'maxlength']
        }
        get value() {
            return this.textarea.value
        }
        set value(val) {
            this.setAttribute('value', val)
            this.fireEvent()
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
        get isValid() {
            return this.textarea.checkValidity()
        }
        reset() {
            this.setAttribute('value', '')
        }
        focusIn() {
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
        checkInput() {
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
            if (this.reflectedAttributes.includes(name)) {
                if (this.hasAttribute(name)) {
                    this.textarea.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '')
                }
                else {
                    this.textContent.removeAttribute(name)
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