// Global variables
const appPages = ['dashboard', 'settings'];
const domRefs = {};
let timerId;
const currentYear = new Date().getFullYear();

//Checks for internet connection status
if (!navigator.onLine)
    notify(
        "There seems to be a problem connecting to the internet, Please check you internet connection.",
        "error",
        { sound: true }
    );
window.addEventListener("offline", () => {
    notify(
        "There seems to be a problem connecting to the internet, Please check you internet connection.",
        "error",
        { pinned: true, sound: true }
    );
});
window.addEventListener("online", () => {
    getRef("notification_drawer").clearAll();
    notify("We are back online.", "success");
});

// Use instead of document.getElementById
function getRef(elementId) {
    if (!domRefs.hasOwnProperty(elementId)) {
        domRefs[elementId] = {
            count: 1,
            ref: null,
        };
        return document.getElementById(elementId);
    } else {
        if (domRefs[elementId].count < 3) {
            domRefs[elementId].count = domRefs[elementId].count + 1;
            return document.getElementById(elementId);
        } else {
            if (!domRefs[elementId].ref)
                domRefs[elementId].ref = document.getElementById(elementId);
            return domRefs[elementId].ref;
        }
    }
}

// returns dom with specified element
function createElement(tagName, options) {
    const { className, textContent, innerHTML, attributes = {} } = options
    const elem = document.createElement(tagName)
    for (let attribute in attributes) {
        elem.setAttribute(attribute, attributes[attribute])
    }
    if (className)
        elem.className = className
    if (textContent)
        elem.textContent = textContent
    if (innerHTML)
        elem.innerHTML = innerHTML
    return elem
}

// Use when a function needs to be executed after user finishes changes
const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

// Limits the rate of function execution
function throttle(func, delay) {
    // If setTimeout is already scheduled, no need to do anything
    if (timerId) {
        return;
    }

    // Schedule a setTimeout after delay seconds
    timerId = setTimeout(function () {
        func();

        // Once setTimeout function execution is finished, timerId = undefined so that in
        // the next scroll event function execution can be scheduled by the setTimeout
        timerId = undefined;
    }, delay);
}

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    pop() {
        if (this.items.length == 0)
        return "Underflow";
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
}

// function required for popups or modals to appear
function showPopup(popupId, pinned) {
    zIndex++
    getRef(popupId).setAttribute('style', `z-index: ${zIndex}`)
    popupStack = getRef(popupId).show({ pinned, popupStack })
    return getRef(popupId);
}

// hides the popup or modal 
function hidePopup() {
    if (popupStack.peek() === undefined)
        return;
    popupStack.peek().popup.hide()
}

// displays a popup for asking permission. Use this instead of JS confirm
const getConfirmation = (title, message, cancelText = 'Cancel', confirmText = 'OK') => {
    return new Promise(resolve => {
        showPopup('confirmation_popup', true)
        getRef('confirm_title').textContent = title;
        getRef('confirm_message').textContent = message;
        let cancelButton = getRef('confirmation_popup').children[2].children[0],
            submitButton = getRef('confirmation_popup').children[2].children[1]
        submitButton.textContent = confirmText
        cancelButton.textContent = cancelText
        submitButton.onclick = () => {
            hidePopup()
            resolve(true);
        }
        cancelButton.onclick = () => {
            hidePopup()
            resolve(false);
        }
    })
}

// displays a popup for asking user input. Use this instead of JS prompt
async function getPromptInput(title, message = '', isPassword = true, cancelText = 'Cancel', confirmText = 'OK') {
    showPopup('prompt_popup', true)
    getRef('prompt_title').textContent = title;
    let input = getRef('prompt_input');
    input.setAttribute("placeholder", message)
    let buttons = getRef('prompt_popup').querySelectorAll("sm-button");
    if (isPassword)
        input.setAttribute("type", "text")
    else
        input.setAttribute("type", "password")
    input.focusIn()
    buttons[0].textContent = cancelText;
    buttons[1].textContent = confirmText;
    return new Promise((resolve, reject) => {
        buttons[0].onclick = () => {
            hidePopup()
            return;
        }
        buttons[1].onclick = () => {
            let value = input.value;
            hidePopup()
            resolve(value)
        }
    })
}

//Function for displaying toast notifications. pass in error for mode param if you want to show an error.
function notify(message, mode, options = {}) {
    const { pinned = false, sound = false } = options
    let icon
    switch (mode) {
        case 'success':
            icon = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>`
            break;
        case 'error':
            icon = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"/></svg>`
            break;
    }
    getRef("notification_drawer").push(message, { pinned, icon });
    if (navigator.onLine && sound) {
        getRef("notification_sound").currentTime = 0;
        getRef("notification_sound").play();
    }
}

function getFormatedTime(time, relative) {
    try {
        if (String(time).indexOf("_")) time = String(time).split("_")[0];
        const intTime = parseInt(time);
        if (String(intTime).length < 13) time *= 1000;
        let timeFrag = new Date(intTime).toString().split(" "),
            day = timeFrag[0],
            month = timeFrag[1],
            date = timeFrag[2],
            year = timeFrag[3],
            minutes = new Date(intTime).getMinutes(),
            hours = new Date(intTime).getHours(),
            currentTime = new Date().toString().split(" ");

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let finalHours = ``;
        if (hours > 12) finalHours = `${hours - 12}:${minutes}`;
        else if (hours === 0) finalHours = `12:${minutes}`;
        else finalHours = `${hours}:${minutes}`;

        finalHours = hours >= 12 ? `${finalHours} PM` : `${finalHours} AM`;
        if (relative) {
            return `${date} ${month} ${year}`;
        } else return `${finalHours} ${month} ${date} ${year}`;
    } catch (e) {
        console.error(e);
        return time;
    }
}

window.addEventListener('hashchange', e => showPage(window.location.hash))
window.addEventListener("load", () => {
    document.body.classList.remove('hide-completely')
    showPage(window.location.hash)
    // document.querySelectorAll('sm-input[data-flo-id]').forEach(input => input.customValidation = validateAddr)
    document.addEventListener('keyup', (e) => {
        if (e.code === 'Escape') {
            hidePopup()
        }
    })
    document.addEventListener("pointerdown", (e) => {
        if (e.target.closest("button, sm-button:not([disabled]), .interact")) {
            createRipple(e, e.target.closest("button, sm-button, .interact"));
        }
    });
    document.addEventListener('copy', () => {
        notify('copied', 'success')
    })
});

function createRipple(event, target) {
    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;
    const targetDimensions = target.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (targetDimensions.left + radius)}px`;
    circle.style.top = `${event.clientY - (targetDimensions.top + radius)}px`;
    circle.classList.add("ripple");
    const rippleAnimation = circle.animate(
        [
            {
                transform: "scale(3)",
                opacity: 0,
            },
        ],
        {
            duration: 1000,
            fill: "forwards",
            easing: "ease-out",
        }
    );
    target.append(circle);
    rippleAnimation.onfinish = () => {
        circle.remove();
    };
}

function showPage(targetPage, options = {}) {
    const { firstLoad, hashChange } = options
    let pageId
    if (targetPage === '') {
        pageId = 'overview_page'
    }
    else {
        pageId = targetPage.includes('#') ? targetPage.split('#')[1] : targetPage
    }
    if(!appPages.includes(pageId)) return
    document.querySelector('.page:not(.hide-completely)').classList.add('hide-completely')
    document.querySelector('.nav-list__item--active').classList.remove('nav-list__item--active')
    getRef(pageId).classList.remove('hide-completely')
    getRef(pageId).animate([
        {
            opacity: 0,
            transform: 'translateX(-1rem)'
        },
        {
            opacity: 1,
            transform: 'none'
        },
    ],
        {
            duration: 300,
            easing: 'ease'
        })
    const targetListItem = document.querySelector(`.nav-list__item[href="#${pageId}"]`)
    targetListItem.classList.add('nav-list__item--active')
    if (firstLoad && window.innerWidth > 640 && targetListItem.getBoundingClientRect().top > getRef('side_nav').getBoundingClientRect().height) {
        getRef('side_nav').scrollTo({
            top: (targetListItem.getBoundingClientRect().top - getRef('side_nav').getBoundingClientRect().top + getRef('side_nav').scrollTop),
            behavior: 'smooth'
        })
    }
    if (hashChange && window.innerWidth < 640) {
        getRef('side_nav').close()
    }
}