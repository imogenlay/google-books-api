import Book from "../Book/Book";
import classes from "./book_list.module.scss";
import { FETCH_STATUS } from "../../functionality/books";

export default function BookList({ fetchStatus, searchResults }) {
  return (
    <>
      {fetchStatus === FETCH_STATUS.loading && <div> {"LOADING atm"} </div>}
      {fetchStatus === FETCH_STATUS.fulfilled && (
        <div className={classes.book_list}>
          {searchResults.map((b) => {
            const { id, ...book } = b;
            return <Book key={b.id} book={book} />;
          })}
        </div>
      )}
      {fetchStatus === FETCH_STATUS.failed && <div> {"error whoopsie"} </div>}
    </>
  );
}
