---
id: Tree view
section: components
---

A **tree view** is a structure that displays data in a hierarchical view. It can be used in a dropdown, drawer, primary-detail, modal, or wizard. Tree views are often used when grouping similar decisions, action items, or navigation elements together.

A default tree view provides a tree structure with items and arrows to expand or collapse child items. Every tree view can be extended with these optional capabilities.

**Keyboard users** should be able to interact with and navigate through the interactive tree view. Initial focus should be set on the first focusable element in the tree view. The user should be able to focus on one element of the tree with **Tab**. Once focused on a tree item, the user should also be able to move between visible nodes using **Up arrow** and **Down arrow**. **Left arrow** can be used to collapse an expanded node, or move to the parent of an already-collapsed or childless node. **Right arrow** should expand the focused node if it is collapsed but has child nodes, move to the first child of an already-expanded node, or do nothing on an end node.

Keyboard interactions for tree view:

|  |  |
| -- | -- |
| Tab | Focus on the first (or previously selected) element of the tree |
| Up arrow | Move up through visible nodes |
| Down arrow | Move down through visible nodes |
| Left arrow | Collapse focused node if expanded, or move to the parent of a collapsed/childless node |
| Right arrow | Expand focused node if collapsed, move to first child if already expanded, or do nothing if end node |

**Screen reader users** should be able to interact with the tree view using their mouse or keyboard. Nodes of a tree view should have descriptive text labels whenever possible. If a tree view node only contains a graphic (such as an icon), it should have alternative text: `aria-label` is the most common way to add this. A tree view should be identified as such when the screen reader first focuses on it. When users navigate to a new node, indicate its branch level , number of child nodes, and number of sibling nodes.

## To make tree view accessible:
- Use aria roles to identify the tree (“tree”), the nodes in the tree (“treeitem”), and sets of child nodes (“group”).
- Indicate a selected node with aria-selected.
- **For every parent node**, add an `aria-expanded` attribute that says whether the node is collapsed or expanded. This will make the tree view more screen reader friendly.

The following props/attributes have been added for you or are customizable in PatternFly:

| Reason used | React prop used to customize | HTML Attribute | React component that it should be applied to | Which HTML element it appears on in markup |
| -- | -- | -- | -- | -- |
| Provides an accessible name for the close button as it uses an icon instead of text. Default is “Close dialog”. Only used if you are customizing. | `closeButtonAriaLabel` | aria-label="[close button label]" | AboutModal | .pf-c-modal-box__close .pf-c-button |
