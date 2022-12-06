export default function ({ className, text, isExpanded }) {
  return (
    <div className={className}>
      <span>{text}</span>
      <i className={`fa-solid fa-${isExpanded ? `compress` : `expand`}`}></i>
    </div>
  );
}
