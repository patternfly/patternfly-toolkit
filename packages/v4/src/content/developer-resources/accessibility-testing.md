---
id: Testing your accessibility
section: accessibility
---

## General Testing

Many accessibility issues can be found by doing a few simple checks: 

1. **Validate your HTML.** Structural, semantic HTML is the key starting point toward good accessibility practices. When a screen reader (or any sort of assistive device) scans a web page, it gets information about the Document Object Model (DOM), or the HTML structure of the page. No styles or JavaScript will be read by a screen reader. 

   - Screen reader software like Voice Over, NVDA, or JAWS doesn’t just turn text into speech. It can use information in the HTML to list all of the headings on a page, give extra navigation controls to data tables, or announce how many items are in a list, among other things. This makes semantic HTML essential. 

   - There are many tools you can use to validate your HTML, such as [W3C’s markup validation service](https://validator.w3.org/). 


2. **Use an accessibility audit tool to check for violations.** If you are using PatternFly in your project, we recommend using [aXe: The Accessibility Engine](//www.deque.com/axe/) to check for accessibility violations locally. To make it even easier for you, we've created the [patternfly-a11y script](https://github.com/patternfly/patternfly-a11y) which reports any axe accessibility violations from a set of pages. A configuration file can be set to customize to specific needs like authentication, waiting for any specific items to finish loading (like a loading spinner), etc. When used as a report, it will give an output similar to the [following](http://a11y-os.surge.sh/). The UI should be built first in the CI workflow and then a job created to run the a11y script against that build. The a11y script assumes that there is a webserver running somewhere that is serving up the pages, i.e. in localhost:8000, that it can reach. If you want to test a step before deployment, you could follow the path of integrating axe with cypress. If you are contributing to PatternFly, refer to our [README.md](//github.com/patternfly/patternfly/blob/master/README.md#testing-for-accessibility) on how to run this tool.


3. **Test keyboard accessibility, and check that these requirements are met:**
    - All functionality is keyboard accessible
    - Elements in the HTML and in the layout follow a logical order.
    - Elements with focus are clearly visible


4. **Disable styles**, then test the information architecture and presence of adequate text labels. The [WAVE browser extension from WebAIM](//wave.webaim.org/extension/) provides this feature if it isn't available in the browser you are using.


5. **Test with any screen reader available in your operating system.** We target these screen readers to test PatternFly:
    - JAWS with Chrome, Windows ([keyboard shortcuts](//dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts))
    - Voiceover with Safari, Mac ([keyboard shortcuts](//dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts))
    - NVDA with Firefox, Windows ([keyboard shortcuts](//dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts))



6. **Check color contrast for the following:**
    - Text color against background color ([Understanding WCAG 1.4.3](//www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html))
    - Text color against link color ([Technique G183](//www.w3.org/TR/WCAG20-TECHS/G183.html))
    - Visible boundaries of buttons and form elements against adjacent background color ([Understanding WCAG 1.4.11](//www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html))



## Screen Readers
To truly test your accessibility, open up a screen reader of your choice (we use Voice Over). Just as front-end developers use their browser to see how their changes look, you should also open a screen reader to see how your accessibility looks. 

Generally, screen readers access the DOM (Document Object Model), and they use browser APIs (Application Programming Interfaces) to get the information they need. In this way, a screen reader knows what to say when a set of list items begins and ends, and it typically announces, in advance, how many items are in the list. A screen reader can also traverse a page using heading navigation to speak the heading level. 

Here are a few aspects that can affect how screen readers communicate information:

- **Semantic HTML** - Semantics refers to the meaning of a piece of code. A semantic element clearly describes its meaning to both the browser and the developer. For example, `<div>` and `<span>` are non-semantic elements because it tells nothing about its contents. Examples of semantic elements include `<form>`, `<table>`, etc. which clearly define its contents. Screen readers expect semantic HTML when traversing the DOM so non-semantic elements that are not customized to be made accessible are highly likely to be inaccessible. Aria and other accessible attributes are meant to extend the functionality and meaning of native semantics, but at the core, your HTML should be semantic.

- **Headings** - A visual user can scan a page and fairly quickly understand the information architecture of the page. Visually impaired users have other methods of achieving this. One common method is the use of headings where a user will use the heading levels to determine the flow of information. Having headings that vary in size simply based on design and not functionality will likely confuse these users. Having a clear flow of sequential heading sizes based on headings and subheadings is significantly clearer to all users.

- **Accessible names for all elements** - When an element does not have visual text or when further explanation is necessary, a screen reader will not know what an item is or does. If you have an icon `<button>`, for example, the screen reader can only tell that it’s a button if it doesn’t have a label, not what the button does. Add a few more non-labeled buttons, and now all the screen reader sees are vague buttons with no understanding of what they do. See above section on labeling for more information.

- **Links** - similar to the above point, links need clarity too and should always have a label. Without it, users have no idea where the links point to - would you click on a link if you had no idea where it went? If you have the same label for multiple links though, it needs to be the same URL. Links, buttons, and form controls should make sense out of context. If a user wants to look at all of the links available, they should be able to differentiate the available links. You shouldn’t have ten “Click here” links.

- **Landmarks** - As mentioned earlier, landmarks help identify regions to communicate the structure of a page. There are a number of types of landmarks such as banners, navigation, main, form, etc. When there are more than one of the same role (for example, two navigation regions on the same page), these regions should be differentiated by an `aria-label`.

- **Dynamic content** - One of the biggest accessibility concerns with dynamic content is the need to notify users that the content has changed. Sighted users benefit from highlighting or drawing visual attention to the changes. Non-sighted users need to be notified some other way, such as by loading a new page, sending the focus to the new content, or using ARIA live announcements.

- **Unrelated announcements** from the OS outside of the web app - Other notifications can interrupt a user while interacting with a page. For example, "you received a new chat msg from xyz". This possibility should be considered when designing and developing for screen readers as it will impact their experience. This is why it's good to keep things like validation messages and alerts terse, as it makes it less likely that an announcement will be interrupted. 


<br />

### Checklist for testing
These are some of the main areas we check for on the PatternFly team. We recommend that you check for these same areas in your applications, too. 

**General questions**

<input type="checkbox" unchecked /> VO Rotor Navigation can discover all information <br/>
<input type="checkbox" unchecked /> VO Shortcut Navigation can discover all information <br/>
<input type="checkbox" unchecked /> VO Cursor Navigation can discover all information. (dependent on component and use case- easy way to navigate to component) <br/>
<input type="checkbox" unchecked /> Tabbed Keyboard Navigation can discover all information
- However, if content should be hidden from a screen reader, for instance, if it’s offscreen or just presentational, make sure that content is set to aria-hidden=”true”.  <br/>

<input type="checkbox" unchecked /> Is it understandable and usable? <br/>
  - <input type="checkbox" unchecked /> When you navigate to an item by keyboard or by screen reader, you can easily understand and use the item <br/>
  - <input type="checkbox" unchecked /> Flow of information makes sense when navigating - screen readers navigate the page in DOM order, if you’ve used CSS to visually reposition elements, they may be announced in a nonsensical sequence. If you need something to appear earlier in the page, try to physically move it earlier in the DOM.

**Accessibility points** <br />
<input type="checkbox" unchecked /> **Structure:** Need to map the visual information architecture to the various rotor menus that exist by default. <br />
- <input type="checkbox" unchecked /> **Check rotor:** are there good headings, landmarks, links, form controls, etc? Do they make sense, are descriptive but not overloading with info? <br />
  - <input type="checkbox" unchecked /> Headings (check that heading levels convey structure/content and do not skip)
    - A common practice is to use a single h1 for the primary headline or logo on a page, h2s to designate major sections, and h3's in supporting subsections <br />
  - <input type="checkbox" unchecked /> Links <br />
  - <input type="checkbox" unchecked /> Form Controls <br />
  - <input type="checkbox" unchecked /> Landmarks <br />
  - <input type="checkbox" unchecked /> Tables <br />


<input type="checkbox" unchecked /> **Labels:**
- <input type="checkbox" unchecked /> **Link** labels should be unique unless they have the same url, should be descriptive/informative
- <input type="checkbox" unchecked /> **Buttons, form controls**, etc.
  - Go through form controls and check if they all have labels (accessible vs. good experience)
  - **Expandable buttons** should have some indication that it has the expandable control
- <input type="checkbox" unchecked /> **Form input** has to have some label even if not visible
- <input type="checkbox" unchecked /> **Icons**: where you don’t visibly see text there should still be some kind of text for screen reader
- <input type="checkbox" unchecked /> **Images**: Check all images for proper alt text. The exception to this practice is when images are primarily for presentation purposes and are not essential pieces of content. To signify that an image should be skipped by a screen reader, set the value of the alt attribute to an empty string, e.g., `alt=””`.
- <input type="checkbox" unchecked /> **Landmark** regions have labels, more than one type of landmark and not the same (navigation, main, form, etc.)
Section element shouldn’t be used unless it has a label
- <input type="checkbox" unchecked /> **Tables**: Can you tell what the table is and what’s in it? (https://webaim.org/techniques/tables/)
- <input type="checkbox" unchecked /> **Aria**: if there is visible text then there doesn’t need to be an `aria-label` (aria aids in description to screen reader users, doesn’t have to reiterate or override what might already be there, check that your aria is useful)
  - It’s important to understand that ARIA can only affect the _semantics_ of an element; it has no effect on the _behavior_ of the element. 
  - For example, while you can make an element hidden to screen readers with `aria-hidden=”true”`, that does not change the focus behavior for that element. 