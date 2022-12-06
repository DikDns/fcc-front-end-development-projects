import { useEffect, useState } from "react";
import { marked } from "marked";

import { useLocalStorage } from "./assets/logic/useLocalStorage";

import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import Editor from "./assets/components/Editor";
import Previewer from "./assets/components/Previewer";
import Toolbar from "./assets/components/Toolbar";

function MarkdownPreviewer() {
  const [editorVal, setEditorVal] = useLocalStorage(
    `editorVal`,
    `# Markdown syntax guide\n\n## Headers\n\n# This is a Heading h1\n## This is a Heading h2 \n###### This is a Heading h6\n\n## Emphasis\n\n*This text will be italic*  \n_This will also be italic_\n\n**This text will be bold**  \n__This will also be bold__\n\n_You **can** combine them_\n\n## Lists\n\n### Unordered\n\n* Item 1\n* Item 2\n\t* Item 2a\n\t* Item 2b\n\n### Ordered\n\n1. Item 1\n1. Item 2\n1. Item 3\n\t1. Item 3a\n\t1. Item 3b\n\n## Images\n\n![This is a alt text.](https://source.unsplash.com/1000x600 "This is a sample image.")\n\n## Links\n\nMy previous project: [Random Quote Machine](https://rqm.dikdns.com/).\n\n## Blockquotes\n\n> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.\n>\n>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.\n\n## Tables\n\n| Left columns  | Right columns |\n| ------------- |:-------------:|\n| left foo      | right foo     |\n| left bar      | right bar     |\n| left baz      | right baz     |\n\n## Blocks of code\n\n\`\`\`\nlet message = 'Hello world';\nalert(message);\n\`\`\`\n\n## Inline code\n\nThis web site is using \`markedjs\` and \`tailwindcss\`.`
  );
  const [preview, setPreview] = useState(null);
  const [expandEditor, setExpandEditor] = useState(false);
  const [expandPreviewer, setExpandPreviewer] = useState(false);

  useEffect(() => {
    setPreview(() => marked.parse(editorVal));
  }, [editorVal]);

  const handleEditorChange = (e) => {
    e.preventDefault();
    setEditorVal(() => e.target.value);
  };

  const handleToolbar = ({ e, text }) => {
    e.preventDefault();
    if (text === "Editor") {
      setExpandEditor((state) => !state);
    } else if (text === "Previewer") {
      setExpandPreviewer((state) => !state);
    }
  };

  return (
    <main className={`relative h-screen overflow-hidden`}>
      <Header
        className={`fixed top-0 left-0 z-50 w-full py-1 bg-slate-900 text-white text-center font-sans font-semibold text-lg tracking-wide`}
      />

      <div
        className={`absolute w-full top-[36px] bottom-[36px] h-auto flex flex-row overflow-hidden`}
      >
        <div
          className={`transition-all duration-250 flex flex-col ${
            expandEditor ? `w-full` : expandPreviewer ? `w-0` : `w-8/12`
          }`}
        >
          <Toolbar
            onClick={handleToolbar}
            isExpanded={expandEditor}
            text={`Editor`}
            className={`bg-blue-200 text-blue-900 px-4 py-2 flex justify-between items-center hover:bg-blue-300 active:bg-blue-100 transition-all duration-250`}
          />
          <Editor
            className={`h-full overflow-y-scroll py-2 px-4 font-mono resize-none focus:outline-none ${
              expandEditor ? `bg-slate-50` : `bg-blue-50`
            }`}
            value={editorVal}
            onChange={handleEditorChange}
          />
        </div>
        <div
          className={`transition-all duration-250 flex flex-col ${
            expandPreviewer ? `w-full` : expandEditor ? `w-0` : `w-4/12`
          }`}
        >
          <Toolbar
            onClick={handleToolbar}
            isExpanded={expandPreviewer}
            text={`Previewer`}
            className={`bg-emerald-200 text-emerald-900 px-4 py-2 flex justify-between items-center hover:bg-emerald-300 active:bg-emerald-100 transition-all duration-250`}
          />
          <Previewer
            className={`h-full overflow-y-scroll py-2 px-4 ${
              expandPreviewer ? `bg-slate-50` : `bg-emerald-50`
            }`}
            innerHtml={preview}
          />
        </div>
      </div>

      <Footer
        className={`absolute bottom-0 left-0 z-50 w-full py-1 bg-slate-900 text-white text-center font-sans font-semibold text-lg tracking-wide`}
      />
    </main>
  );
}

export default MarkdownPreviewer;
