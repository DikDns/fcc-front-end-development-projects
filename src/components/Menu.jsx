import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 200px;
`;

const Button = styled.button`
  width: 100%;
`;

export default function ({ loading, handleNewQuote }) {
  return (
    <Wrapper id={`menu-wrapper`}>
      <Button
        id={`new-quote`}
        onClick={(e) => handleNewQuote(e)}
        disabled={loading ? true : false}
      >
        New Quote
      </Button>
    </Wrapper>
  );
}
