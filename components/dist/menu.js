const smMenu = document.createElement('template')
smMenu.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
.menu{
    display: -ms-grid;
    display: grid;
    place-items: center;
    position: relative;
    height: 2rem;
    width: 2rem;
    outline: none;
}
.icon {
    position: absolute;
    fill: rgba(var(--text-color), 0.7);
    height: 2.4rem;
    width: 2.4rem;
    padding: 0.7rem;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 6;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    border-radius: 2rem;
    -webkit-transition: background 0.3s;
    -o-transition: background 0.3s;
    transition: background 0.3s;
}      
:host{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
}
.hide{
    opacity: 0;
    pointer-events: none;
    user-select: none;
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
.menu:focus .icon,
.focused{
    background: rgba(var(--text-color), 0.1); 
}
:host([align-options="left"]) .options{
    left: 0;
}
:host([align-options="right"]) .options{
    right: 0;
}
.options{
    padding: 0.5rem 0;
    overflow: hidden auto;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-width: -webkit-max-content;
    min-width: -moz-max-content;
    min-width: max-content;
    -webkit-transform: translateY(-1rem);
        -ms-transform: translateY(-1rem);
            transform: translateY(-1rem);
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    background: rgba(var(--foreground-color), 1);
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    transition: opacity 0.3s, -webkit-transform 0.3s;
    -o-transition: opacity 0.3s, transform 0.3s;
    transition: opacity 0.3s, transform 0.3s;
    transition: opacity 0.3s, transform 0.3s, -webkit-transform 0.3s;
    border: solid 1px rgba(var(--text-color), 0.2);
    border-radius: 0.3rem;
    z-index: 2;
    -webkit-box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
            box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
    top: 100%;
    bottom: auto;
}
.moveUp{
    top: auto;
    bottom: 100%;
    -webkit-transform: translateY(3rem);
        -ms-transform: translateY(3rem);
            transform: translateY(3rem);
}
.moveLeft{
    left: auto;
    right: 0;
}
.no-transformations{
    -webkit-transform: none !important;
        -ms-transform: none !important;
            transform: none !important;
}
@media (hover: hover){
    .menu:hover .icon{
        background: rgba(var(--text-color), 0.1); 
    }
}
</style>
<div class="select">
    <div class="menu" tabindex="0">
        <svg class="icon" viewBox="0 0 64 64">
            <title>options</title>
            <circle cx="32" cy="6" r="5.5"/>
            <circle cx="32" cy="58" r="5.5"/>
            <circle cx="32" cy="31.89" r="5.5"/>
        </svg>
    </div>
    <div class="options hide">
        <slot></slot> 
    </div>
</div>`;
customElements.define('sm-menu', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smMenu.content.cloneNode(true))
        this.expand = this.expand.bind(this)
    }
    static get observedAttributes() {
        return ['value']
    }
    get value() {
        return this.getAttribute('value')
    }
    set value(val) {
        this.setAttribute('value', val)
    }
    expand(){
        if (!this.open) {
            this.optionList.classList.remove('hide')
            this.optionList.classList.add('no-transformations')
            this.open = true
            this.icon.classList.add('focused')
            this.availableOptions.forEach(option => {
                option.setAttribute('tabindex', '0')
            })
        }
    }
    collapse() {
        if (this.open) {
            this.open = false
            this.icon.classList.remove('focused')
            this.optionList.classList.add('hide')
            this.optionList.classList.remove('no-transformations')
            this.availableOptions.forEach(option => {
                option.removeAttribute('tabindex')
            })
        }
    }
    connectedCallback() {
        this.availableOptions
        this.containerDimensions
        this.optionList = this.shadowRoot.querySelector('.options')
        let slot = this.shadowRoot.querySelector('.options slot'),
            menu = this.shadowRoot.querySelector('.menu')
        this.icon = this.shadowRoot.querySelector('.icon')
        this.open = false;

        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            this.containerDimensions = this.optionList.getBoundingClientRect()
        });
        menu.addEventListener('click', e => {
            if (!this.open) {
                this.expand()
            } else {
                this.collapse()
            }
        })
        menu.addEventListener('keydown', e => {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                if (!this.open) {
                    this.expand()
                } else {
                    this.collapse()
                }
            }
        })
        this.optionList.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                } else {
                    this.availableOptions[this.availableOptions.length - 1].focus()
                }
            }
            if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling) {
                    document.activeElement.nextElementSibling.focus()
                } else{
                    this.availableOptions[0].focus()
                }
            }
        })
        this.optionList.addEventListener('click', e => {
            this.collapse()
        })
        window.addEventListener('mousedown', e => {
            if (!this.contains(e.target) && e.button !== 2) {
                this.collapse()
            }
        })
    }
})

// option
const smMenuOption = document.createElement('template')
smMenuOption.innerHTML = `
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
    opacity: 0.9;
    min-width: 100%;
    padding: 0.6rem 2rem;
    cursor: pointer;
    overflow-wrap: break-word;
    white-space: nowrap;
    outline: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    user-select: none;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color), 0.1);
}
@media (hover: hover){
    .option:hover{
        opacity: 1;
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="option">
    <slot></slot> 
</div>`;
customElements.define('sm-menu-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smMenuOption.content.cloneNode(true))
    }

    connectedCallback() {
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.click()
            }
        })
    }
})