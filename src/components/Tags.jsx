import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Tags = styled.div`
  font-family: "Alexandria", sans-serif;
  font-style: italic;
  transition: 1s all;
`;

export default function ({ loading, error, quote }) {
  return (
    <Tags id={`tags-wrapper`} style={{ opacity: loading ? 0 : 1 }}>
      <ul id={`tags`}>
        {error
          ? `Not found`
          : quote
          ? quote.tags.map((tag, i) => (
              <li key={i}>
                <FontAwesomeIcon icon={faHashtag} />
                {tag}
              </li>
            ))
          : ""}
      </ul>
    </Tags>
  );
}
