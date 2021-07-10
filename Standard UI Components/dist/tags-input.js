const tagsInput = document.createElement('template')
tagsInput.innerHTML = `
  <style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  :host{
    --border-radius: 0.3rem;
    }
.hide{
    display: none !important;
}
.tags-wrapper{
    position: relative;
    display: flex;
    cursor: text;
    flex-wrap: wrap;
    justify-items: flex-start;
    align-items: center;
    padding: 0.5rem 0.5rem 0 0.5rem;
    border-radius: var(--border-radius);
    background-color: rgba(var(--text-color), 0.06);
  }
  .tags-wrapper:focus-within{
    box-shadow: 0 0 0 0.1rem var(--accent-color) inset !important;
  }
  
  .tag {
    cursor: pointer;
    user-select: none;
    align-items: center;
    display: inline-flex;
    border-radius: 0.3rem;
    padding: 0.3rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    background-color: rgba(var(--text-color), 0.06);
  }
  
  .icon {
    height: 1.2rem;
    width: 1.2rem;
    margin-left: 0.3rem;
    fill: rgba(var(--text-color), 0.8);
  }
  
  input,
  input:focus {
    outline: none;
    border: none;
  }
  
  input {
    display: inline-flex;
    width: auto;
    color: inherit;
    max-width: inherit;
    font-size: inherit;
    font-family: inherit;
    padding: 0.4rem 0.5rem;
    margin: 0 0.5rem 0.5rem 0;
    background-color: transparent;
  }
  .placeholder{
      position: absolute;
      padding: 0 0.5rem;
      top: 50%;
      font-weight: 500;
      transform: translateY(-50%);
      color: rgba(var(--text-color), 0.6);
  }
  </style>
  <div class="tags-wrapper">
    <input type="text" size="3"/>
    <p class="placeholder"></p>
  </div>
`

customElements.define('tags-input', class extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({
			mode: 'open'
		}).append(tagsInput.content.cloneNode(true))
		
		this.input = this.shadowRoot.querySelector('input')
		this.tagsWrapper = this.shadowRoot.querySelector('.tags-wrapper')
		this.placeholder = this.shadowRoot.querySelector('.placeholder')
		this.observeList = ['placeholder', 'limit']
		this.limit = undefined
		this.tags = new Set()

		this.reset = this.reset.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.handleKeydown = this.handleKeydown.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.removeTag = this.removeTag.bind(this)
	}
	static get observedAttributes() {
		return ['placeholder', 'limit']
	}
	get value() {
		return [...this.tags].join()
	}
	reset(){
		this.input.value = ''
		this.tags.clear()
		while (this.input.previousElementSibling) {
			this.input.previousElementSibling.remove()
		}
	}
	handleInput(e){
		const inputValueLength = e.target.value.trim().length
		e.target.setAttribute('size', inputValueLength ? inputValueLength : '3')
		if (inputValueLength) {
			this.placeholder.classList.add('hide')
		}
		else if (!inputValueLength && !this.tags.size) {
			this.placeholder.classList.remove('hide')
		}
	}
	handleKeydown(e){
		if (e.key === ',' || e.key === '/') {
			e.preventDefault()
		}
		if (e.target.value.trim() !== '') {
			if (e.key === 'Enter' || e.key === ',' || e.key === '/' || e.code === 'Space') {
				const tagValue = e.target.value.trim()
				if (this.tags.has(tagValue)) {
					this.tagsWrapper.querySelector(`[data-value="${tagValue}"]`).animate([
						{
							backgroundColor: 'initial'
						},
						{
							backgroundColor: 'var(--accent-color)'
						},
						{
							backgroundColor: 'initial'
						},
					], {
						duration: 300,
						easing: 'ease'
					})
				}
				else {
					const tag = document.createElement('span')
					tag.dataset.value = tagValue
					tag.className = 'tag'
					tag.innerHTML = `
                        <span class="tag-text">${tagValue}</span>
                        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                        `
					this.input.before(tag)
					this.tags.add(tagValue)
				}
				e.target.value = ''
				e.target.setAttribute('size', '3')
				if (this.limit && this.limit < this.tags.size + 1) {
					this.input.readOnly = true
					return
				}
			}
		}
		else {
			if (e.key === 'Backspace' && this.input.previousElementSibling) {
				this.removeTag(this.input.previousElementSibling)
			}
			if (this.limit && this.limit > this.tags.size) {
				this.input.readOnly = false
			}
		}
	}
	handleClick(e){
		if (e.target.closest('.tag')) {
			this.removeTag(e.target.closest('.tag'))
		}
		else {
			this.input.focus()
		}
	}
	removeTag(tag){
		this.tags.delete(tag.dataset.value)
		tag.remove()
		if (!this.tags.size) {
			this.placeholder.classList.remove('hide')
		}
	}
	connectedCallback() {
		this.input.addEventListener('input', this.handleInput)
		this.input.addEventListener('keydown', this.handleKeydown)
		this.tagsWrapper.addEventListener('click', this.handleClick)
	}
	attributeChangedCallback(name, oldValue, newValue) {
		if (name === 'placeholder') {
			this.placeholder.textContent = newValue
		}
		if (name === 'limit') {
			this.limit = parseInt(newValue)
		}
	}
	disconnectedCallback() {
		this.input.removeEventListener('input', this.handleInput)
		this.input.removeEventListener('keydown', this.handleKeydown)
		this.tagsWrapper.removeEventListener('click', this.handleClick)
	}
})