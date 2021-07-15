
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