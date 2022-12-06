export default function ({ text, isExpanded }) {
  return (
    <div>
      <span>{text}</span>
      <i className={`fa-solid fa-${isExpanded ? `compress` : `expand`}`}></i>
    </div>
  );
}
