export default function ({ loading, error, quote }) {
  return (
    <div id={`author-wrapper`}>
      <span id={`author`}>
        {`- `}
        {loading ? `loading` : error ? `Not found` : quote ? quote.author : ""}
      </span>
    </div>
  );
}
