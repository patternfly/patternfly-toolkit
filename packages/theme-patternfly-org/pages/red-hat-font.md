---
id: Red Hat font
section: developer-resources
---

The Red Hat font has two variations [**Red Hat Text**](#red-hat-text) and [**Red Hat Display**](#red-hat-display). 
Each font variation has characteristics that allow them to perform best in their specific contexts.
For more information, see the [RedHatOfficial/RedHatFont](https://github.com/RedHatOfficial/RedHatFont) repository.

You can use Red Hat font from PatternFly [v2.18.0](https://github.com/patternfly/patternfly/releases/tag/v2.18.0) onwards.

### Red Hat Text

Red Hat Text font uses smaller and lighter characters with hinting to fit the pixel grid well at smaller sizes, such as body text.

For example, `--pf-global--FontFamily--redhatfont--sans-serif`.

**Font weights**

- 400 (normal)
- 700 (bold)

### Red Hat Display

Red Hat Display font uses broader and heavier characters which matches the Red Hat logo. Use the Red Hat Display font for headings and other large text sizes.

For example, `--pf-global--FontFamily--redhatfont--heading--sans-serif`.

**Font weights**

- 300 (light - rarely used)
- 400 (normal)
- 700 (bold)

### Existing overrides

With the CSS changes listed above, each change is defined in a `.pf-m-redhat-font` selector in the PatternFly CSS. That means that these variable overrides and new declarations are all in selectors that have a CSS specificity of 10 higher than they would normally.

For example, the existing selector in PatternFly below has a specificity of 10:

`.pf-c-title { --pf-c-title--m-lg--FontWeight: var(--pf-global--FontWeight--normal); }` 

When opting-in to the new font, that variable is now overridden as below, and the selector has a specificity of 20:

`.pf-m-redhat-font .pf-c-title { --pf-c-title--m-lg--FontWeight: var(--pf-global--FontWeight--normal); }`

So in your application, if you had overridden `--pf-c-title--m-lg--FontWeight` in your own CSS by defining your override after PatternFly’s CSS in the loading order and using a selector that has the same specificity as the original rule (10) from PatternFly, you will now need to increase the specificity of your override’s rule to match or exceed 20 for your override to still apply after opting-in to the new font.
