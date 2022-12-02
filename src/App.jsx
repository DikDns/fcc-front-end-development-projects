import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.31);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  padding: 16px;
  width: 75vw;
  min-height: 40vh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 500px) {
    width: 95vw;
  }
`;

import Container from "./components/Container";

import Author from "./components/Author";
import Content from "./components/Content";
import Menu from "./components/Menu";
import Share from "./components/Share";
import Tags from "./components/Tags";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState(null);
  const [generateQuote, setGenerateQuote] = useState(false);

  useEffect(() => {
    setLoading(() => true);

    const url = `https://api.quotable.io/random`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json.statusCode === 404) {
          setQuote(() => null);
          setError(() => json);
        } else {
          setError(() => null);
          setQuote(() => json);
        }
        setLoading(() => false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [generateQuote]);

  const handleNewQuote = (e) => {
    e.preventDefault();
    setGenerateQuote((state) => !state);
  };

  return (
    <div className="App">
      <Wrapper id={`quote-box`}>
        <div>
          <Container row justify={`space-between`} mb={`16px`}>
            <Content loading={loading} error={error} quote={quote} />
          </Container>

          <Container row justify={`space-between`}>
            <Tags loading={loading} error={error} quote={quote} />
            <Author loading={loading} error={error} quote={quote} />
          </Container>
        </div>

        <Container row justify={`space-between`}>
          <Share loading={loading} error={error} quote={quote} />
          <Menu loading={loading} handleNewQuote={handleNewQuote} />
        </Container>
      </Wrapper>
    </div>
  );
}

export default App;
