import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function ({
  loading,
  error = null,
  tags,
  selectedTags,
  handleTagsChange,
  handleNewQuote,
}) {
  return (
    <div id={`menu-wrapper`}>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti={true}
        isLoading={loading}
        isDisabled={error ? true : false}
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
  );
}
