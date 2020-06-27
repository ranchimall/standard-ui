//Button

const smBtn = document.createElement('template')
smBtn.innerHTML = `
        <style>     
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }       
            :host{
                display: inline-flex;
            }
            :host([disabled='true']) .sm-btn{
                cursor: default;
                opacity: 0.6;
                background: rgba(var(--text), 0.2) !important;
            }
            :host([disabled='true']) button{
                color: rgba(var(--text), 1) !important;
            }
            :host([type='primary']) .sm-btn{
                background: var(--primary-color);
            }
            :host([type='secondary']) button{
                color: var(--primary-color);
            }
            :host([type='secondary']) .sm-btn{
                border: solid 1px var(--primary-color);
                background: rgba(var(--foreground), 1); 
            }
            .sm-btn {
                display: flex;
                padding: 0.6rem 0.8rem;
                cursor: pointer;
                user-select: none;
                border-radius: 0.2rem; 
                justify-content: center;
                transition: transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
            }
            .sm-btn:hover{
                opacity: 0.9;
            }
            .sm-btn:active{
                transform: scale(0.9)
            }
            button{
                text-transform: uppercase;
                letter-spacing: 0.06rem;
                word-spacing: 0.1rem;
                font-family: var(--font-family);
                font-weight: 600;
                background: none;
                border: none;
                color: var(--background);
                outline: none;
                pointer-events: none;
            }
        </style>
        <div class="sm-btn">
            <slot name="icon"></slot>
            <button id="main_button"></button>    
        </div>`;
customElements.define('sm-btn',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smBtn.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['disabled']
        }

        get disabled() {
            return this.getAttribute('disabled')
        }

        set disabled(val) {
            this.setAttribute('disabled', val)
        }

        connectedCallback() {
            let disabledEvent = new CustomEvent('disabled', {
                bubbles: true,
                composed: true
            })
            let clicked = new CustomEvent('clicked', {
                bubbles: true,
                composed: true
            })
            this.shadowRoot.querySelector('button').textContent = this.getAttribute('value')
            this.addEventListener('click', (e) => {
                if (this.getAttribute('disabled') === 'true') {
                    this.dispatchEvent(disabledEvent)
                }
                else
                    this.dispatchEvent(clicked)
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }
    })

//Input
const smInput = document.createElement('template')
smInput.innerHTML = `
        <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        } 
        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration { display: none; }
        input[type=number] {
        -moz-appearance:textfield;
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            margin: 0; 
        }
        input:invalid{
        outline: none;
        box-shadow: none;
        }
        ::-moz-focus-inner{
        border: none;
        }
        :host{
            display: -webkit-box;
            display: flex;
        }
        .hide{
           opacity: 0 !important;
           pointer-events: none !important;
        }
        .icon {
            fill: none;
            height: 1.6rem;
            width: 1.6rem;
            padding: 0.5rem;
            stroke: rgba(var(--text), 0.7);
            stroke-width: 10;
            overflow: visible;
            stroke-linecap: round;
            border-radius: 1rem;
            stroke-linejoin: round;
            cursor: pointer;
            margin-left: 1rem;
        }
        .icon:hover{
            background: rgba(var(--text), 0.1);
        }
        .input {
            display: flex;
            align-items: center;
            position: relative;
            gap: 1rem;
            padding: 0.6rem 1rem;
            border-radius: 0.2em;
            transition: opacity 0.3s;
            background: rgba(var(--text), 0.1);
            font-family: var(--font-family);
            width: 100%
        }

        /*.input:focus-within{
            box-shadow: 0 0 0 0.1rem var(--primary-color);
        }*/

        input:focus{
            caret-color: var(--primary-color);
        }
    
        .label {
            user-select: none;
            opacity: .7;
            font-weight: 400;
            font-size: 1rem;
            position: absolute;
            top: 0;
            transition: transform 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
            -webkit-transform-origin: left;
            transform-origin: left;
            pointer-events: none;
            will-change: transform;
            text-transform: capitalize;
        }
        .container{
            display: flex;
            position: relative;
            align-items: center;
            flex: 1;
        }    
        input{
            font-size: 1rem;
            border: none;
            background: transparent;
            outline: none;
            color: rgba(var(--text), 1);
            width: 100%;
        }
        .animate-label .container input {
            -webkit-transform: translateY(0.5rem);
                    transform: translateY(0.5rem);
            }
          
        .animate-label .container .label {
        -webkit-transform: translateY(-60%) scale(0.7);
                transform: translateY(-60%) scale(0.7);
        opacity: 1;
        color: var(--primary-color);
        }
    </style>
    <label class="input">
        <slot name = "icon"></slot>
        <div class="container">
            <input required/>
            <div class="label"></div>
        </div>
        <svg class="icon clear hide" viewBox="0 0 64 64">
            <title>clear</title>
            <line x1="63.65" y1="0.35" x2="0.35" y2="63.65"/>
            <line x1="63.65" y1="63.65" x2="0.35" y2="0.35"/>
        </svg>
    </label>
`;
customElements.define('sm-input',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' }).append(smInput.content.cloneNode(true))
        }
        static get observedAttributes() {
            return ['placeholder']
        }

        get value() {
            return this.shadowRoot.querySelector('input').value
        }

        set value(val) {
            this.shadowRoot.querySelector('input').value = val;
        }

        get placeholder() {
            return this.getAttribute('placeholder')
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val)
        }

        get type() {
            return this.getAttribute('type')
        }

        get isValid() {
            return this.shadowRoot.querySelector('input').checkValidity()
        }

        preventNonNumericalInput(e) {
            let keyCode = e.keyCode;
            if (!((keyCode > 47 && keyCode < 56) || (keyCode > 36 && keyCode < 39) || (keyCode > 95 && keyCode < 104) || keyCode === 110 || (keyCode > 7 && keyCode < 19))) {
                e.preventDefault();
            }
        }

        checkInput(input, label, inputParent, clear) {
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder') === '')
                return;
            if (input.value !== '') {
                if (this.animate)
                    inputParent.classList.add('animate-label')
                else
                    label.classList.add('hide')
                clear.classList.remove('hide')
            }
            else {
                if (this.animate)
                    inputParent.classList.remove('animate-label')
                else
                    label.classList.remove('hide')
                clear.classList.add('hide')
            }
        }

        connectedCallback() {
            let input = this.shadowRoot.querySelector('input'),
                inputParent = this.shadowRoot.querySelector('.input'),
                clearBtn = this.shadowRoot.querySelector('.clear'),
                label = this.shadowRoot.querySelector('.label')
            this.animate = this.hasAttribute('animate')
            this.shadowRoot.querySelector('.label').textContent = this.getAttribute('placeholder')
            if (this.hasAttribute('value')) {
                input.value = this.getAttribute('value')
                this.checkInput(input, inputParent, clearBtn)
            }
            if (this.hasAttribute('type')) {
                if (this.getAttribute('type') === 'number') {
                    input.setAttribute('inputmode', 'numeric')
                }
                else
                    input.setAttribute('type', this.getAttribute('type'))
            }
            else
                input.setAttribute('type', 'text')
            input.addEventListener('keydown', e => {
                if (this.getAttribute('type') === 'number')
                    this.preventNonNumericalInput(e);
            })
            input.addEventListener('input', e => {
                this.checkInput(input, label, inputParent, clearBtn)
            })
            clearBtn.addEventListener('click', e => {
                input.value = ''
                this.checkInput(input, label, inputParent, clearBtn)
            })
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (name === 'placeholder')
                    this.shadowRoot.querySelector('.label').textContent = newValue;
            }
        }
    })

// tab-header

const smTabHeader = document.createElement('template')
smTabHeader.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: inline-flex;
}
.tab-header{
    display: flex;
    position: relative;
    overflow: hidden;
    width: 100%;
}
.indicator{
    position: absolute;
    display: flexbox;
    bottom: 0;
    left: 0;
    background: var(--primary-color);
}
:host([type="line"]) .indicator{
    height: 0.12rem;
}
:host([type="tab"]) .indicator{
    height: 100%;
    border-radius: 0.2rem
}
:host([type="line"]) .tab-header{
    border-bottom: solid 1px rgba(var(--text), .1); 
}
:host([type="tab"]) .tab-header{
    border-radius: 0.2rem;
    grid-auto-columns: 1fr;
}
.transition{
    transition: transform 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86), width 0.4s;
}
</style>
<div class="tab-header">
    <slot>Nothing to see here</slot>
    <div class="indicator"></div>
</div>
`;

customElements.define('sm-tab-header', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smTabHeader.content.cloneNode(true))

        this.indicator = this.shadowRoot.querySelector('.indicator');
    }
    static get observedAttributes() {
        return ['type']
    }
    connectedCallback() {
        this.prevTab = ''
        this.type = this.getAttribute('type')
        this.addEventListener('switchTab', e => {
            if (e.target === this.prevTab)
                return
            if (this.type === 'tab') {
                if (this.prevTab)
                    this.prevTab.classList.remove('tab-active')
                setTimeout(() => {
                    e.target.classList.add('tab-active')
                }, 200);
            }
            else {
                if (this.prevTab)
                    this.prevTab.classList.remove('line-active')
                setTimeout(() => {
                    e.target.classList.add('line-active')
                }, 200);
            }
            setTimeout(() => {
                this.indicator.classList.add('transition')
            }, 100);
            this.indicator.setAttribute('style', `width: ${e.detail.width}px; transform: translateX(${e.detail.left - 1}px)`)
            e.target.scrollIntoView({behavior: 'smooth', inline: 'center'})
            this.prevTab = e.target;
        })
    }
})
// tab

const smTab = document.createElement('template')
smTab.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: inline-flex;
    z-index: 2;
}
.tab{
    user-select: none;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap;
    font-size: 0.9rem;
    padding: 0.4rem 0.6rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    word-spacing: 0.1em;
    text-align: center;
    transition: color 0.3s;
    text-transform: uppercase;
    font-family: var(--font-family);
}
:host(.tab-active) .tab{
    color: rgba(var(--foreground), 1);
}
:host(.line-active) .tab{
    color: var(--primary-color);

</style>
<div class="tab">
    <slot></slot>
</div>
`;

customElements.define('sm-tab', class extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' }).append(smTab.content.cloneNode(true))
    }
    connectedCallback() {
        let width = 0, left = 0;
        if ('ResizeObserver' in window) {
            let resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    width = entry.contentRect.width;
                    left = this.getBoundingClientRect().left - this.parentNode.offsetLeft
                })
            })
            resizeObserver.observe(this)
        }
        else {
            let observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting) {
                    width = entry.contentRect.width;
                    left = this.getBoundingClientRect().left - this.parentNode.offsetLeft
                }
            }, {
                threshold: 1
            })
            observer.observe(this)
        }
        let switchTab = new CustomEvent('switchTab', {
            bubbles: true,
            composed: true,
            detail: {
                panel: this.getAttribute('panel'),
            }
        })
        this.addEventListener('click', () => {
            switchTab.detail.width = width;
            switchTab.detail.left = left;
            this.dispatchEvent(switchTab)
        })
        if (this.hasAttribute('active')) {
            setTimeout(() => {
                switchTab.detail.width = width;
                switchTab.detail.left = left;
                this.dispatchEvent(switchTab)
            }, 0);

        }
    }
})

//chcekbox

const smCheckbox = document.createElement('template')
smCheckbox.innerHTML = `
<style>
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
} 
:host{
    display: inline-flex;
}
.checkbox {
    diplay:flex;
  border-radius: 2rem;
  cursor: pointer;
}

.checkbox:active svg {
  -webkit-transform: scale(0.9);
          transform: scale(0.9);
}

.checkbox input {
  display: none;
}

.checkbox .checkmark {
  stroke-dashoffset: -65;
  stroke-dasharray: 65;
  -webkit-transition: stroke-dashoffset 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86); 
  transition: stroke-dashoffset 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.checkbox input:checked ~ svg .checkmark {
  stroke-dashoffset: 0;
}
.checkbox input:checked ~ svg {
  stroke: var(--primary-color)
}

.icon {
  fill: none;
  height: 1rem;
  width: 1rem;
  stroke: rgba(var(--text), 0.7);
  stroke-width: 6;
  overflow: visible;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
<label class="checkbox">
    <input type="checkbox">
    <svg class="icon" viewBox="0 0 64 64">
        <title>checkbox</title>
        <rect class="box" x="0" y="0" width="64" height="64" rx="4" />
        <path class="checkmark" d="M50.52,19.56,26,44.08,13.48,31.56" />
    </svg>
</label>`
customElements.define('sm-checkbox', class extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: 'open' }).append(smCheckbox.content.cloneNode(true))
    }

    static get observedAttributes() {
        return ['disabled']
    }

    get disabled() {
        return this.getAttribute('disabled')
    }

    set disabled(val) {
        this.setAttribute('disabled', val)
    }

    connectedCallback() {
        this.checkbox = this.shadowRoot.querySelector('.checkbox');
        if (this.hasAttribute('disabled')) {
            this.checkbox.classList.add('disabled')
        }
        else {
            this.checkbox.classList.remove('disabled')
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this.checkbox = this.shadowRoot.querySelector('.checkbox');
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                if (newValue === 'true') {
                    this.checkbox.classList.add('disabled')
                }
                else {
                    this.checkbox.classList.remove('disabled')
                }
            }
        }
    }

})

//sm-audio

const smAudio = document.createElement('template')
smAudio.innerHTML = `
<style>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

:host{
	display: flex;
}

.audio{
  position: relative;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-user-select: none;
          user-select: none;
  padding: 0.6rem;
  border-radius: 0.2rem;
  background: rgba(var(--text), 0.08);
  overflow: hidden;
  width: 100%;
}

.hide {
  display: none;
}

.icon{
  stroke: rgba(var(--text), 1);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  overflow: visible;
  height: 2.1rem;
  width: 2.1rem;
  padding: 0.6rem;
  cursor: pointer;
  border-radius: 2rem;
  margin-right: 0.5rem;
}

.icon:hover{
  background: rgba(var(--text), 0.1);
}

audio {
  display: none;
}

.track {
  position: absolute;
  height: 0.2rem;
  bottom: 0;
  background: var(--primary-color);
  left: 0;
  -webkit-transition: width 0.2s;
  transition: width 0.2s;
  pointer-events: none;
  z-index: 0;
  border-radius: 0.2rem;
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
	<div class="audio">
		<svg class="icon play" viewBox="-6 0 64 64">
			<title>play</title>
			<path d="M57.12,26.79,12.88,1.31a6,6,0,0,0-9,5.21v51a6,6,0,0,0,9,5.21L57.12,37.21A6,6,0,0,0,57.12,26.79Z"/>
		</svg>
		<svg class="icon pause hide" viewBox="0 0 64 64">
			<title>pause</title>
			<line x1="17.5" x2="17.5" y2="64"/>
			<line x1="46.5" x2="46.5" y2="64"/>
		</svg>
		<h5 class="current-time"></h5> / <h5 class="duration"></h5>
		<audio src=""></audio>
		<div class="track"></div>
	</audio>
`;

customElements.define('sm-audio', class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }).append(smAudio.content.cloneNode(true))

        this.playing = false;
    }
    static get observedAttributes() {
        return ['src']
    }
    play() {
        this.audio.play()
        this.playing = false;
        this.pauseBtn.classList.remove('hide')
        this.playBtn.classList.add('hide')
    }
    pause() {
        this.audio.pause()
        this.playing = true;
        this.pauseBtn.classList.add('hide')
        this.playBtn.classList.remove('hide')
    }

    get isPlaying() {
        return this.playing;
    }

    connectedCallback() {
        this.playBtn = this.shadowRoot.querySelector('.play');
        this.pauseBtn = this.shadowRoot.querySelector('.pause');
        this.audio = this.shadowRoot.querySelector('audio')
        this.playBtn.addEventListener('click', e => {
            this.play()
        })
        this.pauseBtn.addEventListener('click', e => {
            this.pause()
        })
        this.audio.addEventListener('ended', e => {
            this.pause()
        })
        let width;
        if ('ResizeObserver' in window) {
            let resizeObserver = new ResizeObserver(entries => {
                entries.forEach(entry => {
                    width = entry.contentRect.width;
                })
            })
            resizeObserver.observe(this)
        }
        else {
            let observer = new IntersectionObserver((entries, observer) => {
                if (entries[0].isIntersecting)
                    width = this.shadowRoot.querySelector('.audio').offsetWidth;
            }, {
                threshold: 1
            })
            observer.observe(this)
        }
        this.audio.addEventListener('timeupdate', e => {
            let time = this.audio.currentTime,
                minutes = Math.floor(time / 60),
                seconds = Math.floor(time - minutes * 60),
                y = seconds < 10 ? "0" + seconds : seconds;
            this.shadowRoot.querySelector('.current-time').textContent = `${minutes}:${y}`
            this.shadowRoot.querySelector('.track').style.width = (width / this.audio.duration) * this.audio.currentTime + 'px'
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'src') {
                if (this.hasAttribute('src') && newValue.trim() !== '') {
                    this.shadowRoot.querySelector('audio').src = newValue;
                    this.shadowRoot.querySelector('audio').onloadedmetadata = () => {
                        let duration = this.audio.duration,
                            minutes = Math.floor(duration / 60),
                            seconds = Math.floor(duration - minutes * 60),
                            y = seconds < 10 ? "0" + seconds : seconds;
                        this.shadowRoot.querySelector('.duration').textContent = `${minutes}:${y}`;
                    }
                }
                else
                    this.classList.add('disabled')
            }
        }
    }
})

//sm-switch

const smSwitch = document.createElement('template')
smSwitch.innerHTML = `	
<style>
*{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

:host{
    display: inline-flex;
}
.switch {
  position: relative;
  overflow: hidden;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
          align-items: center;
  border-radius: 1rem;
  width: 2.4rem;
  padding: 0.2rem;
  cursor: pointer;
}

.switch input {
  display: none;
}

.switch .track {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: background 0.4s;
  transition: background 0.4s;
  background: rgba(var(--text), 0.6);
}

.switch .btn {
  position: relative;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  -webkit-transition: -webkit-transform 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: -webkit-transform 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: transform 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: transform 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86), -webkit-transform 0.4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  border: solid 0.3rem rgba(var(--foreground), 1);
}

.switch input:checked ~ .btn {
  -webkit-transform: translateX(100%);
          transform: translateX(100%);
}

.switch input:checked ~ .track {
  background: var(--primary-color);
}

</style>
<label class="switch">
    <input type="checkbox">
    <div class="track"></div>
    <div class="btn"></div>
</label>`

customElements.define('sm-switch', class extends HTMLElement{
    constructor() {
        super()
        this.attachShadow({mode: 'open'}).append(smSwitch.content.cloneNode(true))
    }

    connectedCallback() {
        
    }
})
