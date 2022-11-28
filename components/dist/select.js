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
    border-radius: var(--select-border-radius,0.5rem);
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
    height: 100%;
}
.selection:focus{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color, teal) inset;
            box-shadow: 0 0 0 0.1rem var(--accent-color, teal) inset; 
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
    border-radius: var(--options-border-radius, 0.5rem);
    z-index: 1;
    box-shadow: 0 1rem 1.5rem rgba(0 0 0 /0.2);
}
:host([isUnder]) .options{
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 0.2rem;
    box-shadow: 0 -1rem 1.5rem rgba(0 0 0 /0.2);
}
:host([open]) .icon--expand{
    display: none;
}
:host([open]) .icon--collapse{
    display: block;
}
.icon--expand{
    display: block;
}
.icon--collapse{
    display: none;
}
.hidden{
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
        <svg class="icon icon--expand" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/></svg>
        <svg class="icon icon--collapse" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M24 0v24H0V0h24z" fill="none" opacity=".87"/><path d="M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z"/></svg>
    </div>
    <div part="options" class="options hidden">
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
        this.debounce = this.debounce.bind(this)

        this.availableOptions = []
        this.previousOption
        this.isOpen = false;
        this.label = ''
        this.defaultSelected = ''
        this.isUnderViewport = false
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
        const selectedOption = this.shadowRoot.querySelector('slot').assignedElements().find(option => option.getAttribute('value') === val)
        if (selectedOption) {
            this.setAttribute('value', val)
            this.selectOption(selectedOption)
        } else {
            console.warn(`There is no option with ${val} as value`)
        }
    }
    debounce(callback, wait) {
        let timeoutId = null;
        return (...args) => {
            window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                callback.apply(null, args);
            }, wait);
        };
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
        if (this.previousOption !== selectedOption) {
            this.querySelectorAll('[selected]').forEach(option => option.removeAttribute('selected'))
            this.selectedOptionText.textContent = `${this.label}${selectedOption.textContent}`;
            selectedOption.setAttribute('selected', '')
            this.previousOption = selectedOption
        }
    }

    focusIn() {
        this.selection.focus()
    }

    open() {
        this.availableOptions.forEach(option => option.setAttribute('tabindex', 0))
        this.optionList.classList.remove('hidden')
        this.isUnderViewport = this.getBoundingClientRect().bottom + this.optionList.getBoundingClientRect().height > window.innerHeight;
        if (this.isUnderViewport) {
            this.setAttribute('isUnder', '')
        } else {
            this.removeAttribute('isUnder')
        }
        this.optionList.animate([
            {
                transform: `translateY(${this.isUnderViewport ? '' : '-'}0.5rem)`,
                opacity: 0
            },
            {
                transform: `translateY(0)`,
                opacity: 1
            }
        ], this.animationOptions)
        this.setAttribute('open', '');
        this.style.zIndex = 1000;
        (this.availableOptions.find(option => option.hasAttribute('selected')) || this.availableOptions[0]).focus()
        document.addEventListener('mousedown', this.handleClickOutside)
        this.isOpen = true
    }
    collapse() {
        this.removeAttribute('open')
        this.optionList.animate([
            {
                transform: `translateY(0)`,
                opacity: 1
            },
            {
                transform: `translateY(${this.isUnderViewport ? '' : '-'}0.5rem)`,
                opacity: 0
            },
        ], this.animationOptions)
            .onfinish = () => {
                this.availableOptions.forEach(option => option.removeAttribute('tabindex'))
                document.removeEventListener('mousedown', this.handleClickOutside)
                this.optionList.classList.add('hidden')
                this.isOpen = false
                this.style.zIndex = 'auto';
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
        } else if (e.key === 'ArrowDown') {
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
                e.preventDefault();
                (this.availableOptions.find(option => option.hasAttribute('selected')) || this.availableOptions[0]).focus()
                this.handleOptionSelection(e)
            } else if (e.key === ' ') {
                e.preventDefault()
                this.toggle()
            }
        } else {
            this.handleOptionsNavigation(e)
            this.handleOptionSelection(e)
            if (['Enter', ' ', 'Escape', 'Tab'].includes(e.key)) {
                e.preventDefault()
                this.collapse()
                this.focusIn()
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
        slot.addEventListener('slotchange', this.debounce(e => {
            this.availableOptions = slot.assignedElements()
            this.reset(false)
            this.defaultSelected = this.value
        }, 100));
        new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const offsetLeft = this.selection.getBoundingClientRect().left
                    if (offsetLeft < window.innerWidth / 2) {
                        this.setAttribute('align-select', 'left')
                    } else {
                        this.setAttribute('align-select', 'right')
                    }
                }
            })
        }).observe(this)
        this.addEventListener('click', this.handleClick)
        this.addEventListener('keydown', this.handleKeydown)
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick)
        this.removeEventListener('click', this.toggle)
        this.removeEventListener('keydown', this.handleKeydown)
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
    overflow: hidden;
    border-radius: var(--border-radius, 0.3rem);
}
.option{
    position: relative;
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
}
.option::before{
    position: absolute;
    content: '';
    display: block;
    width: 0.2rem;
    height: 1em;
    border-radius: 0 1em 1em 0;
    background: rgba(var(--text-color,(17,17,17)), 0.5);
    transition: all 0.2s ease-in-out;
    opacity: 0;
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color,(17,17,17)), 0.1);
}
:host(:focus) .option::before{
    opacity: 1
}
:host([selected]) .option::before{
    opacity: 1;
    background: var(--accent-color, teal);
}
@media (hover: hover){
    .option:hover{
        background: rgba(var(--text-color,(17,17,17)), 0.1);
    }
    :host(:not([selected]):hover) .option::before{
        opacity: 1
    }
}
</style>
<div class="option">
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
    }
})