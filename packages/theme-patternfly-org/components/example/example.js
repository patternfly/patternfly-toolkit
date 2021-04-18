import React from 'react';
import { useLocation } from '@reach/router';
import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import { Badge } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import { ExampleToolbar } from './exampleToolbar';
import { AutoLinkHeader } from '../autoLinkHeader/autoLinkHeader';
import { getParameters } from 'codesandbox/lib/api/define';
import { slugger, transformCode, getStaticParams, getReactParams, getExampleClassName, getExampleId } from '../../helpers';
import Prism from 'prismjs';
import missingThumbnail from './missing-thumbnail.jpg';
import 'prismjs/themes/prism-coy.css';
import './example.css';
const reactCoreModule = require('@patternfly/react-core');
const reactTableModule = require('@patternfly/react-table');

const getSupportedLanguages = lang => {
  if (['js', 'javascript'].includes(lang)) {
    return ['jsx'];
  }
  else if (lang === 'html') {
    return ['html'];
  }
  return [];
}

// Props come from mdx-ast-to-mdx-hast.js
export const Example = ({
  code,
  lang = '',
  source,
  noLive,
  title = 'Untitled',
  isFullscreen,
  isFullscreenPreview,
  thumbnail = missingThumbnail,
  isBeta,
  id,
  section,
  liveContext,
  children,
}) => {
  if (isFullscreenPreview) {
    isFullscreen = false;
  }
  const supportedLangs = getSupportedLanguages(lang);
  if (supportedLangs === []) {
    noLive = true;
  }
  const editorLang = supportedLangs[0];
  if (!editorLang) {
    // Inline code
    return <code className="ws-code">{code}</code>;
  } else if (noLive) {
    // Code block
    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    return <pre dangerouslySetInnerHTML={{ __html: html }} />;
  }

  // https://reactjs.org/docs/hooks-overview.html#state-hook
  const [editorCode, setEditorCode] = React.useState(code);
  const [darkMode, setDarkMode] = React.useState(false);
  const location = useLocation();

  const scope = {
    ...liveContext,
    // These 2 are in the bundle anyways for the site since we dogfood
    ...reactCoreModule,
    ...reactTableModule,
  };
  const previewId = getExampleId(source, section[0], id, title);
  const className = getExampleClassName(source, section[0], id);

  if (isFullscreenPreview) {
    // Fullscreen page example
    return (
      <LiveProvider
        scope={scope}
        code={editorCode}
        transformCode={code => transformCode(code, editorLang, true)}
      >
        <LivePreview
          id={previewId}
          className={css(
            className,
            'pf-u-h-100'
          )}
        />
      </LiveProvider>
    );
  }

  const codeBoxParams = getParameters(
    lang === 'html'
      ? getStaticParams(title, code)
      : getReactParams(title, editorCode, scope)
  );
  const fullscreenLink = `${location.pathname.replace(/\/$/, '')}${location.pathname.endsWith(source) ? '' : `/${source}`}/${slugger(title)}`;

  return (
    <div className="ws-example">
      <div className="ws-example-header">
        <AutoLinkHeader
          metaText={isBeta && <Badge className="ws-beta-badge pf-u-ml-xs">Beta</Badge>}
          size="h4"
          headingLevel="h3"
          className="ws-example-heading"
        >
          {title}
        </AutoLinkHeader>
        {children}
      </div>
      <LiveProvider
        scope={scope}
        code={editorCode}
        transformCode={code => transformCode(code, editorLang)}
        disabled={isFullscreen}
        theme={{
          plain: isFullscreen ? { pointerEvents: 'auto' } : {},
          styles: []
        }}
      >
        {isFullscreen
          ? <div className="ws-preview">
              <a
                className="ws-preview__thumbnail-link"
                href={fullscreenLink}
                target="_blank"
                aria-label={`Open fullscreen ${title} example`}
              >
                <img src={thumbnail.src} width={thumbnail.width} height={thumbnail.height} />
              </a>
            </div>
          : <LivePreview
              id={previewId}
              className={css(
                className,
                darkMode && 'pf-t-dark pf-m-opaque-200',
                isFullscreen ? 'ws-preview-fullscreen' : 'ws-preview'
              )} />
        }

        <ExampleToolbar
          editor={<LiveEditor className="ws-editor" onChange={setEditorCode} />}
          supportedLangs={supportedLangs}
          onDarkmodeChange={() => setDarkMode(!darkMode)}
          // Dark mode is permanently hidden per patternfly.org design
          hideDarkMode={true}
          isFullscreen={isFullscreen}
          fullscreenLink={fullscreenLink}
          code={editorCode}
          codeBoxParams={codeBoxParams}
          componentName={id}/>
        <LiveError />
      </LiveProvider>
    </div>
  );
}
