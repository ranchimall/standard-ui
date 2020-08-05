if (!navigator.onLine)
    notify('There seems to be a problem connecting to the internet.', 'error', 'fixed', true)
window.addEventListener('offline', () => {
    notify('There seems to be a problem connecting to the internet.', 'error', 'fixed', true)
})
window.addEventListener('online', () => {
    notify('We are back online.', '', '', true)
})
let themeToggler = document.getElementById("theme_toggle")
if (localStorage.theme === "dark") {
    darkTheme()
    themeToggler.checked = true;
} else {
    lightTheme()
    themeToggler.checked = false;
}

function lightTheme() {
    document.body.setAttribute("data-theme", "light");
}

function darkTheme() {
    document.body.setAttribute("data-theme", "dark");
}
themeToggler.addEventListener("change", () => {
    if (themeToggler.checked) {
        darkTheme()
        localStorage.setItem("theme", "dark");
    } else {
        lightTheme()
        localStorage.setItem("theme", "light");
    }
})

// function required for popups or modals to appear
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
    peek(index) {
        let newIndex = index ? index : 1
        return this.items[this.items.length - index];
    }
}
let popupStack = new Stack(),
    zIndex = 10;
function showPopup(popup, permission) {
    let thisPopup = document.getElementById(popup);
    document.body.setAttribute('style', `overflow: hidden; top: -${window.scrollY}px`)
    popupStack.push({ thisPopup, permission })
    thisPopup.show(permission, popupStack)
    zIndex++;
    thisPopup.setAttribute('style', `z-index: ${zIndex}`)
    return thisPopup;
}
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}
// displays a popup for asking permission. Use this instead of JS confirm
let confirmation = function (message) {
    return new Promise(resolve => {
        let popup = document.getElementById('confirmation');
        showPopup('confirmation')
        popup.querySelector('#confirm_message').textContent = message;
        popup.querySelector('.submit-btn').onclick = () => {
            hidePopup()
            resolve(true);
        }
        popup.querySelector('.cancel-btn').onclick = () => {
            hidePopup()
            resolve(false);
        }
    })
}

// displays a popup for asking user input. Use this instead of JS prompt
let askPrompt = function (message, defaultVal) {
    return new Promise(resolve => {
        let popup = document.getElementById('prompt'),
            input = popup.querySelector('input');
        if (defaultVal)
            input.value = defaultVal;
        showPopup('prompt')
        input.focus()
        input.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                resolve(input.value);
                hidePopup()
            }
        })
        popup.querySelector('#prompt_message').textContent = message;
        popup.querySelector('.submit-btn').onclick = () => {
            hidePopup()
            resolve(input.value);
        }
        popup.querySelector('.cancel-btn').onclick = () => {
            hidePopup()
            resolve(null);
        }
    })
}

function formatedTime(time) {
    let timeFrag = new Date(parseInt(time)).toString().split(' '),
        day = timeFrag[0],
        month = timeFrag[1],
        date = timeFrag[2],
        year = timeFrag[3],
        hours = timeFrag[4].slice(0, timeFrag[4].lastIndexOf(':')),
        finalTime = '';
    parseInt(hours.split(':')[0]) > 12 ? finalTime = 'PM' : finalTime = 'AM'
    return `${hours} ${finalTime} ${day} ${date} ${month} ${year}`
}

function copyToClipboard(parent) {
    let toast = document.getElementById('textCopied'),
        textToCopy = parent.querySelector('.copy').textContent;
    navigator.clipboard.writeText(textToCopy)
    toast.classList.remove('hide');
    setTimeout(() => {
        toast.classList.add('hide');
    }, 2000)
}