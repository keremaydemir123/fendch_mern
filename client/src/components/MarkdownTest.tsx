/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unstable-nested-components */
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import React from 'react';

function MarkdownTest({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={dracula as any}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
}

export default MarkdownTest;
