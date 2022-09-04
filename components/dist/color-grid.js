//Color Grid
const colorGrid = document.createElement('template');
colorGrid.innerHTML = `
<style>
    *{
        padding:0;
        margin:0;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
    }
    :host{
        display: flex;
    }
    .color-tile-container{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .color-tile{
        position: relative;
        cursor: pointer;
        display: flex;
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 0.3rem;
        align-items: center;
        justify-content: center;
    }
    .color-tile input[type="radio"]{
        display: none;
    }
    .checkmark{
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        align-items: center;
        justify-content: center;
        padding: 0.3rem;
        border-radius: 0.3rem;
        background-color: rgba(var(--background-color, (255,255,255)), 0.8);
        animation: checkmark 0.1s ease;
    }
    .icon{
        height: 1rem;
        width: 1rem;
        fill: rgba(var(--text-color, (17,17,17)), 1);
    }
    @keyframes checkmark{
        from{
            transform: scale(0);
        }
        to{
            transform: scale(1);
        }
    }

</style>
<div class="color-tile-container">
</div>`;

customElements.define('color-grid',
    class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({
                mode: 'open'
            }).append(colorGrid.content.cloneNode(true))

            this.colorArray = []
            this.container = this.shadowRoot.querySelector('.color-tile-container')
            this.handleChange = this.handleChange.bind(this)
            this.setCheckMark = this.setCheckMark.bind(this)
        }

        set colors(arr) {
            this.colorArray = arr
            this.renderTiles()
        }

        set selectedColor(color) {
            if (this.colorArray.includes(color) && this.container.querySelector(`[data-color="${color}"]`)) {
                const selectedTile = this.container.querySelector(`[data-color="${color}"]`)
                if (selectedTile) {
                    selectedTile.querySelector('input').checked = true
                    this.setCheckMark(selectedTile)
                }
            }
        }

        randString(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < length; i++)
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            return result;
        }

        renderTiles() {
            this.container.innerHTML = ''
            const frag = document.createDocumentFragment()
            const groupName = this.randString(6)
            this.colorArray.forEach(color => {
                const label = document.createElement('label')
                label.classList.add('color-tile')
                label.setAttribute('data-color', color)
                if (color.includes('--'))
                    label.setAttribute('style', `background-color: var(${color})`)
                else
                    label.setAttribute('style', `background-color: ${color}`)
                label.innerHTML = `
                <input type="radio" name="${groupName}">
                `
                frag.append(label)
            })
            this.container.append(frag)
        }
        setCheckMark(target) {
            target.parentNode.querySelectorAll('.checkmark').forEach(checkmark => checkmark.remove())
            const checkMark = document.createElement('div')
            checkMark.classList.add('checkmark')
            checkMark.innerHTML = `
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
            `
            target.append(checkMark)
        }

        handleChange(e) {
            const clickedTile = e.target.closest('.color-tile')
            this.setCheckMark(clickedTile)
            const clickedTileColor = clickedTile.dataset.color
            const tileSelected = new CustomEvent('colorselected', {
                bubbles: true,
                composed: true,
                detail: {
                    value: clickedTileColor,
                }
            })
            this.dispatchEvent(tileSelected)
        }

        connectedCallback() {
            this.container.addEventListener('change', this.handleChange)
        }

        disconnectedCallback() {
            this.container.removeEventListener('change', this.handleChange)
        }
    })