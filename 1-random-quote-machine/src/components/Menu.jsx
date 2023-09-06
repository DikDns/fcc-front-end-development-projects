import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  width: 100px;
`;

const Button = styled.button`
  color: #fff;
  width: 100%;
  background-color: rgba(0, 18, 25, 1);
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 8px 0;
  cursor: pointer;

  transition: 250ms all;
  :hover {
    background-color: rgba(0, 18, 25, 0.75);
  }
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
