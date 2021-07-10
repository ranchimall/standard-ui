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
        border-radius: 0.3rem;
    }
    :host(.round) .indicator{
        border-radius: 3rem;
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
        color: rgba(var(--foreground-color), 1);
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

        this.indicator = this.shadowRoot.querySelector('.indicator');
        this.tabSlot = this.shadowRoot.querySelector('slot');
        this.tabHeader = this.shadowRoot.querySelector('.tab-header');
    }

    sendDetails(element) {
        this.dispatchEvent(
            new CustomEvent("switchtab", {
                bubbles: true,
                detail: {
                    target: this.target,
                    rank: parseInt(element.getAttribute('rank'))
                }
            })
        )
    }

    moveIndiactor(tabDimensions) {
        //if(this.isTab)
        this.indicator.setAttribute('style', `width: ${tabDimensions.width}px; transform: translateX(${tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px)`)
        //else
        //this.indicator.setAttribute('style', `width: calc(${tabDimensions.width}px - 1.6rem); transform: translateX(calc(${ tabDimensions.left - this.tabHeader.getBoundingClientRect().left + this.tabHeader.scrollLeft}px + 0.8rem)`)
    }

    connectedCallback() {
        if (!this.hasAttribute('target') || this.getAttribute('target').value === '') return;
        this.prevTab
        this.allTabs
        this.activeTab
        this.isTab = false
        this.target = this.getAttribute('target')

        if (this.hasAttribute('variant') && this.getAttribute('variant') === 'tab') {
            this.isTab = true
        }

        this.tabSlot.addEventListener('slotchange', () => {
            this.tabSlot.assignedElements().forEach((tab, index) => {
                tab.setAttribute('rank', index)
            })
        })
        this.allTabs = this.tabSlot.assignedElements();

        this.tabSlot.addEventListener('click', e => {
            if (e.target === this.prevTab || !e.target.closest('sm-tab'))
                return
            if (this.prevTab)
                this.prevTab.classList.remove('active')
            e.target.classList.add('active')

            e.target.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            })
            this.moveIndiactor(e.target.getBoundingClientRect())
            this.sendDetails(e.target)
            this.prevTab = e.target;
            this.activeTab = e.target;
        })
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
                        this.sendDetails(this.allTabs[0])
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
    overflow: hidden auto;
}
slot::slotted(.hide-completely){
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
        this.panelSlot = this.shadowRoot.querySelector('slot');
    }
    connectedCallback() {

        //animations
        let flyInLeft = [{
                    opacity: 0,
                    transform: 'translateX(-1rem)'
                },
                {
                    opacity: 1,
                    transform: 'none'
                }
            ],
            flyInRight = [{
                    opacity: 0,
                    transform: 'translateX(1rem)'
                },
                {
                    opacity: 1,
                    transform: 'none'
                }
            ],
            flyOutLeft = [{
                    opacity: 1,
                    transform: 'none'
                },
                {
                    opacity: 0,
                    transform: 'translateX(-1rem)'
                }
            ],
            flyOutRight = [{
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
        this.prevPanel
        this.allPanels
        this.previousRank

        this.panelSlot.addEventListener('slotchange', () => {
            this.panelSlot.assignedElements().forEach((panel) => {
                panel.classList.add('hide-completely')
            })
        })
        this.allPanels = this.panelSlot.assignedElements()
        this._targetBodyFlyRight = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInRight, animationOptions)
        }
        this._targetBodyFlyLeft = (targetBody) => {
            targetBody.classList.remove('hide-completely')
            targetBody.animate(flyInLeft, animationOptions)
        }
        document.addEventListener('switchtab', e => {
            if (e.detail.target !== this.id)
                return

            if (this.prevPanel) {
                let targetBody = this.allPanels[e.detail.rank],
                    currentBody = this.prevPanel;
                if (this.previousRank < e.detail.rank) {
                    if (currentBody && !targetBody)
                        currentBody.animate(flyOutLeft, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                        }
                    else if (targetBody && !currentBody) {
                        this._targetBodyFlyRight(targetBody)
                    } else if (currentBody && targetBody) {
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
                    } else if (currentBody && targetBody) {
                        currentBody.animate(flyOutRight, animationOptions).onfinish = () => {
                            currentBody.classList.add('hide-completely')
                            this._targetBodyFlyLeft(targetBody)
                        }
                    }
                }
            } else {
                this.allPanels[e.detail.rank].classList.remove('hide-completely')
            }
            this.previousRank = e.detail.rank
            this.prevPanel = this.allPanels[e.detail.rank];
        })
    }
})
