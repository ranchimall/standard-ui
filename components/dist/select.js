const smSelect = document.createElement('template')
smSelect.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
.icon {
    fill: none;
    height: 0.8rem;
    width: 0.8rem;
    stroke: rgba(var(--text-color), 0.7);
    stroke-width: 6;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
}      
:host{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    --max-height: auto;
    --min-width: 100%;
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
    margin-top: 0.5rem; 
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
    background: rgba(var(--foreground-color), 1);
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
    <div class="selection" tabindex="0">
        <div class="option-text"></div>
        <svg class="icon toggle" viewBox="0 0 64 64">
            <polyline points="63.65 15.99 32 47.66 0.35 15.99"/>
        </svg>
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

    reset(){

    }

    collapse() {
        this.chevron.classList.remove('rotate')
        this.optionList.animate(this.slideUp, this.animationOptions)
        .onfinish = () => {
            this.optionList.classList.add('hide')
            this.open = false
        }
    }
    connectedCallback() {
        this.availableOptions
        this.optionList = this.shadowRoot.querySelector('.options')
        this.chevron = this.shadowRoot.querySelector('.toggle')
        let slot = this.shadowRoot.querySelector('.options slot'),
            selection = this.shadowRoot.querySelector('.selection'),
            previousOption
        this.open = false;
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
        selection.addEventListener('click', e => {
            if (!this.open) {
                this.optionList.classList.remove('hide')
                this.optionList.animate(this.slideDown, this.animationOptions)
                this.chevron.classList.add('rotate')
                this.open = true
            } else {
                this.collapse()
            }
        })
        selection.addEventListener('keydown', e => {
            if (e.code === 'ArrowDown' || e.code === 'ArrowRight') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            if (e.code === 'Enter' || e.code === 'Space')
                if (!this.open) {
                    this.optionList.classList.remove('hide')
                    this.optionList.animate(this.slideDown, this.animationOptions)
                    this.chevron.classList.add('rotate')
                    this.open = true
                } else {
                    this.collapse()
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
        this.addEventListener('optionSelected', e => {
            if (previousOption !== e.target) {
                this.setAttribute('value', e.detail.value)
                this.shadowRoot.querySelector('.option-text').textContent = e.detail.text;
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: e.detail.value
                    }
                }))
                if (previousOption) {
                    previousOption.classList.remove('check-selected')
                }
                previousOption = e.target;
            }
            if (!e.detail.switching)
                this.collapse()

            e.target.classList.add('check-selected')
        })
        slot.addEventListener('slotchange', e => {
            this.availableOptions = slot.assignedElements()
            if (this.availableOptions[0]) {
                let firstElement = this.availableOptions[0];
                previousOption = firstElement;
                firstElement.classList.add('check-selected')
                this.setAttribute('value', firstElement.getAttribute('value'))
                this.shadowRoot.querySelector('.option-text').textContent = firstElement.textContent
                this.availableOptions.forEach((element, index) => {
                    element.setAttribute('data-rank', index + 1);
                    element.setAttribute('tabindex', "0");
                })
            }
        });
        document.addEventListener('mousedown', e => {
            if (!this.contains(e.target) && this.open) {
                this.collapse()
            }
        })
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
    }

    sendDetails(switching) {
        let optionSelected = new CustomEvent('optionSelected', {
            bubbles: true,
            composed: true,
            detail: {
                text: this.textContent,
                value: this.getAttribute('value'),
                switching: switching
            }
        })
        this.dispatchEvent(optionSelected)
    }

    connectedCallback() {
        let validKey = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight'
        ]
        this.addEventListener('click', e => {
            this.sendDetails()
        })
        this.addEventListener('keyup', e => {
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
