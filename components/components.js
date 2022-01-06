const smButton = document.createElement('template')
smButton.innerHTML = `
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
    width: auto;
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --padding: 0.6rem 1.2rem;
    --border-radius: 0.3rem;
    --background: rgba(var(--text-color), 0.1);
}
:host([variant='primary']) .button{
    background: var(--accent-color);
    color: rgba(var(--background-color), 1);
}
:host([variant='outlined']) .button{
    -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
    background: transparent; 
    color: var(--accent-color);
}
:host([variant='no-outline']) .button{
    background: inherit; 
    color: var(--accent-color);
}
:host([disabled]){
    pointer-events: none;
    cursor: not-allowed;
}
.button {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    padding: var(--padding);
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    border-radius: var(--border-radius); 
    -webkit-box-pack: center; 
        -ms-flex-pack: center; 
            justify-content: center;
    transition: box-shadow 0.3s, background-color 0.3s;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    background-color: var(--background); 
    -webkit-tap-highlight-color: transparent;
    outline: none;
    overflow: hidden;
    border: none;
    color: inherit;
    align-items: center;
}
:host([disabled]) .button{
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.6;
    color: rgba(var(--text-color), 1);
    background-color: rgba(var(--text-color), 0.3);
}
@media (hover: hover){
    :host(:not([disabled])) .button:hover,
    :host(:focus-within:not([disabled])) .button{
        -webkit-box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
        box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
    }
    :host([variant='outlined']:not([disabled])) .button:hover,
    :host(:focus-within[variant='outlined']:not([disabled])) .button:hover{
        -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
                box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.12);
    }
}
@media (hover: none){
    :host(:not([disabled])) .button:active{
        -webkit-box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
                box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
    }
    :host([variant='outlined']) .button:active{
        -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
                box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.4rem 0.8rem rgba(0, 0, 0, 0.2);
    }
}
</style>
<div part="button" class="button">
    <slot></slot>   
</div>`;
customElements.define('sm-button',
    class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            }).append(smButton.content.cloneNode(true));
        }
        static get observedAttributes() {
            return ['disabled'];
        }

        get disabled() {
            return this.hasAttribute('disabled');
        }

        set disabled(value) {
            if (value) {
                this.setAttribute('disabled', '');
            } else {
                this.removeAttribute('disabled');
            }
        }
        focusIn() {
            this.focus();
        }

        handleKeyDown(e) {
            if (!this.hasAttribute('disabled') && (e.key === 'Enter' || e.code === 'Space')) {
                e.preventDefault();
                this.click();
            }
        }

        connectedCallback() {
            if (!this.hasAttribute('disabled')) {
                this.setAttribute('tabindex', '0');
            }
            this.setAttribute('role', 'button');
            this.addEventListener('keydown', this.handleKeyDown);
        }
        attributeChangedCallback(name) {
            if (name === 'disabled') {
                if (this.hasAttribute('disabled')) {
                    this.removeAttribute('tabindex');
                } else {
                    this.setAttribute('tabindex', '0');
                }
                this.setAttribute('aria-disabled', this.hasAttribute('disabled'));
            }
        }
    })
const smCarousel = document.createElement('template')
smCarousel.innerHTML = `
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
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --arrow-left: 1rem;
    --arrow-right: 1rem;
    --arrow-top: auto;
    --arrow-bottom: auto;
    --nav-icon-fill: rgba(var(--background-color), 1);
    --nav-background-color: rgba(var(--text-color), 1);
    --nav-box-shadow: 0 0.2rem 0.2rem #00000020, 0 0.5rem 1rem #00000040;
    --indicator-top: auto;
    --indicator-bottom: -1.5rem;
    --indicator-height: 0.2rem;
    --indicator-width: 0.4rem;
    --indicator-border-radius: 0.4rem;
    --indicators-gap: 0.5rem;
    --active-indicator-color: var(--accent-color);
}
.carousel__button{
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    min-width: 0;
    top:  var(--arrow-top);
    bottom:  var(--arrow-bottom);
    border: none;
    background: var(--nav-background-color);
    -webkit-box-shadow: var(--nav-box-shadow);
            box-shadow:  var(--nav-box-shadow); 
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.3s, opacity 0.3s;
    z-index: 1;
    border-radius: 3rem;
    padding: 0.5rem;
}
button:focus{
    outline: none;
}
button:focus-visible{
    outline: rgba(var(--text-color), 1) 0.1rem solid;
}
.carousel__button:active{
    transform: scale(0.9);
}
.carousel__button--left{
    left: var(--arrow-left);
}
.carousel__button--right{
    right: var(--arrow-right);
}
.icon {
    height: 1.5rem;
    width: 1.5rem;
    fill: var(--nav-icon-fill);
}
.hide{
    display: none !important;
}
:host([indicator]) .carousel-container{
    margin-bottom: 2rem;
}
.carousel-container{
    position: relative;
    display: grid;
    width: 100%;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.carousel{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    max-width: 100%;
    width: 100%;
    overflow: auto hidden;
    -ms-scroll-snap-type: x mandatory;
        scroll-snap-type: x mandatory;
}
.indicators{
    display: -ms-grid;
    display: grid;
    grid-auto-flow: column;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
    position: absolute;
    padding: 0.5rem 0;
    top: var(--indicator-top);
    bottom: var(--indicator-bottom);
    gap: var(--indicators-gap);
    width: 100%;
}
.indicator{
    position: relative;
    height: var(--indicator-height);
    width: var(--indicator-width);
    background: rgba(var(--text-color), 0.3);
    border-radius: var(--indicator-border-radius);
    -webkit-transition: 0.2s;
    -o-transition: 0.2s;
    transition: 0.2s;
    cursor: pointer;
}
.indicator.active{
    -webkit-transform: scale(1.5);
        -ms-transform: scale(1.5);
            transform: scale(1.5);
    background: var(--active-indicator-color);
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
@media (hover: hover){
    .carousel{
        overflow: hidden;
    }
    .carousel__button{
        opacity: 0.8;
    }
    :host(:hover) .carousel__button{
        opacity: 1;
    }
    .left,.right{
        display: none;
    }
    .indicators{
        transition: gap 0.3s;
    }
    .indicators:hover{
        gap: calc(var(--indicators-gap) * 2);
    }
    .indicators:hover .indicator{
        transform: scale(2);
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
    .carousel__button{
        display: none;
    }
    .left,.right{
        display: block;
    }
}
</style>
<div class="carousel-container">
    <button class="carousel__button carousel__button--left hide">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>
    </button>
    <div part="carousel" class="carousel">
        <slot></slot>
    </div>
    <button class="carousel__button carousel__button--right hide">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
    </button>
    <div class="indicators"></div>
</div>
`;

customElements.define('sm-carousel', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smCarousel.content.cloneNode(true))

        this.isAutoPlaying = false
        this.autoPlayInterval = 5000
        this.autoPlayTimeout
        this.initialTimeout
        this.activeSlideNum = 0
        this.carouselItems
        this.indicators
        this.showIndicator = false
        this.carousel = this.shadowRoot.querySelector('.carousel')
        this.carouselContainer = this.shadowRoot.querySelector('.carousel-container')
        this.carouselSlot = this.shadowRoot.querySelector('slot')
        this.navButtonRight = this.shadowRoot.querySelector('.carousel__button--right')
        this.navButtonLeft = this.shadowRoot.querySelector('.carousel__button--left')
        this.indicatorsContainer = this.shadowRoot.querySelector('.indicators')

        this.scrollLeft = this.scrollLeft.bind(this)
        this.scrollRight = this.scrollRight.bind(this)
        this.handleIndicatorClick = this.handleIndicatorClick.bind(this)
        this.showSlide = this.showSlide.bind(this)
        this.nextSlide = this.nextSlide.bind(this)
        this.autoPlay = this.autoPlay.bind(this)
        this.startAutoPlay = this.startAutoPlay.bind(this)
        this.stopAutoPlay = this.stopAutoPlay.bind(this)
    }

    static get observedAttributes() {
        return ['indicator', 'autoplay', 'interval']
    }

    scrollLeft() {
        this.carousel.scrollBy({
            left: -this.scrollDistance,
            behavior: 'smooth'
        })
    }

    scrollRight() {
        this.carousel.scrollBy({
            left: this.scrollDistance,
            behavior: 'smooth'
        })
    }

    showSlide(slideNum) {
        this.carousel.scrollTo({
            left: (this.carouselItems[slideNum].getBoundingClientRect().left - this.carousel.getBoundingClientRect().left + this.carousel.scrollLeft),
            behavior: 'smooth'
        })
    }

    nextSlide() {
        if (!this.carouselItems) return
        let showSlideNo = (this.activeSlideNum + 1) < this.carouselItems.length ? this.activeSlideNum + 1 : 0
        this.showSlide(showSlideNo)
    }

    autoPlay() {
        this.nextSlide()
        if (this.isAutoPlaying) {
            this.autoPlayTimeout = setTimeout(() => {
                this.autoPlay()
            }, this.autoPlayInterval);
        }
    }

    startAutoPlay() {
        this.setAttribute('autoplay', '')
    }

    stopAutoPlay() {
        this.removeAttribute('autoplay')
    }

    createIndicator(index) {
        let indicator = document.createElement('div')
        indicator.classList.add('indicator')
        indicator.dataset.rank = index
        return indicator
    }

    handleIndicatorClick(e) {
        if (e.target.closest('.indicator')) {
            const slideNum = parseInt(e.target.closest('.indicator').dataset.rank)
            if (this.activeSlideNum !== slideNum) {
                this.showSlide(slideNum)
            }
        }
    }

    handleKeyDown(e) {
        if (e.code === 'ArrowLeft')
            this.scrollRight()
        else if (e.code === 'ArrowRight')
            this.scrollRight()
    }

    connectedCallback() {
        let frag = document.createDocumentFragment();

        this.carouselSlot.addEventListener('slotchange', e => {
            this.carouselItems = this.carouselSlot.assignedElements()
            this.carouselItems.forEach(item => allElementsObserver.observe(item))
            if (this.carouselItems.length > 0) {
                firstOptionObserver.observe(this.carouselItems[0])
                lastOptionObserver.observe(this.carouselItems[this.carouselItems.length - 1])
            }
            else {
                navButtonLeft.classList.add('hide')
                navButtonRight.classList.add('hide')
                firstOptionObserver.disconnect()
                lastOptionObserver.disconnect()
            }
            if (this.showIndicator) {
                this.indicatorsContainer.innerHTML = ``
                this.carouselItems.forEach((item, index) => {
                    frag.append(
                        this.createIndicator(index)
                    )
                    item.dataset.rank = index
                })
                this.indicatorsContainer.append(frag)
                this.indicators = this.indicatorsContainer.children
            }
        })

        const IOOoptions = {
            threshold: 0.9,
            root: this
        }
        const allElementsObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (this.showIndicator) {
                    const activeRank = parseInt(entry.target.dataset.rank)
                    if (entry.isIntersecting) {
                        this.indicators[activeRank].classList.add('active')
                        this.activeSlideNum = activeRank
                    }
                    else
                        this.indicators[activeRank].classList.remove('active')
                }
            })
        }, IOOoptions)


        const firstOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.navButtonLeft.classList.add('hide')
                }
                else {
                    this.navButtonLeft.classList.remove('hide')
                }
            })
        },
            IOOoptions
        )
        const lastOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.navButtonRight.classList.add('hide')
                }
                else {
                    this.navButtonRight.classList.remove('hide')
                }
            })
        },
            IOOoptions
        )

        const resObs = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (entry.contentBoxSize) {
                    // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                    const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

                    this.scrollDistance = contentBoxSize.inlineSize * 0.6
                } else {
                    this.scrollDistance = entry.contentRect.width * 0.6
                }
            })
        })
        resObs.observe(this)

        this.addEventListener('keydown', this.handleKeyDown)

        this.navButtonRight.addEventListener('click', this.scrollRight)
        this.navButtonLeft.addEventListener('click', this.scrollLeft)
        this.indicatorsContainer.addEventListener('click', this.handleIndicatorClick)
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'indicator') {
                this.showIndicator = this.hasAttribute('indicator')
            }
            if (name === 'autoplay') {
                if (this.hasAttribute('autoplay')) {
                    this.initialTimeout = setTimeout(() => {
                        this.isAutoPlaying = true
                        this.autoPlay()
                    }, this.autoPlayInterval);
                }
                else {
                    this.isAutoPlaying = false
                    clearTimeout(this.autoPlayTimeout)
                    clearTimeout(this.initialTimeout)
                }

            }
            if (name === 'interval') {
                if (this.hasAttribute('interval') && this.getAttribute('interval').trim() !== '') {
                    this.autoPlayInterval = Math.abs(parseInt(this.getAttribute('interval').trim()))
                }
                else {
                    this.autoPlayInterval = 5000
                }
            }
        }
    }

    disconnectedCallback() {
        this.navButtonRight.removeEventListener('click', this.scrollRight)
        this.navButtonLeft.removeEventListener('click', this.scrollLeft)
        this.indicatorsContainer.removeEventListener('click', this.handleIndicatorClick)
    }
})
const smCheckbox = document.createElement('template')
smCheckbox.innerHTML = `
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
        --height: 1.2rem;
        --width: 1.2rem;
        --border-radius: 0.2rem;
        --border-color: rgba(var(--text-color), 0.7);
    }
    :host([disabled]) {
        opacity: 0.6;
        user-select: none;
        pointer-events: none;
    }
    .checkbox {
        position: relative;
        display:-webkit-box;
        display:-ms-flexbox;
        display:flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
    }
    
    .checkbox:focus-visible{
        outline: auto;
    }
    .checkbox:active .icon,
    .checkbox:focus-within .icon{
        box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
    }
    
    input {
        display: none;
    }
    
    .checkmark {
        stroke-dashoffset: -65;
        stroke-dasharray: 65;
        -webkit-transition: stroke-dashoffset 0.3s; 
        -o-transition: stroke-dashoffset 0.3s; 
        transition: stroke-dashoffset 0.3s;
    }
    
    :host([checked]) .checkmark {
        stroke-dashoffset: 0;
        stroke: rgba(var(--background-color), 1);
    }
    :host([checked]) .icon {
        background: var(--accent-color);
        box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
    }    
    .icon {
        fill: none;
        height: var(--height);
        width: var(--width);
        padding: 0.1rem;
        stroke-width: 8; 
        stroke: var(--border-color);
        overflow: visible;
        stroke-linecap: round;
        stroke-linejoin: round;
        -webkit-transition: background 0.3s;
        -o-transition: background 0.3s;
        transition: background 0.3s;
        border-radius: var(--border-radius);
        box-shadow: 0 0 0 0.1rem var(--border-color) inset;
    }
</style>
<label class="checkbox">
    <svg class="icon" viewBox="0 0 64 64">
        <path class="checkmark" d="M50.52,19.56,26,44.08,13.48,31.56" />
    </svg>
    <slot></slot>
</label>`
customElements.define('sm-checkbox', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smCheckbox.content.cloneNode(true))

        this.defaultState
        this.checkbox = this.shadowRoot.querySelector('.checkbox');

        this.reset = this.reset.bind(this)
        this.dispatch = this.dispatch.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    static get observedAttributes() {
        return ['value', 'disabled', 'checked']
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

    get checked() {
        return this.hasAttribute('checked')
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
        }
        else {
            this.removeAttribute('checked')
        }
    }

    set value(val) {
        this.setAttribute('value', val)
    }

    get value() {
        return this.getAttribute('value')
    }

    focusIn() {
        this.focus()
    }

    reset() {
        this.value = this.defaultState
    }

    dispatch() {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true
        }))
    }
    handleKeyDown(e) {
        if (e.code === "Space") {
            e.preventDefault()
            this.click()
        }
    }
    handleClick(e) {
        this.toggleAttribute('checked')
    }

    connectedCallback() {
        if (!this.hasAttribute('disabled')) {
            this.setAttribute('tabindex', '0')
        }
        this.setAttribute('role', 'checkbox')
        this.defaultState = this.hasAttribute('checked')
        if (!this.hasAttribute('checked')) {
            this.setAttribute('aria-checked', 'false')
        }
        this.addEventListener('keydown', this.handleKeyDown)
        this.addEventListener('click', this.handleClick)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'checked') {
                this.setAttribute('aria-checked', this.hasAttribute('checked'))
                this.dispatch()
            }
            else if (name === 'disabled') {
                if (this.hasAttribute('disabled')) {
                    this.removeAttribute('tabindex')
                }
                else {
                    this.setAttribute('tabindex', '0')
                }
            }
        }
    }
    disconnectedCallback() {
        this.removeEventListener('keydown', this.handleKeyDown)
        this.removeEventListener('change', this.handleClick)
    }
})
const smCopy = document.createElement('template');
smCopy.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}       
:host{
    display: -webkit-box;
    display: flex;
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --padding: 0;
    --background-color: inherit;
    --button-background-color: rgba(var(--text-color), 0.2);
    --button-border-radius: 0.3rem;
}
.copy{
    display: grid;
    width: 100%;
    gap: 0.5rem;
    padding: var(--padding);
    align-items: center;
    grid-template-columns: minmax(0, 1fr) auto;
}
:host(:not([clip-text])) .copy-content{
    overflow-wrap: break-word;
    word-wrap: break-word;
}
:host([clip-text]) .copy-content{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.copy-button{
    display: inline-flex;
    justify-content: center;
    cursor: pointer;
    border: none;
    padding: 0.4rem;
    background-color: inherit;
    border-radius: var(--button-border-radius);
}
.copy-button:active{
    background-color: var(--button-background-color);
}
.icon{
    height: 1.2rem;
    width: 1.2rem;
    fill: rgba(var(--text-color), 0.8);
}
@media (any-hover: hover){
    .copy:hover .copy-button{
        opacity: 1;
    }
    .copy-button{
        opacity: 0.6;
    }
    .copy-button:hover{
        background-color: var(--button-background-color);
    }
}
</style>
<section class="copy">
    <p class="copy-content"></p>
    <button part="button" class="copy-button" title="copy">
        <slot name="copy-icon">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"/></svg>
        </slot>
    </button>
</section>
`;
customElements.define('sm-copy',
    class extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            }).append(smCopy.content.cloneNode(true));

            this.copyContent = this.shadowRoot.querySelector('.copy-content');
            this.copyButton = this.shadowRoot.querySelector('.copy-button');

            this.copy = this.copy.bind(this);
        }
        static get observedAttributes() {
            return ['value'];
        }
        set value(val) {
            this.setAttribute('value', val);
        }
        get value() {
            return this.getAttribute('value');
        }
        fireEvent() {
            this.dispatchEvent(
                new CustomEvent('copy', {
                    composed: true,
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
        copy() {
            navigator.clipboard.writeText(this.copyContent.textContent)
                .then(res => this.fireEvent())
                .catch(err => console.error(err));
        }
        connectedCallback() {
            this.copyButton.addEventListener('click', this.copy);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'value') {
                this.copyContent.textContent = newValue;
            }
        }
        disconnectedCallback() {
            this.copyButton.removeEventListener('click', this.copy);
        }
    });
const fileInput = document.createElement('template')
fileInput.innerHTML = `
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
			--border-radius: 0.3rem;
			--button-color: rgba(var(--background-color), 1);
			--button-font-weight: 500;
			--button-background-color: var(--accent-color);
		}
		.file-input {
			display: flex;
		}
		
		.file-picker-button {
            display: flex;
			cursor: pointer;
			user-select: none;
            align-items: center;
			padding: 0.5rem 0.8rem;
			color: var(--button-color);
			border-radius: var(--border-radius);
			font-weight: var(--button-font-weight);
			background-color: var(--button-background-color);
		}
		.files-preview-wrapper{
			display: grid;
			gap: 0.5rem;
			list-style: none;
		}
		.files-preview-wrapper:not(:empty){
            margin-bottom: 1rem;
		}
		.file-preview{
			display: grid;
            gap: 0.5rem;
            align-items: center;
			padding: 0.5rem 0.8rem;
			border-radius: var(--border-radius);
			background-color: rgba(var(--text-color), 0.06)
		}
		.file-name{
		}
        .file-size{
            font-size: 0.8rem;
            font-weight: 400;
            color: rgba(var(--text-color), 0.8);
        }
		input[type=file] {
			display: none;
		}
  	</style>
	<ul class="files-preview-wrapper"></ul>
  	<label tabindex="0" class="file-input">
		<div class="file-picker-button"><slot>Choose file</slot></div>
		<input type="file">
	</label>
`

customElements.define('file-input', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(fileInput.content.cloneNode(true))
        this.input = this.shadowRoot.querySelector('input')
        this.fileInput = this.shadowRoot.querySelector('.file-input')
        this.filesPreviewWraper = this.shadowRoot.querySelector('.files-preview-wrapper')
        this.reflectedAttributes = ['accept', 'multiple', 'capture']

        this.reset = this.reset.bind(this)
        this.formatBytes = this.formatBytes.bind(this)
        this.createFilePreview = this.createFilePreview.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }
    static get observedAttributes() {
        return ['accept', 'multiple', 'capture']
    }
    get files() {
        return this.input.files
    }
    set accept(val) {
        this.setAttribute('accept', val)
    }
    set multiple(val) {
        if (val) {
            this.setAttribute('mutiple', '')
        }
        else {
            this.removeAttribute('mutiple')
        }
    }
    set capture(val) {
        this.setAttribute('capture', val)
    }
    set value(val) {
        this.input.value = val
    }
    get isValid() {
        return this.input.value !== ''
    }
    reset() {
        this.input.value = ''
        this.filesPreviewWraper.innerHTML = ''
    }
    formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }
    createFilePreview(file) {
        const filePreview = document.createElement('li')
        const { name, size } = file
        filePreview.className = 'file-preview'
        filePreview.innerHTML = `
			<div class="file-name">${name}</div>
            <h5 class="file-size">${this.formatBytes(size)}</h5>
		`
        return filePreview
    }
    handleChange(e) {
        this.filesPreviewWraper.innerHTML = ''
        const frag = document.createDocumentFragment()
        Array.from(e.target.files).forEach(file => {
            frag.append(
                this.createFilePreview(file)
            )
        });
        this.filesPreviewWraper.append(frag)
    }
    handleKeyDown(e) {
        if (e.key === 'Enter' || e.code === 'Space') {
            e.preventDefault()
            this.input.click()
        }
    }
    connectedCallback() {
        this.setAttribute('role', 'button')
        this.setAttribute('aria-label', 'File upload')
        this.input.addEventListener('change', this.handleChange)
        this.fileInput.addEventListener('keydown', this.handleKeyDown)
    }
    attributeChangedCallback(name) {
        if (this.reflectedAttributes.includes(name)) {
            if (this.hasAttribute(name)) {
                this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '')
            }
            else {
                this.input.removeAttribute(name)
            }
        }
    }
    disconnectedCallback() {
        this.input.removeEventListener('change', this.handleChange)
        this.fileInput.removeEventListener('keydown', this.handleKeyDown)
    }
})
const smForm = document.createElement('template');
smForm.innerHTML = `
    <style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :host{
        display: flex;
        width: 100%;
    }
    form{
        display: grid;
        gap: var(--gap, 1.5rem);
        width: 100%;
    }
    </style>
	<form part="form" onsubmit="return false">
		<slot></slot>
	</form>
`;

customElements.define('sm-form', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smForm.content.cloneNode(true))

        this.form = this.shadowRoot.querySelector('form');
        this.formElements
        this.requiredElements
        this.submitButton
        this.resetButton
        this.allRequiredValid = false;

        this.debounce = this.debounce.bind(this)
        this._checkValidity = this._checkValidity.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
        this.reset = this.reset.bind(this)
        this.elementsChanged = this.elementsChanged.bind(this)
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
    _checkValidity() {
        this.allRequiredValid = this.requiredElements.every(elem => elem.isValid)
        if (!this.submitButton) return;
        if (this.allRequiredValid) {
            this.submitButton.disabled = false;
        }
        else {
            this.submitButton.disabled = true;
        }
    }
    handleKeydown(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'SM-TEXTAREA') {
            if (this.allRequiredValid) {
                if (this.submitButton && this.submitButton.tagName === 'SM-BUTTON') {
                    this.submitButton.click()
                }
                this.dispatchEvent(new CustomEvent('submit', {
                    bubbles: true,
                    composed: true,
                }))
            }
            else {
                this.requiredElements.find(elem => !elem.isValid).vibrate()
            }
        }
    }
    reset() {
        this.formElements.forEach(elem => elem.reset())
    }
    elementsChanged() {
        this.formElements = [...this.querySelectorAll('sm-input, sm-textarea, sm-checkbox, tags-input, file-input, sm-switch, sm-radio')]
        this.requiredElements = this.formElements.filter(elem => elem.hasAttribute('required'));
        this.submitButton = this.querySelector('[variant="primary"], [type="submit"]');
        this.resetButton = this.querySelector('[type="reset"]');
        if (this.resetButton) {
            this.resetButton.addEventListener('click', this.reset);
        }
        this._checkValidity()
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot')
        slot.addEventListener('slotchange', this.elementsChanged)
        this.addEventListener('input', this.debounce(this._checkValidity, 100));
        this.addEventListener('keydown', this.debounce(this.handleKeydown, 100));
    }
    disconnectedCallback() {
        this.removeEventListener('input', this.debounce(this._checkValidity, 100));
        this.removeEventListener('keydown', this.debounce(this.handleKeydown, 100));
    }
})

const hamburgerMenu = document.createElement('template')
hamburgerMenu.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
:host{
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --padding: 0 0 3rem 0;
    --backdrop-color: rgba(0,0,0,0.5);
}
.backdrop{
    position: fixed;
}
.side-nav{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.hide{
    display: none !important;
}
@media screen and (max-width: 640px){
    :host{
        position: fixed;
        z-index: 10;
    }
    .side-nav{
        height: 100%;
        overflow-y: auto;  
        width: calc(100% - 4rem);
        transition: transform 0.3s;
        background-color: rgba(var(--background-color), 1);
        box-shadow: 0.5rem 0 2rem rgba(0,0,0, 0.1);
        z-index: 1;
    }
    .side-nav:not(.reveal){
        transform: translateX(-100%);
    }
    .reveal{
        transform: none;
    }
    .backdrop{
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: var(--backdrop-color);
        -webkit-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
    }
}
@media screen and (min-width: 640px){
    .backdrop{
        pointer-events: none;
    }
}
@media (any-hover: hover){
    ::-webkit-scrollbar{
        width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb{
        border-radius: 1rem;
        background: rgba(var(--text-color), 0.3);
        &:hover{
            background: rgba(var(--text-color), 0.5);
        }
    }
}
</style>
<section class="backdrop hide"></section>
<nav class="side-nav">
    <slot></slot>
</nav>
`
class HamburgerMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).append(hamburgerMenu.content.cloneNode(true))

        this.resumeScrolling = this.resumeScrolling.bind(this)
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)

        this.sideNav = this.shadowRoot.querySelector('.side-nav')
        this.backdrop = this.shadowRoot.querySelector('.backdrop')
        this.isOpen = false

        this.animeOptions = {
            duration: 300,
            easing: 'ease'
        }
    }
    static get observedAttributes() {
        return ['open'];
    }
    resumeScrolling() {
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        setTimeout(() => {
            document.body.style.overflow = 'auto';
            document.body.style.top = 'initial'
        }, 300);
    }

    open() {
        if (this.isOpen) return
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${window.scrollY}px`
        this.classList.remove('hide')
        this.sideNav.classList.add('reveal')
        this.backdrop.classList.remove('hide')
        this.backdrop.animate([
            {
                opacity: 0
            },
            {
                opacity: 1
            },
        ],
            this.animeOptions)
            .onfinish = () => {
                this.isOpen = true
                this.setAttribute('open', '')
            }

    }
    close() {
        if (!this.isOpen) return
        this.sideNav.classList.remove('reveal')
        this.backdrop.animate([
            {
                opacity: 1
            },
            {
                opacity: 0
            },
        ],
            this.animeOptions)
            .onfinish = () => {
                this.backdrop.classList.add('hide')
                this.classList.add('hide')
                this.isOpen = false
                this.removeAttribute('open')
            }
    }
    connectedCallback() {
        this.backdrop.addEventListener('click', this.close)
        const resizeObserver = new ResizeObserver(entries => {
            if (window.innerWidth < 640 && this.isOpen) {
                this.classList.remove('hide')
            }
            else {
                this.classList.add('hide')
            }
            if (window.innerWidth > 640) {
                this.classList.remove('hide')
            }
        });
        resizeObserver.observe(this)
    }

    disconnectedCallback() {
        this.backdrop.removeEventListener('click', this.close)
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'open') {
            if (this.hasAttribute('open')) {
                this.open()
            }
        }
    }
}

window.customElements.define('hamburger-menu', HamburgerMenu);
const smInput = document.createElement('template')
smInput.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
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
input::-ms-reveal,
input::-ms-clear {
  display: none;
}
input:invalid{
    outline: none;
    -webkit-box-shadow: none;
            box-shadow: none;
}
::-moz-focus-inner{
border: none;
}
:host{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --success-color: #00C853;
    --danger-color: red;
    --width: 100%;
    --icon-gap: 0.5rem;
    --border-radius: 0.3rem;
    --padding: 0.7rem 1rem;
    --background: rgba(var(--text-color), 0.06);
}
.hide{
   opacity: 0 !important;
   pointer-events: none !important;
}
.hide-completely{
    display: none;
}
.icon {
    fill: rgba(var(--text-color), 0.6);
    height: 1.4rem;
    width: 1.4rem;
    border-radius: 1rem;
    cursor: pointer;
    min-width: 0;
}

:host(.round) .input{
    border-radius: 10rem;
}
.input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: text;
    min-width: 0;
    text-align: left;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    position: relative;
    gap: var(--icon-gap);
    padding: var(--padding);
    border-radius: var(--border-radius);
    -webkit-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s;
    background: var(--background);
    width: 100%;
    outline: none;
}
.input.readonly .clear{
    opacity: 0 !important;
    margin-right: -2rem;
    pointer-events: none !important;
}
.readonly{
    pointer-events: none;
}
.input:focus-within:not(.readonly){
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset !important;
}
.disabled{
    pointer-events: none;
    opacity: 0.6;
}
.label {
    font-size: inherit;
    opacity: .7;
    font-weight: 400;
    position: absolute;
    top: 0;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    -o-transition: transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    -webkit-transform-origin: left;
    -ms-transform-origin: left;
        transform-origin: left;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
       text-overflow: ellipsis;
    width: 100%;
    user-select: none;
    will-change: transform;
}
.outer-container{
    position: relative;
    width: var(--width);
}
.container{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
}    
input{
    font-size: inherit;
    border: none;
    background: transparent;
    outline: none;
    color: rgba(var(--text-color), 1);
    width: 100%;
}
:host(:not([variant="outlined"])) .animate-label .container input {
    -webkit-transform: translateY(0.6rem);
            -ms-transform: translateY(0.6rem);
        transform: translateY(0.6rem);
    }
  
:host(:not([variant="outlined"])) .animate-label .label {
    -webkit-transform: translateY(-0.7em) scale(0.8);
            -ms-transform: translateY(-0.7em) scale(0.8);
        transform: translateY(-0.7em) scale(0.8);
    opacity: 1;
    color: var(--accent-color)
}
:host([variant="outlined"]) .input {
    box-shadow: 0 0 0 0.1rem var(--border-color, rgba(var(--text-color), 0.4)) inset;
    background: rgba(var(--background-color), 1);
}
:host([variant="outlined"]) .label {
    width: max-content;
    margin-left: -0.5rem;
    padding: 0 0.5rem;
}
:host([variant="outlined"]) .animate-label .label {
    -webkit-transform: translate(0.1rem, -1.5rem) scale(0.8);
            -ms-transform: translate(0.1rem, -1.5rem) scale(0.8);
        transform: translate(0.1rem, -1.5rem) scale(0.8);
    opacity: 1;
    background: rgba(var(--background-color), 1);
}
.animate-label:focus-within:not(.readonly) .label{
    color: var(--accent-color)
}
.feedback-text:not(:empty){
    display: flex;
    width: 100%;
    text-align: left;
    font-size: 0.9rem;
    align-items: center;
    padding: 0.8rem 0;
    color: rgba(var(--text-color), 0.8);
}
.success{
    color: var(--success-color);
}
.error{
    color: var(--danger-color);
}
.status-icon{
    margin-right: 0.2rem;
}
.status-icon--error{
    fill: var(--danger-color);
}
.status-icon--success{
    fill: var(--success-color);
}
@media (any-hover: hover){
    .icon:hover{
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="outer-container">
    <label part="input" class="input">
        <slot name="icon"></slot>
        <div class="container">
            <input type="text"/>
            <div part="placeholder" class="label"></div>
        </div>
        <svg class="icon clear hide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/></svg>
    </label>
    <p class="feedback-text"></p>
</div>
`;
customElements.define('sm-input',
    class extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            }).append(smInput.content.cloneNode(true));

            this.inputParent = this.shadowRoot.querySelector('.input');
            this.input = this.shadowRoot.querySelector('input');
            this.clearBtn = this.shadowRoot.querySelector('.clear');
            this.label = this.shadowRoot.querySelector('.label');
            this.feedbackText = this.shadowRoot.querySelector('.feedback-text');
            this.outerContainer = this.shadowRoot.querySelector('.outer-container');
            this._helperText = '';
            this._errorText = '';
            this.isRequired = false;
            this.hideRequired = false;
            this.validationFunction = undefined;
            this.reflectedAttributes = ['value', 'required', 'disabled', 'type', 'inputmode', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step'];

            this.reset = this.reset.bind(this);
            this.focusIn = this.focusIn.bind(this);
            this.focusOut = this.focusOut.bind(this);
            this.fireEvent = this.fireEvent.bind(this);
            this.checkInput = this.checkInput.bind(this);
            this.vibrate = this.vibrate.bind(this);
        }

        static get observedAttributes() {
            return ['value', 'placeholder', 'required', 'disabled', 'type', 'inputmode', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step', 'helper-text', 'error-text', 'hiderequired'];
        }

        get value() {
            return this.input.value;
        }

        set value(val) {
            this.input.value = val;
            this.checkInput();
            this.fireEvent();
        }

        get placeholder() {
            return this.getAttribute('placeholder');
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val);
        }

        get type() {
            return this.getAttribute('type');
        }

        set type(val) {
            this.setAttribute('type', val);
        }

        get validity() {
            return this.input.validity;
        }

        get disabled() {
            return this.hasAttribute('disabled');
        }
        set disabled(value) {
            if (value)
                this.inputParent.classList.add('disabled');
            else
                this.inputParent.classList.remove('disabled');
        }
        get readOnly() {
            return this.hasAttribute('readonly');
        }
        set readOnly(value) {
            if (value) {
                this.setAttribute('readonly', '');
            } else {
                this.removeAttribute('readonly');
            }
        }
        set customValidation(val) {
            this.validationFunction = val;
        }
        set errorText(val) {
            this._errorText = val;
        }
        set helperText(val) {
            this._helperText = val;
        }
        get isValid() {
            if (this.input.value !== '') {
                const _isValid = this.input.checkValidity();
                let _customValid = true;
                if (this.validationFunction) {
                    _customValid = Boolean(this.validationFunction(this.input.value));
                }
                if (_isValid && _customValid) {
                    this.feedbackText.classList.remove('error');
                    this.feedbackText.classList.add('success');
                    this.feedbackText.textContent = '';
                } else {
                    if (this._errorText) {
                        this.feedbackText.classList.add('error');
                        this.feedbackText.classList.remove('success');
                        this.feedbackText.innerHTML = `
                            <svg class="status-icon status-icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/></svg>
                        ${this._errorText}
                        `;
                    }
                }
                return (_isValid && _customValid);
            }
        }
        reset() {
            this.value = '';
        }

        focusIn() {
            this.input.focus();
        }

        focusOut() {
            this.input.blur();
        }

        fireEvent() {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }

        checkInput(e) {
            if (!this.hasAttribute('readonly')) {
                if (this.input.value.trim() !== '') {
                    this.clearBtn.classList.remove('hide');
                } else {
                    this.clearBtn.classList.add('hide');
                    if (this.isRequired && !this.hideRequired) {
                        this.feedbackText.textContent = '*required';
                    }
                }
            }
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder').trim() === '') return;
            if (this.input.value !== '') {
                if (this.animate)
                    this.inputParent.classList.add('animate-label');
                else
                    this.label.classList.add('hide');
            } else {
                if (this.animate)
                    this.inputParent.classList.remove('animate-label');
                else
                    this.label.classList.remove('hide');
            }
        }
        vibrate() {
            this.outerContainer.animate([
                { transform: 'translateX(-1rem)' },
                { transform: 'translateX(1rem)' },
                { transform: 'translateX(-0.5rem)' },
                { transform: 'translateX(0.5rem)' },
                { transform: 'translateX(0)' },
            ], {
                duration: 300,
                easing: 'ease'
            });
        }


        connectedCallback() {
            this.animate = this.hasAttribute('animate');
            this.setAttribute('role', 'textbox');
            this.input.addEventListener('input', this.checkInput);
            this.clearBtn.addEventListener('click', this.reset);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (this.reflectedAttributes.includes(name)) {
                    if (this.hasAttribute(name)) {
                        this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '');
                    }
                    else {
                        this.input.removeAttribute(name);
                    }
                }
                if (name === 'placeholder') {
                    this.label.textContent = newValue;
                    this.setAttribute('aria-label', newValue);
                }
                else if (this.hasAttribute('value')) {
                    this.checkInput();
                }
                else if (name === 'type') {
                    if (this.hasAttribute('type') && this.getAttribute('type') === 'number') {
                        this.input.setAttribute('inputmode', 'numeric');
                    }
                }
                else if (name === 'helper-text') {
                    this._helperText = this.getAttribute('helper-text');
                }
                else if (name === 'error-text') {
                    this._errorText = this.getAttribute('error-text');
                }
                else if (name === 'required') {
                    this.isRequired = this.hasAttribute('required');
                    if (this.isRequired && !this.hideRequired) {
                        this.feedbackText.textContent = '';
                    } else {
                        this.feedbackText.textContent = '*required';
                    }
                    if (this.isRequired) {
                        this.setAttribute('aria-required', 'true');
                    }
                    else {
                        this.setAttribute('aria-required', 'false');
                    }
                }
                else if (name === 'hiderequired') {
                    this.hideRequired = this.hasAttribute('hiderequired')
                }
                else if (name === 'readonly') {
                    if (this.hasAttribute('readonly')) {
                        this.inputParent.classList.add('readonly');
                    } else {
                        this.inputParent.classList.remove('readonly');
                    }
                }
                else if (name === 'disabled') {
                    if (this.hasAttribute('disabled')) {
                        this.inputParent.classList.add('disabled');
                    }
                    else {
                        this.inputParent.classList.remove('disabled');
                    }
                }
            }
        }
        disconnectedCallback() {
            this.input.removeEventListener('input', this.checkInput);
            this.clearBtn.removeEventListener('click', this.reset);
        }
    })
const smMenu = document.createElement('template')
smMenu.innerHTML = `
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

}
.menu{
    display: -ms-grid;
    display: grid;
    place-items: center;
    height: 2rem;
    width: 2rem;
    outline: none;
}
.icon {
    position: absolute;
    fill: rgba(var(--text-color), 0.7);
    height: 2.4rem;
    width: 2.4rem;
    padding: 0.5rem;
    border-radius: 2rem;
    -webkit-transition: background 0.3s;
    -o-transition: background 0.3s;
    transition: background 0.3s;
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
    top: 100%;
    padding: 0.3rem;
    overflow: hidden auto;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-width: -webkit-max-content;
    min-width: -moz-max-content;
    min-width: max-content;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    background: var(--background, rgba(var(--background-color), 1));
    border-radius: var(--border-radius, 0.5rem);
    z-index: 1;
    -webkit-box-shadow: 0 0.5rem 1.5rem -0.5rem rgba(0,0,0,0.3);
            box-shadow: 0 0.5rem 1.5rem -0.5rem rgba(0,0,0,0.3);
    bottom: auto;
}
.hide{
    display: none;
}
@media screen and (max-width: 640px){
    .options{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: auto;
        border-radius: 0.5rem 0.5rem 0 0;
    }
}
@media (hover: hover){
    .menu:hover .icon{
        background: rgba(var(--text-color), 0.1); 
    }
}
</style>
<div class="select">
    <div class="menu" tabindex="0">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
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

        this.isOpen = false;
        this.availableOptions
        this.containerDimensions
        this.animOptions = {
            duration: 200,
            easing: 'ease'
        }

        this.optionList = this.shadowRoot.querySelector('.options')
        this.menu = this.shadowRoot.querySelector('.menu')
        this.icon = this.shadowRoot.querySelector('.icon')

        this.expand = this.expand.bind(this)
        this.collapse = this.collapse.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)

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
    expand() {
        if (!this.isOpen) {
            this.optionList.classList.remove('hide')
            this.optionList.animate([
                {
                    transform: window.innerWidth < 640 ? 'translateY(1.5rem)' : 'translateY(-1rem)',
                    opacity: '0'
                },
                {
                    transform: 'none',
                    opacity: '1'
                },
            ], this.animOptions)
                .onfinish = () => {
                    this.isOpen = true
                    this.icon.classList.add('focused')
                }
        }
    }
    collapse() {
        if (this.isOpen) {
            this.optionList.animate([
                {
                    transform: 'none',
                    opacity: '1'
                },
                {
                    transform: window.innerWidth < 640 ? 'translateY(1.5rem)' : 'translateY(-1rem)',
                    opacity: '0'
                },
            ], this.animOptions)
                .onfinish = () => {
                    this.isOpen = false
                    this.icon.classList.remove('focused')
                    this.optionList.classList.add('hide')
                }
        }
    }
    toggle() {
        if (!this.isOpen) {
            this.expand()
        } else {
            this.collapse()
        }
    }
    handleKeyDown(e) {
        // If key is pressed on menu button
        if (e.target === this) {
            if (e.code === 'ArrowDown') {
                e.preventDefault()
                this.availableOptions[0].focus()
            }
            else if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.toggle()
            }
        } else { // If key is pressed over menu options
            if (e.code === 'ArrowUp') {
                e.preventDefault()
                if (document.activeElement.previousElementSibling) {
                    document.activeElement.previousElementSibling.focus()
                } else {
                    this.availableOptions[this.availableOptions.length - 1].focus()
                }
            }
            else if (e.code === 'ArrowDown') {
                e.preventDefault()
                if (document.activeElement.nextElementSibling) {
                    document.activeElement.nextElementSibling.focus()
                } else {
                    this.availableOptions[0].focus()
                }
            }
            else if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                e.target.click()
            }
        }
    }
    handleClickOutside(e) {
        if (!this.contains(e.target) && e.button !== 2) {
            this.collapse()
        }
    }
    connectedCallback() {
        this.setAttribute('role', 'listbox')
        this.setAttribute('aria-label', 'dropdown menu')
        const slot = this.shadowRoot.querySelector('.options slot')
        slot.addEventListener('slotchange', e => {
            this.availableOptions = e.target.assignedElements()
            this.containerDimensions = this.optionList.getBoundingClientRect()
        });
        this.addEventListener('click', this.toggle)
        this.addEventListener('keydown', this.handleKeyDown)
        document.addEventListener('mousedown', this.handleClickOutside)
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.toggle)
        this.removeEventListener('keydown', this.handleKeyDown)
        document.removeEventListener('mousedown', this.handleClickOutside)
    }
})

// option
const menuOption = document.createElement('template')
menuOption.innerHTML = `
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    min-width: 100%;
    padding: var(--padding, 0.6rem 1rem);
    cursor: pointer;
    overflow-wrap: break-word;
    white-space: nowrap;
    outline: none;
    user-select: none;
    border-radius: 0.3rem;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color), 0.1);
}
@media (any-hover: hover){
    .option{
        transition: background-color 0.2s;
    }
    .option:hover{
        background: rgba(var(--text-color), 0.1);
    }
}
</style>
<div class="option">
    <slot></slot> 
</div>`;
customElements.define('menu-option', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(menuOption.content.cloneNode(true))
    }

    connectedCallback() {
        this.setAttribute('role', 'option')
        this.setAttribute('tabindex', '0')
        this.addEventListener('keyup', e => {
            if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.click()
            }
        })
    }
})
const smNotifications = document.createElement('template')
smNotifications.innerHTML = `
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
        --accent-color: #4d2588;
        --text-color: 17, 17, 17;
        --background-color: 255, 255, 255;
        --danger-color: red;
        --icon-height: 1.5rem;
        --icon-width: 1.5rem;
    }
    .hide{
        opacity: 0 !important;
        pointer-events: none !important;
    }
    .notification-panel{
        display: grid;
        width: 100%;
        gap: 0.5rem;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
        max-height: 100%;
        padding: 1rem;
        overflow: hidden auto;
        -ms-scroll-chaining: none;
            overscroll-behavior: contain;
    }
    .notification-panel:empty{
        display:none;
    }
    .notification{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
        border-radius: 0.3rem;
        background: rgba(var(--background-color), 1);
        overflow: hidden;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        max-width: 100%;
        padding: 1rem;
        align-items: center;
    }
    .icon-container:not(:empty){
        margin-right: 0.5rem;
        height: var(--icon-height);
        width: var(--icon-width);
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
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        color: rgba(var(--text-color), 0.9);
        overflow-wrap: break-word;
        overflow-wrap: break-word;
        word-wrap: break-word;
        -ms-word-break: break-all;
        word-break: break-all;
        word-break: break-word;
        -ms-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;
        max-width: 100%;
    }
    .notification:last-of-type{
        margin-bottom: 0;
    }
    .icon {
        height: 100%;
        width: 100%;
        fill: rgba(var(--text-color), 0.7);
    }
    .icon--success {
        fill: var(--green);
      }
      .icon--failure,
      .icon--error {
        fill: var(--danger-color);
      }
    .close{
        height: 2rem;
        width: 2rem;
        border: none;
        cursor: pointer;
        margin-left: 1rem;
        border-radius: 50%;
        padding: 0.3rem;
        transition: background-color 0.3s, transform 0.3s;
        background-color: transparent;
    }
    .close:active{
        transform: scale(0.9);
    }
    @media screen and (min-width: 640px){
        .notification-panel{
            max-width: 28rem;
            width: max-content;
        }
        .notification{
            width: auto;
            border: solid 1px rgba(var(--text-color), 0.2);
        }
    }
    @media (any-hover: hover){
        ::-webkit-scrollbar{
            width: 0.5rem;
        }
        
        ::-webkit-scrollbar-thumb{
            background: rgba(var(--text-color), 0.3);
            border-radius: 1rem;
            &:hover{
                background: rgba(var(--text-color), 0.5);
            }
        }
        .close:hover{
            background-color: rgba(var(--text-color), 0.1);
        }
    }
</style>
<div class="notification-panel"></div>
`

customElements.define('sm-notifications', class extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        }).append(smNotifications.content.cloneNode(true))

        this.notificationPanel = this.shadowRoot.querySelector('.notification-panel')
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }

        this.push = this.push.bind(this)
        this.createNotification = this.createNotification.bind(this)
        this.removeNotification = this.removeNotification.bind(this)
        this.clearAll = this.clearAll.bind(this)

    }

    randString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    createNotification(message, options = {}) {
        const { pinned = false, icon = '' } = options;
        const notification = document.createElement('div')
        notification.id = this.randString(8)
        notification.classList.add('notification');
        let composition = ``;
        composition += `
            <div class="icon-container">${icon}</div>
            <p>${message}</p>
            `;
        if (pinned) {
            notification.classList.add('pinned');
            composition += `
                <button class="close">
                    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                </button>
            `;
        }
        notification.innerHTML = composition;
        return notification;
    }

    push(message, options = {}) {
        const notification = this.createNotification(message, options);
        this.notificationPanel.append(notification);
        notification.animate([
            {
                transform: `translateY(1rem)`,
                opacity: '0'
            },
            {
                transform: `none`,
                opacity: '1'
            },
        ], this.animationOptions);
        return notification.id;
    }

    removeNotification(notification) {
        notification.animate([
            {
                transform: `none`,
                opacity: '1'
            },
            {
                transform: `translateY(0.5rem)`,
                opacity: '0'
            }
        ], this.animationOptions).onfinish = () => {
            notification.remove();
        };
    }

    clearAll() {
        Array.from(this.notificationPanel.children).forEach(child => {
            this.removeNotification(child);
        });
    }

    connectedCallback() {
        this.notificationPanel.addEventListener('click', e => {
            if (e.target.closest('.close')) {
                this.removeNotification(e.target.closest('.notification'));
            }
        });

        const observer = new MutationObserver(mutationList => {
            mutationList.forEach(mutation => {
                if (mutation.type === 'childList') {
                    if (mutation.addedNodes.length && !mutation.addedNodes[0].classList.contains('pinned')) {
                        setTimeout(() => {
                            this.removeNotification(mutation.addedNodes[0]);
                        }, 5000);
                    }
                }
            });
        });
        observer.observe(this.notificationPanel, {
            childList: true,
        });
    }
});

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
            return "Underflow";
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
}
const popupStack = new Stack();

const smPopup = document.createElement('template');
smPopup.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
:host{
    position: fixed;
    display: -ms-grid;
    display: grid;
    z-index: 10;
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --width: 100%;
    --height: auto;
    --min-width: auto;
    --min-height: auto;
    --backdrop-background: rgba(0, 0, 0, 0.6);
    --border-radius: 0.8rem 0.8rem 0 0;
}
.popup-container{
    display: -ms-grid;
    display: grid;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    place-items: center;
    z-index: 10;
    touch-action: none;
}
:host(.stacked) .popup{
    -webkit-transform: scale(0.9) translateY(-2rem) !important;
            transform: scale(0.9) translateY(-2rem) !important;
}
.background{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    background: var(--backdrop-background);
    -webkit-transition: opacity 0.3s;
    -o-transition: opacity 0.3s;
    transition: opacity 0.3s;
}
.popup{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
            flex-direction: column;
    position: relative;
    -ms-flex-item-align: end;
        align-self: flex-end;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    width: var(--width);
    min-width: var(--min-width);
    height: var(--height);
    min-height: var(--min-height);
    max-height: 90vh;
    border-radius: var(--border-radius);
    background: rgba(var(--background-color), 1);
    -webkit-box-shadow: 0 -1rem 2rem #00000020;
            box-shadow: 0 -1rem 2rem #00000020;
}
.container-header{
    display: -webkit-box;
    display: flex;
    width: 100%;
    touch-action: none;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.popup-top{
    display: -webkit-box;
    display: flex;
    width: 100%;
}
.popup-body{
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
        -ms-flex-direction: column;
            flex-direction: column;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    width: 100%;
    padding: var(--body-padding, 1.5rem);
    overflow-y: auto;
}
.hide{
    display:none;
}
@media screen and (min-width: 640px){
    :host{
        --border-radius: 0.5rem;
    }
    .popup{
        -ms-flex-item-align: center;
            -ms-grid-row-align: center;
            align-self: center;
        border-radius: var(--border-radius);
        height: var(--height);
        -webkit-box-shadow: 0 3rem 2rem -0.5rem #00000040;
                box-shadow: 0 3rem 2rem -0.5rem #00000040;
    }
}
@media screen and (max-width: 640px){
    .popup-top{
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
                flex-direction: column;
        -webkit-box-align: center;
                align-items: center;
    }
    .handle{
        height: 0.3rem;
        width: 2rem;
        background: rgba(var(--text-color), .4);
        border-radius: 1rem;
        margin: 0.5rem 0;
    }
}
@media (any-hover: hover){
    ::-webkit-scrollbar{
        width: 0.5rem;
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
<div class="popup-container hide" role="dialog">
    <div part="background" class="background"></div>
    <div part="popup" class="popup">
        <div part="popup-header" class="popup-top">
            <div class="handle"></div>
            <slot name="header"></slot>
        </div>
        <div part="popup-body" class="popup-body">
            <slot></slot>
        </div>
    </div>
</div>
`;
customElements.define('sm-popup', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(smPopup.content.cloneNode(true));

        this.allowClosing = false;
        this.isOpen = false;
        this.pinned = false;
        this.offset = 0;
        this.touchStartY = 0;
        this.touchEndY = 0;
        this.touchStartTime = 0;
        this.touchEndTime = 0;
        this.touchEndAnimation = undefined;
        this.focusable
        this.autoFocus
        this.mutationObserver

        this.popupContainer = this.shadowRoot.querySelector('.popup-container');
        this.backdrop = this.shadowRoot.querySelector('.background');
        this.popup = this.shadowRoot.querySelector('.popup');
        this.popupBodySlot = this.shadowRoot.querySelector('.popup-body slot');
        this.popupHeader = this.shadowRoot.querySelector('.popup-top');

        this.resumeScrolling = this.resumeScrolling.bind(this);
        this.setStateOpen = this.setStateOpen.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.detectFocus = this.detectFocus.bind(this);
    }

    static get observedAttributes() {
        return ['open'];
    }

    get open() {
        return this.isOpen;
    }

    animateTo(element, keyframes, options) {
        const anime = element.animate(keyframes, { ...options, fill: 'both' })
        anime.finished.then(() => {
            anime.commitStyles()
            anime.cancel()
        })
        return anime
    }

    resumeScrolling() {
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        document.body.style.overflow = 'auto';
        document.body.style.top = 'initial';
    }

    setStateOpen() {
        if (!this.isOpen || this.offset) {
            const animOptions = {
                duration: 300,
                easing: 'ease'
            }
            const initialAnimation = (window.innerWidth > 640) ? 'scale(1.1)' : `translateY(${this.offset ? `${this.offset}px` : '100%'})`
            this.animateTo(this.popup, [
                {
                    opacity: this.offset ? 1 : 0,
                    transform: initialAnimation
                },
                {
                    opacity: 1,
                    transform: 'none'
                },
            ], animOptions)

        }
    }

    show(options = {}) {
        const { pinned = false } = options;
        if (!this.isOpen) {
            const animOptions = {
                duration: 300,
                easing: 'ease'
            }
            if (popupStack) {
                popupStack.push({
                    popup: this,
                    permission: pinned
                });
                if (popupStack.items.length > 1) {
                    this.animateTo(popupStack.items[popupStack.items.length - 2].popup.shadowRoot.querySelector('.popup'), [
                        { transform: 'none' },
                        { transform: 'translateY(-1.5rem) scale(0.9)' },
                    ], animOptions)
                }
            }
            this.popupContainer.classList.remove('hide');
            if (!this.offset)
                this.backdrop.animate([
                    { opacity: 0 },
                    { opacity: 1 },
                ], animOptions)
            this.setStateOpen()
            this.dispatchEvent(
                new CustomEvent("popupopened", {
                    bubbles: true,
                    detail: {
                        popup: this,
                    }
                })
            );
            this.pinned = pinned;
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
            document.body.style.top = `-${window.scrollY}px`;
            const elementToFocus = this.autoFocus || this.focusable[0];
            elementToFocus.tagName.includes('SM-') ? elementToFocus.focusIn() : elementToFocus.focus();
            if (!this.hasAttribute('open'))
                this.setAttribute('open', '');
        }
    }
    hide() {
        const animOptions = {
            duration: 150,
            easing: 'ease'
        }
        this.backdrop.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], animOptions)
        this.animateTo(this.popup, [
            {
                opacity: 1,
                transform: (window.innerWidth > 640) ? 'none' : `translateY(${this.offset ? `${this.offset}px` : '0'})`
            },
            {
                opacity: 0,
                transform: (window.innerWidth > 640) ? 'scale(1.1)' : 'translateY(100%)'
            },
        ], animOptions).finished
            .finally(() => {
                this.popupContainer.classList.add('hide');
                this.popup.style = ''
                this.removeAttribute('open');
                if (typeof popupStack !== 'undefined') {
                    popupStack.pop();
                    if (popupStack.items.length) {
                        this.animateTo(popupStack.items[popupStack.items.length - 1].popup.shadowRoot.querySelector('.popup'), [
                            { transform: 'translateY(-1.5rem) scale(0.9)' },
                            { transform: 'none' },
                        ], animOptions)

                    } else {
                        this.resumeScrolling();
                    }
                } else {
                    this.resumeScrolling();
                }

                if (this.forms.length) {
                    this.forms.forEach(form => form.reset());
                }
                this.dispatchEvent(
                    new CustomEvent("popupclosed", {
                        bubbles: true,
                        detail: {
                            popup: this,
                        }
                    })
                );
                this.isOpen = false;
            })
    }

    handleTouchStart(e) {
        this.offset = 0
        this.popupHeader.addEventListener('touchmove', this.handleTouchMove, { passive: true });
        this.popupHeader.addEventListener('touchend', this.handleTouchEnd, { passive: true });
        this.touchStartY = e.changedTouches[0].clientY;
        this.touchStartTime = e.timeStamp;
    }

    handleTouchMove(e) {
        if (this.touchStartY < e.changedTouches[0].clientY) {
            this.offset = e.changedTouches[0].clientY - this.touchStartY;
            this.touchEndAnimation = window.requestAnimationFrame(() => {
                this.popup.style.transform = `translateY(${this.offset}px)`;
            });
        }
    }

    handleTouchEnd(e) {
        this.touchEndTime = e.timeStamp;
        cancelAnimationFrame(this.touchEndAnimation);
        this.touchEndY = e.changedTouches[0].clientY;
        this.threshold = this.popup.getBoundingClientRect().height * 0.3;
        if (this.touchEndTime - this.touchStartTime > 200) {
            if (this.touchEndY - this.touchStartY > this.threshold) {
                if (this.pinned) {
                    this.setStateOpen();
                    return;
                } else
                    this.hide();
            } else {
                this.setStateOpen();
            }
        } else {
            if (this.touchEndY > this.touchStartY)
                if (this.pinned) {
                    this.setStateOpen();
                    return;
                }
                else
                    this.hide();
        }
        this.popupHeader.removeEventListener('touchmove', this.handleTouchMove, { passive: true });
        this.popupHeader.removeEventListener('touchend', this.handleTouchEnd, { passive: true });
    }


    detectFocus(e) {
        if (e.code === 'Tab') {
            const lastElement = this.focusable[this.focusable.length - 1];
            const firstElement = this.focusable[0];
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.tagName.includes('SM-') ? lastElement.focusIn() : lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.tagName.includes('SM-') ? firstElement.focusIn() : firstElement.focus();
            }
        }
    }

    updateFocusableList() {
        this.focusable = this.querySelectorAll('sm-button:not([disabled]), button:not([disabled]), [href], sm-input, input, sm-select, select, sm-checkbox, sm-textarea, textarea, [tabindex]:not([tabindex="-1"])')
        this.autoFocus = this.querySelector('[autofocus]')
    }

    connectedCallback() {
        this.popupBodySlot.addEventListener('slotchange', () => {
            this.forms = this.querySelectorAll('sm-form');
            this.updateFocusableList()
        });
        this.popupContainer.addEventListener('mousedown', e => {
            if (e.target === this.popupContainer && !this.pinned) {
                if (this.pinned) {
                    this.setStateOpen();
                } else
                    this.hide();
            }
        });

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.contentBoxSize) {
                    // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                    const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
                    this.threshold = contentBoxSize.blockSize.height * 0.3;
                } else {
                    this.threshold = entry.contentRect.height * 0.3;
                }
            }
        });
        resizeObserver.observe(this);

        this.mutationObserver = new MutationObserver(entries => {
            this.updateFocusableList()
        })
        this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true })

        this.addEventListener('keydown', this.detectFocus);
        this.popupHeader.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    }
    disconnectedCallback() {
        this.removeEventListener('keydown', this.detectFocus);
        resizeObserver.unobserve();
        this.mutationObserver.disconnect()
        this.popupHeader.removeEventListener('touchstart', this.handleTouchStart, { passive: true });
    }
    attributeChangedCallback(name) {
        if (name === 'open') {
            if (this.hasAttribute('open')) {
                this.show();
            }
        }
    }
});
const smRadio = document.createElement('template')
smRadio.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }  
    :host{
        --accent-color: #4d2588;
        --text-color: 17, 17, 17;
        --background-color: 255, 255, 255;
        --gap: 0.5rem;
        --height: 1.4rem;
    }
    :host([disabled]) {
        opacity: 0.6;
        user-select: none;
        pointer-events: none;
    }
    .hide{
        display: none !important;
    }
    .radio{
        display: flex;
        cursor: pointer;
    }
    .radio__button{
        position: relative;
        height: var(--height);
        width: var(--height);
        overflow: visible;
        padding: 0.1rem;
    }
    .outer-disc{
        fill: none;
        stroke-width: 3;
        stroke: rgba(var(--text-color), 0.7);
    }
    .inner-disc{
        fill: var(--accent-color);
        transition: transform 0.3s;
        transform: scale(0);
        transform-origin: center;
    }
    :host([checked]) .outer-disc{
        stroke: var(--accent-color);
    }
    :host([checked]) .inner-disc{
        transform: scale(1);
    }

    @media (any-hover: hover){
    }
</style>
<div class="radio">
    <slot name="left"></slot>
    <svg class="radio__button" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="outer-disc" cx="12" cy="12" r="11"/><circle class="inner-disc" cx="12" cy="12" r="6"/></svg>
    <slot></slot>
</div>
`
window.customElements.define('sm-radio', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(smRadio.content.cloneNode(true))

        this.radio = this.shadowRoot.querySelector('.radio');

        this.reset = this.reset.bind(this)
        this.dispatchChangeEvent = this.dispatchChangeEvent.bind(this)
        this.dispatchGroupEvent = this.dispatchGroupEvent.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleRadioGroup = this.handleRadioGroup.bind(this)

        this.uniqueId
        this.options
    }
    static get observedAttributes() {
        return ['value', 'disabled', 'checked']
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

    get checked() {
        return this.hasAttribute('checked')
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
        }
        else {
            this.removeAttribute('checked')
        }
    }

    set value(val) {
        this.setAttribute('value', val)
    }

    get value() {
        return this.getAttribute('value')
    }

    reset() {
        this.removeAttribute('checked')
    }

    dispatchChangeEvent() {
        this.dispatchEvent(new CustomEvent('change', this.options))
    }
    dispatchGroupEvent() {
        if (this.hasAttribute('name') && this.getAttribute('name').trim() !== '') {
            this.dispatchEvent(new CustomEvent(`changed${this.getAttribute('name')}`, this.options))
        }
    }
    handleKeyDown(e) {
        if (e.code === "Space") {
            e.preventDefault()
            this.handleClick()
        }
    }
    handleClick() {
        if (!this.hasAttribute('checked')) {
            this.setAttribute('checked', '')
            this.dispatchGroupEvent()
        }

    }
    handleRadioGroup(e) {
        if (e.detail.uid !== this.uniqueId) {
            this.reset()
        }
    }
    randString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    connectedCallback() {
        this.uniqueId = this.randString(8)
        this.options = {
            bubbles: true,
            composed: true,
            detail: {
                uid: this.uniqueId,
                value: this.value,
            }
        }
        if (!this.hasAttribute('disabled')) {
            this.setAttribute('tabindex', '0')
        }
        this.setAttribute('role', 'radio')
        if (!this.hasAttribute('checked')) {
            this.setAttribute('aria-checked', 'false')
        }
        this.addEventListener('keydown', this.handleKeyDown)
        this.addEventListener('click', this.handleClick)
        if (this.hasAttribute('name') && this.getAttribute('name').trim() !== '') {
            document.addEventListener(`changed${this.getAttribute('name')}`, this.handleRadioGroup)
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'checked') {
                this.dispatchChangeEvent()
            }
            else if (name === 'disabled') {
                if (this.hasAttribute('disabled')) {
                    this.removeAttribute('tabindex')
                }
                else {
                    this.setAttribute('tabindex', '0')
                }
            }
        }
    }
    disconnectedCallback() {
        this.removeEventListener('keydown', this.handleKeyDown)
        this.removeEventListener('change', this.handleClick)
    }
});
const smSwitch = document.createElement('template')
smSwitch.innerHTML = `	
<style>
    *{
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    
    :host{
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        --accent-color: #4d2588;
        --text-color: 17, 17, 17;
        --background-color: 255, 255, 255;
    }
    label{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        width: 100%;
        outline: none;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.6;
        pointer-events: none;
    }
    .switch {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        width: 2.4rem;
        flex-shrink: 0;
        margin-left: auto;
        padding: 0.2rem;
        cursor: pointer;
        border-radius: 2rem;
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
        -o-transition: background 0.3s;
        transition: background 0.3s;
        background: rgba(var(--text-color), 0.4);
        -webkit-box-shadow: 0 0.1rem 0.3rem #00000040 inset;
                box-shadow: 0 0.1rem 0.3rem #00000040 inset;
        border-radius: 1rem;
    }
    
    label:active .thumb::after,
    label:focus-within .thumb::after{
        opacity: 1;
    }
    
    .thumb::after{
        content: '';
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: absolute;
        height: 2.6rem;
        width: 2.6rem;
        background: rgba(var(--text-color), 0.2);
        border-radius: 2rem;
        opacity: 0;
        -webkit-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
    }
    
    .thumb {
        position: relative;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        height: 1rem;
        width: 1rem;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        border-radius: 1rem;
        -webkit-box-shadow: 0 0.1rem 0.4rem #00000060;
                box-shadow: 0 0.1rem 0.4rem #00000060;
        -webkit-transition: -webkit-transform 0.3s;
        transition: -webkit-transform 0.3s;
        -o-transition: transform 0.3s;
        transition: transform 0.3s;
        transition: transform 0.3s, -webkit-transform 0.3s;
        border: solid 0.3rem white;
    }
    
    input:checked ~ .thumb {
        -webkit-transform: translateX(100%);
            -ms-transform: translateX(100%);
                transform: translateX(100%);
    }
    
    input:checked ~ .track {
        background: var(--accent-color);
    }
</style>
<label tabindex="0">
    <slot name="left"></slot>
    <div part="switch" class="switch">
        <input type="checkbox">
        <div class="track"></div>
        <div class="thumb"></div>
    </div>
    <slot name="right"></slot>
</label>`

customElements.define('sm-switch', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smSwitch.content.cloneNode(true))
        this.switch = this.shadowRoot.querySelector('.switch');
        this.input = this.shadowRoot.querySelector('input')
        this.isChecked = false
        this.isDisabled = false

        this.dispatch = this.dispatch.bind(this)
    }

    static get observedAttributes() {
        return ['disabled', 'checked']
    }

    get disabled() {
        return this.isDisabled
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '')
        } else {
            this.removeAttribute('disabled')
        }
    }

    get checked() {
        return this.isChecked
    }

    set checked(value) {
        if (value) {
            this.setAttribute('checked', '')
        } else {
            this.removeAttribute('checked')
        }
    }

    reset() {

    }

    dispatch() {
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: {
                value: this.isChecked
            }
        }))
    }

    connectedCallback() {
        this.addEventListener('keydown', e => {
            if (e.code === "Space" && !this.isDisabled) {
                e.preventDefault()
                this.input.click()
            }
        })
        this.input.addEventListener('click', e => {
            if (this.input.checked)
                this.checked = true
            else
                this.checked = false
            this.dispatch()
        })
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (this.hasAttribute('disabled')) {
                    this.disabled = true
                }
                else {
                    this.disabled = false
                }
            }
            else if (name === 'checked') {
                if (this.hasAttribute('checked')) {
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
    fill: rgba(var(--text-color), 0.7);
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
    padding: 0.4rem 0.8rem;
    background: rgba(var(--text-color), 0.06);
    border: solid 1px rgba(var(--text-color), 0.2);
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    outline: none;
    z-index: 2;
}
.selection:focus{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color) 
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
    min-width: var(--min-width);
    max-height: var(--max-height);
    background: rgba(var(--background-color), 1);
    border: solid 1px rgba(var(--text-color), 0.2);
    border-radius: var(--border-radius, 0.5rem);
    z-index: 1;
    -webkit-box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
            box-shadow: 0.4rem 0.8rem 1.2rem #00000030;
}
.rotate{
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
        background: rgba(var(--text-color), 0.3);
        border-radius: 1rem;
        &:hover{
            background: rgba(var(--text-color), 0.5);
        }
    }
}
</style>
<div class="select">
    <div class="selection">
        <div class="selected-option-text"></div>
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

        this.focusIn = this.focusIn.bind(this)
        this.reset = this.reset.bind(this)
        this.open = this.open.bind(this)
        this.collapse = this.collapse.bind(this)
        this.toggle = this.toggle.bind(this)
        this.handleOptionsNavigation = this.handleOptionsNavigation.bind(this)
        this.handleOptionSelection = this.handleOptionSelection.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)

        this.availableOptions
        this.previousOption
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
        this.chevron = this.shadowRoot.querySelector('.toggle')
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
        this.setAttribute('value', val)
    }

    reset(fire = true) {
        if (this.availableOptions[0] && this.previousOption !== this.availableOptions[0]) {
            const firstElement = this.availableOptions[0];
            if (this.previousOption) {
                this.previousOption.classList.remove('check-selected')
            }
            firstElement.classList.add('check-selected')
            this.value = firstElement.getAttribute('value')
            this.selectedOptionText.textContent = `${this.label}${firstElement.textContent}`
            this.previousOption = firstElement;
            if (fire) {
                this.fireEvent()
            }
        }
    }

    focusIn() {
        this.selection.focus()
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
        if (e.code === 'ArrowUp') {
            e.preventDefault()
            if (document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus()
            } else {
                this.availableOptions[this.availableOptions.length - 1].focus()
            }
        }
        else if (e.code === 'ArrowDown') {
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
            this.selectedOptionText.textContent = `${this.label}${document.activeElement.textContent}`;
            this.fireEvent()
            if (this.previousOption) {
                this.previousOption.classList.remove('check-selected')
            }
            document.activeElement.classList.add('check-selected')
            this.previousOption = document.activeElement
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
            if (this.isOpen && e.code === 'ArrowDown') {
                e.preventDefault()
                this.availableOptions[0].focus()
                this.handleOptionSelection(e)
            }
            else if (e.code === 'Enter' || e.code === 'Space') {
                e.preventDefault()
                this.toggle()
            }
        }
        else {
            this.handleOptionsNavigation(e)
            this.handleOptionSelection(e)
            if (e.code === 'Enter' || e.code === 'Space') {
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
    min-width: max-content;
    width: 100%;
    gap: 0.5rem;
    grid-template-columns: max-content minmax(0, 1fr);
    padding: var(--padding, 0.6rem 1rem);
    cursor: pointer;
    white-space: nowrap;
    outline: none;
    user-select: none;
    border-radius: var(--border-radius, 0.3rem);
}
:host(:focus){
    outline: none;
    background: rgba(var(--text-color), 0.1);
}
.icon {
    opacity: 0;
    height: 1.2rem;
    width: 1.2rem;
    fill: rgba(var(--text-color), 0.8);
}
:host(:focus) .option .icon{
    opacity: 0.4
}
:host(.check-selected) .icon{
    opacity: 1
}
@media (hover: hover){
    .option:hover{
        background: rgba(var(--text-color), 0.1);
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
const spinner = document.createElement('template');
spinner.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}
:host{
    --accent-color: #4d2588;
    --height: 1.6rem;
    --width: 1.6rem;
}
.loader {
    height: var(--height);
    width: var(--weight);
    stroke-width: 8;
    overflow: visible;
    stroke: var(--accent-color);
    fill: none;
    stroke-dashoffset: 180;
    stroke-dasharray: 180;
    animation: load 2s infinite, spin 1s linear infinite;
}
@keyframes load {
    50% {
        stroke-dashoffset: 0;
    }
    100%{
        stroke-dashoffset: -180;
    }
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
<svg viewBox="0 0 64 64" class="loader"><circle cx="32" cy="32" r="32" /></svg>

`;
class SpinnerLoader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(spinner.content.cloneNode(true));
    }
}
window.customElements.define('sm-spinner', SpinnerLoader);
const stripSelect = document.createElement('template');
stripSelect.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }  
    :host{
        --accent-color: #4d2588;
        --text-color: 17, 17, 17;
        --background-color: 255, 255, 255;
        padding: 1rem 0;
    }
    .hide{
        display: none !important;
    }
    input[type="radio"]{
        display: none;
    }
    .scrolling-container{
        position: relative;
        display: flex;
        align-items: center;
    }
    .strip-select{
        position: relative;
    }
    :host([multiline]) .strip-select{
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap, 0.5rem);
        overflow: auto hidden;
    }
    :host(:not([multiline])) .strip-select{
        display: grid;
        grid-auto-flow: column;
        gap: var(--gap, 0.5rem);
        max-width: 100%;   
        align-items: center;
        overflow: auto hidden;
    }
    .nav-button{
        display: flex;
        top: 50%;
        z-index: 2;
        border: none;
        padding: 0.3rem;
        cursor: pointer;
        position: absolute;
        align-items: center;
        background: rgba(var(--background-color), 1);
        transform: translateY(-50%);
    }
    .nav-button--right{
        right: 0;
    }
    .cover{
        position: absolute;
        z-index: 1;
        width: 5rem;
        height: 100%;
        pointer-events: none;
    }
    .nav-button--right::before{
        background-color: red;
    }
    .icon{
        height: 1.5rem;
        width: 1.5rem;
        fill: rgba(var(--text-color), .8);
    }
    @media (hover: none){
        ::-webkit-scrollbar {
            height: 0;
        }
        .nav-button{
            display: none;
        }
        .strip-select{
            overflow: auto hidden;
        }
        .cover{
            width: 2rem;
        }
        .cover--left{
            background: linear-gradient(90deg, rgba(var(--background-color), 1), transparent);
        }
        .cover--right{
            right: 0;
            background: linear-gradient(90deg, transparent, rgba(var(--background-color), 1));
        }
    }
    @media (hover: hover){
        ::-webkit-scrollbar-track {
            background-color: transparent !important;
        }
        ::-webkit-scrollbar {
            height: 0;
            background-color: transparent;
        }
        .strip-select{
            overflow: hidden;
        }
        .cover--left{
            background: linear-gradient(90deg, rgba(var(--background-color), 1) 60%, transparent);
        }
        .cover--right{
            right: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(var(--background-color), 1) 40%);
        }
    }
</style>
<section class="scrolling-container">
    <div class="cover cover--left hide"></div>
    <button class="nav-button nav-button--left hide">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>
    </button>
    <section class="strip-select">
        <slot></slot>
    </section>
    <button class="nav-button nav-button--right hide">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
    </button>
    <div class="cover cover--right hide"></div>
</section>

`;
customElements.define('strip-select', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(stripSelect.content.cloneNode(true));
        this.stripSelect = this.shadowRoot.querySelector('.strip-select');
        this.slottedOptions = undefined;
        this._value = undefined;
        this.scrollDistance = 0;

        this.scrollLeft = this.scrollLeft.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.fireEvent = this.fireEvent.bind(this);
    }
    get value() {
        return this._value;
    }
    scrollLeft() {
        this.stripSelect.scrollBy({
            left: -this.scrollDistance,
            behavior: 'smooth'
        });
    }

    scrollRight() {
        this.stripSelect.scrollBy({
            left: this.scrollDistance,
            behavior: 'smooth'
        });
    }
    fireEvent() {
        this.dispatchEvent(
            new CustomEvent("change", {
                bubbles: true,
                composed: true,
                detail: {
                    value: this._value
                }
            })
        );
    }
    connectedCallback() {
        this.setAttribute('role', 'listbox');

        const slot = this.shadowRoot.querySelector('slot');
        const coverLeft = this.shadowRoot.querySelector('.cover--left');
        const coverRight = this.shadowRoot.querySelector('.cover--right');
        const navButtonLeft = this.shadowRoot.querySelector('.nav-button--left');
        const navButtonRight = this.shadowRoot.querySelector('.nav-button--right');
        slot.addEventListener('slotchange', e => {
            const assignedElements = slot.assignedElements();
            assignedElements.forEach(elem => {
                if (elem.hasAttribute('selected')) {
                    elem.setAttribute('active', '');
                    this._value = elem.value;
                }
            });
            if (!this.hasAttribute('multiline')) {
                if (assignedElements.length > 0) {
                    firstOptionObserver.observe(slot.assignedElements()[0]);
                    lastOptionObserver.observe(slot.assignedElements()[slot.assignedElements().length - 1]);
                }
                else {
                    navButtonLeft.classList.add('hide');
                    navButtonRight.classList.add('hide');
                    coverLeft.classList.add('hide');
                    coverRight.classList.add('hide');
                    firstOptionObserver.disconnect();
                    lastOptionObserver.disconnect();
                }
            }
        });
        const resObs = new ResizeObserver(entries => {
            entries.forEach(entry => {
                if (entry.contentBoxSize) {
                    // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                    const contentBoxSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;

                    this.scrollDistance = contentBoxSize.inlineSize * 0.6;
                } else {
                    this.scrollDistance = entry.contentRect.width * 0.6;
                }
            });
        });
        resObs.observe(this);
        this.stripSelect.addEventListener('option-clicked', e => {
            if (this._value !== e.target.value) {
                this._value = e.target.value;
                slot.assignedElements().forEach(elem => elem.removeAttribute('active'));
                e.target.setAttribute('active', '');
                e.target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                this.fireEvent();
            }
        });
        const firstOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navButtonLeft.classList.add('hide');
                    coverLeft.classList.add('hide');
                }
                else {
                    navButtonLeft.classList.remove('hide');
                    coverLeft.classList.remove('hide');
                }
            });
        },
            {
                threshold: 0.9,
                root: this
            });
        const lastOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navButtonRight.classList.add('hide');
                    coverRight.classList.add('hide');
                }
                else {
                    navButtonRight.classList.remove('hide');
                    coverRight.classList.remove('hide');
                }
            });
        },
            {
                threshold: 0.9,
                root: this
            });
        navButtonLeft.addEventListener('click', this.scrollLeft);
        navButtonRight.addEventListener('click', this.scrollRight);
    }
    disconnectedCallback() {
        navButtonLeft.removeEventListener('click', this.scrollLeft);
        navButtonRight.removeEventListener('click', this.scrollRight);
    }
});

//Strip option
const stripOption = document.createElement('template');
stripOption.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }  
    :host{
        --background-color: inherit;
    }
    .strip-option{
        display: flex;
        flex-shrink: 0;
        cursor: pointer;
        white-space: nowrap;
        padding: var(--padding, 0.4rem 0.6rem);
        transition: background 0.3s;
        border-radius: var(--border-radius, 2rem);
        -webkit-tap-highlight-color: transparent;
    }
    :host([active]) .strip-option{
        color: var(--active-option-color, inherit);
        background-color: var(--active-background-color, rgba(var(--text-color), 0.06));
    }
    :host(:focus-within){
        outline: none;
    }
    :host(:focus-within) .strip-option{
        box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
    }
    :host(:hover:not([active])) .strip-option{
        background-color: rgba(var(--text-color), 0.06);
    }
</style>
<label class="strip-option">
    <slot></slot>
</label>
`;
customElements.define('strip-option', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(stripOption.content.cloneNode(true));
        this._value = undefined;
        this.radioButton = this.shadowRoot.querySelector('input');

        this.fireEvent = this.fireEvent.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    get value() {
        return this._value;
    }
    fireEvent() {
        this.dispatchEvent(
            new CustomEvent("option-clicked", {
                bubbles: true,
                composed: true,
                detail: {
                    value: this._value
                }
            })
        );
    }
    handleKeyDown(e) {
        if (e.key === 'Enter' || e.key === 'Space') {
            this.fireEvent();
        }
    }
    connectedCallback() {
        this.setAttribute('role', 'option');
        this.setAttribute('tabindex', '0');
        this._value = this.getAttribute('value');
        this.addEventListener('click', this.fireEvent);
        this.addEventListener('keydown', this.handleKeyDown);
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.fireEvent);
        this.removeEventListener('keydown', this.handleKeyDown);
    }
});
const smTabHeader = document.createElement('template')
smTabHeader.innerHTML = `
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
        --accent-color: #4d2588;
        --text-color: 17, 17, 17;
        --background-color: 255, 255, 255;
        --gap: 1rem;
        --justify-content: flex-start;
        --tab-indicator-border-radius: 0.3rem;
    }
    .tabs{
        position: relative;
        display: -ms-grid;
        display: grid;
        width: 100%;
    }
    .tab-header{
        display: -ms-grid;
        display: grid;
        grid-auto-flow: column;
        justify-content: var(--justify-content);
        gap: var(--gap);
        position: relative;
        overflow: auto hidden;
        max-width: 100%;
        scrollbar-width: 0;
    }
    .indicator{
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.15rem;
        border-radius: 1rem 1rem 0 0;  
        background: var(--accent-color);
        -webkit-transition: width 0.3s, -webkit-transform 0.3s;
        transition: width 0.3s, -webkit-transform 0.3s;
        -o-transition: transform 0.3s, width 0.3s;
        transition: transform 0.3s, width 0.3s;
        transition: transform 0.3s, width 0.3s, -webkit-transform 0.3s;
        pointer-events: none;
    }
    :host([variant="tab"]) .indicator{
        height: 100%;
        border-radius: var(--tab-indicator-border-radius);
    }
    :host([variant="tab"]) .tab-header{
        border-bottom: none; 
    }
    .hide-completely{
        display: none;
    }
    :host([variant="tab"]) .tab-header{
        gap: 0.2rem;
        display: -ms-inline-grid;
        display: inline-grid;
        justify-self: flex-start;
        border-radius: 0.3rem;
    }
    :host([variant="tab"]) slot::slotted(.active){
        color: rgba(var(--background-color), 1);
    }
    slot::slotted(.active){
        color: var(--accent-color);
        opacity: 1;
    }
    @media (any-hover: none){
        .tab-header::-webkit-scrollbar-track {
            -webkit-box-shadow: none !important;
            background-color: transparent !important;
        }
        .tab-header::-webkit-scrollbar {
            height: 0;
            background-color: transparent;
        }
    }         
    @media (any-hover: hover){
        .tab-header{
            overflow: hidden;
        }
    }         
</style>
<div part="tab-container" class="tabs">
    <div part="tab-header" class="tab-header">
        <slot></slot>
        <div part="indicator" class="indicator"></div>
    </div>
</div>
`;

customElements.define('sm-tab-header', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smTabHeader.content.cloneNode(true))

        this.prevTab
        this.allTabs
        this.activeTab

        this.indicator = this.shadowRoot.querySelector('.indicator');
        this.tabSlot = this.shadowRoot.querySelector('slot');
        this.tabHeader = this.shadowRoot.querySelector('.tab-header');

        this.changeTab = this.changeTab.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handlePanelChange = this.handlePanelChange.bind(this)
        this.moveIndiactor = this.moveIndiactor.bind(this)
    }

    fireEvent(index) {
        this.dispatchEvent(
            new CustomEvent(`switchedtab${this.target}`, {
                bubbles: true,
                detail: {
                    index: parseInt(index)
                }
            })
        )
    }

    moveIndiactor(tabDimensions) {
        this.indicator.setAttribute('style', `width: ${tabDimensions.width}px; transform: translateX(${tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)
    }


    changeTab(target) {
        if (target === this.prevTab || !target.closest('sm-tab'))
            return
        if (this.prevTab)
            this.prevTab.classList.remove('active')
        target.classList.add('active')

        this.tabHeader.scrollTo({
            behavior: 'smooth',
            left: target.getBoundingClientRect().left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft
        })
        this.moveIndiactor(target.getBoundingClientRect())
        this.prevTab = target;
        this.activeTab = target;
    }
    handleClick(e) {
        if (e.target.closest('sm-tab')) {
            this.changeTab(e.target)
            this.fireEvent(e.target.dataset.index)
        }
    }

    handlePanelChange(e) {
        this.changeTab(this.allTabs[e.detail.index])
    }

    connectedCallback() {
        if (!this.hasAttribute('target') || this.getAttribute('target').value === '') return;
        this.target = this.getAttribute('target')

        this.tabSlot.addEventListener('slotchange', () => {
            this.allTabs = this.tabSlot.assignedElements();
            this.allTabs.forEach((tab, index) => {
                tab.dataset.index = index
            })
        })

        this.addEventListener('click', this.handleClick)
        document.addEventListener(`switchedpanel${this.target}`, this.handlePanelChange)

        let resizeObserver = new ResizeObserver(entries => {
            entries.forEach((entry) => {
                if (this.prevTab) {
                    let tabDimensions = this.activeTab.getBoundingClientRect();
                    this.moveIndiactor(tabDimensions)
                }
            })
        })
        resizeObserver.observe(this)
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.indicator.style.transition = 'none'
                    if (this.activeTab) {
                        let tabDimensions = this.activeTab.getBoundingClientRect();
                        this.moveIndiactor(tabDimensions)
                    } else {
                        this.allTabs[0].classList.add('active')
                        let tabDimensions = this.allTabs[0].getBoundingClientRect();
                        this.moveIndiactor(tabDimensions)
                        this.fireEvent(0)
                        this.prevTab = this.tabSlot.assignedElements()[0];
                        this.activeTab = this.prevTab;
                    }
                }
            })
        }, {
            threshold: 1.0
        })
        observer.observe(this)
    }
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick)
        document.removeEventListener(`switchedpanel${this.target}`, this.handlePanelChange)
    }
})

// tab
const smTab = document.createElement('template')
smTab.innerHTML = `
<style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    } 
    :host{
        position: relative;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        z-index: 1;
        --padding: 0.8rem 1rem;
    }
    .tab{
        position: relative;
        -webkit-user-select: none;
        -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        white-space: nowrap;
        padding: var(--padding);
        font-weight: 500;
        word-spacing: 0.1rem;
        text-align: center;
        -webkit-transition: color 0.3s;
        -o-transition: color 0.3s;
        transition: color 0.3s;
        text-transform: capitalize;
        height: 100%;
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
<div part="tab" class="tab">
<slot></slot>
</div>
`;

customElements.define('sm-tab', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({
            mode: 'open'
        }).append(smTab.content.cloneNode(true))
    }
})

// tab-panels

const smTabPanels = document.createElement('template')
smTabPanels.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
} 
:host{
    width: 100%;
}
.panel-container{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    scroll-snap-type: x mandatory;
    content-visibility: auto;
}
::slotted(*){
    min-width: 100%;
    scroll-snap-align: center;
}
@media (any-hover: none) {
    .panel-container{
        overflow-x: auto;
        scrollbar-width: none;
    }
    .container {
        overflow-y: scroll;
    }
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
}
</style>
<div part="panel-container" class="panel-container">
    <slot>Nothing to see here.</slot>
</div>
`;

customElements.define('sm-tab-panels', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(smTabPanels.content.cloneNode(true))

        this.isTransitioning = false

        this.panelContainer = this.shadowRoot.querySelector('.panel-container');
        this.handleTabChange = this.handleTabChange.bind(this)
    }
    handleTabChange(e) {
        this.isTransitioning = true
        this.panelContainer.scrollTo({
            left: this.allPanels[e.detail.index].getBoundingClientRect().left - this.panelContainer.getBoundingClientRect().left + this.panelContainer.scrollLeft,
            behavior: 'smooth'
        })
        setTimeout(() => {
            this.isTransitioning = false
        }, 300);
    }
    fireEvent(index) {
        this.dispatchEvent(
            new CustomEvent(`switchedpanel${this.id}`, {
                bubbles: true,
                detail: {
                    index: parseInt(index)
                }
            })
        )
    }
    connectedCallback() {
        const slot = this.shadowRoot.querySelector('slot');
        slot.addEventListener('slotchange', (e) => {
            this.allPanels = e.target.assignedElements()
            this.allPanels.forEach((panel, index) => {
                panel.dataset.index = index
                intersectionObserver.observe(panel)
            })
        })
        document.addEventListener(`switchedtab${this.id}`, this.handleTabChange)

        const intersectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if (!this.isTransitioning && entry.isIntersecting) {
                    this.fireEvent(entry.target.dataset.index)
                }
            })
        }, {
            threshold: 0.6
        })
    }
    disconnectedCallback() {
        intersectionObserver.disconnect()
        document.removeEventListener(`switchedtab${this.id}`, this.handleTabChange)
    }
})
const tagsInput = document.createElement('template')
tagsInput.innerHTML = `
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
    --danger-color: red;
    --border-radius: 0.3rem;
	--background: rgba(var(--text-color), 0.06);
    }
.hide{
    display: none !important;
}
.tags-wrapper{
    position: relative;
    display: flex;
    cursor: text;
    flex-wrap: wrap;
    justify-items: flex-start;
    align-items: center;
    padding: 0.5rem 0.5rem 0 0.5rem;
    border-radius: var(--border-radius);
    background: var(--background);
  }
  .tags-wrapper:focus-within{
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset !important;
  }
  
  .tag {
    cursor: pointer;
    user-select: none;
    align-items: center;
    display: inline-flex;
    border-radius: 0.3rem;
    padding: 0.3rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    background-color: rgba(var(--text-color), 0.06);
  }
  
  .icon {
    height: 1.2rem;
    width: 1.2rem;
    margin-left: 0.3rem;
    fill: rgba(var(--text-color), 0.8);
  }
  
  input,
  input:focus {
    outline: none;
    border: none;
  }
  
  input {
    display: inline-flex;
    width: auto;
    color: inherit;
    max-width: inherit;
    font-size: inherit;
    font-family: inherit;
    padding: 0.4rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    background-color: transparent;
  }
  .placeholder{
      position: absolute;
      padding: 0 0.5rem;
      top: 50%;
      font-weight: 500;
      transform: translateY(-50%);
      color: rgba(var(--text-color), 0.6);
  }
  </style>
  <div class="tags-wrapper">
    <input type="text" size="3"/>
    <p class="placeholder"></p>
  </div>
`

customElements.define('tags-input', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({
            mode: 'open'
        }).append(tagsInput.content.cloneNode(true))

        this.input = this.shadowRoot.querySelector('input')
        this.tagsWrapper = this.shadowRoot.querySelector('.tags-wrapper')
        this.placeholder = this.shadowRoot.querySelector('.placeholder')
        this.reflectedAttributes = ['placeholder', 'limit']
        this.limit = undefined
        this.tags = new Set()

        this.reset = this.reset.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleKeydown = this.handleKeydown.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.removeTag = this.removeTag.bind(this)
    }
    static get observedAttributes() {
        return ['placeholder', 'limit']
    }
    get value() {
        return [...this.tags].join()
    }
    get isValid() {
        return this.tags.size
    }
    focusIn() {
        this.input.focus()
    }
    reset() {
        this.input.value = ''
        this.tags.clear()
        while (this.input.previousElementSibling) {
            this.input.previousElementSibling.remove()
        }
    }
    handleInput(e) {
        const inputValueLength = e.target.value.trim().length
        e.target.setAttribute('size', inputValueLength ? inputValueLength : '3')
        if (inputValueLength) {
            this.placeholder.classList.add('hide')
        }
        else if (!inputValueLength && !this.tags.size) {
            this.placeholder.classList.remove('hide')
        }
    }
    handleKeydown(e) {
        if (e.key === ',' || e.key === '/') {
            e.preventDefault()
        }
        if (e.target.value.trim() !== '') {
            if (e.key === 'Enter' || e.key === ',' || e.key === '/' || e.code === 'Space') {
                const tagValue = e.target.value.trim()
                if (this.tags.has(tagValue)) {
                    this.tagsWrapper.querySelector(`[data-value="${tagValue}"]`).animate([
                        {
                            backgroundColor: 'initial'
                        },
                        {
                            backgroundColor: 'var(--accent-color)'
                        },
                        {
                            backgroundColor: 'initial'
                        },
                    ], {
                        duration: 300,
                        easing: 'ease'
                    })
                }
                else {
                    const tag = document.createElement('span')
                    tag.dataset.value = tagValue
                    tag.className = 'tag'
                    tag.innerHTML = `
                        <span class="tag-text">${tagValue}</span>
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                        `
                    this.input.before(tag)
                    this.tags.add(tagValue)
                }
                e.target.value = ''
                e.target.setAttribute('size', '3')
                if (this.limit && this.limit < this.tags.size + 1) {
                    this.input.readOnly = true
                    return
                }
            }
        }
        else {
            if (e.key === 'Backspace' && this.input.previousElementSibling) {
                this.removeTag(this.input.previousElementSibling)
            }
            if (this.limit && this.limit > this.tags.size) {
                this.input.readOnly = false
            }
        }
    }
    handleClick(e) {
        if (e.target.closest('.tag')) {
            this.removeTag(e.target.closest('.tag'))
        }
        else {
            this.input.focus()
        }
    }
    removeTag(tag) {
        this.tags.delete(tag.dataset.value)
        tag.remove()
        if (!this.tags.size) {
            this.placeholder.classList.remove('hide')
        }
    }
    connectedCallback() {
        this.input.addEventListener('input', this.handleInput)
        this.input.addEventListener('keydown', this.handleKeydown)
        this.tagsWrapper.addEventListener('click', this.handleClick)
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'placeholder') {
            this.placeholder.textContent = newValue
        }
        if (name === 'limit') {
            this.limit = parseInt(newValue)
        }
    }
    disconnectedCallback() {
        this.input.removeEventListener('input', this.handleInput)
        this.input.removeEventListener('keydown', this.handleKeydown)
        this.tagsWrapper.removeEventListener('click', this.handleClick)
    }
})
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
    --accent-color: #4d2588;
    --text-color: 17, 17, 17;
    --background-color: 255, 255, 255;
    --danger-color: red;
    --border-radius: 0.3rem;
    --background: rgba(var(--text-color), 0.06);
    --padding: initial;
    --max-height: 8rem;
}
:host([variant="outlined"]) .textarea {
    box-shadow: 0 0 0 0.1rem rgba(var(--text-color), 0.4) inset;
    background: rgba(var(--background-color), 1);
}
.textarea{
    display: grid;
    position: relative;
    cursor: text;
    min-width: 0;
    text-align: left;
    overflow: hidden auto;
    grid-template-columns: 1fr;
    align-items: stretch;
    max-height: var(--max-height);
    background: var(--background);
    border-radius: var(--border-radius);
    padding: var(--padding);
}
.textarea::after,
textarea{
    padding: 0.7rem 1rem;
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
    overflow: hidden;
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
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset;
}
.placeholder{
    position: absolute;
    margin: 0.7rem 1rem;
    opacity: .7;
    font-weight: inherit;
    font-size: inherit;
    line-height: 1.5;
    pointer-events: none;
    user-select: none;
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
        background: rgba(var(--text-color), 0.3);
        border-radius: 1rem;
        &:hover{
            background: rgba(var(--text-color), 0.5);
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
    .edit-button{
        display: grid;
        position: relative;
        margin-left: 0.5rem;
        background-color: transparent;
        border: none;
    }
    :host([disabled]) .edit-button{
        display: none;
    }
    .icon{
        grid-area: 1/-1;
        cursor: pointer;
        height: 1.2rem;
        width: 1.2rem;
        fill: rgba(var(--text-color), 1);
    }
    .hide{
        visibility: hidden;
    }
</style>
<div class="text-field">
    <div class="text" part="text"></div>
    <button class="edit-button">
        <svg class="icon" title="edit" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        <svg class="icon hide" title="Save" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
    </button>
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
        this.iconsContainer = this.textField.children[1]
        this.editButton = this.textField.querySelector('.edit-button')
        this.isTextEditable = false
        this.isDisabled = false

        this.fireEvent = this.fireEvent.bind(this)
        this.setEditable = this.setEditable.bind(this)
        this.setNonEditable = this.setNonEditable.bind(this)
        this.toggleEditable = this.toggleEditable.bind(this)
        this.revert = this.revert.bind(this)
    }

    static get observedAttributes() {
        return ['disabled', 'value']
    }

    get value() {
        return this.text
    }
    set value(val) {
        this.setAttribute('value', val)
    }
    set disabled(val) {
        this.isDisabled = val
        if (this.isDisabled)
            this.setAttribute('disabled', '')
        else
            this.removeAttribute('disabled')
    }
    fireEvent(value) {
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

    setEditable() {
        if (this.isTextEditable) return
        this.textContainer.contentEditable = true
        this.textContainer.classList.add('editable')
        this.textContainer.focus()
        document.execCommand('selectAll', false, null);
        this.editButton.children[0].animate(this.rotateOut, this.animOptions).onfinish = () => {
            this.editButton.children[0].classList.add('hide')
        }
        setTimeout(() => {
            this.editButton.children[1].classList.remove('hide')
            this.editButton.children[1].animate(this.rotateIn, this.animOptions)
        }, 100);
        this.isTextEditable = true
    }
    setNonEditable() {
        if (!this.isTextEditable) return
        this.textContainer.contentEditable = false
        this.textContainer.classList.remove('editable')
        const newValue = this.textContainer.textContent.trim()
        if (this.text !== newValue && newValue !== '') {
            this.setAttribute('value', this.textContainer.textContent)
            this.text = this.textContainer.textContent.trim()
            this.fireEvent(this.text)
        } else {
            this.value = this.text
        }
        this.editButton.children[1].animate(this.rotateOut, this.animOptions).onfinish = () => {
            this.editButton.children[1].classList.add('hide')
        }
        setTimeout(() => {
            this.editButton.children[0].classList.remove('hide')
            this.editButton.children[0].animate(this.rotateIn, this.animOptions)
        }, 100);
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
        if (this.hasAttribute('disabled'))
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
            this.editButton.addEventListener('click', this.toggleEditable)
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'disabled') {
            if (this.hasAttribute('disabled')) {
                this.textContainer.removeEventListener('dblclick', this.setEditable)
                this.editButton.removeEventListener('click', this.toggleEditable)
                this.revert()
            }
            else {
                this.textContainer.addEventListener('dblclick', this.setEditable)
                this.editButton.addEventListener('click', this.toggleEditable)
            }
        } else if (name === 'value') {
            this.text = newValue
            this.textContainer.textContent = newValue
        }
    }
    disconnectedCallback() {
        this.textContainer.removeEventListener('dblclick', this.setEditable)
        this.editButton.removeEventListener('click', this.toggleEditable)
    }
})
const themeToggle = document.createElement('template');
themeToggle.innerHTML = `
    <style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :host{
        cursor: pointer;
        --height: 2.5rem;
        --width: 2.5rem;
    }
    .theme-toggle {
        display: flex;
        position: relative;
        width: 1.4rem;
        height: 1.4rem;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }
    .theme-toggle::after{
        content: '';
        position: absolute;
        height: var(--height);
        width: var(--width);
        top: 50%;
        left: 50%;
        opacity: 0;
        border-radius: 50%;
        pointer-events: none;
        transition: transform 0.3s, opacity 0.3s;
        transform: translate(-50%, -50%) scale(1.2);
        background-color: rgba(var(--text-color), 0.12);
    }
    :host(:focus-within) .theme-toggle{
        outline: none;
    }
    :host(:focus-within) .theme-toggle::after{
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
    .icon {
        position: absolute;
        height: 100%;
        width: 100%;
        fill: rgba(var(--text-color), 1);
        transition: transform 0.3s, opacity 0.1s;
    }
    
    .theme-switcher__checkbox {
        display: none;
    }
    :host([checked]) .moon-icon {
        transform: translateY(50%);
        opacity: 0;
    }
    :host(:not([checked])) .sun-icon {
        transform: translateY(50%);
        opacity: 0;
    }
    </style>
    <label class="theme-toggle" title="Change theme" tabindex="0">
        <slot name="light-mode-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon moon-icon" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>
        </slot>
        <slot name="dark-mode-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon sun-icon" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><rect fill="none" height="24" width="24"/><path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>
        </slot>
    </label>
`;

class ThemeToggle extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open'
        }).append(themeToggle.content.cloneNode(true));

        this.isChecked = false;
        this.hasTheme = 'light';

        this.toggleState = this.toggleState.bind(this);
        this.fireEvent = this.fireEvent.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }
    static get observedAttributes() {
        return ['checked'];
    }

    daylight() {
        this.hasTheme = 'light';
        document.body.dataset.theme = 'light';
        this.setAttribute('aria-checked', 'false');
    }

    nightlight() {
        this.hasTheme = 'dark';
        document.body.dataset.theme = 'dark';
        this.setAttribute('aria-checked', 'true');
    }

    toggleState() {
        this.toggleAttribute('checked');
        this.fireEvent();
    }
    handleKeyDown(e) {
        if (e.code === 'Space') {
            this.toggleState();
        }
    }
    handleThemeChange(e) {
        if (e.detail.theme !== this.hasTheme) {
            if (e.detail.theme === 'dark') {
                this.setAttribute('checked', '');
            }
            else {
                this.removeAttribute('checked');
            }
        }
    }

    fireEvent() {
        this.dispatchEvent(
            new CustomEvent('themechange', {
                bubbles: true,
                composed: true,
                detail: {
                    theme: this.hasTheme
                }
            })
        );
    }

    connectedCallback() {
        this.setAttribute('role', 'switch');
        this.setAttribute('aria-label', 'theme toggle');
        if (localStorage.getItem(`${window.location.hostname}-theme`) === "dark") {
            this.nightlight();
            this.setAttribute('checked', '');
        } else if (localStorage.getItem(`${window.location.hostname}-theme`) === "light") {
            this.daylight();
            this.removeAttribute('checked');
        }
        else {
            if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
                this.nightlight();
                this.setAttribute('checked', '');
            } else {
                this.daylight();
                this.removeAttribute('checked');
            }
        }
        this.addEventListener("click", this.toggleState);
        this.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener('themechange', this.handleThemeChange);
    }

    disconnectedCallback() {
        this.removeEventListener("click", this.toggleState);
        this.removeEventListener("keydown", this.handleKeyDown);
        document.removeEventListener('themechange', this.handleThemeChange);
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'checked') {
            if (this.hasAttribute('checked')) {
                this.nightlight();
                localStorage.setItem(`${window.location.hostname}-theme`, "dark");
            } else {
                this.daylight();
                localStorage.setItem(`${window.location.hostname}-theme`, "light");
            }
        }
    }
}

window.customElements.define('theme-toggle', ThemeToggle);