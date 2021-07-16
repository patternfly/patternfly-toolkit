---
id: Button
section: components
---

A **button** is a box area or text that communicates and triggers user actions when clicked or selected. Buttons are interactive elements.

**Keyboard users** should be able to focus on the button using **Tab** to move forward and **Tab + Shift** to move backwards through interactive elements. They should be able to select a focused button using **Space** or **Enter**.

**Screen reader users** should be able to navigate to the button and it should have text that can be read by a screen reader, or alternative text if it only contains an icon. For alternative text, `aria-label` is the most common choice.


## Accessibility application:

- A button containing only an icon without supporting text should be labeled with the `aria-label` prop.
- A regular disabled button is not focusable, but an aria-disabled button is. `isAriaDisabled` should be used when a disabled button provides interactive elements (like a tooltip).
- Screen readers may read buttons to users out of context. For example, screen reader users can navigate a page specifically by form controls. So button text should be unique and easily understood on its own. Refer to PatternFly's accessibility guide for more information.

The following props/attributes have been added for you or are customizable in PatternFly:

| Reason used | React prop used to customize | React component that it should be applied to | Which HTML element it appears on in markup |
| -- | -- | -- | -- |
| Adds accessible text to the button if the button doesn’t contain descriptive text on its own. | `aria-label` | Button | .pf-c-button.pf-m-plain |
| Adds disabled styling and communicates that the button is disabled using the aria-disabled html attribute | `isAriaDisabled` | Button | button.pf-c-button |
