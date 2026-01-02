import { useEffect, useState } from "react";
import "./App.scss";
import BookList from "./components/BookList/BookList";
import Heading from "./components/heading/Heading";
import { FETCH_STATUS, getBooks } from "./functionality/books";

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.pending);
  const [searchKeywords, setSearchKeywords] = useState("");

  const handleSearch = (newKeywords) => {
    if (newKeywords.lenth < 2) return;

    setSearchKeywords(newKeywords);
    console.log(newKeywords);
  };

  useEffect(() => {
    if (searchKeywords.length === 0) {
      setFetchStatus(FETCH_STATUS.pending);
      return;
    }

    setFetchStatus(FETCH_STATUS.loading);
    getBooks(searchKeywords)
      .then((data) => {
        setSearchResults(data);
        setFetchStatus(FETCH_STATUS.fulfilled);
      })
      .catch((error) => {
        console.error(error);
        setFetchStatus(FETCH_STATUS.failed);
      });
  }, [searchKeywords]);

  return (
    <>
      <Heading
        handleSearch={handleSearch}
        isFullscreen={fetchStatus === FETCH_STATUS.pending}
      />
      {fetchStatus !== FETCH_STATUS.pending && (
        <BookList fetchStatus={fetchStatus} searchResults={searchResults} />
      )}
    </>
  );
}

export default App;
