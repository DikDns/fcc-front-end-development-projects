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
        <div id={`tags-wrapper`}>
          <ul id={`tags`}>
            <li>sports</li>
            <li>tech</li>
          </ul>
        </div>
        <div id={`author-wrapper`}>
          <span id={`author`}>- DikDns</span>
        </div>
        <div id={`menu-wrapper`}>
          <button id={`tags`}>New Quote</button>
          <button id={`new-quote`}>New Quote</button>
        </div>
        <div id={`share-wrapper`}>
          <a
            id={`tweet-quote`}
            href={`twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quotes}`}
            target={`_blank`}
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
