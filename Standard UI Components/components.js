//Button

const smButton = document.createElement('template')
smButton.innerHTML = `
        <style>     
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }       
            :host{
                display: inline-flex;
            }
            :host([disabled='true']) .button{
                cursor: default;
                opacity: 1;
                background: rgba(var(--text), 0.4) !important;
                color: rgba(var(--foreground), 1);
            }
            :host([variant='primary']) .button{
                background: var(--accent-color);
                color: rgba(var(--foreground), 1);
            }
            :host([variant='outlined']) .button{
                box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
                background: rgba(var(--foreground), 1); 
                color: var(--accent-color);
            }
            :host([variant='no-outline']) .button{
                background: rgba(var(--foreground), 1); 
                color: var(--accent-color);
            }
            .button {
                display: flex;
                padding: 0.6rem 0.9rem;
                cursor: pointer;
                user-select: none;
                border-radius: 0.2rem; 
                justify-content: center;
                transition: box-shadow 0.3s;
                text-transform: uppercase;
                font-weight: 500;
                color: rgba(var(--text), 0.9);
                letter-spacing: 0.1rem;
                font-family: var(--font-family);
                font-size: 0.9rem;
                background: rgba(var(--text), 0.1); 
                -webkit-tap-highlight-color: transparent;
                outline: none;
            }
            :host(:not([disabled="true"])) .button:focus{
                box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
            }
            :host([variant='outlined']) .button:focus{
                box-shadow: 0 0 0 0.1rem var(--accent-color)inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
            }
            @media (hover: hover){
                :host(:not([disabled="true"])) .button:active{
                    box-shadow: none !important;
                }
                :host([variant='outlined']) .button:active{
                    box-shadow: 0 0 0 0.1rem var(--accent-color)inset !important;
                }
                :host(:not([disabled="true"])) .button:hover{
                    box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
                }
                :host([variant='outlined']) .button:hover{
                    box-shadow: 0 0 0 0.1rem var(--accent-color)inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
                }
            }
            @media (hover: none){
                :host(:not([disabled="true"])) .button:active{
                    box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
                }
                :host([variant='outlined']) .button:active{
                    box-shadow: 0 0 0 0.1rem var(--accent-color)inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
                }
            }
        </style>
        <div class="button" tabindex="0" role="button">
            <slot></slot>   
        </div>`;
customElements.define('sm-button',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smButton.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['disabled']
        }

        get disabled() {
            return this.getAttribute('disabled')
        }

        set disabled(val) {
            this.setAttribute('disabled', val)
        }

        dispatch = () => {
            if (this.getAttribute('disabled') === 'true') {
                this.dispatchEvent(new CustomEvent('disabled', {
                    bubbles: true,
                    composed: true
                }))
            }
            else {
                this.dispatchEvent(new CustomEvent('clicked', {
                    bubbles: true,
                    composed: true
                }))
            }
        }

        connectedCallback() {
            this.addEventListener('click', (e) => {
                this.dispatch()
            })
            this.addEventListener('keyup', (e) => {
                if (e.code === "Enter" || e.code === "Space")
                    this.dispatch()
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }
    })

//Input
const smInput = document.createElement('template')
smInput.innerHTML = `
        <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        } 
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration { display: none; }
        input[type=number] {
        -moz-appearance:textfield;
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0; 
        }
        input:invalid{
            outline: none;
            box-shadow: none;
        }
        ::-moz-focus-inner{
        border: none;
        }
        :host{
            display: inline-flex;
            flex-direction: column;
        }
        .hide{
           opacity: 0 !important;
           pointer-events: none !important;
        }
        .icon {
            fill: none;
            height: 1.6rem;
            width: 1.6rem;
            padding: 0.5rem;
            stroke: rgba(var(--text), 0.7);
            stroke-width: 10;
            overflow: visible;
            stroke-linecap: round;
            border-radius: 1rem;
            stroke-linejoin: round;
            cursor: pointer;
            min-width: 0;
        }
        .input {
            display: flex;
            align-items: center;
            position: relative;
            gap: 1rem;
            padding: 0.6rem 1rem;
            border-radius: 0.2em;
            transition: opacity 0.3s;
            background: rgba(var(--text), 0.1);
            font-family: var(--font-family);
            width: 100%
        }

        input:focus{
            caret-color: var(--accent-color);
        }
        .input:focus-within{
            box-shadow: 0 0 0 0.1rem var(--accent-color);
        }
    
        .label {
            user-select: none;
            opacity: .7;
            font-weight: 400;
            font-size: 1rem;
            position: absolute;
            top: 0;
            transition: transform 0.3s;
            -webkit-transform-origin: left;
            transform-origin: left;
            pointer-events: none;
            will-change: transform;
            text-transform: capitalize;
        }
        .container{
            display: flex;
            position: relative;
            align-items: center;
            flex: 1;
        }    
        input{
            font-size: 1rem;
            border: none;
            background: transparent;
            outline: none;
            color: rgba(var(--text), 1);
            width: 100%;
        }
        .animate-label .container input {
            -webkit-transform: translateY(0.5rem);
                    transform: translateY(0.5rem);
            }
          
        .animate-label .container .label {
            -webkit-transform: translateY(-60%) scale(0.7);
                    transform: translateY(-60%) scale(0.7);
            opacity: 1;
            color: var(--accent-color)
        }
        .helper-text{
            color: var(--error-color);
            padding: 0.4rem 1rem;
        }
        @media (any-hover: hover){
            .icon:hover{
                background: rgba(var(--text), 0.1);
            }
        }
    </style>
    <label class="input">
        <slot name = "icon"></slot>
        <div class="container">
            <input/>
            <div class="label"></div>
        </div>
        <svg class="icon clear hide" viewBox="0 0 64 64">
            <title>clear</title>
            <line x1="64" y1="0" x2="0" y2="64"/>
            <line x1="64" y1="64" x2="0" y2="0"/>
        </svg>
    </label>
    <div class="helper-text hide"></div>
`;
customElements.define('sm-input',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smInput.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['placeholder']
        }

        get value() {
            return this.shadowRoot.querySelector('input').value
        }

        set value(val) {
            this.shadowRoot.querySelector('input').value = val;
        }

        get placeholder() {
            return this.getAttribute('placeholder')
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val)
        }

        get type() {
            return this.getAttribute('type')
        }

        get isValid() {
            return this.shadowRoot.querySelector('input').checkValidity()
        }

        preventNonNumericalInput = (e) => {
            let keyCode = e.keyCode;
            if (!((keyCode > 47 && keyCode < 56) || (keyCode > 36 && keyCode < 39) || (keyCode > 95 && keyCode < 104) || keyCode === 110 || (keyCode > 7 && keyCode < 19))) {
                e.preventDefault();
            }
        }

        checkInput = (label, inputParent, clear, helperText) => {
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '')
                return;
            if (this.input.value !== '') {
                if (this.animate)
                    this.inputParent.classList.add('animate-label')
                else
                    this.label.classList.add('hide')
                this.clearBtn.classList.remove('hide')
            }
            else {
                if (this.animate)
                    this.inputParent.classList.remove('animate-label')
                else
                    this.label.classList.remove('hide')
                this.clearBtn.classList.add('hide')
            }
            if (this.valueChanged) {
                if (this.input.checkValidity()) {
                    this.helperText.classList.add('hide')
                    this.inputParent.style.boxShadow = ``
                }
                else {
                    this.helperText.classList.remove('hide')
                    this.inputParent.style.boxShadow = `0 0 0 0.1rem ${this.computedStyle.getPropertyValue('--error-color')}`
                }
            }
        }

        connectedCallback() {
            this.inputParent = this.shadowRoot.querySelector('.input')
            this.computedStyle = window.getComputedStyle(this.inputParent)
            this.clearBtn = this.shadowRoot.querySelector('.clear')
            this.label = this.shadowRoot.querySelector('.label')
            this.helperText = this.shadowRoot.querySelector('.helper-text')
            this.valueChanged = false;
            this.animate = this.hasAttribute('animate')
            this.input = this.shadowRoot.querySelector('input')
            this.shadowRoot.querySelector('.label').textContent = this.getAttribute('placeholder')
            if (this.hasAttribute('value')) {
                this.input.value = this.getAttribute('value')
                this.checkInput()
            }
            if (this.hasAttribute('helper-text')) {
                this.helperText.textContent = this.getAttribute('helper-text')
            }
            if (this.hasAttribute('type')) {
                if (this.getAttribute('type') === 'number') {
                    this.input.setAttribute('inputmode', 'numeric')
                }
                else
                    this.input.setAttribute('type', this.getAttribute('type'))
            }
            else
                this.input.setAttribute('type', 'text')
            this.input.addEventListener('keydown', e => {
                if (this.getAttribute('type') === 'number')
                    this.preventNonNumericalInput(e);
            })
            this.input.addEventListener('input', e => {
                this.checkInput()
            })
            this.input.addEventListener('change', e => {
                this.valueChanged = true;
                if (this.input.checkValidity())
                    this.helperText.classList.add('hide')
                else
                    this.helperText.classList.remove('hide')
            })
            this.clearBtn.addEventListener('click', e => {
                this.input.value = ''
                this.checkInput()
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (name === 'placeholder')
                    this.shadowRoot.querySelector('.label').textContent = newValue;
            }
        }
    })

// tab-header

const smTabs = document.createElement('template')
smTabs.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: flex;
}
.tabs{
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: hidden auto;
}
.tab-header{
    display: flex;
    position: relative;
    overflow: auto hidden;
    max-width: 100%;
    scrollbar-width: 0;
    margin-bottom: 1rem;
}
.indicator{
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.15rem;
    border-radius: 1rem 1rem 0 0;  
    background: var(--accent-color);
    transition: transform 0.3s, width 0.3s;
}
:host([variant="tab"]) .indicator{
    height: 100%;
    border-radius: 0.2rem
}
:host([variant="tab"]) .tab-header{
    border-bottom: none; 
}
.hide-completely{
    display: none;
}
:host([variant="tab"]) slot[name="tab"]::slotted(.active){
    color: rgba(var(--foreground), 1);
}

slot[name="tab"]::slotted(.active){
    color: var(--accent-color);
    opacity: 1;
}
slot[name="panel"]::slotted(.hide-completely){
    display: none;
}
@media (hover: none){
    .tab-header::-webkit-scrollbar-track {
        -webkit-box-shadow: none !important;
        background-color: transparent !important;
    }
    .tab-header::-webkit-scrollbar {
        height: 0;
        background-color: transparent;
    }
}         
</style>
<div class="tabs">
    <div class="tab-header">
        <slot name="tab">Nothing to see here</slot>
        <div class="indicator"></div>
    </div>
    <slot name="panel">Nothing to see here</slot>
</div>
`;

customElements.define('sm-tabs', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smTabs.content.cloneNode(true))
        this.indicator = this.shadowRoot.querySelector('.indicator');
        this.tabSlot = this.shadowRoot.querySelector('slot[name="tab"]');
        this.panelSlot = this.shadowRoot.querySelector('slot[name="panel"]');
        this.tabHeader = this.shadowRoot.querySelector('.tab-header');
    }
    connectedCallback() {

        //animations
        let flyInLeft = [
            {
                opacity: 0,
                transform: 'translateX(-1rem)'
            },
            {
                opacity: 1,
                transform: 'none'
            }
        ],
            flyInRight = [
                {
                    opacity: 0,
                    transform: 'translateX(1rem)'
                },
                {
                    opacity: 1,
                    transform: 'none'
                }
            ],
            flyOutLeft = [
                {
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(-1rem)'
                }
            ],
            flyOutRight = [
                {
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(1rem)'
                }
            ],
            animationOptions = {
                duration: 300,
                fill: 'forwards',
                easing: 'ease'
            }
        this.prevTab
        this.allTabs
        this.shadowRoot.querySelector('slot[name="panel"]').addEventListener('slotchange', () => {
            this.shadowRoot.querySelector('slot[name="panel"]').assignedElements().forEach((panel, index) => {
                panel.classList.add('hide-completely')
            })
        })
        this.shadowRoot.querySelector('slot[name="tab"]').addEventListener('slotchange', () => {
            this.allTabs = this.shadowRoot.querySelector('slot[name="tab"]').assignedElements();
            this.shadowRoot.querySelector('slot[name="tab"]').assignedElements().forEach((panel, index) => {
                panel.setAttribute('rank', index + 1)
            })
        })
        this._targetBodyFlyRight = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInRight, animationOptions)
        }
        this._targetBodyFlyLeft = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInLeft, animationOptions)
        }
        this.tabSlot.addEventListener('click', e => {
            if (e.target === this.prevTab || !e.target.closest('sm-tab'))
                return
            if (this.prevTab)
                this.prevTab.classList.remove('active')
            e.target.classList.add('active')

            e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
            this.indicator.setAttribute('style', `width: ${e.target.getBoundingClientRect().width}px; transform: translateX(${e.target.getBoundingClientRect().left - e.target.parentNode.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)

            if (this.prevTab) {
                let targetBody = e.target.nextElementSibling,
                    currentBody = this.prevTab.nextElementSibling;

                if (this.prevTab.getAttribute('rank') < e.target.getAttribute('rank')) {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyRight(targetBody)
                    }
                    else if (currentBody && targetBody) {
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyRight(targetBody)
                        }
                    }
                } else {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyLeft(targetBody)
                    }
                    else if (currentBody && targetBody) {
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyLeft(targetBody)
                        }
                    }
                }
            } else {
                e.target.nextElementSibling.classList.remove('hide-completely')
            }
            this.prevTab = e.target;
        })
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    let activeElement = this.tabSlot.assignedElements().filter(element => {
                        if (element.classList.contains('active'))
                            return true
                    })
                    if (activeElement.length) {
                        let tabDimensions = activeElement[0].getBoundingClientRect();
                        this.indicator.setAttribute('style', `width: ${tabDimensions.width}px; transform: translateX(${tabDimensions.left - activeElement[0].parentNode.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)
                    }
                    else {
                        this.tabSlot.assignedElements()[0].classList.add('active')
                        this.panelSlot.assignedElements()[0].classList.remove('hide-completely')
                        let tabDimensions = this.tabSlot.assignedElements()[0].getBoundingClientRect();
                        this.indicator.setAttribute('style', `width: ${tabDimensions.width}px; transform: translateX(${tabDimensions.left - this.tabSlot.assignedElements()[0].parentNode.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)
                        this.prevTab = this.tabSlot.assignedElements()[0];
                    }
                }
            })
        },
            { threshold: 1.0 })
        observer.observe(this.tabHeader)
        if (this.hasAttribute('swipable') && this.getAttribute('swipable') == 'true') {
            let touchStartTime = 0,
                touchEndTime = 0,
                swipeTimeThreshold = 200,
                swipeDistanceThreshold = 20,
                startingPointX = 0,
                endingPointX = 0,
                currentIndex = 0;
            this.addEventListener('touchstart', e => {
                touchStartTime = e.timeStamp
                startingPointX = e.changedTouches[0].clientX
            })
            this.panelSlot.addEventListener('touchend', e => {
                touchEndTime = e.timeStamp
                endingPointX = e.changedTouches[0].clientX
                if (touchEndTime - touchStartTime < swipeTimeThreshold) {
                    currentIndex = this.allTabs.findIndex(element => element.classList.contains('active'))
                    if (startingPointX > endingPointX && startingPointX - endingPointX > swipeDistanceThreshold && currentIndex < this.allTabs.length) {
                        this.allTabs[currentIndex + 1].click()
                    }
                    else if (startingPointX < endingPointX && endingPointX - startingPointX > swipeDistanceThreshold && currentIndex > 0) {
                        this.allTabs[currentIndex - 1].click()
                    }
                }
            })
        }
    }
})

// tab
const smTab = document.createElement('template')
smTab.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    position: relative;
    display: inline-flex;
    z-index: 1;
}
.tab{
    position: relative;
    user-select: none;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    padding: 0.6rem 0.8rem;
    font-weight: 500;
    word-spacing: 0.1em;
    text-align: center;
    transition: color 0.3s;
    text-transform: capitalize;
    font-family: var(--font-family);
}
@media (hover: hover){
    :host(.active) .tab{
        opacity: 1;
    }
    .tab{
        opacity: 0.7
    }
    .tab:hover{
        opacity: 1
    }
}
</style>
<div class="tab">
    <slot></slot>
</div>
`;

customElements.define('sm-tab', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smTab.content.cloneNode(true))
    }
})

//chcekbox

const smCheckbox = document.createElement('template')
smCheckbox.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: inline-flex;
}
.checkbox {
    position: relative;
    display:flex;
    align-items: center;
    cursor: pointer;
    height: 1.5rem;
    outline: none;
    -webkit-tap-highlight-color: transparent;
}

p{
    margin-left: 2rem;
}

.checkbox:active .icon,
.checkbox:focus .icon{
    background: rgba(var(--text), 0.2);
}

.checkbox input {
  display: none;
}

.checkbox .checkmark {
    stroke-dashoffset: -65;
    stroke-dasharray: 65;
    -webkit-transition: stroke-dashoffset 0.3s; 
    transition: stroke-dashoffset 0.3s;
}

.checkbox input:checked ~ svg .checkmark {
    stroke-dashoffset: 0;
    stroke: rgba(var(--foreground), 1);
}
.checkbox input:checked ~ svg {
    stroke: var(--accent-color);
    fill: var(--accent-color);
    stroke-width: 8; 
}

.icon {
    position: absolute;
    fill: none;
    height: 2.6rem;
    width: 2.6rem;
    padding: 0.7rem;
    stroke: rgba(var(--text), 0.7);
    stroke-width: 6;
    overflow: visible;
    stroke-linecap: round;
    stroke-linejoin: round;
    border-radius: 2rem;
    transition: background 0.3s;
    left: -0.5rem;
}
.disabled {
    opacity: 0.6;
    pointer-events: none;
}

</style>
<label class="checkbox" tabindex="0">
    <input type="checkbox">
    <svg class="icon" viewBox="0 0 64 64">
        <title>checkbox</title>
        <rect class="box" x="0" y="0" width="64" height="64" rx="4" />
        <path class="checkmark" d="M50.52,19.56,26,44.08,13.48,31.56" />
    </svg>
    <p><slot></slot></p>
</label>`
customElements.define('sm-checkbox', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smCheckbox.content.cloneNode(true))
        
        this.checkbox = this.shadowRoot.querySelector('.checkbox');
        this.input = this.shadowRoot.querySelector('input')
        
        this.isChecked = false
        this.isDisabled = false
    }

    static get observedAttributes() {
        return ['disabled', 'checked']
    }

    get disabled() {
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        this.setAttribute('disabled', val)
    }

    get checked() {
        return this.getAttribute('checked')
    }

    set checked(value) {
        this.setAttribute('checked', value)
    }

    connectedCallback() {
        this.addEventListener('keyup', e => {
            if ((e.code === "Enter" || e.code === "Space") && this.isDisabled == false) {
                this.isChecked = !this.isChecked
                this.setAttribute('checked', this.isChecked)
            }
        })
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (newValue === 'true') {
                    this.checkbox.classList.add('disabled')
                    this.isDisabled = true
                }
                else {
                    this.checkbox.classList.remove('disabled')
                    this.isDisabled = false
                }
            }
            if (name === 'checked') {
                if (newValue == 'true') {
                    this.isChecked = true
                    this.input.checked = true
                }
                else {
                    this.isChecked = false
                    this.input.checked = false
                }
            }
        }
    }

})

//audio

const smAudio = document.createElement('template')
smAudio.innerHTML = `
<style>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

:host{
	display: flex;
}

.audio{
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-user-select: none;
          user-select: none;
  padding: 0.6rem;
  border-radius: 0.2rem;
  background: rgba(var(--text), 0.08);
  overflow: hidden;
  width: 100%;
}

.hide {
  display: none;
}

.icon{
  stroke: rgba(var(--text), 1);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  overflow: visible;
  height: 2.1rem;
  width: 2.1rem;
  padding: 0.6rem;
  cursor: pointer;
  border-radius: 2rem;
  margin-right: 0.5rem;
}

.icon:hover{
  background: rgba(var(--text), 0.1);
}

audio {
  display: none;
}

.track {
  position: absolute;
  height: 0.2rem;
  bottom: 0;
  background: var(--accent-color);
  left: 0;
  -webkit-transition: width 0.2s;
  transition: width 0.2s;
  pointer-events: none;
  z-index: 0;
  border-radius: 0.2rem;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
	<div class="audio">
		<svg class="icon play" viewBox="-6 0 64 64">
			<title>play</title>
			<path d="M57.12,26.79,12.88,1.31a6,6,0,0,0-9,5.21v51a6,6,0,0,0,9,5.21L57.12,37.21A6,6,0,0,0,57.12,26.79Z"/>
		</svg>
		<svg class="icon pause hide" viewBox="0 0 64 64">
			<title>pause</title>
			<line x1="17.5" x2="17.5" y2="64"/>
			<line x1="46.5" x2="46.5" y2="64"/>
		</svg>
		<h5 class="current-time"></h5> / <h5 class="duration"></h5>
		<audio src=""></audio>
		<div class="track"></div>
	</audio>
`;

customElements.define('sm-audio', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).append(smAudio.content.cloneNode(true))

        this.playing = false;
    }
    static get observedAttributes() {
        return ['src']
    }
    play() {
        this.audio.play()
        this.playing = false;
        this.pauseBtn.classList.remove('hide')
        this.playBtn.classList.add('hide')
    }
    pause() {
        this.audio.pause()
        this.playing = true;
        this.pauseBtn.classList.add('hide')
        this.playBtn.classList.remove('hide')
    }

    get isPlaying() {
        return this.playing;
    }

    connectedCallback() {
        this.playBtn = this.shadowRoot.querySelector('.play');
        this.pauseBtn = this.shadowRoot.querySelector('.pause');
        this.audio = this.shadowRoot.querySelector('audio')
        this.playBtn.addEventListener('click', e => {
            this.play()
        })
        this.pauseBtn.addEventListener('click', e => {
            this.pause()
        })
        this.audio.addEventListener('ended', e => {
            this.pause()
        })
        let width;
        if ('ResizeObserver' in window) {
            let resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    width = entry.contentRect.width;
                })
            })
            resizeObserver.observe(this)
        }
        else {
            let observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting)
                    width = this.shadowRoot.querySelector('.audio').offsetWidth;
            }, {
                threshold: 1
            })
            observer.observe(this)
        }
        this.audio.addEventListener('timeupdate', e => {
            let time = this.audio.currentTime,
                minutes = Math.floor(time / 60),
                seconds = Math.floor(time - minutes * 60),
                y = seconds < 10 ? "0" + seconds : seconds;
            this.shadowRoot.querySelector('.current-time').textContent = `${minutes}:${y}`
            this.shadowRoot.querySelector('.track').style.width = (width / this.audio.duration) * this.audio.currentTime + 'px'
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'src') {
                if (this.hasAttribute('src') && newValue.trim() !== '') {
                    this.shadowRoot.querySelector('audio').src = newValue;
                    this.shadowRoot.querySelector('audio').onloadedmetadata = () => {
                        let duration = this.audio.duration,
                            minutes = Math.floor(duration / 60),
                            seconds = Math.floor(duration - minutes * 60),
                            y = seconds < 10 ? "0" + seconds : seconds;
                        this.shadowRoot.querySelector('.duration').textContent = `${minutes}:${y}`;
                    }
                }
                else
                    this.classList.add('disabled')
            }
        }
    }
})

//switch

const smSwitch = document.createElement('template')
smSwitch.innerHTML = `	
<style>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

:host{
    display: inline-flex;
}
.switch {
    position: relative;
    display: flex;
    align-items: center;
    width: 2.4rem;
    padding: 0.2rem;
    cursor: pointer;
    outline: none;
    border-radius: 2rem;
    -webkit-tap-highlight-color: transparent;
}

input {
    display: none;
}

.track {
    position: absolute;
    left: 0;
    right: 0;
    height: 1.4rem;
    -webkit-transition: background 0.3s;
    transition: background 0.3s;
    background: rgba(var(--text), 0.4);
    box-shadow: 0 0.1rem 0.3rem #00000040 inset;
    border-radius: 1rem;
}

.switch:active .button::after,
.switch:focus .button::after{
    opacity: 1
}
.switch:focus:not(:focus-visible){
    opacity: 0;
}
.switch:focus-visible .button::after{
    opacity: 1
}

.button::after{
    content: '';
    display: flex;
    position: absolute;
    height: 2.6rem;
    width: 2.6rem;
    background: rgba(var(--text), 0.2);
    border-radius: 2rem;
    opacity: 0;
    transition: opacity 0.3s;
}

.button {
    position: relative;
    display: inline-flex;
    height: 1rem;
    width: 1rem;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 0 0.1rem 0.4rem #00000060;
    transition: transform 0.3s;
    border: solid 0.3rem rgba(var(--foreground), 1);
}

input:checked ~ .button {
    transform: translateX(100%);
}

input:checked ~ .track {
    background: var(--accent-color);
}
.disabled {
    opacity: 0.6;
    pointer-events: none;
}
</style>
<label class="switch" tabindex="0">
    <input type="checkbox">
    <div class="track"></div>
    <div class="button"></div>
</label>`

customElements.define('sm-switch', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smSwitch.content.cloneNode(true))
        this.switch = this.shadowRoot.querySelector('.switch');
        this.input = this.shadowRoot.querySelector('input')
        this.isChecked = false  
        this.isDisabled = false
    }

    static get observedAttributes() {
        return ['disabled', 'checked']
    }

    get disabled() {
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        this.setAttribute('disabled', val)
    }

    get checked() {
        return this.isChecked
    }

    set checked(value) {
        this.setAttribute('checked', value)
    }

    connectedCallback() {

        this.addEventListener('keyup', e => {
            if ((e.code === "Enter" || e.code === "Space") && this.isDisabled == false) {
                this.isChecked = !this.isChecked
                this.setAttribute('checked', this.isChecked)
            }
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (newValue === 'true') {
                    this.switch.classList.add('disabled')
                    this.isDisabled = true
                }
                else {
                    this.switch.classList.remove('disabled')
                    this.isDisabled = false
                }
            }
            if (name === 'checked') {
                if (newValue == 'true') {
                    this.isChecked = true
                    this.input.checked = true
                }
                else {
                    this.isChecked = false
                    this.input.checked = false
                }
            }
        }
    }
})

// select
const smSelect = document.createElement('template')
smSelect.innerHTML = `
        <style>     
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            } 
            .icon {
                fill: none;
                height: 0.8rem;
                width: 0.8rem;
                stroke: rgba(var(--text), 0.7);
                stroke-width: 6;
                overflow: visible;
                stroke-linecap: round;
                stroke-linejoin: round;
            }      
            :host{
                display: inline-flex;
            }
            .hide{
                opacity: 0;
                pointer-events: none;
            }
            .select{
                position: relative;
                display: flex;
                flex-direction: column;
                cursor: pointer;
                width: 100%;
                -webkit-tap-highlight-color: transparent;
            }
            .heading{
                text-transform: capitalize;
                color: var(--accent-color);
                grid-area: heading;
                font-weight: 500;
                margin-bottom: 0.2rem;
            }
            .option-text{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .selection{
                border-radius: 0.2rem;
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-areas: 'heading heading' '. .';
                padding: 0.4rem 1rem;
                background: rgba(var(--text), 0.06);
                border: solid 1px rgba(var(--text), 0.2);
                align-items: center;
                outline: none;
            }
            .selection:focus{
                box-shadow: 0 0 0 0.1rem var(--accent-color) 
            }
            .icon{
                margin-left: 1rem;
            }
            :host([align-select="right"]) .options{
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
                display: flex;
                flex-direction: column;
                min-width: 100%;
                background: rgba(var(--foreground), 1);
                transition: opacity 0.3s, top 0.3s;
                border: solid 1px rgba(var(--text), 0.2);
                border-radius: 0.2rem;
                z-index: 2;
                box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
            }
            .rotate{
                transform: rotate(180deg)
            }
        </style>
        <div class="select" >
            <div class="selection" tabindex="0">
                <h5 class="heading">select title</h5>
                <div class="option-text"></div>
                <svg class="icon toggle" viewBox="0 0 64 64">
                    <polyline points="63.65 15.99 32 47.66 0.35 15.99"/>
                </svg>
            </div>
            <div class="options hide">
                <slot></slot> 
            </div>
        </div>`;
customElements.define('sm-select', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smSelect.content.cloneNode(true))
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

    collapse = () => {
        this.optionList.animate(this.slideUp, this.animationOptions)
        this.optionList.classList.add('hide')
        this.chevron.classList.remove('rotate')
        open = false
    }
    connectedCallback() {
        this.availableOptions
        this.optionList = this.shadowRoot.querySelector('.options')
        this.chevron = this.shadowRoot.querySelector('.toggle')
        let slot = this.shadowRoot.querySelector('.options slot'),
            selection = this.shadowRoot.querySelector('.selection'),
            previousOption
            this.slideDown = [
                { transform: `translateY(-0.5rem)` },
                { transform: `translateY(0)` }
            ],
            this.slideUp = [
                { transform: `translateY(0)` },
                { transform: `translateY(-0.5rem)` }
            ],
            this.animationOptions = {
                duration: 300,
                fill: "forwards",
                easing: 'ease'
            },
            open = false;
        selection.addEventListener('click', e => {
            if (!open) {
                this.optionList.classList.remove('hide')
                this.optionList.animate(this.slideDown, this.animationOptions)
                this.chevron.classList.add('rotate')
                open = true
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
                if (!open) {
                    this.optionList.classList.remove('hide')
                    this.optionList.animate(this.slideDown, this.animationOptions)
                    this.chevron.classList.add('rotate')
                    open = true
                } else {
                    this.collapse()
                }
        })
        this.optionList.addEventListener('keydown', e => {
            if (e.code === 'ArrowUp' || e.code === 'ArrowRight') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                }
            }
            if (e.code === 'ArrowDown' || e.code === 'ArrowLeft') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling)
                    document.activeElement.nextElementSibling.focus()
            }
        })
        this.addEventListener('optionSelected', e => {
            if (previousOption !== e.target) {
                this.setAttribute('value', e.detail.value)
                this.shadowRoot.querySelector('.option-text').textContent = e.detail.text;
                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true,
                    composed: true
                }))
                if (previousOption) {
                    previousOption.classList.remove('check-selected')
                }
                previousOption = e.target;
            }
            if(!e.detail.switching)
            setTimeout(() => {
                this.collapse()
            }, 200);

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
            if (!this.contains(e.target)) {
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
                box-sizing: border-box;
            }     
            :host{
                display: flex;
            }
            .option{
                min-width: 100%;
                padding: 0.8rem 1.2rem;
                cursor: pointer;
                overflow-wrap: break-word;
                outline: none;
                display: flex;
                align-items: center;
            }
            :host(:focus){
                outline: none;
                background: rgba(var(--text), 0.1);
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
                stroke: rgba(var(--text), 0.7);
                stroke-width: 10;
                overflow: visible;
                stroke-linecap: round;
                border-radius: 1rem;
                stroke-linejoin: round;
                opacity: 0;
            }
            @media (hover: hover){
                .option:hover{
                    background: rgba(var(--text), 0.1);
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
        this.attachShadow({ mode: 'open' }).append(smOption.content.cloneNode(true))
    }

    sendDetails = (switching) => {
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
            if (e.code === 'Enter') {
                e.preventDefault()
                this.sendDetails(false)
            }
            if (validKey.includes(e.key)) {
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

// select
const smStripSelect = document.createElement('template')
smStripSelect.innerHTML = `
        <style>     
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }    
            :host{
                display: flex;
            }
            .icon {
                position: absolute;
                display: flex;
                fill: none;
                height: 2.6rem;
                width: 2.6rem;
                padding: 0.9rem;
                stroke: rgba(var(--text), 0.7);
                stroke-width: 10;
                overflow: visible;
                stroke-linecap: round;
                stroke-linejoin: round;
                cursor: pointer;
                min-width: 0;
                z-index: 1;
                background: rgba(var(--foreground), 1);
                -webkit-tap-highlight-color: transparent;
                transition: opacity 0.3s; 
            }
            .hide{
                pointer-events: none;
                opacity: 0;
            }
            .select-container{
                position: relative;
                display: flex;
                width: 100%;
                align-items: center;
            }
            .select{
                position: relative;
                display: flex;
                gap: 0.5rem;
                max-width: 100%;
                overflow: auto hidden;
            }
            .previous-item{
                left: 0;
            }
            .next-item{
                right: 0;
            }
            .left,.right{
                position: absolute;
                width: 1rem;
                height: 100%; 
                transition: opacity 0.3s;
                z-index: 1;
            }
            .left{
                background: linear-gradient(to left, transparent, rgba(var(--foreground), 1))
            }
            .right{
                right: 0;
                background: linear-gradient(to right, transparent, rgba(var(--foreground), 1))
            }
            slot::slotted(.active){
                border-radius: 2rem;
                opacity: 1;
                background-color: rgba(var(--text), .6);  
                color: rgba(var(--foreground), 1);
            }
            @media (hover: none){
                ::-webkit-scrollbar-track {
                    -webkit-box-shadow: none !important;
                    background-color: transparent !important;
                }
                ::-webkit-scrollbar {
                    height: 0;
                    background-color: transparent;
                }
                .icon{
                    display: none;
                }
                .left,.right{
                    display: block;
                }
            }
            @media (hover: hover){
                .select{
                    overflow: hidden;
                }
                .left,.right{
                    display: none;
                }
            }
        </style>
        <div class="select-container">
            <div class="left hide"></div>
            <svg class="icon previous-item hide" viewBox="4 0 64 64">
                <title>Previous</title>
                <polyline points="48.01 0.35 16.35 32 48.01 63.65"/>
            </svg>
            <div class="select">
                <slot></slot> 
            </div>
            <svg class="icon next-item hide" viewBox="-6 0 64 64">
                <title>Next</title>
                <polyline points="15.99 0.35 47.65 32 15.99 63.65"/>
            </svg>
            <div class="right hide"></div>
        </div>`;
customElements.define('sm-strip-select', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smStripSelect.content.cloneNode(true))
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
    scrollLeft = () => {
        this.select.scrollBy({
            top: 0,
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.select.scrollBy({
            top: 0,
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }
    connectedCallback() {
        let previousOption,
            slot = this.shadowRoot.querySelector('slot');
        this.selectContainer = this.shadowRoot.querySelector('.select-container')
        this.select = this.shadowRoot.querySelector('.select')
        this.nextArrow = this.shadowRoot.querySelector('.next-item')
        this.previousArrow = this.shadowRoot.querySelector('.previous-item')
        this.nextGradient = this.shadowRoot.querySelector('.right')
        this.previousGradient = this.shadowRoot.querySelector('.left')
        this.selectOptions
        this.scrollDistance = this.selectContainer.getBoundingClientRect().width
        const firstElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.previousArrow.classList.add('hide')
                this.previousGradient.classList.add('hide')
            }
            else {
                this.previousArrow.classList.remove('hide')
                this.previousGradient.classList.remove('hide')
            }
        }, {
            root: this.selectContainer,
            threshold: 0.95
        })
        const lastElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.nextArrow.classList.add('hide')
                this.nextGradient.classList.add('hide')
            }
            else {
                this.nextArrow.classList.remove('hide')
                this.nextGradient.classList.remove('hide')
            }
        }, {
            root: this.selectContainer,
            threshold: 0.95
        })

        const selectObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.scrollDistance = this.selectContainer.getBoundingClientRect().width
            }
        })

        selectObserver.observe(this.selectContainer)
        this.addEventListener('optionSelected', e => {
            if (previousOption === e.target) return;
            if (previousOption)
                previousOption.classList.remove('active')
            e.target.classList.add('active')
            e.target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
            this.setAttribute('value', e.detail.value)
            this.dispatchEvent(new CustomEvent('change', {
                bubbles: true,
                composed: true
            }))
            previousOption = e.target;
        })
        slot.addEventListener('slotchange', e => {
            this.selectOptions = slot.assignedElements()
            firstElementObserver.observe(this.selectOptions[0])
            lastElementObserver.observe(this.selectOptions[this.selectOptions.length - 1])
            if (this.selectOptions[0]) {
                let firstElement = this.selectOptions[0];
                this.setAttribute('value', firstElement.getAttribute('value'))
                firstElement.classList.add('active')
                previousOption = firstElement;
            }
        });
        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
    }
})

// option
const smStripOption = document.createElement('template')
smStripOption.innerHTML = `
        <style>     
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }     
            :host{
                display: flex;
            }
            .option{
                padding: 0.4rem 0.8rem;
                cursor: pointer;
                overflow-wrap: break-word;
                outline: none;
                border-radius: 2rem;
                text-transform: capitalize;
                border: solid 1px rgba(var(--text), .3);
                opacity: 0.9;
            }
            .option:focus{
                background: rgba(var(--text), 0.1);
            }

            @media (hover: hover){
                .option{
                    transition: background 0.3s;
                }
                .option:hover{
                    background: rgba(var(--text), 0.1);
                }
            }
        </style>
        <div class="option" tabindex="0">
            <slot></slot> 
        </div>`;
customElements.define('sm-strip-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smStripOption.content.cloneNode(true))
    }
    connectedCallback() {
        this.addEventListener('click', e => {
            let optionSelected = new CustomEvent('optionSelected', {
                bubbles: true,
                composed: true,
                detail: {
                    text: this.textContent,
                    value: this.getAttribute('value')
                }
            })
            this.dispatchEvent(optionSelected)
        })
        if (this.hasAttribute('default')) {
            setTimeout(() => {
                let optionSelected = new CustomEvent('optionSelected', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        text: this.textContent,
                        value: this.getAttribute('value')
                    }
                })
                this.dispatchEvent(optionSelected)
            }, 0);
        }
    }
})

//popup
const smPopup = document.createElement('template')
smPopup.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 
    :host{
        display: grid;
    }
    .popup-container{
        display: grid;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        place-items: center;
        background: #00000060;
        z-index: 10;
        transition: opacity 0.3s ease;
    }
    .popup{
        flex-direction: column;
        align-self: flex-end;
        align-items: flex-start;
        flex-wrap: wrap;
        width: 100%;
        border-radius: 0.5rem 0.5rem 0 0;
        position: relative;
        display: flex;
        transform: translateY(100%);
        transition: transform 0.3s;
        background: rgba(var(--foreground), 1);
        box-shadow: 0 -1rem 2rem #00000020;
        overflow-y: auto;
        max-height: 100%;
    }
    .container-header{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(var(--text), 0.3);
    }
    .popup-top{
        display: flex;
        width: 100%;
    }
    .heading{
        font-weight: 400;
    }
    .heading:first-letter{
        text-transform: uppercase;
    }
    .hide{
        opacity: 0;
        pointer-events: none;
    }
    .icon {
        fill: none;
        height: 1.6rem;
        width: 1.6rem;
        padding: 0.4rem;
        stroke: rgba(var(--text), 0.7);
        stroke-width: 8;
        overflow: visible;
        stroke-linecap: round;
        border-radius: 1rem;
        stroke-linejoin: round;
        cursor: pointer;
        min-width: 0;
        -webkit-tap-highlight-color: transparent;
    }
    @media screen and (min-width: 640px){
        .popup{
            width: 24rem;
            align-self: center;
            border-radius: 0.4rem;
            height: auto;
            transform: translateY(0) scale(0.9);
            box-shadow: 0 2rem 2rem #00000040;
        }
        .container-header{
            padding: 1.2rem 1.5rem;
        }
    }
    @media screen and (max-width: 640px){
        .popup-top{
            flex-direction: column;
            align-items: center;
        }
        .handle{
            height: 0.3rem;
            width: 2rem;
            background: rgba(var(--text), .2);
            border-radius: 1rem;
            margin: 0.5rem 0;
        }
        .heading{
            padding: 1rem 1.5rem
        }
        .close{
            height: 2rem;
            width: 2rem;
            padding: 0.55rem;
            margin-right: 1rem;
        }
    }
</style>
<div class="popup-container hide" role="dialog">
    <div class="popup">
        <div class="popup-top">
            <div class="handle"></div>
            <div class="container-header">
                <h3 class="heading"></h3>
                <svg class="icon close" viewBox="0 0 64 64">
                    <title>Close</title>
                    <line x1="64" y1="0" x2="0" y2="64"/>
                    <line x1="64" y1="64" x2="0" y2="0"/>
                </svg>
            </div>
        </div>
        <slot></slot>
    </div>
</div>
`;
customElements.define('sm-popup', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smPopup.content.cloneNode(true))
    }

    show() {
        this.popupContainer.classList.remove('hide')
        if (window.innerWidth < 648)
            this.popup.style.transform = 'translateY(0)';
        else
            this.popup.style.transform = 'scale(1)';
        document.body.setAttribute('style', `overflow: hidden; top: -${window.scrollY}px`)
    }
    hide() {
        this.popupContainer.classList.add('hide')
        if (window.innerWidth < 648)
            this.popup.style.transform = 'translateY(100%)';
        else
            this.popup.style.transform = 'scale(0.9)';
        const scrollY = document.body.style.top;
        document.body.setAttribute('style', `overflow: auto; top: initial`)
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    handleTouchStart = (e) => {
        this.touchStartY = e.changedTouches[0].clientY
        this.popup.style.transition = 'initial'
        this.touchStartTime = e.timeStamp
    }

    handleTouchMove = (e) => {
        if (this.touchStartY < e.changedTouches[0].clientY) {
            this.offset = e.changedTouches[0].clientY - this.touchStartY;
            this.touchEndAnimataion = window.requestAnimationFrame(this.movePopup)
        }
        /*else {
        offset = touchStartY - e.changedTouches[0].clientY;
        this.popup.style.transform = `translateY(-${offset}px)`
    }*/
    }

    handleTouchEnd = (e) => {
        this.touchEndTime = e.timeStamp
        cancelAnimationFrame(this.touchEndAnimataion)
        this.touchEndY = e.changedTouches[0].clientY
        this.popup.style.transition = 'transform 0.3s'
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndY - this.touchStartY > this.threshold) {
                this.hide()
            }
            else {
                this.show()
            }
        }
        else {
            if (this.touchEndY > this.touchStartY)
                this.hide()
        }
    }

    movePopup = () => {
        this.popup.style.transform = `translateY(${this.offset}px)`
    }

    connectedCallback() {
        this.popupContainer = this.shadowRoot.querySelector('.popup-container')
        this.popup = this.shadowRoot.querySelector('.popup')
        this.offset
        this.popupHeader = this.shadowRoot.querySelector('.popup-top')
        this.touchStartY = 0
        this.touchEndY = 0
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.threshold = this.popup.getBoundingClientRect().height * 0.3
        this.touchEndAnimataion;
        
        if (this.hasAttribute('heading'))
            this.shadowRoot.querySelector('.heading').textContent = this.getAttribute('heading')
                
        this.popupContainer.addEventListener('mousedown', e => {
            if (e.target === this.popupContainer) {
                this.hide()
            }
        })

        this.shadowRoot.querySelector('.close').addEventListener('click', e => {
            this.hide()
        })

        this.popupHeader.addEventListener('touchstart', this.handleTouchStart)
        this.popupHeader.addEventListener('touchmove', this.handleTouchMove)
        this.popupHeader.addEventListener('touchend', this.handleTouchEnd)
    }
    disconnectedCallback() {
        this.popupHeader.removeEventListener('touchstart', this.handleTouchStart)
        this.popupHeader.removeEventListener('touchmove', this.handleTouchMove)
        this.popupHeader.removeEventListener('touchend', this.handleTouchEnd)
    }
})

//carousel

const smCarousel = document.createElement('template')
smCarousel.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 
    :host{
        display: flex;
    }
    .icon {
        position: absolute;
        display: flex;
        fill: none;
        height: 2.6rem;
        width: 2.6rem;
        border-radius: 3rem;
        padding: 0.9rem;
        stroke: rgba(var(--text), 0.7);
        stroke-width: 10;
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
        cursor: pointer;
        min-width: 0;
        z-index: 1;
        background: rgba(var(--foreground), 1);
        box-shadow: 0 0.2rem 0.2rem #00000020,
                    0 0.5rem 1rem #00000040; 
        -webkit-tap-highlight-color: transparent;
        transition: transform 0.3s; 
    }
    .hide{
        pointer-events: none;
        opacity: 0;
    }
    .shrink{
        transform: scale(0)
    }
    .previous-item{
        left: -1.3rem;
    }
    .next-item{
        right: -1.3rem;
    }
    .left,.right{
        position: absolute;
        width: 2rem;
        height: 100%; 
        transition: opacity 0.3s;
    }
    .left{
        background: linear-gradient(to left, transparent, rgba(var(--foreground), 0.6))
    }
    .right{
        right: 0;
        background: linear-gradient(to right, transparent, rgba(var(--foreground), 0.6))
    }
    .carousel-container{
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
    }
    .carousel{
        display: flex;
        max-width: 100%;
        overflow: auto hidden;
        scroll-snap-type: x mandatory;
    }
    slot::slotted(*){
        scroll-snap-align: center;
    }
    :host([align-items="start"]) slot::slotted(*){
        scroll-snap-align: start;
    }
    :host([align-items="center"]) slot::slotted(*){
        scroll-snap-align: center;
    }
    :host([align-items="end"]) slot::slotted(*){
        scroll-snap-align: end;
    }
    @media screen and (min-width: 640px){
        
    }
    @media (hover: hover){
        .carousel{
            overflow: hidden;
        }
        .left,.right{
            display: none;
        }
    }
    @media (hover: none){
        ::-webkit-scrollbar-track {
            -webkit-box-shadow: none !important;
            background-color: transparent !important;
        }
        ::-webkit-scrollbar {
            height: 0;
            background-color: transparent;
        }
        .carousel{
            overflow: auto none;
        }
        .icon{
            display: none;
        }
        .left,.right{
            display: block;
        }
    }
</style>
<div class="carousel-container">
    <div class="left"></div>
    <svg class="icon previous-item hide" viewBox="4 0 64 64">
        <title>Previous</title>
        <polyline points="48.01 0.35 16.35 32 48.01 63.65"/>
    </svg>
    <div class="carousel">
        <slot></slot>
    </div>
    <svg class="icon next-item hide" viewBox="-6 0 64 64">
        <title>Next</title>
        <polyline points="15.99 0.35 47.65 32 15.99 63.65"/>
    </svg>
    <div class="right"></div>
</div>
`;

customElements.define('sm-carousel', class extends HTMLElement{
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smCarousel.content.cloneNode(true))
    }

    scrollLeft = () => {
        this.carousel.scrollBy({
            top: 0,
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight = () => {
        this.carousel.scrollBy({
            top: 0,
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }

    connectedCallback() {
        this.carousel = this.shadowRoot.querySelector('.carousel')
        this.carouselContainer = this.shadowRoot.querySelector('.carousel-container')
        this.carouselSlot = this.shadowRoot.querySelector('slot')
        this.nextArrow = this.shadowRoot.querySelector('.next-item')
        this.previousArrow = this.shadowRoot.querySelector('.previous-item')
        this.nextGradient = this.shadowRoot.querySelector('.right')
        this.previousGradient = this.shadowRoot.querySelector('.left')
        this.carouselItems
        this.scrollDistance = this.carouselContainer.getBoundingClientRect().width/3
        const firstElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                this.previousArrow.classList.add('hide', 'shrink')
                this.previousGradient.classList.add('hide')
            }
            else {
                this.previousArrow.classList.remove('hide', 'shrink')
                this.previousGradient.classList.remove('hide')
            }
        }, {
            root: this.carouselContainer,
            threshold: 0.9
        })        
        const lastElementObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting){
                this.nextArrow.classList.add('hide', 'shrink')
                this.nextGradient.classList.add('hide')
            }
            else{
                this.nextArrow.classList.remove('hide', 'shrink')
                this.nextGradient.classList.remove('hide')
            }
        }, {
            root: this.carouselContainer,
            threshold: 0.9
        })     
        
        const carouselObserver = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                this.scrollDistance = this.carouselContainer.getBoundingClientRect().width / 3
            }
        })

        carouselObserver.observe(this.carouselContainer)
        
        this.carouselSlot.addEventListener('slotchange', e => {
            this.carouselItems = this.carouselSlot.assignedElements()
            firstElementObserver.observe(this.carouselItems[0])
            lastElementObserver.observe(this.carouselItems[this.carouselItems.length - 1])
        })

        this.addEventListener('keyup', e => {
            if (e.code === 'ArrowLeft')
                this.scrollRight()
            else
                this.scrollRight()
        })

        this.nextArrow.addEventListener('click', this.scrollRight)
        this.previousArrow.addEventListener('click', this.scrollLeft)
    }

    disconnectedCallback() {
        this.nextArrow.removeEventListener('click', this.scrollRight)
        this.previousArrow.removeEventListener('click', this.scrollLeft)
    }
})

//notifications

const smNotifications = document.createElement('template')
smNotifications.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    } 
    :host{
        display: flex;
    }
    .hide{
        opacity: 0 !important;
        pointer-events: none !important;
    }
    .notification-panel{
        display: grid;
        width: 100%;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 100;
        max-height: 100%;
        overflow: hidden auto;
        overscroll-behavior: contain;
    }
    .inner-body{
        padding: 1rem 1.5rem;
    }
    .no-transformations{
        transform: none;
        opacity: 1;
    }
    .notification{
        opacity: 0;
        transform: translateY(-1rem);
        position: relative;
        border-radius: 0.3rem;
        box-shadow: 0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1),
                    0.5rem 1rem 2rem rgba(0, 0, 0, 0.1);
        background: rgba(var(--foreground), 1);
        transition: height 0.3s, transform 0.3s, opacity 0.3s;
        overflow: hidden;
        border-bottom: 1px solid rgba(var(--text), 0.2);
    }
    h4:first-letter,
    p:first-letter{
        text-transform: uppercase;
    }
    h4{
        font-weight: 400;
    }
    p{
        line-height: 1.6;
        color: rgba(var(--text), 0.8);
        overflow-wrap: break-word;
    }
    .notification:last-of-type{
        margin-bottom: 0;
    }
    header{
        display: flex;
        align-items: center;
        margin-bottom: 0.4rem;
        width: 100%;
    }
    .icon {
        fill: none;
        height: 1.6rem;
        width: 1.6rem;
        stroke: rgba(var(--text), 0.7);
        overflow: visible;
        stroke-linecap: round;
        border-radius: 1rem;
        stroke-linejoin: round;
        cursor: pointer;
        min-width: 0;
    }
    .error-icon{
        stroke: #E53935;
    }
    .success-icon{
        stroke: #00C853;
    }
    .close{
        margin-left: auto;
        padding: 0.5rem;
        stroke-width: 10;
    }
    .notification-icon{
        height: 1.2rem;
        width: 1.2rem;
        margin-right: 0.6rem;
        stroke-width: 6;
    }
    @media screen and (min-width: 640px){
        .notification-panel{
            width: 40vw;
        }
        .notification{
            margin-right: 1.5rem;
            margin-bottom: 1rem;
            border-bottom: none;
            border: solid 1px rgba(var(--text), 0.2);
            transform: translateX(1rem);
        }
    }
    @media screen and (max-width: 640px){
        .close{
            display: none
        }
    }
</style>
<div class="notification-panel">
</div>
`

customElements.define('sm-notifications', class extends HTMLElement{
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smNotifications.content.cloneNode(true))
    }

    handleTouchStart = (e) => {
        this.notification = e.target.closest('.notification')
        this.touchStartX = e.changedTouches[0].clientX
        this.notification.style.transition = 'initial'
        this.touchStartTime = e.timeStamp
    }

    handleTouchMove = (e) => {
        if (this.touchStartX < e.changedTouches[0].clientX) {
            this.offset = e.changedTouches[0].clientX - this.touchStartX;
            this.touchEndAnimataion = requestAnimationFrame(this.movePopup)
        }
        else {
            this.offset = -(this.touchStartX - e.changedTouches[0].clientX);
            this.touchEndAnimataion = requestAnimationFrame(this.movePopup)
        }
    }

    handleTouchEnd = (e) => {
        this.notification.style.transition = 'height 0.3s, transform 0.3s, opacity 0.3s'
        this.touchEndTime = e.timeStamp
        cancelAnimationFrame(this.touchEndAnimataion)
        this.touchEndX = e.changedTouches[0].clientX
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndX - this.touchStartX > this.threshold) {
                this.removeNotification(this.notification)
            }
            else if (this.touchStartX - this.touchEndX > this.threshold) {
                this.removeNotification(this.notification, true)
            }
            else {
                this.resetPosition()
            }
        }
        else {
            if (this.touchEndX > this.touchStartX) {
                this.removeNotification(this.notification)
            }
            else {
                this.removeNotification(this.notification, true)
            }
        }
    }

    movePopup = () => {
        this.notification.style.transform = `translateX(${this.offset}px)`
    }

    resetPosition = () => {
        this.notification.style.transform = `translateX(0)`
    }

    push = (messageHeader, messageBody, type ,pinned) => {
        let notification = document.createElement('div'),
            composition = ``;
        notification.classList.add('notification')
        if (pinned)
            notification.classList.add('pinned')
        composition += `
                            <div class="inner-body">
                        <header>
        `
        if (type === 'error') {
            composition += `
            <svg class="notification-icon icon error-icon" viewBox="0 0 64 64">
                    <path d="M32,4.73a3.17,3.17,0,0,1,2.76,1.59l13.9,24.09L62.57,54.49a3.19,3.19,0,0,1-2.76,4.78H4.19a3.19,3.19,0,0,1-2.76-4.78L15.34,30.41,29.24,6.32A3.17,3.17,0,0,1,32,4.73m0-1a4.14,4.14,0,0,0-3.62,2.09L14.47,29.91.57,54a4.19,4.19,0,0,0,3.62,6.28H59.81A4.19,4.19,0,0,0,63.43,54L49.53,29.91,35.62,5.82A4.14,4.14,0,0,0,32,3.73Z"/>
                    <line x1="32" y1="24" x2="32" y2="36"/>
                    <line x1="32" y1="46" x2="32" y2="48"/>
            </svg>`
        }
        else if (type === 'success') {
            composition += `
                <svg class="notification-icon icon success-icon" viewBox="0 0 64 64">
                    <polyline points="0.35 31.82 21.45 52.98 63.65 10.66"/>
                </svg>
            `
        }
        composition += `
                            <h4>${messageHeader}</h4>
                            <svg class="icon close" viewBox="0 0 64 64">
                                <title>Close</title>
                                <line x1="64" y1="0" x2="0" y2="64"/>
                                <line x1="64" y1="64" x2="0" y2="0"/>
                            </svg>
                        </header>
                        <p>${messageBody}</p>
                    </div>`
        notification.innerHTML = composition
        this.notificationPanel.prepend(notification)
        if (window.innerWidth > 640) {
            notification.animate([
                {
                    transform: `translateX(1rem)`,
                    opacity: '0'
                },
                {
                    transform: 'translateX(0)',
                    opacity: '1'
                }
            ], this.animationOptions).onfinish = () => {
                notification.setAttribute('style', `transform: none;`);
            }
        }
        else {
            notification.setAttribute('style', `transform: translateY(0); opacity: 1`)
        }
        notification.addEventListener('touchstart', this.handleTouchStart)
        notification.addEventListener('touchmove', this.handleTouchMove)
        notification.addEventListener('touchend', this.handleTouchEnd)
    }

    removeNotification = (notification, toLeft) => {
        notification.style.height = notification.scrollHeight + 'px';
        if (!this.offset)
            this.offset = 0;
        
        if (toLeft)
            notification.animate([
                {
                    transform: `translateX(${this.offset}px)`,
                    opacity: '1'
                },
                {
                    transform: `translateX(-100%)`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.setAttribute('style', `height: 0; margin-bottom: 0`);
            }
        else {
            notification.animate([
                {
                    transform: `translateX(${this.offset}px)`,
                    opacity: '1'
                },
                {
                    transform: `translateX(100%)`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.setAttribute('style', `height: 0; margin-bottom: 0`);
            }
        }
        setTimeout( () => {
            notification.remove()
        }, this.animationOptions.duration*2)
    }

    connectedCallback() {
        this.notificationPanel = this.shadowRoot.querySelector('.notification-panel')
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: "ease"
        }
        this.fontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
        this.notification
        this.offset
        this.touchStartX = 0
        this.touchEndX = 0
        this.touchStartTime = 0
        this.touchEndTime = 0
        this.threshold = this.notificationPanel.getBoundingClientRect().width * 0.3
        this.touchEndAnimataion;

        this.notificationPanel.addEventListener('click', e => {
            if (e.target.closest('.close'))(
                this.removeNotification(e.target.closest('.notification'))
            )
        })

        const observer = new MutationObserver(mutationList => {
            mutationList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length) {
                        if (!mutation.addedNodes[0].classList.contains('pinned'))
                        setTimeout(() => {
                            this.removeNotification(mutation.addedNodes[0])
                        }, 4000);
                        if (window.innerWidth > 640)
                            this.notificationPanel.style.padding = '1.5rem 0 3rem 1.5rem';
                        else
                            this.notificationPanel.style.padding = '1rem 1rem 2rem 1rem';
                    }
                    else if (mutation.removedNodes.length && !this.notificationPanel.children.length) {
                        this.notificationPanel.style.padding = 0;
                    }
                }
            })
        })
        observer.observe(this.notificationPanel, {
            attributes: true,
            childList: true,
            subtree: true
        })
    }
})