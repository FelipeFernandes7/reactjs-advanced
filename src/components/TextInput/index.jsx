import P from "prop-types";
import "./styles.scss";

export function TextInput({ searchValue, handleChange }) {
  return (
    <input
      placeholder="Type your search"
      className="text-input"
      type="search"
      value={searchValue}
      onChange={handleChange}
    />
  );
}

TextInput.propsTypes = {
  searchValue: P.string.isRequired,
  handleChange: P.func.isRequired,
};
