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
    --padding: 0;
    --button-background-color: rgba(var(--text-color, (17,17,17)), 0.2);
}
.copy{
    display: grid;
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
    background-color: rgba(var(--text-color, (17,17,17)), 0.06);
    border-radius: var(--button-border-radius, 0.3rem);
    transition: background-color 0.2s;
    font-family: inherit;
    color: inherit;
    font-size: 0.7rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
}
.copy-button:active{
    background-color: var(--button-background-color);
}
@media (any-hover: hover){
    .copy:hover .copy-button{
        opacity: 1;
    }
    .copy-button:hover{
        background-color: var(--button-background-color);
    }
}
</style>
<section class="copy">
    <p class="copy-content">
        <slot></slot>
    </p>
    <button part="button" class="copy-button" title="copy">
        <slot name="copy-icon">
        COPY
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
            navigator.clipboard.writeText(this.getAttribute('value'))
                .then(res => this.fireEvent())
                .catch(err => console.error(err));
        }
        connectedCallback() {
            this.copyButton.addEventListener('click', this.copy);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'value') {
                const slot = this.copyContent.querySelector('slot');
                if (!slot) return;
                const assignedNodes = slot.assignedNodes();
                if (!assignedNodes || !assignedNodes.length) {
                    slot.textContent = newValue;
                }
            }
        }
        disconnectedCallback() {
            this.copyButton.removeEventListener('click', this.copy);
        }
    });