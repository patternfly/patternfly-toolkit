import React from 'react';
import { LiveProvider, LivePreview } from 'react-live';
import { transformCode } from '../helpers/transformCode';
const reactCoreModule = require('@patternfly/react-core');
const reactTableModule = require('@patternfly/react-table');
import './fullscreen.css';

export const FullscreenTemplate = ({
  wrapperTag: WrapperTag,
  code,
  liveContext,
  lang
}) => {
  const scope = {
    ...liveContext,
    // These 2 are in the bundle anyways for the site since we dogfood
    ...reactCoreModule,
    ...reactTableModule,
  };
  return (
    <LiveProvider
      scope={scope}
      code={code}
      transformCode={c => transformCode(c, lang)}
    >
      <LivePreview Component={({ children }) => (
        <WrapperTag className="ws-site-root">
          {children}
        </WrapperTag>
      )} />
    </LiveProvider>
  );
}
