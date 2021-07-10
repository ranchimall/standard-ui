# Components

## Overview

These components are based on HTML5 custom elements API. This is an attempt to unify UI development patterns and elements that are used multiple times throughout any general web app.It uses 'sm' namespace for all components. So every component tag starts with ***'sm-'.***

They can replace some older UI elements like `<select>` `<input>` `<input type="checkbox">` `<button>` But also more modern additions like Carousels, Popups(modals), Tabs and more.

### features
- Based on [Custom Elements API](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) which means it's a web platform standard that can be used in various popular frameworks like ***React***, ***Vue***, ***Angular*** etc.
- ***Keyboard and Touch friendly*** Multiple ways to interact with every components.
- ***Standalone*** Every component can be used seperately on its own with all the functionality encapulated.
- ***Easy styling*** styling of components is handled by [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). Also CSS of components is encapsulated in shadow DOM so it won't affect styling of rest of the app.
- ***Relative Sizing*** These components use relative units `rem` and `em` to resize them. Changing default font size of `<body>` will resize components according to screen size.

Some components have some cool tricks under their sleeves like custom events and variantions. They allow developers to access more information about component or simply react to whatever state change happen to them. We will go more in-depth about all the variantions and customs events related to each event as we go further.

## Quick Start
To start using these Components

### Download

- Download [components.js from here](https://github.com/sairaj-mote/components).
- Place components.js file in your project directory;
- Link js with `<script src=".../components.js"></script>` at bottom of your HTML file just before closing `</body>` tag.

### Styling

Every component responds to some CSS variable that needs to be set in order to start using them.

```css
--accent-color: teal;
--text-color: 24, 24, 24;
--foreground-color: 255, 255, 255;
--error-color: #E53935;
```

 css variable | function
 --- | ---
 `--text-color` | default text color for all components.
 `--foreground-color: 255, 255, 255;` | generally color around a component.
 `--error-color: #E53935;` | you can specify custom color for error messages and icons.

***!!! It's important to set only comma separated rgb values with `--text-color` and `--foreground-color` css variables.*** 

Now you are ready to use them in your HTML markup as any other standard HMTL tags 😄.
 
|  Table of components | 
| --- |
| [Buttons](#buttons) |
| [Carousel](#carousel) |
| [Checkbox](#checkbox) |
| [Input](#input) |
| [Notifications](#notifications) |
| [Popup](#popup) |
| [Switch](#switch) |
| [Select](#select) |
| [Strip Select](#strip-select) |
| [Tabs](#tabs) |

### Buttons
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-button>Default</sm-button>
```

`<sm-button>` are very similar to standard HTML `<button>`. You can add anything between opening `<sm-button>` and closing `</sm-button>` just like traditional button.

#### Variants
Variants are different stylistic versions of same component, But they have same functions.

1. Primary
```html
<!-- Primary button with accent colored background -->
<sm-button variant="primary">Primary</sm-button>
```
2. Outlined
```html
<!-- Outlined button with accent colored outline -->
<sm-button variant="outlined">Outlined/sm-button>
```
3. No outline
```html
<!-- No outline button with accent colored text -->
<sm-button variant="no-outline">No Outline</sm-button>
```

#### Disabled State

These can disabled adding `disabled="true` attribute. That makes them look in-active but they still will receive events. ***Thats why it's important to only use it's custom event to listen for click event*** more on that further. 
```html
<sm-button disabled="true">Disabled</sm-button>
```
#### Custom Events

1. `clicked` is a custom event specified for `sm-button` that listens to button being clicked like normal `click` event. The main difference being `click` event will fire even if `disabled="true"` is set as sm-button doesn't stop actual component from receiving pointer events. The reason being it has another event to handle disabled state.  

2. `disabled` event fires when button is disabled and user tries to click on it. This event can be useful if you want to validate a form but user clicked submit before all data so you show message according to situation.

#### Is it ***Responsive***?

No, As by default this is an inline element that means it won't strech accross whole horizontal space. But this behaviour can be changed that by following css.
```css
sm-button{
  width: 100%;
}
```

#### Accessibility

This component supports keyboard interactivity like ***Enter*** or ***Spacebar*** to click on it. Also can be accessed using ***Tab***. 


### Carousel
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-carousel>
 <!--
 add carousel elements like images, cards anything you wish.
 -->
</sm-carousel>
```

`<sm-carousel` allows you easily add carousel to your website with everything already ready to go. Just add elements you want show inside opening `<sn-carousel>` and closing `<sn-carousel>` brackets.

#### Custom Attribute

1. align-items
This attribute sets alignment of items inside carousel to value from three options ***start***, ***center***, ***end***.
`align-items="center"` is default value. Carousel childrens are set to center align.

##### align start
This will align elements such that element will align from left edge to the carousel container
```html
<!--To set alignment of elements to start -->
<sm-carousel align-items="start"></sm-carousel>
```
This will align elements such that element will align from left edge to the carousel container
```html
<!--To set alignment of elements to end -->
<sm-carousel align-items="end"></sm-carousel>
```

#### Interactions

Once focused elements inside carousel can be scrolled using ***Arrow Keys***.

When `sm-carousel` encounters an environment where only touch is supported it switches to touch based navigation like swipe scrolling and tapping. But when pointer like mouse is suppoted it switches to arrow button based navigation. 

#### Is it ***Responsive***?

Yes, it will adjust according to screen size and input interrfaces like mouse, touch or keyboard.

### Checkbox
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-checkbox></sm-checkbox>
```

This is a replacement for `<input type="checkbox">` with modern look.

#### Custom Attributes
This has two custom attributes `checked` and `disabled`.

1. Checked
```html
<!--To set checkbox as checked-->
<sm-checkbox checked="true"></sm-checkbox>
```
2. disabled
```html
<!-- To set disabled -->
<sm-checkbox disabled="true"></sm-checkbox>
```

#### Disabled State

This component can disabled adding `disabled="true` attribute.

You can also have option to use both of these attributes at the same time.
```html
<!-- Setting checkbox true while it's disabled -->
<sm-checkbox disabled="true" checked="true"></sm-checkbox>
```

#### Supported Events

This supports `change` event. Fires when component state changes.

#### Is it ***Responsive***?

No, As by default this is an inline element.

#### Accessibility

This component supports keyboard interactivity like ***Enter*** or ***Spacebar*** to click on it.

#### Manipulation via Javascript
``` html
<sm-checkbox id="my_checkbox"></sm-checkbox>
```
```js
let myCheckbox = document.getElementById('my_checkbox');
```
##### To set checked 
```js
checkbox.checked="true"
//or
myCheckbox.setAttribute('checked', 'true')
```
Replace `"true"` with `"false"` to un-tick checkbox

##### To set disabled
```js
myCheckbox.disabled="true"
//or
myCheckbox.setAttribute('disabled', 'true')
```

### Input
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-input></sm-input>
```

This is a replacement for `<input/>`.

#### Custom Attributes

Attribute | Description
--- | ---
placeholder (string) | Displayes placeholder text inside
type (string) | Specify type of input to enable validation. Valid values - `email`, `number`, `text`, `password`.
value (string) | Sets input value from markup 
helper-text (string) | Sets helper text that will be shown when validation fails for input.
animate | Add to enable animated placeholder

By default placeholder will disappear when input field has some value.

#### Supported Events

All events supported by traditional input.

#### Is it ***Responsive***?

No, As by default this is an inline element that means it won't strech accross whole horizontal space. But this behaviour can be changed that by following css.
```css
sm-input{
  width: 100%;
}
```

#### Accessibility

This component supports keyboard interactivity with ***Tab*** key.

#### Manipulation via Javascript
``` html
<sm-input id="my_input"></sm-input>
```
```js
let myInput = document.getElementById('my_input');
```
##### To set value 
```js
myInput.value="something..."
```
##### To get value 
```js
console.log(myInput.value)
```
##### To check validity (returns boolean value)
```js
console.log(myInput.isValid)
```

### Notifications
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-notifications></sm-notifications>
```

`<sm-notifications>` allows showing push notifications easily and supports multiple notifications at same time.

#### Setup

Add `<sm-notifications></sm-notifications>` to top of your markup just below starting `<body>` tag.

``` html
<body>
<sm-notifications id="my_notifications"></sm-notifications>
```
```js
let myNotifications = document.getElementById('my_notifications');
```

#### Manipulation via Javascript
This component has a method called `push()`. Which can be used to display notifications to user. It accepts three parameters `notificationHeading`, `notificationBody` and `options`.

Parameter | Description
--- | ---
notificationHeading (string) | Heading displayed at the top of a notification. This should be short and describe main purpose of that notification.
notificationBody (string) | This consists of most of the descriptive part of a notification. This will elaborate more on notification heading.
options (object) | Used to configure more options about individual notification. This is optional.

Options | Description
--- | ---
`type` (string) | This property can have two valid inputs `success` and `error`. Specifiying this will add an icon before heading to indicate success or failure of an operation.
`pinned` (boolean) | IF set `true`notification won't dismiss automatically after set time interval. User has to intentionally dismiss it.

##### To push a notification 
```js
myNotifications.push(notificationHeading, notificationBody)
```
##### To specify notification type
Set `"success"` or `"error"` to display intended notification style.  
```js
let options = {
 type: 'error'
}
myNotifications.push(notificationHeading, notificationBody, options)
```
##### To push a pinned notification 
```js
let options = {
 pinned: true
}
myNotifications.push(notificationHeading, notificationBody, options)
```

#### Is it ***Responsive***?

Yes, it will adjust according to screen size and input interrfaces like mouse, touch or keyboard. This supports touch gestures like swipe to dismiss.


### Popup
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-popup>
//
 Elements you want to add to popup.
 //
</sm-popup>
```

`<sm-popup>` allows creating modal that can replace HTML5 `<dialog>` element.

#### Custom Attributes
This has one custom attribute `heading` that is used to set header of popup.

1. heading
```html
<!-- set heading of popup -->
<sm-popup="heading"></sm-popup>
```

#### Setup

``` html
<body>
<sm-popup id="my_popup"></sm-popup>
```
```js
let myPopup = document.getElementById('my_popup');
```

#### Manipulation via Javascript
This component has two methods, `show()` and `hide()`.

Method | Description
--- | ---
`show()` | Shows popup when called on respective popup.
`hide()` | Hides popup when called on respective popup.

##### To show popup 
Scrolling in the background will be disabled when popup is open. It will be restored when popup is closed. 
```js
myPopup.show()
```
##### To hide popup 
```js
myPopup.hide()
```

#### Is it ***Responsive***?

Yes, it will adjust according to screen size and input interrfaces like mouse, touch or keyboard. This supports touch gestures like drag to close.

### Switch
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-switch></sm-switch>
```

#### Custom Attributes
This has two custom attributes `checked` and `disabled`.

1. Checked
```html
<!--To set switch as checked or on -->
<sm-switch checked="true"></sm-switch>
```
2. disabled
```html
<!--To set switch as disabled  -->
<sm-switch disabled="true"></sm-switch>
```

#### Disabled State

This component can disabled adding `disabled="true` attribute.

You can also have option to use both of these attributes at the same time.
```html
<!-- Setting switch checked true while it's disabled -->
<sm-checkbox disabled="true" checked="true"></sm-checkbox>
```

#### Supported Events

This supports `change` event. Fires when component state changes.

#### Is it ***Responsive***?

No, As by default this is an inline element.

#### Accessibility

This component supports keyboard interactivity like ***Enter*** or ***Spacebar*** to click on it.

#### Manipulation via Javascript
``` html
<sm-switch id="my_switch"></sm-switch>
```
```js
let mySwitch = document.getElementById('mySwitch');
```
##### To set checked 
```js
mySwitch.checked="true"
//or
mySwitch.setAttribute('checked', 'true')
```
Replace `"true"` with `"false"` to turn switch off.

##### To set disabled
```js
mySwitch.disabled="true"
//or
mySwitch.setAttribute('disabled', 'true')
```
Replace `"true"` with `"false"` to enable switch.

### Select
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-select></sm-select>
```

`<sm-select>` is very similar to standard HTML `<select>` in terms of general markup and options. If you want to add an option then you have to use `<sm-option></sm-option>` instead of `<option>`. 

#### Syntax 
```html
<sm-select>
    <sm-option value="value1">option1</sm-option>
    <sm-option value="value2">option2</sm-option>
    <sm-option value="value3">option3</sm-option>
</sm-select>
```
You can specify `sm-option` value using `value=""` attribute in option markup.

#### Events

This supports `change` event that fires when new value is selected from dropdown.

#### Is it ***Responsive***?

No, As by default this is an inline element that means it won't strech accross whole horizontal space. But this behaviour can be changed that by following css.
```css
sm-select{
  width: 100%;
}
```

#### Accessibility

This component supports keyboard interactivity like ***Enter*** or ***Spacebar*** to expand/collapse options. ***Arrow keys*** can be used to navigate between options.
Also can be accessed using ***Tab***. 

### Strip Select
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-strip-select></sm-strip-select>
```

`<sm-strip-select>` is very similar to standard HTML `<select>` in terms of general markup and options. If you want to add an option then you have to use `<sm-strip-option></sm-strip-option>` instead of `<option>`. 

#### Syntax 
```html
<sm-strip-select>
    <sm-strip-option value="value1">option1</sm-strip-option>
    <sm-strip-option value="value2">option2</sm-strip-option>
    <sm-strip-option value="value3">option3</sm-strip-option>
</sm-strip-select>
```
You can specify `sm-strip-option` value using `value=""` attribute in option markup.

#### Events

This supports `change` event that fires when new value is selected from dropdown.

#### Is it ***Responsive***?

No, As by default this is an inline element that means it won't strech accross whole horizontal space. But this behaviour can be changed that by following css.
```css
sm-select{
  width: 100%;
}
```
#### Interactions

When `sm-strip-select` encounters an environment where only touch is supported it switches to touch based navigation like swipe scrolling and tapping. But when pointer like mouse is suppoted it switches to arrow button based navigation. 

#### Accessibility

This component supports keyboard interactivity like ***Enter*** or ***Spacebar*** to select an option. Also can be accessed using ***Tab***. 

### Tabs
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-tabs></sm-tabs>
```

`<sm-tabs>` allows you to create tab based UI easily. It consists of mainly two components `<sm-tab>` and `<sm-panel>`. Every tab will have its corresponding panel that will be shown when tab is clicked.  

#### Syntax 
```html
<sm-tabs>
    <sm-tab slot="tab">Tab Title 1</sm-tab>
    <sm-panel slot="panel">
        //Body of panel
    </sm-panel>
 
    <sm-tab slot="tab">Tab Title 2</sm-tab>
    <sm-panel slot="panel">
        //Body of panel
    </sm-panel>
</sm-tabs>
```
Notice how every `sm-tab` is folloed by `sm-option`, This is default structure or syntax for using `sm-tabs`. ***If you didn't add a panel after a tab, the component won't work.***
Another key part is `sm-tab` should have `slot="tab"` as attribute and `slot="panel"` for `sm-panel`. As this component uses HTML5 ***[<slot>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot)*** tag to organize user added data. For more information, please refer to this [MDN article](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots).

#### Custom Attributes

1. enable-flick
```html
<!--To enable flick gesture to change panel in view -->
<sm-tabs enable-flick="true">
//Tabs body
</sm-tabs>
```
#### Variants
Variants are different stylistic versions of same component, But they have same functions.

1. tab
Setting this variant will change default sliding indicator to a block for providing a different stylistic option. 
```html
<!-- change variant to tab -->
<sm-tabs variant="tab">
//Tabs body
</sm-tabs>
```

#### Is it ***Responsive***?

Yes, it will adjust according to screen size and input interrfaces like mouse, touch. 

#### Interactions

This supports touch gesture flick to change visible panels if enabled with `enable-flick="true"`.

#### Accessibility

This component supports keyboard interactivity like ***Enter*** or ***Spacebar*** to select an option. Also can be accessed using ***Tab***. 

