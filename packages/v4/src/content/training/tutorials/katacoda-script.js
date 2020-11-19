import React from 'react';
import './tutorials.css'

const KatacodaExample = ({katacodaId}) => {
  React.useEffect(() => {
      const script = document.createElement('script');
      script.setAttribute('src', '//katacoda.com/embed.js');
      document.body.appendChild(script);
      const content = document.getElementsByClassName('ws-mdx-content-content')[0];
      //content.classList.remove('ws-mdx-content-content');
      content.setAttribute('style', 'max-width: none');
      return () => {
        document.body.removeChild(script);
      }
  }, []);
  return (
    <div
      id={`katacoda-scenario-${katacodaId}`}
      data-katacoda-id={`patternfly/courses/${katacodaId}`}
      data-katacoda-color="004d7f"
      className="tutorial-layout"
    ></div>
  );
}

export default KatacodaExample;