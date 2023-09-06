import { useEffect, useState } from "react";
import styled from "styled-components";

import Container from "./components/Container";

import Author from "./components/Author";
import Content from "./components/Content";
import Menu from "./components/Menu";
import Share from "./components/Share";
import Tags from "./components/Tags";

import Glass from "./components/Glass";

const Background = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;
// ? TO DO: DARK LIGHT THEME
const Wrapper = styled.div`
  position: relative;

  z-index: 9999;

  ${({ glass }) =>
    !glass
      ? ``
      : `background: rgba(255, 255, 255, 0.31);
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);`}

  width: 500px;
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "40vh")};

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 800px) {
    width: 75vw;
  }

  @media (max-width: 500px) {
    width: 95vw;
  }

  padding: ${({ py }) => (py ? py : `0`)} ${({ px }) => (px ? px : `0`)};
  padding-top: ${({ pt }) => (pt ? pt : `0`)};
  padding-right: ${({ pe }) => (pe ? pe : `0`)};
  padding-bottom: ${({ pb }) => (pb ? pb : `0`)};
  padding-left: ${({ ps }) => (ps ? ps : `0`)};

  margin: ${({ my }) => (my ? my : `0`)} ${({ mx }) => (mx ? mx : `0`)};
  margin-top: ${({ mt }) => (mt ? mt : `0`)};
  margin-right: ${({ me }) => (me ? me : `0`)};
  margin-bottom: ${({ mb }) => (mb ? mb : `0`)};
  margin-left: ${({ ms }) => (ms ? ms : `0`)};
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState(null);
  const [generateQuote, setGenerateQuote] = useState(false);

  const [colors, setColors] = useState([
    "#FF2130",
    "#FF621A",
    "#FFEB1F",
    "#4AFD1B",
    "#1EF0FF",
    "#C13CFF",
    "#F52891",
  ]);
  const glassesCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setLoading(() => true);
    const colorI = Math.floor(Math.random() * colors.length);
    document.body.style.backgroundColor = colors[colorI];

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

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [generateQuote]);

  const handleNewQuote = (e) => {
    e.preventDefault();
    setGenerateQuote((state) => !state);
  };

  return (
    <div className="App">
      <Wrapper
        id={`quote-box`}
        glass={true}
        pe={`16px`}
        ps={`16px`}
        pt={`16px`}
        pb={`8px`}
      >
        <div>
          <Container row justify={`center`} mb={`16px`}>
            <Content loading={loading} error={error} quote={quote} />
          </Container>

          <Container row justify={`space-between`}>
            <Tags loading={loading} error={error} quote={quote} />
            <Author loading={loading} error={error} quote={quote} />
          </Container>
        </div>

        <Container row justify={`space-between`} mt={`16px`}>
          <Share loading={loading} error={error} quote={quote} />
          <Menu loading={loading} handleNewQuote={handleNewQuote} />
        </Container>
      </Wrapper>

      <Wrapper
        id={`footer-box`}
        minHeight={`25px`}
        pe={`8px`}
        ps={`8px`}
        pt={`8px`}
        pb={`8px`}
        mt={`8px`}
        style={{ textAlign: `center` }}
      >
        <Container row justify={`center`}>
          {/* ? TO DO: DARK LIGHT THEME */}
          {/* <button>Switch Theme</button> */}
          <p>
            Made by{" "}
            <a target={`_blank`} href="https://dikdns.com">
              DikDns
            </a>
            .
          </p>
        </Container>
      </Wrapper>

      {/* DECORATION GLASS */}
      <Background>
        {glassesCount.map((count) => {
          const opacity = Math.floor(Math.random() * 9) / 10;
          const width = Math.floor(Math.random() * 300);
          const height = Math.floor(Math.random() * 300);
          const top = Math.floor(Math.random() * 90);
          const left = Math.floor(Math.random() * 90);
          const rotate = Math.floor(Math.random() * 100) / 100;
          return (
            <Glass
              key={count}
              opacity={opacity}
              width={`${width}px`}
              height={`${height}px`}
              top={`${top}%`}
              left={`${left}%`}
              rotate={rotate}
            />
          );
        })}
      </Background>
    </div>
  );
}

export default App;
