const smSelect = document.createElement('template')
smSelect.innerHTML = `
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
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --max-height: auto;
    --min-width: 100%;
}
:host([disabled]) .select{
    opacity: 0.6;
    cursor: not-allowed;
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
.icon {
    height: 1.5rem;
    width: 1.5rem;
    fill: rgba(var(--text-color), 0.7);
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
    margin-top: 0.2rem; 
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
    background: rgba(var(--background-color), 1);
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
    <div class="selection">
        <div class="option-text"></div>
        <svg class="icon toggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
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

        this.reset = this.reset.bind(this)
        this.open = this.open.bind(this)
        this.collapse = this.collapse.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleSelectKeyDown = this.handleSelectKeyDown.bind(this)
        this.handleOptionsKeyDown = this.handleOptionsKeyDown.bind(this)
        this.handleOptionsKeyDown = this.handleOptionsKeyDown.bind(this)
        this.handleOptionSelected = this.handleOptionSelected.bind(this)

        this.availableOptions
        this.optionList = this.shadowRoot.querySelector('.options')
        this.chevron = this.shadowRoot.querySelector('.toggle')
        this.selection = this.shadowRoot.querySelector('.selection'),
            this.previousOption
        this.isOpen = false;
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
    }
    static get observedAttributes() {
        return ['value', 'disabled']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }

    reset() {

    }

    open() {
        this.optionList.classList.remove('hide')
        this.optionList.animate(this.slideDown, this.animationOptions)
        this.chevron.classList.add('rotate')
        this.isOpen = true
    }
    collapse() {
        this.chevron.classList.remove('rotate')
        this.optionList.animate(this.slideUp, this.animationOptions)
            .onfinish = () => {
                this.optionList.classList.add('hide')
                this.isOpen = false
            }
    }
    toggle() {
        if (!this.isOpen && !this.hasAttribute('disabled')) {
            this.open()
        } else {
            this.collapse()
        }
    }
    handleSelectKeyDown(e) {
        if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
            e.preventDefault()
            this.availableOptions[0].focus()
        }
        else if (e.code === 'Enter' || e.code === 'Space') {
            if (!this.isOpen) {
                this.optionList.classList.remove('hide')
                this.optionList.animate(this.slideDown, this.animationOptions)
                this.chevron.classList.add('rotate')
                this.isOpen = true
            } else {
                this.collapse()
            }
        }
    }
    handleOptionsKeyDown(e) {
        if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
            e.preventDefault()
            if (document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus()
            } else {
                this.availableOptions[this.availableOptions.length - 1].focus()
            }
        }
        else if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
            e.preventDefault()
            if (document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus()
            } else {
                this.availableOptions[0].focus()
            }
        }
    }
    handleOptionSelected(e) {
        if (this.previousOption !== e.target) {
            this.setAttribute('value', e.detail.value)
            this.shadowRoot.querySelector('.option-text').textContent = e.detail.text;
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true,
                detail: {
                    value: e.detail.value
                }
            }))
            if (this.previousOption) {
                this.previousOption.classList.remove('check-selected')
            }
            this.previousOption = e.target;
        }
        if (!e.detail.switching)
            this.collapse()

        e.target.classList.add('check-selected')
    }
    connectedCallback() {
        this.setAttribute('role', 'listbox')
        if (!this.hasAttribute('disabled')) {
            this.selection.setAttribute('tabindex', '0')
        }
        let slot = this.shadowRoot.querySelector('slot')
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            if (this.availableOptions[0]) {
                let firstElement = this.availableOptions[0];
                this.previousOption = firstElement;
                firstElement.classList.add('check-selected')
                this.setAttribute('value', firstElement.getAttribute('value'))
                this.shadowRoot.querySelector('.option-text').textContent = firstElement.textContent
                this.availableOptions.forEach((element, index) => {
                    element.setAttribute('tabindex', "0");
                })
            }
        });
        this.selection.addEventListener('click', this.toggle)
        this.selection.addEventListener('keydown', this.handleSelectKeyDown)
        this.optionList.addEventListener('keydown', this.handleOptionsKeyDown)
        this.addEventListener('optionSelected', this.handleOptionSelected)
        document.addEventListener('mousedown', e => {
            if (this.isOpen && !this.contains(e.target)) {
                this.collapse()
            }
        })
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "disabled") {
            if (this.hasAttribute('disabled')) {
                this.selection.removeAttribute('tabindex')
            }else {
                this.selection.setAttribute('tabindex', '0')
            }
        }
    }
    disconnectedCallback() {
        this.selection.removeEventListener('click', this.toggle)
        this.selection.removeEventListener('keydown', this.handleSelectKeyDown)
        this.optionList.removeEventListener('keydown', this.handleOptionsKeyDown)
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

        this.sendDetails = this.sendDetails.bind(this)
    }

    sendDetails(switching) {
        let optionSelected = new CustomEvent('optionSelected', {
            bubbles: true,
            composed: true,
            detail: {
                text: this.textContent,
                value: this.getAttribute('value'),
                switching
            }
        })
        this.dispatchEvent(optionSelected)
    }

    connectedCallback() {
        this.setAttribute('role', 'option')
        let validKey = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ]
        this.addEventListener('click', this.sendDetails(false))
        this.addEventListener('keydown', e => {
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
