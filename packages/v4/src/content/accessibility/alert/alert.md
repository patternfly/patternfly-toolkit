---
id: Alert
section: components
---

An **alert** is a notification that provides brief information to the user without blocking their workflow. This information should be presented to all users, and special attention is required to ensure alerts are announced to visually impaired users.

Alerts can either be **static** (appear on the page load and do not change) or **dynamic** (appear or are updated after page load). 

**Typical use cases** of alert can be:
1. On page load/static alerts
2. In response to a user action
3. An asynchronous event is triggered in the application 

<br/>

**Static alerts** don’t need a lot of special accessibility considerations. If it appears inline on the page, it will be read along with the surrounding content. (For toast alerts, use AlertGroup.)

**Dynamic and toast alerts**, on the other hand, need something to communicate their contents to a screen reader. Changes to the DOM are not announced to screen reader users by default, and in order to signal to a screen reader that something will change in the DOM, a live region should be included. 

Different screen readers handle alerts slightly differently, but in general, to satisfy all screen readers, there should be a container for the alert(s) that exists on page load and this container should be the live region. It is within this region that dynamic alerts (alerts that are injected into the DOM after the main page content has loaded) will trigger an event that causes screen readers to read the content aloud.

<br/>
<ins>**In general, we recommend the following:**</ins>
- Have a **pre-existing container** that is a live region in the DOM on page load for the alert. (We recommend using our AlertGroup for this.)
   - **The AlertGroup should always exist in the DOM**
   - **Conditionally render the alert(s) inside the AlertGroup**
   - **DO NOT conditionally render the alert by itself without a live region container.** This will not be announced to some screen readers such as JAWS and NVDA.
- Add `aria-live=”polite”` on the AlertGroup for most alerts (use “assertive” if the alert needs immediate attention) -- not necessary if using AlertGroup as the container
- Add aria-atomic or aria-relevant on the AlertGroup if useful for your use case.


<br/>
**Toast alerts:**

Toast alerts present special challenges for accessibility. Screen readers announce the arrival and message content of an incoming toast alert, but user focus will not be placed there, making it difficult for users to directly act on the alert itself. In any toast alert containing links for further user action, include text that describes how the user can navigate through the UI to perform the action.
 
For example, this toast alert is not accessible because it does not include text that explains to the user where to go within the UI to perform the action:

<img src="../../design-guidelines/components/alert/img/alert-no-description.png" alt="alert without descriptive text" width="600px"/>

This toast alert is accessible to sighted and non-sighted users because it includes text that explains to the user where to go within the UI to perform the action:

<img src="../../design-guidelines/components/alert/img/alert-description.png" alt="alert with descriptive text" width="600px"/>

<br/>
<br/>

To further customize your alerts' accessibility, you can edit the following:

| React component| Prop or attribute | Which HTML element it appears on in markup | Explanation | 
|---|---|---|---|
| Alert | aria-label | .pf-c-alert | Adds accessible text to the Alert |
| Alert | variantLabel | Anywhere variant label is used, for example in close button | Variant label text for screen readers |
| AlertActionCloseButton | aria-label | .pf-c-button | Label for the close button, defaults to "Close [alert variant]: alert: [alert title] |


<br/>
**For more specific customization**, add any of the following to AlertGroup/the alert’s container:

- **aria-live="polite"**- This politeness level is used when the user is not doing anything or when the user is waiting for the update to happen. If the user is busy with other tasks on the page, the screen reader shouldn’t interrupt to provide the updated live region content.

- **aria-live="assertive"**
Assertive is used for high priority updates, when the user must be informed about updated information within the live region immediately. The update is provided to the user, interrupting their current task. 

- **Aria-atomic**
The aria-atomic=BOOLEAN sets whether or not the screen reader should always present the live region as a whole, even if only part of the region changes. The possible settings are: false or true. The default setting is: false.

- **Aria-relevant**
The aria-relevant=[LIST_OF_CHANGES] sets what types of changes are relevant to a live region and what qualifies as an update to it. The possible settings are one or more of: additions, removals, text, all. The default setting is: additions text.
