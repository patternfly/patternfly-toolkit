---
id: Clipboard copy
section: components
---

The **clipboard copy** component allows users to quickly and easily copy content to their clipboard.

Clipboard copy uses native keyboard interaction with **Tab** navigating between interactive elements, **Shift + Tab** going backwards, and **Enter** activating the toggle or clipboard copy button. The screen reader experience, likewise, will mostly be based on native interaction expectations.


<br/>
In general, the clipboard copy component already has accessibility built in. HHowever, if you’d like to customize it, edit the following:

| React component| React prop | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| ClipboardCopy | textAriaLabel | .pf-c-form-control input | Aria-label to use on the TextInput. |
| ClipboardCopy | toggleAriaLabel | .pf-c-button expanded toggle | Aria-label to use on the ClipboardCopyToggle. |
| ClipboardCopyButton | aria-label | .pf-c-button copy button | Aria-label for the copy button. |