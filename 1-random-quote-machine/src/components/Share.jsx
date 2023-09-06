import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Tweet = styled.a`
  color: rgba(0, 18, 25, 1);
  font-size: 1.75em;

  transition: 250ms all;

  :hover {
    color: rgba(0, 18, 25, 0.75);
  }
`;

export default function ({ loading, error = null, quote }) {
  return (
    <div id={`share-wrapper`}>
      {error ? (
        <Tweet
          id={`tweet-quote`}
          href={`https://twitter.com/`}
          target={`_blank`}
        >
          <FontAwesomeIcon icon={faTwitterSquare} />
        </Tweet>
      ) : quote ? (
        <Tweet
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
        </Tweet>
      ) : (
        ``
      )}
    </div>
  );
}
