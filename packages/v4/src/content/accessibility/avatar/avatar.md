---
id: Avatar
section: components
---

An **avatar** is a visual used to represent a user. It may contain an image or a placeholder graphic. Typical usage is to represent the current user in the masthead.

**Keyboard users** shouldn’t be able to interact with the avatar on its own. Thus, the user should not be able to focus on the avatar using **Tab** to move forward and **Tab + Shift** to move backwards through interactive elements.

**Screen reader users** should be able to navigate to the avatar and it should have alternative text, since it’s an image element. You can use the `alt` prop to provide alternative text.

If you’re combining an avatar with another component, make sure to check accessibility guidelines for that component as well.


## To make avatar accessible:
- You may use the `alt` React prop to provide alternative text for the avatar image.
- If you are using an SVG element for the avatar, [learn how to create accessible SVGs](https://www.deque.com/blog/creating-accessible-svgs/) and reference the different SVG patterns. Screen reader accessibility for SVGs varies based on the pattern being used.

The following props/attributes have been added for you or are customizable in PatternFly:

| Reason used | React prop used to customize | HTML attribute | React component that it should be applied to | Which HTML element it appears on in markup |
| -- | -- | -- | -- | -- |
| Provides an accessible description of the avatar as it uses an image instead of text. | `alt` | img alt=[alt prop] | Avatar | .pf-c-avatar |
