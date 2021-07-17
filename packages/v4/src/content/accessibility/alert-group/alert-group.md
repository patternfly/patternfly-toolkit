---
id: Alert group
section: components
---

An **alert group** positions one or multiple alerts in a layer over the main content of a page. Use an alert group as a pre-existing container for dynamic alerts or when you need to position multiple alerts on the same page, mainly [toast alerts](https://www.patternfly.org/v4/components/alert/design-guidelines/#elements). 

**Static inline alert groups** don’t need additional accessibility attributes. If it appears inline on the page, it will be read along with the surrounding content. 

**Dynamic and toast alerts** are injected into the DOM after page load and require additional measures to ensure that these content changes are announced to screen reader users. Discoverability is also different in this case because the alert content is often not near the primary markup/content for the page. The AlertGroup/Alerts are often rendered at a more global level within the DOM, like toward the end of the body tag so that the content can persist across page changes. 

<br/>

<ins>**To make dynamic alert groups accessible:**</ins>
- Add `isLiveRegion` to make the AlertGroup a live region that alerts can be conditionally rendered inside the AlertGroup.
- AlertGroup should always exist in the DOM on page load and alerts should be rendered inside the AlertGroup.


**For more specific customization**, add any of the following to AlertGroup:

- **aria-live="polite"**- This politeness level is used when the user is not doing anything or when the user is waiting for the update to happen. If the user is busy with other tasks on the page, the screen reader shouldn’t interrupt to provide the updated live region content.

- **aria-live="assertive"**- Assertive is used for high priority updates, when the user must be informed about updated information within the live region immediately. The update is provided to the user, interrupting their current task. 

- **Aria-atomic**- The aria-atomic=BOOLEAN sets whether or not the screen reader should always present the live region as a whole, even if only part of the region changes. The possible settings are: false or true. The default setting is: false.

- **Aria-relevant**- The aria-relevant=[LIST_OF_CHANGES] sets what types of changes are relevant to a live region and what qualifies as an update to it. The possible settings are one or more of: additions, removals, text, all. The default setting is: additions text.



To further customize your alert group's accessibility, you can edit the following:

| React component| Prop or attribute | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| Alert | aria-label | .pf-c-alert | Adds accessible text to the Alert |
| Alert | variantLabel | Anywhere variant label is used, for example in close button | Variant label text for screen readers |
| AlertActionCloseButton | aria-label | .pf-c-button | Label for the close button, defaults to "Close [alert variant]: alert: [alert title] |
| AlertGroup | isLiveRegion | .pf-c-alert-group | Turns the container into a live region so that changes to content within the AlertGroup, such as appending an Alert, are reliably announced to assistive technology. |

<br/>
**Toast alerts:**

Toast alerts present special challenges for accessibility. Screen readers announce the arrival and message content of an incoming toast alert, but user focus will not be placed there, making it difficult for users to directly act on the alert itself. In any toast alert containing links for further user action, include text that describes how the user can navigate through the UI to perform the action.

For example, this toast alert is not accessible because it does not include text that explains to the user where to go within the UI to perform the action:

<img src="../../design-guidelines/components/alert/img/alert-no-description.png" alt="alert without descriptive text" width="600px"/>

This toast alert is accessible to sighted and non-sighted users because it includes text that explains to the user where to go within the UI to perform the action:

<img src="../../design-guidelines/components/alert/img/alert-description.png" alt="alert with descriptive text" width="600px"/>

<br/>
<br/>

See our [alert guidelines](https://www.patternfly.org/v4/components/alert/design-guidelines/#using-toast-alerts) for more information about using alerts.
