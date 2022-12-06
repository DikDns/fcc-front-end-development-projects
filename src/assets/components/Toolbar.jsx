export default function ({ className, text, onClick, isExpanded }) {
  return (
    <div className={className}>
      <span>{text}</span>
      <a href="#" onClick={(e) => onClick({ e, text })}>
        <i className={`fa-solid fa-${isExpanded ? `compress` : `expand`}`}></i>
      </a>
    </div>
  );
}
