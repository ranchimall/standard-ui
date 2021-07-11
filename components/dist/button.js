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
    --padding: 0.6rem 1.2rem;
    --border-radius: 0.3rem;
    --background: rgba(var(--text-color), 0.1);
}
:host([disabled]) .button{
    cursor: not-allowed;
    opacity: 0.6;
    background: rgba(var(--text-color), 0.3) !important;
    color: rgba(var(--foreground-color), 0.6);
}
:host([disabled][variant="primary"]) .button{
    color: rgba(var(--text-color), 1);
}
:host([variant='primary']) .button{
    background: var(--accent-color);
    color: rgba(var(--foreground-color), 1);
}
:host([variant='outlined']) .button{
    -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset;
    background: transparent; 
    color: var(--accent-color);
}
:host([variant='no-outline']) .button{
    background: rgba(var(--foreground-color), 1); 
    color: var(--accent-color);
}
:host(.small) .button{
    padding: 0.4rem 0.8rem;
}
:host(.round) .button{
    border-radius: 10rem;
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
:host(:not([disabled])) .button:focus-visible{
    -webkit-box-shadow: 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 0.1rem var(--accent-color);
}
:host([variant='outlined']) .button:focus-visible{
    -webkit-box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0 0 0.1rem var(--accent-color);
            box-shadow: 0 0 0 1px rgba(var(--text-color), 0.2) inset, 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0 0 0.1rem var(--accent-color);
}
@media (hover: hover){
    :host(:not([disabled])) .button:hover{
        -webkit-box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
                box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1), 0 0.2rem 0.8rem rgba(0, 0, 0, 0.12);
    }
    :host([variant='outlined']) .button:hover{
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
<button part="button" class="button">
    <slot></slot>   
</button>`;
customElements.define('sm-button',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(smButton.content.cloneNode(true))
        }

        get disabled() {
            return this.isDisabled
        }

        set disabled(value) {
            if (value && !this.isDisabled) {
                this.isDisabled = true
                this.setAttribute('disabled', '')
                this.button.removeAttribute('tabindex')
            } else if (!value && this.isDisabled) {
                this.isDisabled = false
                this.removeAttribute('disabled')
            }
        }
        dispatch() {
            if (this.isDisabled) {
                this.dispatchEvent(new CustomEvent('disabled', {
                    bubbles: true,
                    composed: true
                }))
            } else {
                this.dispatchEvent(new CustomEvent('clicked', {
                    bubbles: true,
                    composed: true
                }))
            }
        }

        connectedCallback() {
            this.isDisabled = false
            this.button = this.shadowRoot.querySelector('.button')
            if (this.hasAttribute('disabled') && !this.isDisabled)
                this.isDisabled = true
            this.addEventListener('click', (e) => {
                this.dispatch()
            })
        }
    })