import React from 'react';
import { Link as ReachLink } from '@reach/router';
import ConfigContext from '../../helpers/configContext';

export const Link = ({
  href,
  to,
  onMouseOver = () => {},
  ...props
}) => {
  let url = href || to || '';
  if (url.includes('//') || url.startsWith("#")) {
    return <a href={url} {...props} />;
  }
  else if (url.startsWith('/')) {
    const { pathPrefix, routes } = React.useContext(ConfigContext);
    const route = routes[url];
    if (route && route.sources) {
      // Preload on hover
      props.onMouseOver = () => {
        Object.values(route.sources).forEach(({ preload = () => {} }) => preload());
        onMouseOver();
      };
    }
    url = `${pathPrefix}/${url.substr(1)}`;
  }
  return <ReachLink to={url} {...props} />;
}
