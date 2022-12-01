import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div id={`quote-box`}>
        <div id={`text-wrapper`}>
          <p id={`text`}>
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            facere placeat commodi dolorum!"
          </p>
        </div>
        <div id={`author-wrapper`}>
          <span id={`author`}>- DikDns</span>
        </div>
        <button id={`new-quote`}>New Quote</button>
        <a
          id={`tweet-quote`}
          href={`twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quotes}`}
          target={`_blank`}
        ></a>
      </div>
    </div>
  );
}

export default App;
