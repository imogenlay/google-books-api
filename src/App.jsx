import { useEffect, useState } from "react";
import classes from "./app.module.scss";
import BookList from "./components/BookList/BookList";
import Heading from "./components/heading/Heading";
import { FETCH_STATUS, getBooks } from "./functionality/books";
import BookModal from "./components/BookModal/BookModal";

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.pending);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    setCurrentModal(null);
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

  const handleSearch = (newKeywords) => {
    if (newKeywords.lenth < 2) return;

    setCurrentModal(null);
    setSearchKeywords(newKeywords);
  };

  const handleSelectModal = (id) => {
    if (!searchResults) return;

    const newModal = searchResults.find((r) => r.id === id);
    if (newModal) {
      setCurrentModal(newModal);
    }
  };

  const disableModal = () => {
    setCurrentModal(null);
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
          {displayModal && (
            <BookModal book={currentModal} disableModal={disableModal} />
          )}
        </main>
      )}
    </>
  );
}

export default App;
