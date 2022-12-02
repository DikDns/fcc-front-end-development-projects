import Select from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";

const animatedComponents = makeAnimated();

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  max-width: 200px;
`;

export default function ({
  loading,
  error = null,
  tags,
  selectedTags,
  handleTagsChange,
  handleNewQuote,
}) {
  return (
    <Wrapper id={`menu-wrapper`}>
      <Select
        closeMenuOnSelect={true}
        components={animatedComponents}
        isMulti={false}
        isLoading={loading}
        id={`set-tags`}
        options={tags ? tags : null}
        onChange={handleTagsChange}
        placeholder={`Select tags...`}
        value={selectedTags}
      />
      <button id={`new-quote`} onClick={(e) => handleNewQuote(e)}>
        New Quote
      </button>
    </Wrapper>
  );
}
