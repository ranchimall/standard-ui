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
            if (!this.hasAttribute('disabled') && (e.key === 'Enter' || e.key === ' ')) {
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