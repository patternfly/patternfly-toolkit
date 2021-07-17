---
id: Chip group
section: components
---

A **chip group** represents an attribute that has been assigned one or more values. An OR relationship is implied between values in the group. Chip groups are useful to express complex filters to a data set, for example.

Keyboard users will be able to press **Tab** to navigate through all interactive elements of the chip group (this will include close buttons, any overflow chips with tooltips,  view more buttons, etc). The screen reader experience, likewise, will mostly be based on native interaction expectations.

Bear in mind that the `aria-labelledby` attribute on the close button is based on the ID of the chip itself. So, if you are **changing the id of the chip**, you will need to update the `aria-labelledby` on the chip.

<br/>
In general, the chip group component already has accessibility built in. However, if you’d like to customize it, edit the following:

| React component| React prop | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| Chip | closeBtnAriaLabel | .pf-c-button | 'close'	Aria Label for close button on the chip |
| ChipGroup | aria-label | .pf-c-chip-group__list | Aria label for chip group that does not have a category name (will not work when `categoryName` included) |
| ChipGroup | closeBtnAriaLabel | .pf-c-button | 'Close chip group' Aria label for close button |