import { useEffect, useState } from "react";
import { marked } from "marked";

import { useLocalStorage } from "./assets/logic/useLocalStorage";

import Editor from "./assets/components/Editor";
import Previewer from "./assets/components/Previewer";

function MarkdownPreviewer() {
  const [editorVal, setEditorVal] = useLocalStorage(
    `editorVal`,
    `# Welcome to my React Markdown Previewer!\n## This is a sub-heading...\n### And here's some other cool stuff:\nHeres some code, \`<div></div>\`, between 2 backticks.\n\`\`\`\n// this is multi-line code:\nfunction anotherExample(firstLine, lastLine) {\n\tif (firstLine == '\`\`\`' && lastLine == '\`\`\`') {\n\t\treturn multiLineCode;\n\t}\n}\n\`\`\`\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n- And of course there are lists.\n\t- Some are bulleted.\n\t\t- With different indentation levels.\n\t\t\t- That look like this.\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`
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
    <div className={`flex flex-col justify-center items-center py-10 px-5`}>
      <Editor editorVal={editorVal} handleEditorChange={handleEditorChange} />
      <Previewer preview={preview} />
    </div>
  );
}

export default MarkdownPreviewer;
