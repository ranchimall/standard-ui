# Components

## Overview

These components are based on HTML5 custom elements API.
It uses 'sm' namespace for all components. So every component tag starts with ***'sm-'.***

They can replace some older UI elements like `<select>` `<input>` `<input type="checkbox">` `<button>` But also more modern additions like Carousels, Popups(modals), Tabs and many more.

Some components have some cool tricks under their sleeves like custom events and variantions. They allow developers to access more information about component or simply react to whatever state change happen to them. We will go more in-depth about all the variantions and customs events related to each event as we go further.

## Quick Start
To start using these Components

### Download

- Download [components.js from here](https://github.com/sairaj-mote/components).
- Place components.js file in your project directory;
- Link js with `<script src=".../components.js"></script>` at bottom of your HTML file just before closing `</body>` tag.

### Styling

Every component responds to some css variable that needs to be set in order to start using them.

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

## Components
 
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

#### Interactions

Once focused elements inside carousel can be scrolled using ***Arrow Keys***.

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
<!-- Outlined button with accent colored outline -->
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
##### To set checked 
```js
let checkbox = document.getElementById('my_checkbox');
checkbox.checked="true"
//or
checkbox.setAttribute('checked', 'true')
```
Replace `"true"` with `"false"` to un-tick checkbox

### Input
[See Demo](https://sairaj-mote.github.io/components/)

```html
<sm-input></sm-input>
```

This is a replacement for `<input/>`.

#### Custom Attributes
This has two custom attributes `checked` and `disabled`.

1. placeholder
```html
<!-- Displayes placeholder text inside -->
<sm-input placeholder="placeholder"></sm-input>
```
2. value
```html
<!-- Sets input value from markup -->
<sm-input value="abc123"></sm-input>
```
3. helper-text
```html
<!-- Sets helper text that will be shown when validation fails for input -->
<sm-input helper-text="Enter correct password"></sm-input>
```
4. animate
```html
<!-- Add to enable animated placeholder -->
<sm-input placeholder="placeholder" animate></sm-input>
```
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
