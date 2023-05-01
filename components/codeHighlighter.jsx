import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function codeHighlighter({
  node,
  inline,
  className,
  children,
  ...props
}) {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      children={String(children).replace(/\n$/, "")}
      style={a11yDark}
      language={match[1]}
      PreTag="div"
    />
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  );
}
