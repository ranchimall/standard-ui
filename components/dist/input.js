const smInput = document.createElement('template')
smInput.innerHTML = /*html*/`
    <style>
    *{
        padding: 0;
        margin: 0;
        -webkit-box-sizing: border-box;
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
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
    input:invalid{
        outline: none;
        box-shadow: none;
    }
    ::-moz-focus-inner{
        border: none;
    }
    :host{
        display: flex;
        --success-color: #00C853;
        --danger-color: red;
        --width: 100%;
        --icon-gap: 0.5rem;
        --min-height: 3.2rem;
        --background: rgba(var(--text-color, (17,17,17)), 0.06);
    }
    .hidden{
       display: none !important;
    }

    button{
        display: flex;
        border: none;
        background: none;
        padding: 0;
        border-radius: 1rem;
        min-width: 0;
        cursor: pointer;
    }
    button:focus{
        outline: var(--accent-color, teal) solid medium;
    }
    .icon {
        height: 1.2rem;
        width: 1.2rem;
        fill: rgba(var(--text-color, (17,17,17)), 0.6);
    }
    
    :host(.round) .input{
        border-radius: 10rem;
    }
    .outer-container{
        display: flex;
        flex-direction: column;
        position: relative;
        width: var(--width);
    }
    .input {
        display: flex;
        cursor: text;
        min-width: 0;
        text-align: left;
        align-items: center;
        position: relative;
        gap: var(--icon-gap);
        border-radius: var(--border-radius,0.3rem);
        transition: opacity 0.3s, box-shadow 0.2s;
        background: var(--background);
        width: 100%;
        outline: none;
        overflow: hidden;
        min-height: var(--min-height);
        padding: var(--padding, 0 0.8rem);
        container: input-wrapper / size;
    }
    .input.readonly .clear{
        opacity: 0 !important;
        margin-right: -2rem;
        pointer-events: none !important;
    }
    .readonly{
        pointer-events: none;
    }
    .input:focus-within:not(.readonly){
        box-shadow: 0 0 0 0.1rem var(--accent-color,teal) inset !important;
    }
    .disabled{
        pointer-events: none;
        opacity: 0.6;
    }
    .placeholder {
        grid-area: 1/1/2/2;
        font-size: inherit;
        opacity: .7;
        font-weight: 400;
        transition: transform 0.3s;
        transform-origin: left;
        pointer-events: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        user-select: none;
        will-change: transform;
    }
    .container{
        display: grid;
        height:100%;
        width: 100%;
        grid-template-columns: 1fr auto;
        position: relative;
        align-items: center;
        max-height: 100cqh;
    }    
    input{
        grid-area: 1/1/2/2;
        font-size: inherit;
        border: none;
        background: transparent;
        outline: none;
        color: inherit;
        font-family: inherit;
        height: 100%;
        width: 100%;
        caret-color: var(--accent-color, teal);
        font-weight: inherit;
        padding: var(--input-inner-padding, 0.6rem 0);
    }
    .animate-placeholder .container{
        padding: var(--input-inner-padding, 0.4rem 0);
    }
    .animate-placeholder .container input {
        grid-row: 2/3;
        padding: 0;
    }
      
    .animate-placeholder .placeholder {
        transform: scale(0.8);
        opacity: 1;
        color: var(--accent-color,teal);
        grid-row: 1/2;
    }
    :host([variant="outlined"]) .input {
        box-shadow: 0 0 0 1px var(--border-color, rgba(var(--text-color, (17,17,17)), 0.3)) inset;
        background: rgba(var(--background-color, (255,255,255)), 1);
    }
    .animate-placeholder:focus-within:not(.readonly) .placeholder{
        color: var(--accent-color,teal)
    }
    .success{
        color: var(--success-color);
    }
    .error{
        color: var(--danger-color);
    }
    .status-icon{
        margin-right: 0.5rem;
        flex-shrink: 0;
    }
    .status-icon--error{
        fill: var(--danger-color);
    }
    .status-icon--success{
        fill: var(--success-color);
    }
    .datalist{
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 100;
        background: rgba(var(--foreground-color, (255,255,255)), 1);
        border-radius: 0 0 var(--border-radius,0.5rem) var(--border-radius,0.5rem);
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);
        max-height: 20rem;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 0.3rem;
    }
    .datalist-item{
        padding: 0.8rem 1rem;
        cursor: pointer;
        transition: background 0.2s;
        border-radius: 0.5rem;
        content-visibility: auto;
    }
    .datalist-item:focus{
        outline: none;
    }
    .datalist-item:focus-visible{
        outline: var(--accent-color, teal) solid medium;
    }
    @media (any-hover: hover){
        .icon:hover{
            background: rgba(var(--text-color, (17,17,17)), 0.1);
        }
        .datalist-item:hover{
            background: rgba(var(--text-color, (17,17,17)), 0.06);
        }
    }
    </style>
    <div class="outer-container">
        <div part="input-wrapper" class="input">
            <slot name="icon"></slot>
            <label class="container">
                <span part="placeholder" class="placeholder"></span>
                <input part="input" type="text"/>
            </label>
            <button class="clear hidden" title="Clear" tabindex="-1">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"/></svg>
            </button>
            <slot name="right"></slot>
        </div>
        <ul class="datalist hidden" part="datalist"></ul>
    </div>
    `;
customElements.define('sm-input',
    class SmInput extends HTMLElement {
        static hasAppendedStyles = false;
        #validationState = {
            validatedFor: undefined,
            isValid: false,
            errorMessage: 'Please fill out this field.'
        }
        constructor() {
            super();
            this.attachShadow({
                mode: 'open'
            }).append(smInput.content.cloneNode(true));

            this.inputParent = this.shadowRoot.querySelector('.input');
            this.input = this.shadowRoot.querySelector('input');
            this.clearBtn = this.shadowRoot.querySelector('.clear');
            this.placeholderElement = this.shadowRoot.querySelector('.placeholder');
            this.outerContainer = this.shadowRoot.querySelector('.outer-container');
            this.optionList = this.shadowRoot.querySelector('.datalist');
            this._helperText = '';
            this.isRequired = false;
            this.datalist = [];
            this.validationFunction = undefined;
            this.reflectedAttributes = ['value', 'required', 'disabled', 'type', 'inputmode', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step', 'list', 'autocomplete'];
        }

        static get observedAttributes() {
            return ['value', 'placeholder', 'required', 'disabled', 'type', 'inputmode', 'readonly', 'min', 'max', 'pattern', 'minlength', 'maxlength', 'step', 'helper-text', 'error-text', 'list'];
        }

        get value() {
            return this.input.value;
        }

        set value(val) {
            if (val === this.input.value) return;
            this.input.value = val;
            this._value = val;
            this.checkInput();
        }

        get placeholder() {
            return this.getAttribute('placeholder');
        }

        set placeholder(val) {
            this.setAttribute('placeholder', val);
        }

        get type() {
            return this.getAttribute('type');
        }

        set type(val) {
            this.setAttribute('type', val);
        }

        get validity() {
            return this.input.validity;
        }
        get disabled() {
            return this.hasAttribute('disabled');
        }
        set disabled(value) {
            if (value) {
                this.inputParent.classList.add('disabled');
                this.setAttribute('disabled', '');
            } else {
                this.inputParent.classList.remove('disabled');
                this.removeAttribute('disabled');
            }
        }
        get readOnly() {
            return this.hasAttribute('readonly');
        }
        set readOnly(value) {
            if (value) {
                this.setAttribute('readonly', '');
            } else {
                this.removeAttribute('readonly');
            }
        }
        set customValidation(val) {
            if (val)
                this.validationFunction = val;
        }
        set errorText(val) {
            this.#validationState.errorText = val;
        }
        showError = (errorText = this.#validationState.errorText) => {
            const appendedNew = this.appendFeedbackElement()
            this.feedbackPopover.innerHTML = `
                <svg class="status-icon status-icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/></svg>
                ${errorText}
            `;
            this.feedbackPopover.dataset.state = 'error';
            if (!appendedNew) return;
            this.feedbackPopover.animate([
                { transform: 'scale(0.95)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 200,
                easing: 'ease',
                fill: 'forwards'
            })
        }

        set helperText(val) {
            this._helperText = val;
        }
        get isValid() {
            if (this.#validationState.validatedFor === this.input.value)
                return this.#validationState.isValid; // if the input value has not changed, return the previous validity
            const _isValid = this.input.checkValidity();
            let _validity = { isValid: true, errorText: '' }
            if (this.validationFunction) {
                _validity = this.validationFunction(this.input.value, this);
            }
            if (_isValid && _validity.isValid) {
                this.setAttribute('valid', '');
                this.removeAttribute('invalid');
                this.hideFeedback();
            } else {
                this.removeAttribute('valid');
                this.setAttribute('invalid', '');
                if (this.value.trim() !== '' && (_validity.errorText || this.#validationState.errorText)) {
                    this.showError(_validity.errorText || this.#validationState.errorText);
                }
            }
            this.#validationState.validatedFor = this.input.value;
            this.#validationState.isValid = _isValid && _validity.isValid;
            this.#validationState.errorText = _validity.errorText || this.#validationState.errorText;
            return this.#validationState.isValid;
        }
        reset = () => {
            this.value = '';
        }
        clear = () => {
            this.value = '';
            this.input.focus();
            this.fireEvent();
            this.hideFeedback();
        }

        focusIn = () => {
            this.input.focus();
        }

        focusOut = () => {
            this.input.blur();
        }

        fireEvent = () => {
            let event = new Event('input', {
                bubbles: true,
                cancelable: true,
                composed: true
            });
            this.dispatchEvent(event);
        }

        searchDatalist = (searchKey) => {
            const filteredData = this.datalist.filter(item => item.toLowerCase().includes(searchKey.toLowerCase()));
            // sort the filtered data based on the input value
            filteredData.sort((a, b) => {
                const aIndex = a.toLowerCase().indexOf(searchKey.toLowerCase());
                const bIndex = b.toLowerCase().indexOf(searchKey.toLowerCase());
                return aIndex - bIndex;
            });
            if (filteredData.length) {
                if (this.optionList.children.length > filteredData.length) {
                    // remove extra options
                    const optionsToRemove = this.optionList.children.length - filteredData.length;
                    for (let i = 0; i < optionsToRemove; i++) {
                        this.optionList.removeChild(this.optionList.lastChild);
                    }
                }
                filteredData.forEach((item, index) => {
                    if (this.optionList.children[index]) {
                        this.optionList.children[index].textContent = item;
                    } else {
                        const option = document.createElement('li');
                        option.textContent = item;
                        option.classList.add('datalist-item');
                        option.setAttribute('tabindex', '0');
                        this.optionList.appendChild(option);
                    }
                })
                this.optionList.classList.remove('hidden');
            } else {
                this.optionList.classList.add('hidden');
            }
        }

        checkInput = (e) => {
            if (!this.hasAttribute('readonly')) {
                if (this.input.value !== '') {
                    this.clearBtn.classList.remove('hidden');
                } else {
                    this.clearBtn.classList.add('hidden');
                }
            }
            if (!this.hasAttribute('placeholder') || this.getAttribute('placeholder').trim() === '') return;
            if (this.input.value !== '') {
                if (this.shouldAnimatePlaceholder)
                    this.inputParent.classList.add('animate-placeholder');
                this.placeholderElement.classList.toggle('hidden', !this.shouldAnimatePlaceholder);
                if (this.datalist.length) {
                    // debounce the search
                    if (this.searchTimeout) {
                        clearTimeout(this.searchTimeout);
                    }
                    this.searchTimeout = setTimeout(() => {
                        this.searchDatalist(this.input.value.trim());
                    }, 100);
                }
            } else {
                if (this.shouldAnimatePlaceholder)
                    this.inputParent.classList.remove('animate-placeholder');
                this.placeholderElement.classList.remove('hidden');
                this.hideFeedback();
                if (this.datalist.length) {
                    this.optionList.innerHTML = '';
                    this.optionList.classList.add('hidden');
                }
            }
        }
        allowOnlyNum = (e) => {
            if (e.ctrlKey) return;
            if (e.key.length === 1) {
                if (e.key === '.' && (e.target.value.includes('.') || e.target.value.length === 0)) {
                    e.preventDefault();
                } else if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)) {
                    e.preventDefault();
                }
            }
        }
        handleOptionClick = (e) => {
            this.input.value = e.target.textContent;
            this.optionList.classList.add('hidden');
            this.input.focus();
        }
        // handle arrow key navigation on input
        handleInputNavigation = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.optionList.children.length) {
                    this.optionList.children[0].focus();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.optionList.children.length) {
                    this.optionList.children[this.optionList.children.length - 1].focus();
                }
            }
        }
        // handle arrow key navigation on datalist
        handleDatalistNavigation = (e) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.shadowRoot.activeElement.previousElementSibling ? this.shadowRoot.activeElement.previousElementSibling.focus() : this.input.focus();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.shadowRoot.activeElement.nextElementSibling ? this.shadowRoot.activeElement.nextElementSibling.focus() : this.input.focus();
            } else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.input.value = e.target.textContent;
                this.optionList.classList.add('hidden');
                this.input.focus();
            }
        }
        handleFocus = (e) => {
            if (this.datalist.length) {
                this.searchDatalist(this.input.value.trim());
            }
        }
        handleBlur = (e) => {
            if (this.input.value.trim() === '') {
                this.hideFeedback();
            }
            if (this.datalist.length) {
                this.optionList.classList.add('hidden');
            }
        }
        applyGlobalCustomValidation = () => {
            if (typeof window.smCompConfig !== 'undefined' && window.smCompConfig['sm-input']) {
                const config = window.smCompConfig['sm-input'].find(config => this.matches(config.selector))
                this.customValidation = config?.customValidation;
            }
        }
        updatePosition = () => {
            requestAnimationFrame(() => {
                this.dimensions = this.getBoundingClientRect()
                this.scrollingParentDimensions = this.scrollingParent.getBoundingClientRect()
                if (this.dimensions.width === 0 || this.dimensions.height === 0) return;
                let topOffset = this.dimensions.top - this.scrollingParentDimensions.top + this.dimensions.height;
                let leftOffset = this.dimensions.left - this.scrollingParentDimensions.left;
                const maxWidth = this.dimensions.width
                this.feedbackPopover.style = `top: ${topOffset}px; left: ${leftOffset}px; max-width: ${maxWidth}px;`
            })
        }
        appendFeedbackElement = () => {
            if (this.feedbackPopover) return false;
            this.feedbackPopover = document.createElement('div');
            this.feedbackPopover.className = 'feedback-popover';
            this.feedbackPopover.setAttribute('aria-live', 'polite');
            this.containment = this.closest('[data-sm-containment]')
            this.scrollingParent = this.getNearestScrollingParent(this);
            const appendTo = this.containment || this.scrollingParent;
            appendTo.appendChild(this.feedbackPopover)
            if (this.scrollingParent.style.position === '')
                this.scrollingParent.style.position = 'relative'
            if (!this.containment) {
                this.observerHidFeedback = false;
                this.intersectionObserver = new IntersectionObserver((entries) => {
                    if (!this.feedbackPopover) return;
                    if (entries[0].isIntersecting) {
                        if (!this.observerHidFeedback) return;
                        this.feedbackPopover.classList.remove('hidden');
                        this.observerHidFeedback = false;
                    } else {
                        this.feedbackPopover.classList.add('hidden');
                        this.observerHidFeedback = true;
                    }
                }).observe(this);
            }
            this.updatePosition()
            window.addEventListener('resize', this.updatePosition, { passive: true })
            return true;
        }
        getNearestScrollingParent = (element) => {
            let parent = element.parentNode;
            while (parent) {
                // Check if the parent has scrollbars
                // or if it's a custom element
                // or if it has the data-scrollable attribute
                if (
                    parent.scrollHeight > parent.clientHeight ||
                    parent.scrollWidth > parent.clientWidth ||
                    parent.tagName.includes('SM-') ||
                    parent.hasAttribute('data-scrollable')
                ) {
                    return parent;
                }
                parent = parent.parentNode;
            }

            // If no scrolling parent is found, return the document body as a fallback
            return document.body;
        }
        hideFeedback = () => {
            if (!this.feedbackPopover) return;
            this.feedbackPopover.animate([
                {
                    transform: `none`,
                    opacity: 1,
                },
                {
                    transform: `scale(0.95)`,
                    opacity: 0
                }
            ], {
                duration: 100,
                easing: 'ease-in-out',
                fill: 'forwards'
            }).onfinish = () => {
                this.intersectionObserver?.disconnect();
                if (this.feedbackPopover) {
                    this.feedbackPopover.remove();
                    this.feedbackPopover = null;
                }
                window.removeEventListener('resize', this.updatePosition, { passive: true })
            }
        }
        connectedCallback() {
            if (!SmInput.hasAppendedStyles) {
                // inject styles once will be utilized by all instances
                document.head.insertAdjacentHTML('beforeend', /*html*/`<style>
                    // styles injected by sm-input component
                    .success{
                        color: var(--success-color);
                    }
                    .error{
                        color: var(--danger-color);
                    }
                    .status-icon{
                        margin-right: 0.5rem;
                        flex-shrink: 0;
                    }
                    .status-icon--error{
                        fill: var(--danger-color);
                    }
                    .status-icon--success{
                        fill: var(--success-color);
                    }
                    .feedback-popover:not(:empty){
                        position: absolute;
                        display: flex;
                        width: fit-content;
                        top: 100%;
                        text-align: left;
                        font-size: 0.9rem;
                        align-items: center;
                        padding: 0.8rem;
                        border-radius: var(--border-radius,0.5rem);
                        color: rgba(var(--text-color, (17,17,17)), 0.8);
                        background: rgba(var(--foreground-color, (255,255,255)), 1);
                        margin-top: 0.5rem;
                        box-shadow: 0 0.5rem 1rem rgba(var(--text-color, (17,17,17)), 0.1);
                    }
                    .feedback-popover:not(:empty)::before{
                        content: '';
                        height: 0;
                        width: 0;
                        position: absolute;
                        border: 0.5rem solid transparent;
                        border-bottom-color: rgba(var(--foreground-color, (255,255,255)), 1);
                        top: -1rem;
                        left: 1rem;
                    }
                </style>`);
                SmInput.hasAppendedStyles = true
            }
            this.shouldAnimatePlaceholder = this.hasAttribute('animate');
            if (this.shouldAnimatePlaceholder && this.placeholderElement !== '' && this.value) {
                this.inputParent.classList.add('animate-placeholder');
                this.placeholderElement.classList.remove('hidden');
            }
            this.setAttribute('role', 'textbox');
            if (document.readyState === 'loading') {
                window.addEventListener('load', this.applyGlobalCustomValidation, { once: true })
            } else {
                this.applyGlobalCustomValidation()
            }
            this.input.addEventListener('input', this.checkInput);
            this.clearBtn.addEventListener('click', this.clear);
            if (this.datalist.length) {
                this.optionList.addEventListener('click', this.handleOptionClick);
                this.input.addEventListener('keydown', this.handleInputNavigation);
                this.optionList.addEventListener('keydown', this.handleDatalistNavigation);
            }
            this.input.addEventListener('focusin', this.handleFocus);
            this.addEventListener('focusout', this.handleBlur);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                if (this.reflectedAttributes.includes(name)) {
                    if (this.hasAttribute(name)) {
                        this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '');
                    } else {
                        this.input.removeAttribute(name);
                    }
                }
                switch (name) {
                    case 'placeholder':
                        this.placeholderElement.textContent = newValue;
                        this.setAttribute('aria-label', newValue);
                        break;
                    case 'value':
                        this.checkInput();
                        break;
                    case 'type':
                        if (this.hasAttribute('type') && this.getAttribute('type') === 'number') {
                            this.input.setAttribute('inputmode', 'decimal');
                            this.input.addEventListener('keydown', this.allowOnlyNum);
                        } else {
                            this.input.removeEventListener('keydown', this.allowOnlyNum);
                        }
                        break;
                    case 'helper-text':
                        this._helperText = newValue;
                        break;
                    case 'error-text':
                        this.#validationState.errorText = newValue;
                        break;
                    case 'required':
                        this.isRequired = this.hasAttribute('required');
                        if (this.isRequired) {
                            this.setAttribute('aria-required', 'true');
                        } else {
                            this.setAttribute('aria-required', 'false');
                        }
                        break;
                    case 'readonly':
                        if (this.hasAttribute('readonly')) {
                            this.inputParent.classList.add('readonly');
                        } else {
                            this.inputParent.classList.remove('readonly');
                        }
                        break;
                    case 'disabled':
                        if (this.hasAttribute('disabled')) {
                            this.inputParent.classList.add('disabled');
                        }
                        else {
                            this.inputParent.classList.remove('disabled');
                        }
                        break;
                    case 'list':
                        if (this.hasAttribute('list') && this.getAttribute('list').trim() !== '') {
                            this.datalist = this.getAttribute('list').split(',');
                        }
                        break;
                }
            }
        }
        disconnectedCallback() {
            this.input.removeEventListener('input', this.checkInput);
            this.clearBtn.removeEventListener('click', this.clear);
            this.input.removeEventListener('keydown', this.allowOnlyNum);
            this.optionList.removeEventListener('click', this.handleOptionClick);
            this.input.removeEventListener('keydown', this.handleInputNavigation);
            this.optionList.removeEventListener('keydown', this.handleDatalistNavigation);
            this.input.removeEventListener('focusin', this.handleFocus);
            this.removeEventListener('focusout', this.handleBlur);
            window.removeEventListener('resize', this.updatePosition, { passive: true })
            if (this.feedbackPopover)
                this.feedbackPopover.remove();
            if (this.intersectionObserver)
                this.intersectionObserver.disconnect();
        }
    })  