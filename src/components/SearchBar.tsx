import { useToast } from "@chakra-ui/react";
import { useState } from "react";

interface SearchBarProps {
  onFormSubmit: // FormEventHandler<HTMLFormElement>;
  (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFormSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const toast = useToast();

  const isValidUrl = (searchQuery: string) => {
    const pattern = /^https?:\/\/github\.com\/[\w-]+\/[\w-]+$/;
    return pattern.test(searchQuery);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(
      event.target.value
      // .toLowerCase().trim()
    );
  };

  // : FormEventHandler<HTMLFormElement>
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidUrl(searchQuery)) {
      toast({
        description: "Please enter a valid HTTP address.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });

      return;
    }
    onFormSubmit(searchQuery);
    setSearchQuery("");
  }

  return (
    <>
      <header style={{ width: "100%" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            value={searchQuery}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Enter repo URL"
            name="query"
          />
          <button type="submit">Load issues</button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
