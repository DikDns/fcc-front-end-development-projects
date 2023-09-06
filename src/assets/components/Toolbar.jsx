import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faCompress } from "@fortawesome/free-solid-svg-icons";

export default function ({ className, text, onClick, isExpanded }) {
  return (
    <div className={className}>
      <span>{text}</span>
      <a href="#" onClick={(e) => onClick({ e, text })}>
        {/* {console.log(isExpanded)} */}
        {isExpanded ? (
          <FontAwesomeIcon icon={faCompress} />
        ) : (
          <FontAwesomeIcon icon={faExpand} />
        )}
      </a>
    </div>
  );
}
