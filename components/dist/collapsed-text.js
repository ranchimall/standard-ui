const collapsedText = document.createElement('template');
collapsedText.innerHTML = `
    <style>
        .wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .collapsed-text {
            display: -webkit-box;
            -webkit-line-clamp: var(--line-clamp,3);
            -webkit-box-orient: vertical;  
            text-overflow: ellipsis;
            overflow: hidden;
        }
        :host([open]) .collapsed-text {
            -webkit-line-clamp: unset;
        }
        .toggle-button {
            margin-top: 0.5rem;
            margin-right: auto;
            cursor: pointer;
            font-weight: 500;
            background: var(--button-background, #fff);
            border: none;
            outline: none;
            color: var(--accent-color,teal);
            font-size: inherit;
            font-family: inherit;
            z-index: 1;
        }
    </style>
    <div class="wrapper">
        <div class="collapsed-text"><slot></slot></div>
        <button class="toggle-button">Show more</button>
    </div>
`;
class CollapsedText extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(collapsedText.content.cloneNode(true));
        this.isCollapsed = true;
        this.toggleCollapsedText = this.toggleCollapsedText.bind(this);
        this.wrapper = this.shadowRoot.querySelector('.collapsed-text');
        this.toggleButton = this.shadowRoot.querySelector('.toggle-button');
    }
    toggleCollapsedText() {
        this.toggleButton.textContent = this.isCollapsed ? 'Show less' : 'Show more';
        if (this.isCollapsed) {
            this.setAttribute('open', '');
            this.wrapper.removeEventListener('click', this.toggleCollapsedText);
        } else {
            this.removeAttribute('open');
            this.wrapper.addEventListener('click', this.toggleCollapsedText);
        }
        this.isCollapsed = !this.isCollapsed;
    }

    connectedCallback() {
        this.wrapper.addEventListener('click', this.toggleCollapsedText);
        this.toggleButton.addEventListener('click', this.toggleCollapsedText);
    }

    disconnectedCallback() {
        this.wrapper.removeEventListener('click', this.toggleCollapsedText);
        this.toggleButton.removeEventListener('click', this.toggleCollapsedText);
    }
}

window.customElements.define('collapsed-text', CollapsedText);