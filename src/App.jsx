import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quote, setQuote] = useState(null);
  const [generateQuote, setGenerateQuote] = useState(false);
  const [tags, setTags] = useState({ value: "", label: "" });
  const [selectedTags, setSelectedTags] = useState(null);

  useEffect(() => {
    setLoading(() => true);

    let currentTags = ``;
    if (selectedTags && selectedTags.length >= 0) {
      currentTags = selectedTags.map((tag) => tag.value).join(`,`);
    }

    const url = `https://api.quotable.io/random?tags=${currentTags}`;

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

  useEffect(() => {
    fetch(`https://api.quotable.io/tags`)
      .then((res) => res.json())
      .then((json) => {
        setTags(json.map((tag) => ({ value: tag.slug, label: tag.name })));
      });
  }, []);

  const handleTagsChange = (selectedTags) => {
    console.log(selectedTags);
    setSelectedTags(() => selectedTags);
  };

  const handleNewQuote = (e) => {
    e.preventDefault();
    setGenerateQuote((state) => !state);
  };

  return (
    <div className="App">
      <div id={`quote-box`}>
        <div id={`text-wrapper`}>
          <p id={`text`}>
            {loading
              ? `loading`
              : error
              ? error.statusMessage
              : quote
              ? quote.content
              : ``}
          </p>
        </div>
        <div id={`tags-wrapper`}>
          <ul id={`tags`}>
            {loading
              ? `loading`
              : error
              ? `Not found`
              : quote
              ? quote.tags.map((tag, i) => <li key={i}>{tag}</li>)
              : ""}
          </ul>
        </div>
        <div id={`author-wrapper`}>
          <span id={`author`}>
            {`- `}
            {loading
              ? `loading`
              : error
              ? `Not found`
              : quote
              ? quote.author
              : ""}
          </span>
        </div>
        <div id={`menu-wrapper`}>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti={true}
            id={`set-tags`}
            options={tags ? tags : null}
            onChange={handleTagsChange}
            placeholder={`Select tags...`}
            value={selectedTags}
          />
          <button id={`new-quote`} onClick={(e) => handleNewQuote(e)}>
            New Quote
          </button>
        </div>
        <div id={`share-wrapper`}>
          {loading ? (
            `loading`
          ) : quote ? (
            <a
              id={`tweet-quote`}
              href={`https://twitter.com/intent/tweet?hashtags=quotes,${quote.tags
                .map((tag) => tag)
                .join(`,`)}&related=freecodecamp&text="${quote.content}" -${
                quote.author
              }`}
              target={`_blank`}
            >
              Tweet
            </a>
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
