const fileInput = document.createElement('template')
fileInput.innerHTML = `
  	<style>
		*{
			padding: 0;
			margin: 0;
			box-sizing: border-box;
		}
		:host{
			--border-radius: 0.3rem;
			--button-color: rgba(var(--background-color, (255, 255, 255)), 1);
			--button-font-weight: 500;
			--button-background-color: var(--accent-color, teal);
		}
		.file-input {
			display: flex;
		}
		
		.file-picker-button {
            display: flex;
			cursor: pointer;
			user-select: none;
            align-items: center;
			padding: 0.5rem 0.8rem;
			color: var(--button-color);
			border-radius: var(--border-radius);
			font-weight: var(--button-font-weight);
			background-color: var(--button-background-color);
		}
		.files-preview-wrapper{
			display: grid;
			gap: 0.5rem;
			list-style: none;
		}
		.files-preview-wrapper:not(:empty){
            margin-bottom: 1rem;
		}
		.file-preview{
			display: grid;
            gap: 0.5rem;
            align-items: center;
			padding: 0.5rem 0.8rem;
			border-radius: var(--border-radius);
			background-color: rgba(var(--text-color, (17,17,17)), 0.06)
		}
		.file-name{
		}
        .file-size{
            font-size: 0.8rem;
            font-weight: 400;
            color: rgba(var(--text-color, (17,17,17)), 0.8);
        }
		input[type=file] {
			display: none;
		}
  	</style>
	<ul class="files-preview-wrapper"></ul>
  	<label tabindex="0" class="file-input">
		<div class="file-picker-button"><slot>Choose file</slot></div>
		<input type="file">
	</label>
`

customElements.define('file-input', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: 'open'
		}).append(fileInput.content.cloneNode(true))
		this.input = this.shadowRoot.querySelector('input')
		this.fileInput = this.shadowRoot.querySelector('.file-input')
		this.filesPreviewWrapper = this.shadowRoot.querySelector('.files-preview-wrapper')
		this.reflectedAttributes = ['accept', 'multiple', 'capture', 'type']

		this.reset = this.reset.bind(this)
		this.formatBytes = this.formatBytes.bind(this)
		this.createFilePreview = this.createFilePreview.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleKeyDown = this.handleKeyDown.bind(this)
	}
	static get observedAttributes() {
		return ['accept', 'multiple', 'capture', 'type']
	}
	get files() {
		return this.input.files
	}
	set accept(val) {
		this.setAttribute('accept', val)
	}
	set multiple(val) {
		if (val) {
			this.setAttribute('multiple', '')
		}
		else {
			this.removeAttribute('multiple')
		}
	}
	set capture(val) {
		this.setAttribute('capture', val)
	}
	set value(val) {
		this.input.value = val
	}
	get isValid() {
		return this.input.value !== ''
	}
	reset() {
		this.input.value = ''
		this.filesPreviewWrapper.innerHTML = ''
	}
	formatBytes(a, b = 2) { if (0 === a) return "0 Bytes"; const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024)); return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d] }
	createFilePreview(file) {
		const filePreview = document.createElement('li')
		const { name, size } = file
		filePreview.className = 'file-preview'
		filePreview.innerHTML = `
			<div class="file-name">${name}</div>
            <h5 class="file-size">${this.formatBytes(size)}</h5>
		`
		return filePreview
	}
	handleChange(e) {
		this.filesPreviewWrapper.innerHTML = ''
		const frag = document.createDocumentFragment()
		Array.from(e.target.files).forEach(file => {
			frag.append(
				this.createFilePreview(file)
			)
		});
		this.filesPreviewWrapper.append(frag)
	}
	handleKeyDown(e) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			this.input.click()
		}
	}
	connectedCallback() {
		this.setAttribute('role', 'button')
		this.setAttribute('aria-label', 'File upload')
		this.input.addEventListener('change', this.handleChange)
		this.fileInput.addEventListener('keydown', this.handleKeyDown)
	}
	attributeChangedCallback(name) {
		if (this.reflectedAttributes.includes(name)) {
			if (this.hasAttribute(name)) {
				this.input.setAttribute(name, this.getAttribute(name) ? this.getAttribute(name) : '')
			}
			else {
				this.input.removeAttribute(name)
			}
		}
	}
	disconnectedCallback() {
		this.input.removeEventListener('change', this.handleChange)
		this.fileInput.removeEventListener('keydown', this.handleKeyDown)
	}
})