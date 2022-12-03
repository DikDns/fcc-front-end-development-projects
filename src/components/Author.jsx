import styled from "styled-components";

const Author = styled.div`
  font-family: "Alexandria", sans-serif;
  transition: 1s all;
`;

export default function ({ loading, error, quote }) {
  return (
    <Author id={`author-wrapper`} style={{ opacity: loading ? 0 : 1 }}>
      <span id={`author`}>
        {`- `}
        {loading ? `loading` : error ? `Not found` : quote ? quote.author : ""}
      </span>
    </Author>
  );
}
