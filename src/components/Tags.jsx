import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TagsWrapper = styled.div`
  font-family: "Alexandria", sans-serif;
`;

export default function ({ loading, error, quote }) {
  return (
    <TagsWrapper>
      <ul id={`tags`}>
        {loading
          ? `loading`
          : error
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
    </TagsWrapper>
  );
}
