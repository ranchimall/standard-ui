const pinInput = document.createElement('template');
pinInput.innerHTML = `

<style>
		*{
		padding:0;
		margin:0;
		-webkit-box-sizing: border-box;
					box-sizing: border-box;
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
			--border-radius: 0.5rem;
			--pin-length: 4;
		}
		.component{
			display: flex;
			align-items: center;
		}
		.pin-container{
			display: grid;
			grid-template-columns: repeat(var(--pin-length), 3rem);
			width: auto;
			gap: 0.5rem;
		}
		input{
			width: 100%;
			display: flex;
			padding: 0.8rem 0.6rem;
			border: none;
			font-size: 1.5rem;
			text-align: center;
			color: rgba(var(--text-color), 1);
			background: rgba(var(--text-color), 0.1);
			border-radius: var(--border-radius);
		}
		
		input:valid{
			background-color: transparent;
		}
		input:focus,
		button:focus{
			outline: none;
			box-shadow: 0 0 0 0.2rem var(--accent-color) inset;
		}
		button{
            display: flex;
            align-items: center;
			background: none;
			border: none;
			cursor: pointer;
            color: inherit;
            font-family: inherit;
            margin: 0 1rem;
		}
		svg{
			margin: 0 0.5rem 0 0;
			height: 1.5rem;
			width: 1.5rem;
			fill: rgba(var(--text-color), 1);
		}
</style>
<div class="component">
	<div class="pin-container"></div>
	<button>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="9.95"/><path d="M32,12.28C11.7,12.28,0,32,0,32S11.7,51.72,32,51.72,64,32,64,32,52.3,12.28,32,12.28Zm0,33.35A13.63,13.63,0,1,1,45.63,32,13.64,13.64,0,0,1,32,45.63Z"/></svg>
        Show
    </button>
</div>
`;

customElements.define('pin-input',

    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(pinInput.content.cloneNode(true))

            this.pinDigits = 4

            this.arrayOfInput = [];
            this.container = this.shadowRoot.querySelector('.pin-container');
            this.toggleButton = this.shadowRoot.querySelector('button')
        }

        set value(val) {
            this.arrayOfInput.forEach((input, index) => input.value = val[index] ? val[index] : '')
        }

        get value() {
            return this.getValue()
        }

        set pinLength(val) {
            this.pinDigits = val
            this.setAttribute('pin-length', val)
            this.style.setProperty('--pin-length', val)
            this.render()
        }

        get isValid() {
            return this.arrayOfInput.every(input => input.value.trim().length)
        }

        clear = () => {
            this.value = ''
        }

        focusIn = () => {
            this.arrayOfInput[0].focus();
        }

        getValue = () => {
            return this.arrayOfInput.reduce((acc, val) => {
                return acc += val.value
            }, '')
        }

        render = () => {
            this.container.innerHTML = ''
            const frag = document.createDocumentFragment();

            for (let i = 0; i < this.pinDigits; i++) {
                const inputBox = document.createElement('input')
                inputBox.setAttribute('type', 'password')
                inputBox.setAttribute('inputmode', 'numeric')
                inputBox.setAttribute('maxlength', '1')
                inputBox.setAttribute('required', '')
                this.arrayOfInput.push(inputBox);
                frag.append(inputBox);
            }
            this.container.append(frag);
        }

        handleKeydown = (e) => {
            const activeInput = e.target.closest('input')
            if (/[0-9]/.test(e.key)) {
                if (activeInput.value.trim().length > 2) {
                    e.preventDefault();
                }
                else {
                    if (activeInput.value.trim().length === 1) {
                        activeInput.value = e.key
                    }
                    if (activeInput.nextElementSibling) {
                        setTimeout(() => {
                            activeInput.nextElementSibling.focus();
                        }, 0)
                    }
                }
            }
            else if (e.key === "Backspace") {
                if (activeInput.previousElementSibling)
                    setTimeout(() => {
                        activeInput.previousElementSibling.focus();
                    }, 0)
            }
            else if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        }

        handleInput = () => {
            if (this.isValid) {
                this.fireEvent(this.getValue())
            }
        }

        fireEvent = (value) => {
            let event = new CustomEvent('pincomplete', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {
                    value
                }
            });
            this.dispatchEvent(event);
        }

        toggleVisibility = () => {
            if (this.arrayOfInput[0].getAttribute('type') === 'password') {
                this.toggleButton.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M22.05,31.44a10.12,10.12,0,0,0,.1,1.36L33.36,21.59a10.12,10.12,0,0,0-1.36-.1A10,10,0,0,0,22.05,31.44Z"/><path d="M19.11,35.84A13.6,13.6,0,0,1,36.4,18.55l5.28-5.27A31,31,0,0,0,32,11.72c-20.3,0-32,19.72-32,19.72A48.48,48.48,0,0,0,11.27,43.69Z"/><path d="M52.73,19.2l6.14-6.14L54.63,8.81l-7,7h0l-6,6h0L39,24.41h0l-7,7L20.09,43.35,16.4,47h0l-7,7,4.25,4.24,8.71-8.71A31.15,31.15,0,0,0,32,51.16c20.3,0,32-19.72,32-19.72A48.54,48.54,0,0,0,52.73,19.2ZM32,45.07a13.63,13.63,0,0,1-4.4-.74l3-3a10.12,10.12,0,0,0,1.36.1,10,10,0,0,0,10-9.95,10.12,10.12,0,0,0-.1-1.36l3-3A13.6,13.6,0,0,1,32,45.07Z"/></svg>
                    Hide    
                    `
                this.arrayOfInput.forEach(input => input.setAttribute('type', 'text'))
            }
            else {
                this.toggleButton.innerHTML = `
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="9.95"/><path d="M32,12.28C11.7,12.28,0,32,0,32S11.7,51.72,32,51.72,64,32,64,32,52.3,12.28,32,12.28Zm0,33.35A13.63,13.63,0,1,1,45.63,32,13.64,13.64,0,0,1,32,45.63Z"/></svg>
                    Show
                `
                this.arrayOfInput.forEach(input => input.setAttribute('type', 'password'))

            }
        }

        connectedCallback() {
            if (this.hasAttribute('pin-length')) {
                const pinLength = parseInt(this.getAttribute('pin-length'))
                this.pinDigits = pinLength
                this.style.setProperty('--pin-length', pinLength)
            }

            this.render()

            this.toggleButton.addEventListener('click', this.toggleVisibility)

            this.container.addEventListener('input', this.handleInput);
            this.container.addEventListener('keydown', this.handleKeydown);
        }
        disconnectedCallback() {
            this.toggleButton.removeEventListener('click', this.toggleVisibility)

            this.container.removeEventListener('input', this.handleInput);
            this.container.removeEventListener('keydown', this.handleKeydown);
        }
    })