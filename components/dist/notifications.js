//notifications

const smNotifications = document.createElement('template')
smNotifications.innerHTML = `
        <style>
            *{
                padding: 0;
                margin: 0;
                -webkit-box-sizing: border-box;
                        box-sizing: border-box;
            } 
            :host{
                display: flex;
                --icon-height: 1.5rem;
                --icon-width: 1.5rem;
            }
            .hide{
                opacity: 0 !important;
                pointer-events: none !important;
            }
            .notification-panel{
                display: grid;
                width: min(26rem, 100%);
                gap: 0.5rem;
                position: fixed;
                left: 0;
                top: 0;
                z-index: 100;
                max-height: 100%;
                padding: 1rem;
                overflow: hidden auto;
                overscroll-behavior: contain;
                touch-action: none;
            }
            .notification-panel:empty{
                display:none;
            }
            .notification{
                display: flex;
                position: relative;
                border-radius: 0.5rem;
                background: rgba(var(--foreground-color, (255,255,255)), 1);
                overflow: hidden;
                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-word;
                padding: max(1rem,1.5vw);
                align-items: center;
                box-shadow: 0 0.5rem 1rem 0 rgba(0,0,0,0.14);
                touch-action: none;
            }
            .notification:not(.pinned)::before{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 0.2rem;
                width: 100%;
                background-color: var(--accent-color, teal);
                animation: loading var(--timeout, 5000ms) linear forwards;
                transform-origin: left;
            }
            @keyframes loading{
                to{
                    transform: scaleX(0);
                }
            }
            .icon-container:not(:empty){
                margin-right: 0.5rem;
                height: var(--icon-height);
                width: var(--icon-width);
                flex-shrink: 0;
            }
            .notification:last-of-type{
                margin-bottom: 0;
            }
            .icon {
                height: 100%;
                width: 100%;
                fill: rgba(var(--text-color, (17,17,17)), 0.7);
            }
            .icon--success {
                fill: var(--green);
            }
            .icon--failure,
            .icon--error {
            fill: var(--danger-color);
            }
            output{
                width: 100%;
            }
            .close{
                height: 2rem;
                width: 2rem;
                border: none;
                cursor: pointer;
                margin-left: 1rem;
                border-radius: 50%;
                padding: 0.3rem;
                transition: background-color 0.3s, transform 0.3s;
                background-color: transparent;
                flex-shrink: 0;
            }
            .close:active{
                transform: scale(0.9);
            }
            .action{
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.5rem 0.8rem;
                border-radius: 0.2rem;
                border: none;
                background-color: rgba(var(--text-color, (17,17,17)), 0.03);
                font-family: inherit;
                font-size: inherit;
                color: var(--accent-color, teal);
                font-weight: 500;
                cursor: pointer;
            }
            @media screen and (max-width: 640px){
                .close{
                    display: none;
                }
                .notification-panel:not(:empty){
                    padding-bottom: 3rem;
                }
            }
            @media screen and (min-width: 640px){
                .notification-panel{
                    top: auto;
                    bottom: 0;
                    max-width: max-content;
                }
                .notification{
                    width: auto;
                    max-width: max-content; 
                    border: solid 1px rgba(var(--text-color, (17,17,17)), 0.2);
                }
            }
            @media (any-hover: hover){
                ::-webkit-scrollbar{
                    width: 0.5rem;
                }
                
                ::-webkit-scrollbar-thumb{
                    background: rgba(var(--text-color, (17,17,17)), 0.3);
                    border-radius: 1rem;
                    &:hover{
                        background: rgba(var(--text-color, (17,17,17)), 0.5);
                    }
                }
                .close:hover{
                    background-color: rgba(var(--text-color, (17,17,17)), 0.1);
                }
            }
        </style>
        <div class="notification-panel"></div>
        `;
customElements.define('sm-notifications', class extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({
            mode: 'open'
        }).append(smNotifications.content.cloneNode(true))

        this.notificationPanel = this.shadowRoot.querySelector('.notification-panel')
        this.animationOptions = {
            duration: 300,
            fill: "forwards",
            easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }

        this.push = this.push.bind(this)
        this.createNotification = this.createNotification.bind(this)
        this.removeNotification = this.removeNotification.bind(this)
        this.clearAll = this.clearAll.bind(this)
        this.remove = this.remove.bind(this)
        this.handleTouchMove = this.handleTouchMove.bind(this)


        this.startX = 0;
        this.currentX = 0;
        this.endX = 0;
        this.swipeDistance = 0;
        this.swipeDirection = '';
        this.swipeThreshold = 0;
        this.startTime = 0;
        this.swipeTime = 0;
        this.swipeTimeThreshold = 200;
        this.currentTarget = null;
        this.notificationTimeout = 5000;

        this.mediaQuery = window.matchMedia('(min-width: 640px)')
        this.handleOrientationChange = this.handleOrientationChange.bind(this)
        this.isBigViewport = false
    }
    set timeout(value) {
        if (isNaN(value)) return;
        this.notificationTimeout = value;
    }
    randString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++)
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    createNotification(message, options = {}) {
        const { pinned = false, icon, action, timeout = this.notificationTimeout } = options;
        const notification = document.createElement('div')
        notification.id = this.randString(8)
        notification.className = `notification ${pinned ? 'pinned' : ''}`
        notification.style.setProperty('--timeout', `${timeout}ms`);
        notification.innerHTML = /*html*/`
            ${icon ? `<div class="icon-container">${icon}</div>` : ''}
            <output>${message}</output>
            ${action ? `<button class="action">${action.label}</button>` : ''}
            <button class="close">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
            </button>
        `;
        if (action) {
            notification.querySelector('.action').addEventListener('click', action.callback)
        }
        notification.querySelector('.close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
        if (pinned) {
        } else {
            setTimeout(() => {
                this.removeNotification(notification, this.isBigViewport ? 'left' : 'top');
            }, timeout);
        }
        return notification;
    }

    push(message, options = {}) {
        const notification = this.createNotification(message, options);
        if (this.isBigViewport)
            this.notificationPanel.append(notification);
        else
            this.notificationPanel.prepend(notification);
        notification.scrollIntoView({ behavior: 'smooth' });
        this.notificationPanel.animate(
            [
                {
                    transform: `translateY(${this.isBigViewport ? '' : '-'}${notification.clientHeight}px)`,
                },
                {
                    transform: `none`,
                },
            ], this.animationOptions
        )
        notification.animate([
            {
                transform: `translateY(-1rem)`,
                opacity: '0'
            },
            {
                transform: `none`,
                opacity: '1'
            },
        ], this.animationOptions).onfinish = (e) => {
            e.target.commitStyles()
            e.target.cancel()
        }
        return notification.id;
    }

    removeNotification(notification, direction = 'left') {
        if (!notification) return;
        const sign = direction === 'left' || direction === 'top' ? '-' : '+';

        if (!this.isBigViewport && direction === 'top') {
            notification.animate([
                {
                    transform: this.currentX ? `translateY(${this.currentX}px)` : `none`,
                    opacity: '1'
                },
                {
                    transform: `translateY(calc(${sign}${Math.abs(this.currentX)}px ${sign} 1rem))`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove();
            };
        } else {
            notification.animate([
                {
                    transform: this.currentX ? `translateX(${this.currentX}px)` : `none`,
                    opacity: '1'
                },
                {
                    transform: `translateX(calc(${sign}${Math.abs(this.currentX)}px ${sign} 1rem))`,
                    opacity: '0'
                }
            ], this.animationOptions).onfinish = () => {
                notification.remove();
            };
        }
    }
    remove(id) {
        const notification = this.notificationPanel.querySelector(`#${id}`);
        if (!notification) return;
        this.removeNotification(notification);
    }

    clearAll() {
        Array.from(this.notificationPanel.children).forEach(child => {
            this.removeNotification(child);
        });
    }

    handleTouchMove(e) {
        this.currentX = e.touches[0].clientX - this.startX;
        this.currentTarget.style.transform = `translateX(${this.currentX}px)`;
    }

    handleOrientationChange(e) {
        this.isBigViewport = e.matches
        if (e.matches) {
            // landscape

        } else {
            // portrait
        }
    }
    connectedCallback() {

        this.handleOrientationChange(this.mediaQuery);

        this.mediaQuery.addEventListener('change', this.handleOrientationChange);
        this.notificationPanel.addEventListener('touchstart', e => {
            if (e.target.closest('.close')) {
                this.removeNotification(e.target.closest('.notification'));
            } else if (e.target.closest('.notification')) {
                this.swipeThreshold = e.target.closest('.notification').getBoundingClientRect().width / 2;
                this.currentTarget = e.target.closest('.notification');
                this.startTime = Date.now();
                this.startX = e.touches[0].clientX;
                this.startY = e.touches[0].clientY;
                this.notificationPanel.addEventListener('touchmove', this.handleTouchMove, { passive: true });
            }
        }, { passive: true });
        this.notificationPanel.addEventListener('touchend', e => {
            this.endX = e.changedTouches[0].clientX;
            this.endY = e.changedTouches[0].clientY;
            this.swipeDistance = Math.abs(this.endX - this.startX);
            this.swipeTime = Date.now() - this.startTime;
            if (this.endX > this.startX) {
                this.swipeDirection = 'right';
            } else {
                this.swipeDirection = 'left';
            }
            if (this.swipeTime < this.swipeTimeThreshold) {
                if (this.swipeDistance > 50)
                    this.removeNotification(this.currentTarget, this.swipeDirection);
            } else {
                if (this.swipeDistance > this.swipeThreshold) {
                    this.removeNotification(this.currentTarget, this.swipeDirection);
                } else {
                    this.currentTarget.animate([
                        {
                            transform: `translateX(${this.currentX}px)`,
                        },
                        {
                            transform: `none`,
                        },
                    ], this.animationOptions).onfinish = (e) => {
                        e.target.commitStyles()
                        e.target.cancel()
                    }
                }
            }
            this.notificationPanel.removeEventListener('touchmove', this.handleTouchMove)
            this.currentX = 0;
        });
    }
    disconnectedCallback() {
        mediaQueryList.removeEventListener('change', handleOrientationChange);
    }
});