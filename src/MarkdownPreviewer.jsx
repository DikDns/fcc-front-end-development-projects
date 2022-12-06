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
    `# Markdown syntax guide\n\n## Headers\n\n# This is a Heading h1\n## This is a Heading h2 \n###### This is a Heading h6\n\n## Emphasis\n\n*This text will be italic*  \n_This will also be italic_\n\n**This text will be bold**  \n__This will also be bold__\n\n_You **can** combine them_\n\n## Lists\n\n### Unordered\n\n* Item 1\n* Item 2\n\t* Item 2a\n\t* Item 2b\n\n### Ordered\n\n1. Item 1\n1. Item 2\n1. Item 3\n\t1. Item 3a\n\t1. Item 3b\n\n## Images\n\n![This is a alt text.](/image/sample.png "This is a sample image.")\n\n## Links\n\nYou may be using [Markdown Live Preview](https://markdownlivepreview.com/).\n\n## Blockquotes\n\n> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.\n>\n>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.\n\n## Tables\n\n| Left columns  | Right columns |\n| ------------- |:-------------:|\n| left foo      | right foo     |\n| left bar      | right bar     |\n| left baz      | right baz     |\n\n## Blocks of code\n\n\`\`\`\nlet message = 'Hello world';\nalert(message);\n\`\`\`\n\n## Inline code\n\nThis web site is using \`markedjs/marked\`.`
  );
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPreview(() => marked.parse(editorVal));
  }, [editorVal]);

  const handleEditorChange = (e) => {
    e.preventDefault();
    setEditorVal(() => e.target.value);
  };

  return (
    <>
      <Header />

      <div className={`flex flex-col justify-center items-center py-10 px-5`}>
        <Editor editorVal={editorVal} handleEditorChange={handleEditorChange} />
        <Previewer preview={preview} />
      </div>

      <Footer />
    </>
  );
}

export default MarkdownPreviewer;
