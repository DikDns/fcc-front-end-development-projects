export default function ({ loading, error, quote }) {
  return (
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
  );
}
