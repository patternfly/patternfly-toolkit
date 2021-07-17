---
id: Context selector
section: components
---

A **context selector** can be used in addition to global navigation when the data or resources you show in the interface need to change depending on the user’s context.

Keyboard interaction of the context selector uses **Tab** to navigate to the context selector toggle, **Enter** or **Space** to activate the context selector, and **Tab** to navigate through the options. The **Esc** key should automatically close the menu. 


<ins>**To make context selector accessible:**</ins>
- Add `screenReaderLabel={input label}`.

<br/>
In general, the context selector component already has accessibility built in. HHowever, if you’d like to customize it, edit the following:

| React component| React prop | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| ContextSelector | screenReaderLabel | #pf-context-selector-label-id-0 hidden span on context selector | Labels the Context Selector for screen readers. |
| ContextSelector | searchButtonAriaLabel | .pf-c-button search button | Aria-label for the Context Selector Search button |