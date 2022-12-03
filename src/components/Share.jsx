import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

export default function ({ loading, error = null, quote }) {
  return (
    <div id={`share-wrapper`}>
      {error ? (
        <a id={`tweet-quote`} href={`https://twitter.com/`} target={`_blank`}>
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
      ) : quote ? (
        <a
          id={`tweet-quote`}
          href={`https://twitter.com/intent/tweet?hashtags=quotes,${quote.tags
            .map((tag) => tag)
            .join(`,`)
            .split("-")
            .join("")}&related=freecodecamp&text="${quote.content}" - ${
            quote.author
          }`}
          target={`_blank`}
        >
          <FontAwesomeIcon icon={faTwitterSquare} />
        </a>
      ) : (
        ``
      )}
    </div>
  );
}
