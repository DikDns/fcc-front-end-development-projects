export default function ({ className, value, onChange }) {
  return (
    <textarea
      className={className}
      name="editor"
      id="editor"
      value={value}
      onChange={(e) => onChange(e)}
    ></textarea>
  );
}
