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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
:host([disabled]) .select{
    opacity: 0.6;
    cursor: not-allowed;
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
    height: 1.2rem;
    width: 1.2rem;
    margin-left: 0.5rem;
    fill: rgba(var(--text-color, (17,17,17)), 0.7);
}      
.selected-option-text{
    font-size: inherit;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
}
.selection{
    border-radius: 0.3rem;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 1fr auto;
    grid-template-columns: 1fr auto;
        grid-template-areas: 'heading heading' '. .';
    padding: var(--padding,0.6rem 0.8rem);
    background: var(--background, rgba(var(--text-color,(17,17,17)), 0.06));
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    outline: none;
    z-index: 2;
}
.selection:focus{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color, teal);
            box-shadow: 0 0 0 0.1rem var(--accent-color, teal) 
}
:host([align-select="left"]) .options{
    left: 0;
}
:host([align-select="right"]) .options{
    right: 0;
}
.options{
    top: 100%;
    padding: var(--options-padding, 0.3rem);
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
    width: var(--options-width, 100%);
    min-width: var(--min-width, auto);
    max-height: var(--max-height, auto);
    background: rgba(var(--foreground-color,(255,255,255)), 1);
    border: solid 1px rgba(var(--text-color,(17,17,17)), 0.2);
    border-radius: var(--border-radius, 0.5rem);
    z-index: 1;
    -webkit-box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
            box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
}
:host([open]) .toggle-icon{
    -webkit-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
            transform: rotate(180deg)
}
.hide{
    display: none;
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
<div class="select">
    <div class="selection">
        <div class="selected-option-text"></div>
        <svg class="icon toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
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

        this.focusIn = this.focusIn.bind(this)
        this.reset = this.reset.bind(this)
        this.open = this.open.bind(this)
        this.collapse = this.collapse.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleOptionsNavigation = this.handleOptionsNavigation.bind(this)
        this.handleOptionSelection = this.handleOptionSelection.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.selectOption = this.selectOption.bind(this)

        this.availableOptions
        this.previousOption
        this._value = undefined;
        this.isOpen = false;
        this.label = ''
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

        this.optionList = this.shadowRoot.querySelector('.options')
        this.selection = this.shadowRoot.querySelector('.selection')
        this.selectedOptionText = this.shadowRoot.querySelector('.selected-option-text')
    }
    static get observedAttributes() {
        return ['disabled', 'label']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        const selectedOption = this.availableOptions.find(option => option.getAttribute('value') === val)
        if (selectedOption) {
            this.setAttribute('value', val)
            this.selectOption(selectedOption)
        } else {
            console.warn(`There is no option with ${val} as value`)
        }
    }

    reset(fire = true) {
        if (this.availableOptions[0] && this.previousOption !== this.availableOptions[0]) {
            const selectedOption = this.availableOptions.find(option => option.hasAttribute('selected')) || this.availableOptions[0];
            this.value = selectedOption.getAttribute('value')
            if (fire) {
                this.fireEvent()
            }
        }
    }
    selectOption(selectedOption) {
        if (this.previousOption) {
            this.previousOption.classList.remove('check-selected')
            this.previousOption.removeAttribute('selected')
        }
        if (this.previousOption !== selectedOption) {
            selectedOption.classList.add('check-selected')
            selectedOption.setAttribute('selected', '')
            this.selectedOptionText.textContent = `${this.label}${selectedOption.textContent}`;
            this.previousOption = selectedOption
        }
    }

    focusIn() {
        this.selection.focus()
    }

    open() {
        this.optionList.classList.remove('hide')
        this.optionList.animate(this.slideDown, this.animationOptions)
        this.setAttribute('open', '')
        this.isOpen = true
    }
    collapse() {
        this.removeAttribute('open')
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

    fireEvent() {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.value
            }
        }))
    }

    handleOptionsNavigation(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus()
            } else {
                this.availableOptions[this.availableOptions.length - 1].focus()
            }
        }
        else if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus()
            } else {
                this.availableOptions[0].focus()
            }
        }
    }
    handleOptionSelection(e) {
        if (this.previousOption !== document.activeElement) {
            this.value = document.activeElement.getAttribute('value')
            this.fireEvent()
        }
    }
    handleClick(e) {
        if (e.target === this) {
            this.toggle()
        }
        else {
            this.handleOptionSelection()
            this.collapse()
        }
    }
    handleKeydown(e) {
        if (e.target === this) {
            if (this.isOpen && e.key === 'ArrowDown') {
                e.preventDefault()
                this.availableOptions[0].focus()
                this.handleOptionSelection(e)
            }
            else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                this.toggle()
            }
        }
        else {
            this.handleOptionsNavigation(e)
            this.handleOptionSelection(e)
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                this.collapse()
            }
        }
    }
    handleClickOutside(e) {
        if (this.isOpen && !this.contains(e.target)) {
            this.collapse()
        }
    }
    connectedCallback() {
        this.setAttribute('role', 'listbox')
        if (!this.hasAttribute('disabled')) {
            this.selection.setAttribute('tabindex', '0')
        }
        let slot = this.shadowRoot.querySelector('slot')
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            this.availableOptions.forEach(elem => {
                if (elem.hasAttribute('selected')) {
                    this._value = elem.value;
                }
            });
            this.reset(false)
        });
        this.addEventListener('click', this.handleClick)
        this.addEventListener('keydown', this.handleKeydown)
        document.addEventListener('mousedown', this.handleClickOutside)
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.toggle)
        this.removeEventListener('keydown', this.handleKeydown)
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
    attributeChangedCallback(name) {
        if (name === "disabled") {
            if (this.hasAttribute('disabled')) {
                this.selection.removeAttribute('tabindex')
            } else {
                this.selection.setAttribute('tabindex', '0')
            }
        } else if (name === 'label') {
            this.label = this.hasAttribute('label') ? `${this.getAttribute('label')} ` : ''
        }
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
    display: grid;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    width: 100%;
    gap: 0.5rem;
    grid-template-columns: max-content minmax(0, 1fr);
    padding: var(--padding, 0.6rem 1rem);
    cursor: pointer;
    outline: none;
    user-select: none;
    border-radius: var(--border-radius, 0.3rem);
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color,(17,17,17)), 0.1);
}
.icon {
    opacity: 0;
    height: 1.2rem;
    width: 1.2rem;
    fill: rgba(var(--text-color,(17,17,17)), 0.8);
}
:host(:focus) .option .icon{
    opacity: 0.4
}
:host(.check-selected) .icon{
    opacity: 1
}
@media (hover: hover){
    .option:hover{
        background: rgba(var(--text-color,(17,17,17)), 0.1);
    }
    :host(:not(.check-selected):hover) .icon{
        opacity: 0.4
    }
}
</style>
<div class="option">
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>
    <slot></slot> 
</div>`;
customElements.define('sm-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smOption.content.cloneNode(true))
    }

    connectedCallback() {
        this.setAttribute('role', 'option')
        this.setAttribute('tabindex', '0')
    }
})