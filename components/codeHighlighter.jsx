import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark, a11yLight  } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FaRegMoon } from 'react-icons/fa'
import { MdContentCopy, MdContentPaste } from 'react-icons/md'
import { BsSun } from 'react-icons/bs'
import CopyToClipboard from "react-copy-to-clipboard";

export default function codeHighlighter({
  node,
  inline,
  className,
  children,
  ...props
}) {
  const match = /language-(\w+)/.exec(className || "");
  const [isCopied, setIsCopied] = useState(false)
  const [isDark, setIsDark] = useState(true)
  console.log(a11yLight);
  const setCopied = () => {
    setIsCopied(true)
    setTimeout(() => { setIsCopied(false) }, 2000);
  }
  return !inline && match ? (
    <div className={`${isDark ? "bg-[#2b2b2b]" : "bg-[#f5f2f0] "} rounded-xl`}>
      <div className="flex justify-between px-4 pt-4">
        <p className="text-xs text-[#169FFF]/70 uppercase font-semibold">{match[1]}</p>
        <div className="space-x-4">
          <button onClick={() => setIsDark(!isDark)}>
            {isDark ? <FaRegMoon className="text-[#169FFF]/70" /> : <BsSun className="text-[#169FFF]/70" />}
          </button>
          <CopyToClipboard text={children}>
            <button onClick={() => setCopied(!isCopied)}>
              {isCopied
                ? <span title="Copied!"><MdContentPaste className="text-[#169FFF]/70" /></span>
                : <span title="Copy to Clipboard"><MdContentCopy className="text-[#169FFF]/70" /></span>
              }
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <SyntaxHighlighter
        {...props}
        className='md:text-base text-xs'
        children={String(children).replace(/\n$/, "")}
        style={isDark ? a11yDark : a11yLight}
        language={match[1]}
        PreTag="div"
      />
    </div>
  ) : (
    <code {...props} className={className}>
      {children}
    </code>
  );
}
