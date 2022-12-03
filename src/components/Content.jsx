import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Text = styled.div`
  font-family: "Alexandria", sans-serif;
`;

export default function ({ loading, error, quote }) {
  return (
    <Text id={`text-wrapper`}>
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
    </Text>
  );
}
