import Book from "../Book/Book";
import classes from "./book_list.module.scss";
import { getVolumes } from "./user";
import { useState, useEffect } from "react";

export default function BookList() {
  const [searchResults, setSearchResults] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("PENDING");

  useEffect(() => {
    setFetchStatus("LOADING");
    getVolumes()
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
          {searchResults.map((b) => (
            <Book
              key={b.id}
              title={b.title}
              authors={b.authors}
              description={b.description}
              image={b.image}
            />
          ))}
        </div>
      )}
      {fetchStatus === "FAILED" && <div> {"error whhopsie"} </div>}
    </>
  );
}
