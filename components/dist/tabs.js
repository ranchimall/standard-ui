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
        -webkit-box-pack: start;
            -ms-flex-pack: start;
                justify-content: flex-start;
        gap: 1rem;
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

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
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
        console.log(this.allTabs)
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
        padding: 0.4rem 0.8rem;
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
        this.panelSlot = this.shadowRoot.querySelector('slot');
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
        this.panelSlot.addEventListener('slotchange', () => {
            this.allPanels = this.panelSlot.assignedElements()
            this.allPanels.forEach((panel, index) => {
                panel.dataset.index = index
                intersectionObserver.observe(panel)
            })
        })
        document.addEventListener(`switchedtab${this.id}`, this.handleTabChange)

        const intersectionObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if (!this.isTransitioning && entry.isIntersecting) {
                    this.fireEvent(entry.target.dataset.index), 3000
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
