const spinner = document.createElement('template')
spinner.innerHTML = `
<style>     
*{
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
}
.loader {
    height: 1.6rem;
    width: 1.6rem;
    stroke-width: 8;
    overflow: visible;
    stroke: var(--accent-color);
    fill: none;
    stroke-dashoffset: 180;
    stroke-dasharray: 180;
    animation: load 2s infinite, spin 1s linear infinite;
}
@keyframes load {
    50% {
        stroke-dashoffset: 0;
    }
    100%{
        stroke-dashoffset: -180;
    }
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
<svg viewBox="0 0 64 64" class="loader"><circle cx="32" cy="32" r="32" /></svg>

`
class SquareLoader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(spinner.content.cloneNode(true))
    }
}

window.customElements.define('sm-spinner', SquareLoader);