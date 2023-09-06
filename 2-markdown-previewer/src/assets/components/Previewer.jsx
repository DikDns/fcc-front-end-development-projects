export default function ({ className, innerHtml }) {
  return (
    <div
      className={className}
      id="previewer"
      dangerouslySetInnerHTML={{ __html: innerHtml || `` }}
    ></div>
  );
}
