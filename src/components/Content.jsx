import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Text = styled.div`
  font-family: "Alexandria", sans-serif;

  transition: 1s all;
`;

export default function ({ loading, error, quote, opacity }) {
  return (
    <Text id={`text-wrapper`} style={{ opacity: loading ? 0 : 1 }}>
      <p id={`text`}>
        {error ? (
          error.statusMessage
        ) : quote ? (
          <>
            <FontAwesomeIcon icon={faQuoteLeft} /> {quote.content}
          </>
        ) : (
          ``
        )}
      </p>
    </Text>
  );
}
