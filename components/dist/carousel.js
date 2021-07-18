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
                if(entry.contentBoxSize) {
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