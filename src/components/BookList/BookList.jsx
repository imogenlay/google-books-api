import Book from "../Book/Book";
import classes from "./book_list.module.scss";
import { FETCH_STATUS } from "../../functionality/books";

export default function BookList({ fetchStatus, searchResults }) {
  if (fetchStatus === FETCH_STATUS.failed) return <div> error whoopsie </div>;

  let currentClassName = classes.book_list;
  if (fetchStatus === FETCH_STATUS.loading)
    currentClassName = currentClassName + " " + classes.loading;

  return (
    <div className={currentClassName}>
      {fetchStatus === FETCH_STATUS.loading && (
        <>
          <Book key="loading_book_0" isLoading={true} />
          <Book key="loading_book_1" isLoading={true} />
          <Book key="loading_book_2" isLoading={true} />
          <Book key="loading_book_3" isLoading={true} />
          <Book key="loading_book_4" isLoading={true} />
          <Book key="loading_book_5" isLoading={true} />
        </>
      )}
      {fetchStatus === FETCH_STATUS.fulfilled &&
        searchResults.map((b) => {
          const { id, ...book } = b;
          return <Book key={b.id} book={book} isLoading={false} />;
        })}
    </div>
  );
}
