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
          <p>{book.title}</p>
          <p>{createAuthorText(book, false)}</p>
        </div>
        <button onClick={disableModal}>Back</button>
      </div>
    </section>
  );
}
