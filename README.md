# Standard UI

### What is Standard UI
Suppose you want to start a web project. Instead of doing the UI from scratch, you want to start with pre-built UI which is responsive, which takes care of good fonts, which has nice visual elements. We have frameworks like bootstraps available, but they do not provide inbuilt default page layout. RanchiMall Standard UI solves that problem. It provides out of box page layouts, and also provides native web components. A normal developer who is not good at UI skills will find the most of UI work already done in Standard UI, and the developer has to just customize. This reduces development time by a large degree. 

### How to use Standard UI
1. Pick your layout from Layouts folder
2. Add the aditional components. Read about it at https://ranchimall.github.io/standard-ui/components/
3. Blockchain based standard operations is already available. Read about it at https://github.com/ranchimall/Standard_Operations
4. Start building code


### Layouts Available

#### Box Layout also known as bottom-navbar layout
This layout comes with a sidebar of menu items on the desktop size screen which converts into the bottom navbar on mobile. It should be used when there are less than 5 main pages in the app for quick access on small screen

#### Many sections layout- 
A layout suitable for long-form content with mainly one page like landing pages or articles. This is the simplest layout of the bunch. Every landing page consists of many sections, each of which can be populated as per the functionality

#### What's included in layouts by default?
- Components ( sm-button, sm-input, sm-notifications, sm-popup, theme-toggle and optional components specific to respective layout )
- Main_UI.js - A JS library that includes utility functions and some common functionality.
- Standard operations - A JS library **created by RanchiMall** to create DAPPs easily. 

Now that we know what's included in layouts, let's dig a little deeper and know exact functionality of each of these.

## Components
These are the building blocks of modern web development process. We are a frameworkless environment so we decided to go with **native Web Components** as a way to create reusable components. There are lot of these already created and ready to use.
### Get a hands-on experience and documentation at [our components website](https://ranchimall.github.io/standard-ui/components/). 

## main_UI.js
This is a collection of utility and commonly used functions that will help ease the development process.

### Global variables

|   Variable | Description |
| --- | --- |
| appPages `array` | Add the IDs of pages that your app contains. This is used by `showPage()` to determine whether the hashchange was caused by a link that traverses pages or not |
| domRefs `object` | This global object is used by `getRef() ` to store repeatedly used DOM references. You don't have to change anything about it manually |

#### Functions 

### getRef()
Use this function instead of `document.getElementById()`. It provides reference memoization for repeatedly used DOM references. This negates the need to store DOM references at top of script or inside global variables.
#### Parameters
`getRef(elementId)`
This function has only one parameter.
|   Parameter | Description |
| --- | --- |
| elementId `string`| Pass in the ID of the element you want to get reference of exactly like `document.getElementById()`|


### createElement()
This function let's you create elements with less boilerplate.
#### parameters
`createElement(tagName, options = {})`
This function has only one parameter.
|   Parameter | Description |
| --- | --- |
| tagName `string`| Pass in the type of element you want to create. eg. `createElement('div')` | 
| options `object`| Specify different aspects of element you want to create|

#### Possible options
|   key | Description |
| --- | --- |
| className `string`| Sets class(es) for element. you can pass in multiple classes like `'flex align-center'`  | 
| textContent `string`| This is similar to setting `element.textContent`. Pass in string that should be text inside the element|
| innerHTML `string|template literal`| This is similar to setting `element.innerHTML`. Pass in string that should be rendered as HTML elements|
| attributes `object`| This is similar to setting `element.setAttribute()`. The advantage being you can pass in multiple attributes at one as key-value pairs. eg. `{attributes: {'data-theme': 'dark', 'id': 'unique_id'}`|


### debounce()
This function forces a function to wait a certain amount of time before running again.
#### parameters
`debounce(callback, wait)`
|   Parameter | Description |
| --- | --- |
| callback `function`| The function which needs to wait a certain time before running again | 
| wait `milliseconds`| The time period for which function should wait before re-running |


### throttle()
This function limits the rate of function execution.
#### parameters
`throttle(func, delay)`
|   Parameter | Description |
| --- | --- |
| func `function`| The function that will be limited to run once per specified time frame | 
| delay `milliseconds`| The time period for which function will run once |


### showPopup()
This will display popup of which the ID was passed in. In addition to that this also keeps a track of which popups are open and allows stacking them on top of each other.
#### parameters
`showPopup(popupId, pinned = false)`
This function has only one parameter.
|   Parameter | Description |
| --- | --- |
| popupId `string`| ID of popup that needs to be displayed. | 
| pinned `Boolean`| Boolean if set `true`, displayed popup won't closes unless `hide()` is called programatically on the popup. |


### hidePopup()
The opposite of `showPopup()`. When called, this will close any popup that's currently open and is on the top of popup stack. 
#### parameters
This function doesn't accept any parameters


### getConfirmation() `Promise`
This is replacement method for native `confirm()` method. This returns a promise.

#### parameters
`getConfirmation(title, message, cancelText = 'Cancel', confirmText = 'OK')`
|   Parameter | Description |
| --- | --- |
| title `string`| Heading or gist of the cofirmation message that will be displayed to user while asking for confirmation. | 
| message `string`| A detailed description of the subject regarding which the confirmation is being asked. |
| cancelText `string`| Customizes the text of rejecting confirmation button. |
| confirmText `string`| Customizes the text of accepting confirmation button. |


### getPromptInput() `Promise`
This is replacement method for native `prompt()` method. This returns a promise.

#### parameters
`getPromptInput(title, message = '', isPassword = true, cancelText = 'Cancel', confirmText = 'OK')`
|   Parameter | Description |
| --- | --- |
| title `string`| Heading or gist of the prompt message that will be displayed to user while asking for input. | 
| message `string`| A detailed description of the subject regarding which the prompt is being asked. |
| isPassword `Boolean`| If set `true`, the input box inside the prompt will hide the input as password. |
| cancelText `string`| Customizes the text of rejecting prompt button. |
| confirmText `string`| Customizes the text of accepting prompt button. |


### notify()
This function add functionality to `sm-notifications` component by adding icons and notification sound to improve the UX. 
** Remember to use notifications only when absolutely needed. Don't overwhelm user with lots of notifications **
#### parameters
`notify(message, type, options = {})`
|   Parameter | Description |
| --- | --- |
| message `string`| The message that needs to be displayed to user as a notification. |
| type `string`| Defines the type of notification. eg. `success`, `error` |
| options `object`| Extra options to customize notification behaviour|

#### Possible options
|   key | Description |
| --- | --- |
| pinned `Boolean`| If set `true`, the notification won't disappear automatically after timeout. user has to manually dismiss the notification. | 
| sound `Boolean`| If set `true`, notification sounf is played when a new notification arrives. |


### showPage()
This function is used to change which page is visible to user. It uses `appPages` array to switch between correct page when `hashchange` event is fired.
#### parameters
`showPage(padeId)`
|   Parameter | Description |
| --- | --- |
| pageId `string`| ID of the page that needs to be displayed. |


### Event listeners
There are several event listeners added that listen for some basic changes in app life-cycle

### `online` and `offline`
These event listeners listen for changes in internet connectivity. Whenever app is disconnected from internet user will receive a notification displaying status of connection.

### `load`
This event is used to attack further event listeners when page resources are completely loaded. Also if app URL contains a page hash it'll also display that page.

### `hashchange`
This event notices the changes in hash in URL bar. If the changed hash is one of the appPages then that page will be displayed.

### `keyup`
Use this event listener if you want to add some keybinding at document level. By default it has keybinding to hide an open popup when `ESC` key is pressed.

### `pointerdown`
Mostly used to display ripple over the interactive elements. Any element containing `interact` class will receive ripple when clicked by user. You can customize the list of elements which receive ripple inside createRipple callback.

### `copy`
This is a purely UX feature, that shows a notification whenever user copies any content from the web app.


## Standard operations
### Complete documentation for standard operations can be found [here](https://github.com/ranchimall/Standard_Operations#readme)
