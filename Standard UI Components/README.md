# Components

## Overview

These components are based on HTML5 custom elements API.
It uses 'sm' namespace for all components. So every component tag starts with ***'sm-'.***

They can replace some older UI elements like <select> <input> <checkbox> <button> But also more modern additions like popups(modals), tabs and many more.

Some of the components have some cool tricks under their sleeves like custom events and variantions. They allow developers to access more information about component or simply react to whatever state change happen to them. We will go more in-depth about all the variantions and customs events related to each event as we go further.

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

### Table of components
 
| Component | 
| --- |
| [popup](#buttons) |

### Buttons
[See Demo](https://sairaj-mote.github.io/components/)

```
<sm-button>Default</sm-button>
```

`<sm-button>` are very similar to standard HTML `<button>`. You can add anything between opening `<sm-button>` and closing `</sm-button>` just like traditional button.

#### Variants
Variants are different stylistic versions of same component, But they have same functions.

- 1.Primary

#### Disabled State

These can disabled adding `disabled="true` attribute. That makes them look in-active but they still will receive events. ***Thats why it's important to only use it's custom event to listen for click event*** more on that further. 
```html
<sm-button disabled="true">Disabled</sm-button>
```

