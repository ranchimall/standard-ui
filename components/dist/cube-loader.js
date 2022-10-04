const cubeLoader = document.createElement('template');
cubeLoader.innerHTML = `
    <style>
        :host{
            --gap: 0.1rem;
            --size: 1.5rem;
            --color: var(--accent-color,teal);
        }
        .loader {
            display: grid;
            width: max-content;
            grid-template-columns: auto auto;
            gap: var(--gap);
        }
        .box {
            border-radius: 0.2rem;
            height: var(--size);
            width: var(--size);
            background-color: var(--color);
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .box:nth-of-type(1) {
            animation-name: move1;
        }
        .box:nth-of-type(2) {
            animation-name: move2;
        }
        .box:nth-of-type(3) {
            animation-name: move3;
        }
        @keyframes move1 {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(calc(100% + var(--gap)), 0);
            }
            50% {
                transform: translate(calc(100% + var(--gap)), calc(100% + var(--gap)));
            }
            75% {
                transform: translate(0, calc(100% + var(--gap)));
            }
            100% {
                transform: translate(0, 0);
            }
        }
        @keyframes move2 {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(0, calc(100% + var(--gap)));
            }
            50% {
                transform: translate(calc(-100% - var(--gap)), calc(100% + var(--gap)));
            }
            75% {
                transform: translate(calc(-100% - var(--gap)), 0);
            }
            100% {
                transform: translate(0, 0);
            }
        }
        @keyframes move3 {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(0, calc(-100% - var(--gap)));
            }
            50% {
                transform: translate(calc(100% + var(--gap)), calc(-100% - var(--gap)));
            }
            75% {
                transform: translate(calc(100% + var(--gap)), 0);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    </style>
    <div class="loader">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>      
`;
class CubeLoader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        }).append(cubeLoader.content.cloneNode(true));
    }
}

window.customElements.define('cube-loader', CubeLoader);