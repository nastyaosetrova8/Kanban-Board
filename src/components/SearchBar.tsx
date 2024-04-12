import { FormEventHandler, useState } from "react";

interface SearchBarProps {
  onFormSubmit: FormEventHandler<HTMLFormElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFormSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(
      event.target.value
      // .toLowerCase().trim()
    );
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // if (searchQuery.trim() === "") {
    //   return;
    // }
    onFormSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            Load
            {/* <AiOutlineSearch size={24} /> */}
            {/* <SearchFormBtnlabel>Search</SearchFormBtnlabel> */}
          </button>
          <input
            value={searchQuery}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Enter repo URL"
            name="query"
            style={{ width: "400px" }}
          />
        </form>
      </header>
    </>
  );
};

export default SearchBar;
