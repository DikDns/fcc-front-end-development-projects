export default function ({ preview }) {
  return (
    <div
      className={`mt-2 p-2 w-full max-h-50 overflow-y-auto rounded-md border-4 border-sky-400`}
      id="previewer"
      dangerouslySetInnerHTML={{ __html: preview || `` }}
    ></div>
  );
}
