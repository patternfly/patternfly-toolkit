---
id: Checkbox
section: components
---

A **checkbox** is used to select a single item or multiple items, typically to choose elements to perform an action or to reflect a binary setting.

Keyboard users will be able to interact with the checkbox component by pressing **Space** to select the input. We have added any attributes necessary to make it properly announced to screen readers.

In general, the checkbox component already has accessibility built in. The **standalone input variant** will need special consideration.

To make the checkbox **standalone input variant** accessible, add an `aria-label` with a label for the input. You can also use `aria-labelledby` to associate the checkbox with visible text on the page to explain the checkbox. 

<br/>
If you’d like to customize the checkbox component’s accessibility, edit the following:

| React component| React prop | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| Checkbox | aria-label | .pf-c-check__input | Aria-label or accessible text for the checkbox. |