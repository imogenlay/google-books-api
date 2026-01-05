import { useEffect, useState, useRef } from "react";
import classes from "./app.module.scss";
import BookList from "./components/BookList/BookList";
import Heading from "./components/heading/Heading";
import { FETCH_STATUS, getBooks } from "./services/books";
import BookModal from "./components/BookModal/BookModal";
import PageSelect from "./components/PageSelect/PageSelect";

function App() {
  // Main states for the app.
  const [searchResults, setSearchResults] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.pending);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [currentModal, setCurrentModal] = useState(null);
  const [searchPage, setSearchPage] = useState(0);

  // When changing search keywords, fetch new books from the API.
  useEffect(() => {
    // Reset modal and return to fullscreen search if no search terms are provided.
    setCurrentModal(null);

    if (searchKeywords.length === 0) {
      setFetchStatus(FETCH_STATUS.pending);
      return;
    }

    // Run the getBooks async function to get new data...
    setFetchStatus(FETCH_STATUS.loading);
    getBooks(searchKeywords, searchPage)
      .then((data) => {
        setSearchResults(data);
        setFetchStatus(FETCH_STATUS.fulfilled);
      })
      .catch((error) => {
        setFetchStatus(FETCH_STATUS.failed);
        console.error(error);
      });
  }, [searchKeywords, searchPage]);

  // Callback for handling the search function.
  const handleSearch = (newKeywords) => {
    if (newKeywords.lenth < 2) return;

    setCurrentModal(null);
    setSearchKeywords(newKeywords);
    setSearchPage(0);
  };

  const handleSelectModal = (id) => {
    if (!searchResults || !id) return;

    const newModal = searchResults.find((r) => r.id === id);
    if (newModal) setCurrentModal(newModal);
  };

  const disableModal = () => {
    setCurrentModal(null);
  };

  const goToPage = (newPage) => {
    const newSearchPage = Math.max(0, newPage);
    if (newSearchPage != searchPage) {
      setSearchPage(newSearchPage);
    }
  };

  const displayMain = fetchStatus !== FETCH_STATUS.pending;
  const displayModal =
    fetchStatus === FETCH_STATUS.fulfilled && currentModal !== null;

  return (
    <>
      <Heading
        handleSearch={handleSearch}
        isFullscreen={fetchStatus === FETCH_STATUS.pending}
      />
      {displayMain && (
        <main
          className={`${classes.main} ${
            displayModal ? classes.main_modal : ""
          }`}
        >
          <BookList
            fetchStatus={fetchStatus}
            searchResults={searchResults}
            handleSelectModal={handleSelectModal}
          />
          {fetchStatus !== FETCH_STATUS.failed && (
            <>
              <PageSelect searchPage={searchPage} goToPage={goToPage} />
              {displayModal && (
                <BookModal book={currentModal} disableModal={disableModal} />
              )}
            </>
          )}
        </main>
      )}
    </>
  );
}

export default App;
