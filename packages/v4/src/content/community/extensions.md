---
id: Community Extensions
section: community
---

Community extensions are developed and maintained by members of the PatternFly community. They are often more 
solution-based than core PatternFly components, may be subject to change, or be experimental in nature. Anything 
worthy of being shared across projects may be contributed as a community extension. Occasionally a community 
extension may be promoted into the core PatternFly distribution if and when usage is proven across multiple 
projects and it can be abstracted from any project-specific use cases.


Extension components do not undergo the same rigorous design or coding review process as core PatternFly components 
and are not supported directly by the PatternFly team. For support, please contact the listed maintainers(s).

import {ExtensionsTable} from './extensions-table';
import {communityExtensions} from './extensions';

## Available components
<ExtensionsTable data={communityExtensions}/>

##
Contributing extensions
Anyone can add assets to the community component index. You can add a new community extension by submitting a pull request against the patternfly-org repo to add your component to the index. Requests will be reviewed and approved by the PatternFly team.

To prepare your pull request to update the component index, follow <a>the process outlined here</>.
