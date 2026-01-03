import { createAuthorText } from "../../functionality/books";
import classes from "./book_modal.module.scss";

export default function BookModal({ book, disableModal }) {
  return (
    <section className={classes.book_modal}>
      <div className={classes.modal_container}>
        {book?.image && (
          <div className={classes.book_modal_left}>
            <img src={book.image} />
          </div>
        )}

        <div className={classes.book_modal_right}>
          <h1>{book.title}</h1>
          <h2>{createAuthorText(book, false)}</h2>
          <hr />
          <p>{book.description}</p>
          <hr />
          <p>Language: {book.language}</p>
          <p>Date Published: {book.publishedDate}</p>
          <p>Page Count: {book.pageCount}</p>
          <a href={book.previewLink}>Preview Link </a>
          <hr />
          <button onClick={disableModal}>Exit</button>
        </div>
      </div>
    </section>
  );
}
