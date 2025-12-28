import Book from "../Book/Book";
import classes from "./book_list.module.scss";
import { getBooks } from "./bookList";
import { useState, useEffect } from "react";

export default function BookList() {
  const [searchResults, setSearchResults] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("PENDING");

  useEffect(() => {
    setFetchStatus("LOADING");
    getBooks()
      .then((data) => {
        setSearchResults(data);
        setFetchStatus("FULFILLED");
      })
      .catch((error) => {
        console.error(error);
        setFetchStatus("FAILED");
      });
  }, []);

  return (
    <>
      {fetchStatus === "LOADING" && <div> {"LOADING atm"} </div>}
      {fetchStatus === "FULFILLED" && (
        <div className={classes.book_list}>
          {searchResults.map((b) => {
            const { id, ...book } = b;
            return <Book key={b.id} book={book} />;
          })}
        </div>
      )}
      {fetchStatus === "FAILED" && <div> {"error whoopsie"} </div>}
    </>
  );
}
