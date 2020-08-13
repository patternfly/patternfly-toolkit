import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';


export const DocumentationComponentsAlertGroupReactDocs = {
  "slug": "/documentation/components/alert-group/react",
  "source": "react",
  "propComponents": [
    "Alert",
    "AlertGroup",
    "AlertActionCloseButton",
    "AlertActionLink"
  ],
  "sourceLink": "https://github.com/patternfly/patternfly-react/blob/master/packages/react-core/src/components/AlertGroup/examples/AlertGroup.md",
  "section": "components",
  "id": "Alert group",
  "title": "Alert group",
  "toc": [
    "Examples"
  ],
  "cssPrefix": "pf-c-alert-group"
};
DocumentationComponentsAlertGroupReactDocs.liveContext = {
  
};
DocumentationComponentsAlertGroupReactDocs.Component = () => (
  <React.Fragment>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Examples`}
    </AutoLinkHeader>
    <Example {...DocumentationComponentsAlertGroupReactDocs} {...{"code":"import React from 'react';\nimport { Alert, AlertGroup } from '@patternfly/react-core';\n\nclass StaticAlertGroup extends React.Component {\n  render() {\n    return (\n      <React.Fragment>\n        <AlertGroup>\n          <Alert title=\"Success Alert\" variant=\"success\" isInline />\n          <Alert title=\"Info Alert\" variant=\"info\" isInline/>\n        </AlertGroup>\n      </React.Fragment>\n    );\n  }\n}","title":"Static alert group","lang":"js"}}>
    </Example>
    <Example {...DocumentationComponentsAlertGroupReactDocs} {...{"code":"import React from 'react';\nimport { Alert, AlertGroup, AlertActionCloseButton, AlertVariant, InputGroup } from '@patternfly/react-core';\nclass ToastAlertGroup extends React.Component {\n  constructor() {\n    super();\n    this.state = { alerts: [] };\n    this.addAlert = (title, variant, key) => {\n      this.setState({\n        alerts: [ ...this.state.alerts, { title: title, variant: variant, key }]\n      });\n    };\n    this.removeAlert = key => {\n      this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });\n    };\n  }\n  render() {\n    const btnClasses = ['pf-c-button', 'pf-m-secondary'].join(' ');\n    const getUniqueId = () => (new Date().getTime());\n    const addSuccessAlert = () => { this.addAlert('Toast Success Alert', 'success', getUniqueId()) };\n    const addDangerAlert = () => { this.addAlert('Toast Danger Alert', 'danger', getUniqueId()) };\n    const addInfoAlert = () => { this.addAlert('Toast Info Alert', 'info', getUniqueId()) };\n    return (\n      <React.Fragment>\n        <InputGroup style={{ marginBottom: '16px' }}>\n          <button onClick={addSuccessAlert} type=\"button\" className={btnClasses}>Add Toast Success Alert</button>\n          <button onClick={addDangerAlert} type=\"button\" className={btnClasses}>Add Toast Danger Alert</button>\n          <button onClick={addInfoAlert} type=\"button\" className={btnClasses}>Add Toast Info Alert</button>\n        </InputGroup>\n        <AlertGroup isToast>\n          {this.state.alerts.map(({key, variant, title}) => (\n            <Alert\n              isLiveRegion\n              variant={AlertVariant[variant]}\n              title={title}\n              actionClose={\n                <AlertActionCloseButton\n                  title={title}\n                  variantLabel={`${variant} alert`}\n                  onClose={() => this.removeAlert(key)}\n                />\n              }\n              key={key} />\n          ))}\n        </AlertGroup>\n      </React.Fragment>\n    );\n  }\n}","title":"Toast alert group","lang":"js"}}>
    </Example>
    <Example {...DocumentationComponentsAlertGroupReactDocs} {...{"code":"import React from 'react';\nimport { Alert, AlertGroup, AlertVariant, AlertActionCloseButton, InputGroup } from '@patternfly/react-core';\nclass SingularAdditiveAlertGroup extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      alerts: []\n    }\n  }\n  render() {\n    const addAlert = (title, variant, key) => {\n      this.setState({ alerts: [...this.state.alerts, { title: title, variant: variant, key }] });\n    };\n    const btnClasses = ['pf-c-button', 'pf-m-secondary'].join(' ');\n    const getUniqueId = () => (new Date().getTime());\n    const addSuccessAlert = () => { addAlert('Single Success Alert', 'success', getUniqueId()) };\n    const addDangerAlert = () => { addAlert('Single Danger Alert', 'danger', getUniqueId()) };\n    const addInfoAlert = () => { addAlert('Single Info Alert', 'info', getUniqueId()) };\n    this.removeAlert = key => {\n      this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });\n    };\n    return (\n      <React.Fragment>\n        <InputGroup style={{ marginBottom: '16px' }}>\n          <button onClick={addSuccessAlert} type=\"button\" className={btnClasses}>Add Single Success Alert</button>\n          <button onClick={addDangerAlert} type=\"button\" className={btnClasses}>Add Single Danger Alert</button>\n          <button onClick={addInfoAlert} type=\"button\" className={btnClasses}>Add Single Info Alert</button>\n        </InputGroup>\n        <AlertGroup>\n          {this.state.alerts.map(({ title, variant, key }) => (\n            <Alert\n              isInline\n              isLiveRegion\n              variant={AlertVariant[variant]}\n              title={title}\n              key={key}\n              actionClose={\n                <AlertActionCloseButton\n                  title={title}\n                  variantLabel={`${variant} alert`}\n                  onClose={() => this.removeAlert(key)}\n                />\n              }/>\n          ))}\n        </AlertGroup>\n      </React.Fragment>\n    );\n  }\n}","title":"Singular dynamic alert group","lang":"js"}}>
    </Example>
    <Example {...DocumentationComponentsAlertGroupReactDocs} {...{"code":"import React from 'react';\nimport { Alert, AlertGroup, AlertVariant, AlertActionCloseButton, InputGroup } from '@patternfly/react-core';\nclass MultipleAdditiveAlertGroup extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      alerts: []\n    }\n  }\n  render() {\n    const addAlerts = (incomingAlerts) => {\n      this.setState({ alerts: [...this.state.alerts, ...incomingAlerts] });\n    };\n    const getUniqueId = () => (\n      (String.fromCharCode(65 + Math.floor(Math.random() * 26))+ Date.now())\n    );\n    const btnClasses = ['pf-c-button', 'pf-m-secondary'].join(' ');\n    const addAlertCollection = () => {\n      addAlerts([\n        { title: 'First Alert Notification.', variant: 'success', key: getUniqueId() },\n        { title: 'Second Alert Notification.', variant: 'warning', key: getUniqueId() },\n        { title: 'Third Alert Notification.', variant: 'danger', key: getUniqueId() }\n      ])\n    };\n    this.removeAlert = key => {\n      this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });\n    };\n    return (\n      <React.Fragment>\n        <InputGroup style={{ marginBottom: '16px' }}>\n          <button onClick={addAlertCollection} type=\"button\" className={btnClasses}>Add Alert Collection</button>\n        </InputGroup>\n        <AlertGroup isToast>\n          {this.state.alerts.map(({ title, variant, key, action }) => (\n            <Alert\n              isLiveRegion\n              variant={AlertVariant[variant]}\n              title={title}\n              key={key}\n              actionClose={\n                <AlertActionCloseButton\n                  title={title}\n                  variantLabel={`${variant} alert`}\n                  onClose={() => this.removeAlert(key)}\n                />\n              }/>\n          ))}\n        </AlertGroup>\n      </React.Fragment>\n    );\n  }\n}","title":"Multiple dynamic alert group","lang":"js"}}>
    </Example>
    <Example {...DocumentationComponentsAlertGroupReactDocs} {...{"code":"import React from 'react';\nimport { Alert, AlertGroup, AlertActionCloseButton, AlertVariant, InputGroup } from '@patternfly/react-core';\nclass AsyncAdditiveAlertGroup extends React.Component {\n  constructor() {\n    super();\n    this.state = {\n      alerts: [],\n      timer: null\n    }\n    this.stopAsyncAlerts = () => { clearInterval(this.state.timer); }\n  }\n  componentWillUnmount() { this.stopAsyncAlerts(); }\n  render() {\n    const addAlerts = (incomingAlerts) => { this.setState({ alerts: [...this.state.alerts, ...incomingAlerts] }); };\n    const getUniqueId = () => (new Date().getTime());\n    const btnClasses = ['pf-c-button', 'pf-m-secondary'].join(' ');\n    this.removeAlert = key => {\n      this.setState({ alerts: [...this.state.alerts.filter(el => el.key !== key)] });\n    };\n    const startAsyncAlerts = () => {\n      let timerValue = setInterval(() => {\n        addAlerts([\n          {\n            title: `Async Notification ${this.state.alerts.length + 1} was added to the queue.`,\n            variant: 'info',\n            key: getUniqueId()\n          }\n        ])\n      }, 1500);\n      this.setState({timer: timerValue});\n    };\n    return (\n      <React.Fragment>\n        <InputGroup style={{ marginBottom: '16px' }}>\n          <button onClick={startAsyncAlerts} type=\"button\" className={btnClasses}>Start Async Alerts</button>\n          <button onClick={this.stopAsyncAlerts} type=\"button\" className={btnClasses}>Stop Async Alerts</button>\n        </InputGroup>\n        <AlertGroup isToast>\n          {this.state.alerts.map(({ title, variant, key }) => (\n            <Alert\n              isLiveRegion\n              variant={AlertVariant[variant]}\n              title={title}\n              key={key}\n              actionClose={\n                <AlertActionCloseButton\n                  title={title}\n                  variantLabel={`${variant} alert`}\n                  onClose={() => this.removeAlert(key)}\n                />\n              }/>\n          ))}\n        </AlertGroup>\n      </React.Fragment>\n    );\n  }\n}","title":"Async alert group","lang":"js"}}>
    </Example>
  </React.Fragment>
);
DocumentationComponentsAlertGroupReactDocs.Component.displayName = 'DocumentationComponentsAlertGroupReactDocs';
