import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';
import '../../../../../../../node_modules/@patternfly/patternfly/docs/layouts/Grid/examples/./Grid.css'

export const DocumentationLayoutsGridCoreDocs = {
  "slug": "/documentation/layouts/grid/core",
  "source": "core",
  "sourceLink": "https://github.com/patternfly/patternfly/blob/master/src/patternfly/layouts/Grid/examples/Grid.md",
  "section": "layouts",
  "id": "Grid",
  "title": "Grid",
  "toc": [
    "Examples",
    "Documentation"
  ],
  "cssPrefix": "pf-l-grid"
};
DocumentationLayoutsGridCoreDocs.liveContext = {
  
};
DocumentationLayoutsGridCoreDocs.Component = () => (
  <React.Fragment>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid pf-m-all-6-col-on-sm pf-m-all-4-col-on-md pf-m-all-2-col-on-lg pf-m-all-1-col-on-xl\">\n  <div class=\"pf-l-grid__item\">item 1</div>\n  <div class=\"pf-l-grid__item\">item 2</div>\n  <div class=\"pf-l-grid__item\">item 3</div>\n  <div class=\"pf-l-grid__item\">item 4</div>\n  <div class=\"pf-l-grid__item\">item 5</div>\n  <div class=\"pf-l-grid__item\">item 6</div>\n  <div class=\"pf-l-grid__item\">item 7</div>\n  <div class=\"pf-l-grid__item\">item 8</div>\n  <div class=\"pf-l-grid__item\">item 9</div>\n  <div class=\"pf-l-grid__item\">item 10</div>\n  <div class=\"pf-l-grid__item\">item 11</div>\n  <div class=\"pf-l-grid__item\">item 12</div>\n</div>","title":"Smart (responsive)","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid pf-m-all-6-col-on-sm pf-m-all-4-col-on-md pf-m-all-2-col-on-lg pf-m-all-1-col-on-xl\">\n  <div class=\"pf-l-grid__item pf-m-8-col-on-sm pf-m-4-col-on-lg pf-m-6-col-on-xl\">item 1</div>\n  <div class=\"pf-l-grid__item pf-m-4-col-on-sm pf-m-8-col-on-lg pf-m-6-col-on-xl\">item 2</div>\n  <div class=\"pf-l-grid__item\">item 3</div>\n  <div class=\"pf-l-grid__item\">item 4</div>\n  <div class=\"pf-l-grid__item\">item 5</div>\n  <div class=\"pf-l-grid__item\">item 6</div>\n  <div class=\"pf-l-grid__item\">item 7</div>\n  <div class=\"pf-l-grid__item\">item 8</div>\n  <div class=\"pf-l-grid__item\">item 9</div>\n  <div class=\"pf-l-grid__item\">item 10</div>\n  <div class=\"pf-l-grid__item\">item 11</div>\n  <div class=\"pf-l-grid__item\">item 12</div>\n  <div class=\"pf-l-grid__item\">item 13</div>\n  <div class=\"pf-l-grid__item\">item 14</div>\n</div>","title":"Smart with overrides (responsive)","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid\">\n  <div class=\"pf-l-grid__item pf-m-12-col\">12 col</div>\n  <div class=\"pf-l-grid__item pf-m-11-col\">11 col</div>\n  <div class=\"pf-l-grid__item pf-m-1-col\">1 col</div>\n  <div class=\"pf-l-grid__item pf-m-10-col\">10 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-9-col\">9 col</div>\n  <div class=\"pf-l-grid__item pf-m-3-col\">3 col</div>\n  <div class=\"pf-l-grid__item pf-m-8-col\">8 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col\">4 col</div>\n  <div class=\"pf-l-grid__item pf-m-7-col\">7 col</div>\n  <div class=\"pf-l-grid__item pf-m-5-col\">5 col</div>\n</div>","title":"Base","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid pf-m-gutter\">\n  <div class=\"pf-l-grid__item pf-m-12-col\">12 col</div>\n  <div class=\"pf-l-grid__item pf-m-11-col\">11 col</div>\n  <div class=\"pf-l-grid__item pf-m-1-col\">1 col</div>\n  <div class=\"pf-l-grid__item pf-m-10-col\">10 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-9-col\">9 col</div>\n  <div class=\"pf-l-grid__item pf-m-3-col\">3 col</div>\n</div>","title":"Gutter","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid\">\n  <div class=\"pf-l-grid__item pf-m-1-col pf-m-6-col-on-md pf-m-11-col-on-xl\">1 / 6 / 11 col</div>\n  <div class=\"pf-l-grid__item pf-m-11-col pf-m-6-col-on-md pf-m-1-col-on-xl\">11 / 6 / 1 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col pf-m-6-col-on-md pf-m-10-col-on-xl\">2 / 6 / 10 col</div>\n  <div class=\"pf-l-grid__item pf-m-10-col pf-m-6-col-on-md pf-m-2-col-on-xl\">10 / 6 / 2 col</div>\n  <div class=\"pf-l-grid__item pf-m-3-col pf-m-6-col-on-md pf-m-9-col-on-xl\">3 / 6 / 9 col</div>\n  <div class=\"pf-l-grid__item pf-m-9-col pf-m-6-col-on-md pf-m-3-col-on-xl\">9 / 6 / 3 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col pf-m-6-col-on-md pf-m-8-col-on-xl\">4 / 6 / 8 col</div>\n  <div class=\"pf-l-grid__item pf-m-8-col pf-m-6-col-on-md pf-m-4-col-on-xl\">8 / 6 / 4 col</div>\n  <div class=\"pf-l-grid__item pf-m-5-col pf-m-6-col-on-md pf-m-7-col-on-xl\">5 / 6 / 7 col</div>\n  <div class=\"pf-l-grid__item pf-m-7-col pf-m-6-col-on-md pf-m-5-col-on-xl\">7 / 6 / 5 col</div>\n</div>","title":"Responsive","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid\">\n  <div class=\"pf-l-grid__item pf-m-12-col\">12 col</div>\n  <div class=\"pf-l-grid__item pf-m-10-col\">10 col\n    <div class=\"pf-l-grid pf-m-gutter\">\n      <div class=\"pf-l-grid__item pf-m-6-col\">6 col</div>\n      <div class=\"pf-l-grid__item pf-m-6-col\">6 col</div>\n      <div class=\"pf-l-grid__item pf-m-4-col\">4 col</div>\n      <div class=\"pf-l-grid__item pf-m-8-col\">8 col</div>\n    </div>\n  </div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n</div>","title":"Nested","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid pf-m-gutter\">\n  <div class=\"pf-l-grid__item pf-m-11-col pf-m-offset-1-col\">11 col, offset 1</div>\n  <div class=\"pf-l-grid__item pf-m-10-col pf-m-offset-2-col\">10 col, offset 2</div>\n  <div class=\"pf-l-grid__item pf-m-9-col pf-m-offset-3-col\">9 col, offset 3</div>\n  <div class=\"pf-l-grid__item pf-m-8-col pf-m-offset-4-col\">8 col, offset 4</div>\n</div>","title":"Offsets","lang":"html"}}>
    </Example>
    <Example {...DocumentationLayoutsGridCoreDocs} {...{"code":"<div class=\"pf-l-grid pf-m-gutter\">\n  <div class=\"pf-l-grid__item pf-m-8-col\">8 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col pf-m-2-row\">4 col, 2 row</div>\n  <div class=\"pf-l-grid__item pf-m-2-col pf-m-3-row\">2 col, 3 row</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col\">4 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col\">4 col</div>\n  <div class=\"pf-l-grid__item pf-m-2-col\">2 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col\">4 col</div>\n  <div class=\"pf-l-grid__item pf-m-4-col\">4 col</div>\n</div>","title":"Row spans","lang":"html"}}>
    </Example>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Documentation`}
    </AutoLinkHeader>
    <AutoLinkHeader {...{"size":"h3","className":"ws-title ws-h3"}}>
      {`Overview`}
    </AutoLinkHeader>
    <p {...{"className":"ws-p"}}>
      {`The grid layout is based on CSS Grid’s two-dimensional system of columns and rows. This layout styles the parent element and its children to achieve responsive column and row spans as well as gutters.`}
    </p>
    <AutoLinkHeader {...{"size":"h3","className":"ws-title ws-h3"}}>
      {`Usage`}
    </AutoLinkHeader>
    <table {...{"className":"ws-table"}}>
      <thead>
        <tr>
          <th>
            {`Class`}
          </th>
          <th>
            {`Applied to`}
          </th>
          <th>
            {`Outcome`}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-l-grid`}
            </code>
          </td>
          <td>
            <code {...{"className":"ws-code"}}>
              {`<div>`}
            </code>
          </td>
          <td>
            {`Initializes the grid layout.`}
          </td>
        </tr>
        <tr>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-l-grid__item`}
            </code>
          </td>
          <td>
            <code {...{"className":"ws-code"}}>
              {`<div>`}
            </code>
          </td>
          <td>
            {`Explicitly sets a child of the grid. This class isn't necessary, but it is included to keep inline with BEM convention, and to provide an entity that will later be used for applying modifiers.`}
          </td>
        </tr>
        <tr>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-m-gutter`}
            </code>
          </td>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-l-grid`}
            </code>
          </td>
          <td>
            {`Adds space between children by using the globally defined gutter value.`}
          </td>
        </tr>
        <tr>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-m-all-{1-12}-col{-on-[breakpoint]}`}
            </code>
          </td>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-l-grid`}
            </code>
          </td>
          <td>
            {`Defines grid item size on grid container.`}
          </td>
        </tr>
        <tr>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-m-{1-12}-col{-on-[breakpoint]}`}
            </code>
          </td>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-l-grid__item`}
            </code>
          </td>
          <td>
            {`Defines grid item size.  Although not required, they are strongly suggested. If not used, grid item will default to 12 col.`}
          </td>
        </tr>
        <tr>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-m-{2-x}-row{-on-[breakpoint]}`}
            </code>
          </td>
          <td>
            <code {...{"className":"ws-code"}}>
              {`.pf-l-grid__item`}
            </code>
          </td>
          <td>
            {`Defines grid item row span.  For row spans to function correctly, the value of of the current row plus the grid items to span must be equal to or less than 12. Example: .pf-m-8-col.pf-m-2-row + .pf-m-4-col + .pf-m-4-col. There is no limit to number of spanned rows.`}
          </td>
        </tr>
      </tbody>
    </table>
  </React.Fragment>
);
DocumentationLayoutsGridCoreDocs.Component.displayName = 'DocumentationLayoutsGridCoreDocs';
