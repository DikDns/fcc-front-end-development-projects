export default function ({ loading, error, quote }) {
  return (
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
  );
}
