//Checks for internet connection status
if (!navigator.onLine)
    notify('There seems to be a problem connecting to the internet.', 'error', 'fixed', true)
window.addEventListener('offline', () => {
    notify('There seems to be a problem connecting to the internet.', 'error', 'fixed', true)
})
window.addEventListener('online', () => {
    notify('We are back online.', '', '', true)
})

// **** requires HTML****
let themeToggler = document.getElementById("theme_toggle"),
    body = document.querySelector("body");
if (localStorage.theme === "dark") {
    nightlight();
    themeToggler.checked = true;
} else {
    daylight();
    themeToggler.checked = false;
}

function daylight() {
    body.setAttribute("data-theme", "light");
}

function nightlight() {
    body.setAttribute("data-theme", "dark");
}
themeToggler.addEventListener("change", () => {
    if (themeToggler.checked) {
        nightlight();
        localStorage.setItem("theme", "dark");
    } else {
        daylight();
        localStorage.setItem("theme", "light");
    }
});
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
    peek() {
        return this.items[this.items.length - 1];
    }
}
let popupStack = new Stack(),
    zIndex = 10;
function showPopup(popup, permission) {
    let thisPopup = document.getElementById(popup);
    thisPopup.parentNode.classList.remove('hide');
    thisPopup.classList.add('no-transformations');
    popupStack.push({ popup, permission })
    zIndex++;
    thisPopup.parentNode.setAttribute('style', `z-index: ${zIndex}`)
    document.getElementById('main_page')
    if (popup === 'main_loader') {
        loader.classList.add('animate-loader')
        document.querySelector('main').classList.add('hide-completely')
    }
}

// hides the popup or modal 
function hidePopup() {
    if (popupStack.peek() === undefined)
        return
    let { popup, permission } = popupStack.pop();
    thisPopup = document.getElementById(popup);
    thisPopup.closest('.popup-container').classList.add('hide');
    thisPopup.closest('.popup').classList.remove('no-transformations');
    setTimeout(() => {
        clearAllInputs(thisPopup)
        zIndex--;
        thisPopup.parentNode.setAttribute('style', `z-index: ${zIndex}`)
    }, 400)
    if (popup === 'main_loader' || popup === 'sign_in_popup') {
        //loader.classList.remove('animate-loader')
        document.querySelector('main').classList.remove('hide-completely')
    }
}

addEventListener('mousedown', e => {
    if (e.target.classList.contains('popup-container') && popupStack.peek() !== undefined && popupStack.peek().permission !== 'no') {
        hidePopup()
    }
})

function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function clearAllInputs(parent) {
    parent.querySelectorAll("input").forEach((field) => {
        if (field.getAttribute('type') !== 'radio') {
            field.value = '';
            if (field.closest('.input')) {
                field.closest('.input').classList.remove('animate-label')
            }
        }
        else
            field.checked = false
    })
    if (parent.querySelector("button[type='submit']"))
        parent.querySelector("button[type='submit']").disabled = true;
}

//Function for displaying toast notifications.
// **** requires HTML****
/*options
message - notifiation body text.
mode - error or normal notification. only error has to be specified.
fixed - if set true notification will not fade after 4s;
sound - set true to enable notification sound. ! should only be used for important tasks.
setAside - set true to add notification inside notification panel
*/
function notify(message, mode, behavior, sound) {
    let banner = document.getElementById('show_message'),
        back;
    if (mode === 'error') {
        banner.querySelector('#error_icon').classList.remove('hide-completely')
        banner.querySelector('#done_icon').classList.add('hide-completely')
    }
    else {
        banner.querySelector('#error_icon').classList.add('hide-completely')
        banner.querySelector('#done_icon').classList.remove('hide-completely')
    }

    banner.style.background = back;
    banner.classList.add('no-transformations')
    banner.classList.remove('hide')
    banner.querySelector('#notification_text').textContent = message.charAt(0).toUpperCase() + message.slice(1);
    if (navigator.onLine && sound) {
        notificationSound.currentTime = 0;
        notificationSound.play();
    }
    banner.querySelector('#hide_banner_btn').onclick = function () {
        banner.classList.add('hide')
        banner.classList.remove('no-transformations')
    }
    clearTimeout(currentTimeout)
    if (behavior === 'fixed') return;
    currentTimeout = setTimeout(() => {
        banner.classList.add('hide')
        banner.classList.remove('no-transformations')
    }, 4000)
}
// **** requires HTML****
// displays a popup for asking permission. Use this instead of JS confirm
let askConfirmation = function (message) {
    return new Promise(resolve => {
        let popup = document.getElementById('confirmation');
        showPopup('confirmation')
        popup.querySelector('#confirm_message').textContent = message;
        popup.querySelector('.submit-btn').onclick = () => {
            hidePopup()
            resolve(true);
        }
    })
}
// **** requires HTML****
// displays a popup for asking user input. Use this instead of JS prompt
let askPrompt = function (message, defaultVal) {
    return new Promise(resolve => {
        let popup = document.getElementById('prompt'),
            input = popup.querySelector('input');
        input.value = defaultVal;
        showPopup('prompt')
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

// prevents non numerical input on firefox 
function preventNonNumericalInput(e) {
    e = e || window.event;
    let charCode = (typeof e.which == "undefined") ? e.keyCode : e.which,
        charStr = String.fromCharCode(charCode);

    if (!charStr.match(/[+-]?([0-9]*[.])?[0-9]+/))
        e.preventDefault();
}

function areInputsEmpty(parent) {
    let allInputs = parent.querySelectorAll(".input input");
    return [...allInputs].every(input => input.checkValidity())
}

function formValidation(formElement, e) {
    if (formElement.getAttribute('type') === 'number')
        preventNonNumericalInput(e);
    let parent = formElement.closest('.popup'),
        submitBtn = parent.querySelector("button[type='submit']");
    if (areInputsEmpty(parent))
        submitBtn.disabled = false;
    else
        submitBtn.disabled = true;
}
// **** requires HTML****
let allForms = document.querySelectorAll('form');
allForms.forEach((form) => {
    form.addEventListener('input', (e) => {
        if (e.target.closest('.input')) {
            let parent = e.target.closest('.input');
            if (parent.firstElementChild.value !== '')
                parent.classList.add('animate-label')
            else
                parent.classList.remove('animate-label')
            formValidation(parent.firstElementChild, e)
            if (e.key === 'Enter') {
                parent.closest('form').querySelector("button[type='submit']").click();
            }
        }
    })
})
allForms.forEach((form) => {
    form.addEventListener('blur', (e) => {
        if (e.target.closest('.input')) {
            let parent = e.target.closest('.input');
            if (parent.firstElementChild.value === '')
                parent.classList.remove('animate-label')
        }
    }, true)
})

// **** requires HTML****
let tabMounted = false;
function showTab(tab) {
    let targetTab = tab.getAttribute('data-target'),
        activeTabRank = parseInt(tab.parentNode.querySelector('.active').dataset.rank),
        currentTabRank = parseInt(tab.dataset.rank),
        currentBody = document.getElementById(tab.parentNode.querySelector('.active').dataset.target),
        targetBody = document.getElementById(targetTab),
        targetGroup = targetBody.dataset.tabGroup,
        tabGroupMembers = document.querySelectorAll(`[data-tab-group = '${targetGroup}']`),
        allTabs = tab.parentNode.querySelectorAll('.tab'),
        line = tab.parentNode.querySelector('.line')
    if (tabMounted && currentBody.isEqualNode(targetBody))
        return
    if (activeTabRank < currentTabRank) {
        targetBody.classList.add('fly-in-from-right')
        currentBody.classList.add('fly-out-to-left')
    } else {
        targetBody.classList.add('fly-in-from-left')
        currentBody.classList.add('fly-out-to-right')
    }
    setTimeout(() => {
        tabGroupMembers.forEach(member => {
            member.classList.add('hide-completely')
        })
        targetBody.classList.remove('hide-completely')
        currentBody.classList.remove('fly-out-to-right', 'fly-out-to-left')
    }, 200)
    setTimeout(() => {
        targetBody.classList.remove('fly-in-from-right', 'fly-in-from-left')
    }, 400)
    allTabs.forEach(thisTab => {
        thisTab.classList.remove('active')
    })
    tab.classList.add('active')
    line.setAttribute('style', `transform: translateX(${tab.offsetLeft}px); width: ${tab.getBoundingClientRect().width}px`)
    tabMounted = true;
}

let loader = document.getElementById("loader_page");

function loading(status) {
    if (status) loader.classList.remove("hide-completely");
    else loader.classList.add("hide-completely");
}
// **** requires HTML****
function copyToClipboard(parent) {
    let input = document.createElement('textarea'),
        toast = document.getElementById('textCopied'),
        textToCopy = parent.querySelector('.copy');
    input.setAttribute('readonly', '');
    input.setAttribute('style', 'position: absolute; left: -9999px');
    document.body.appendChild(input);
    input.value = textToCopy.textContent;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    toast.classList.remove('hide');
    setTimeout(() => {
        toast.classList.add('hide');
    }, 2000)
}
// **** requires HTML****
let loader = document.getElementById("loader_page");

function loading(status) {
    if (status) loader.classList.remove("hide-completely");
    else loader.classList.add("hide-completely");
}

//show or hide element group from a group

function showElement(elem, classGroup) {
    let allGroups = document.querySelectorAll(`.${classGroup}`),
        thisElement = elem;
    if (typeof elem === 'string')
        thisElement = document.getElementById(elem);
    allGroups.forEach(group => {
        group.classList.add('hide-completely')
    })
    thisElement.classList.remove('hide-completely')
}
// **** requires HTML****
let tips = [
    'Loading Local Bitcoin++',
    'wash your hands often',
    `Don't shake hands with others`,
    'Stay inside'
], currentIndex = 0, tipsLength = tips.length,
    tipContainer = document.getElementById('tip_container');

function changeTips() {
    if (tipsLength > currentIndex)
        currentIndex++
    if (tipsLength === currentIndex)
        currentIndex = 0
    tipContainer.textContent = tips[currentIndex]
}
window.addEventListener('load', () => {
    document.querySelectorAll('textarea').forEach((textArea) => {
        textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px;overflow-y:hidden;');
        textArea.addEventListener("input", OnInput, false);
    })
})
function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}