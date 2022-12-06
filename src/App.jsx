import { useEffect, useState } from "react";
import { marked } from "marked";

function App() {
  const [editorVal, setEditorVal] = useState(
    `# Welcome to my React Markdown Previewer!\n## This is a sub-heading...\n### And here's some other cool stuff:\nHeres some code, \`<div></div>\`, between 2 backticks.\n\`\`\`// this is multi-line code:\nfunction anotherExample(firstLine, lastLine) {\n\tif (firstLine == '\`\`\`' && lastLine == '\`\`\`') {\n\t\treturn multiLineCode;\n\t}\n}\n\`\`\`\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n- And of course there are lists.\n\t- Some are bulleted.\n\t\t- With different indentation levels.\n\t\t\t- That look like this.\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`
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
      <textarea
        className={`w-full sm:w-2/3 h-60 rounded-md border-4 border-sky-400 focus:outline-none focus:ring-4`}
        name="editor"
        id="editor"
        value={editorVal}
        onChange={(e) => handleEditorChange(e)}
      ></textarea>
      <div
        className={`mt-2 p-2 w-full max-h-50 overflow-y-auto rounded-md border-4 border-sky-400`}
        id="previewer"
        dangerouslySetInnerHTML={{ __html: preview || `` }}
      ></div>
    </div>
  );
}

export default App;
