import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function ({ loading, error, quote }) {
  return (
    <div id={`text-wrapper`}>
      <p id={`text`}>
        <FontAwesomeIcon icon={faQuoteLeft} />
        {loading
          ? `loading`
          : error
          ? error.statusMessage
          : quote
          ? quote.content
          : ``}
      </p>
    </div>
  );
}
