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
        padding: 1rem 0;
        max-width: 100%;
    }
    .hide{
        opacity: 0;
        pointer-events: none;
    }
    input[type="radio"]{
        display: none;
    }
    .scrolling-container{
        position: relative;
        display: grid;
        grid-template-columns: min-content minmax(0,1fr) min-content;
        grid-template-rows: 1fr;
    }
    .strip-select{
        display: flex;
        position: relative;
        grid-area: 1/1/2/-1;
        gap: var(--gap, 0.5rem);
        overflow: auto hidden;
    }
    :host([multiline]) .strip-select{
        flex-wrap: wrap;
    }
    :host(:not([multiline])) .strip-select{
        max-width: 100%;   
        align-items: center;
    }
    .nav-button{
        display: flex;
        z-index: 2;
        border: none;
        padding: 0.3rem;
        cursor: pointer;
        align-items: center;
        background: rgba(var(--background-color,(255,255,255)), 1);
        transition: opacity 0.2s;
        grid-row: 1;
    }
    .nav-button--left{
        grid-column: 1;
        justify-self: start;
    }
    .nav-button--right{
        grid-column: 3;
        justify-self: end;
    }
    .cover{
        position: absolute;
        z-index: 1;
        width: 5rem;
        height: 100%;
        pointer-events: none;
        grid-row: 1;
        transition: opacity 0.2s;
    }
    .cover--left{
        grid-column: 1;
    }
    .cover--right{
        grid-column: 3;
    }
    .nav-button--right::before{
        background-color: red;
    }
    .icon{
        height: 1.2rem;
        width: 1.2rem;
        fill: rgba(var(--text-color,(17,17,17)), .8);
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
            background: linear-gradient(90deg, rgba(var(--background-color,(255,255,255)), 1), transparent);
        }
        .cover--right{
            right: 0;
            background: linear-gradient(90deg, transparent, rgba(var(--background-color,(255,255,255)), 1));
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
            background: linear-gradient(90deg, rgba(var(--background-color,(255,255,255)), 1) 60%, transparent);
        }
        .cover--right{
            right: 0;
            background: linear-gradient(90deg, transparent 0%, rgba(var(--background-color,(255,255,255)), 1) 40%);
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
        this.assignedElements = [];

        this.scrollLeft = this.scrollLeft.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.fireEvent = this.fireEvent.bind(this);
        this.setSelectedOption = this.setSelectedOption.bind(this);
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this.setSelectedOption(val);
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
    setSelectedOption(value) {
        if (this._value === value) return
        this._value = value;
        this.assignedElements.forEach(elem => {
            if (elem.value === value) {
                elem.setAttribute('selected', '');
                elem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
            else
                elem.removeAttribute('selected')
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
            // debounce to wait for all elements to be assigned
            clearTimeout(this.slotChangeTimeout);
            this.slotChangeTimeout = setTimeout(() => {
                this.assignedElements = slot.assignedElements();
                this.assignedElements.forEach(elem => {
                    if (elem.hasAttribute('selected')) {
                        this._value = elem.value;
                    }
                });
                if (!this.hasAttribute('multiline')) {
                    if (this.assignedElements.length > 0) {
                        firstOptionObserver.observe(this.assignedElements[0]);
                        lastOptionObserver.observe(this.assignedElements[this.assignedElements.length - 1]);
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
            }, 100);
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
                this.setSelectedOption(e.target.value);
                this.fireEvent();
            }
        });
        const firstOptionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navButtonLeft.classList.add('hide');
                    coverLeft.classList.add('hide');
                } else {
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
                } else {
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
    :host([selected]) .strip-option{
        color: var(--selected-option-color, rgba(var(--background-color,white)));
        background-color: var(--selected-background-color, var(--accent-color,teal));
    }
    :host(:focus-within){
        outline: none;
    }
    :host(:focus-within) .strip-option{
        box-shadow: 0 0 0 0.1rem var(--accent-color,teal) inset;
    }
    :host(:hover:not([selected])) .strip-option{
        background-color: rgba(var(--text-color,(17,17,17)), 0.06);
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