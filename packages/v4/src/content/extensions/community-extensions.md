---
id: Community extensions
section: extensions
---
Community extensions are developed and maintained by members of the PatternFly community. They are often more 
solution-based than core PatternFly components, may be subject to change, or be experimental in nature. Anything 
worthy of being shared across projects may be contributed as a community extension. Occasionally a community 
extension may be promoted as an officially supported extension if and when usage is proven across multiple 
projects and it can be abstracted from any project-specific use cases.

Extension components do not undergo the same rigorous design or coding review process as core PatternFly components 
and are not supported directly by the PatternFly team. For support, open issues in the project Github repositories
and join the PatternFly <a href="//slack.patternfly.org/" target="_blank" rel="noopener noreferrer">Slack</a> workspace.

## Contributing extensions
Anyone can add assets to the community component index. To request a new community extension, submit  a pull 
request against the patternfly-org repo and add your component to `extensions-data.js`. Requests will be reviewed and 
approved by the PatternFly team.

import {ExtensionsDataList} from './extensions-data-list';
import {communityExtensions} from './extensions-data';
import './extensions.css';

## Available components
<ExtensionsDataList data={communityExtensions}/>
