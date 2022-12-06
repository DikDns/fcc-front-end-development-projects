export default function ({ editorVal, handleEditorChange }) {
  return (
    <textarea
      className={`w-full sm:w-2/3 h-60 rounded-md border-4 border-sky-400 focus:outline-none focus:ring-4`}
      name="editor"
      id="editor"
      value={editorVal}
      onChange={(e) => handleEditorChange(e)}
    ></textarea>
  );
}
