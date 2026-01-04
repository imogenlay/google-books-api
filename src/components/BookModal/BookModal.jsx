import { createAuthorText } from "../../functionality/books";
import classes from "./book_modal.module.scss";

export default function BookModal({ book, disableModal }) {
  const backgroundStyle = book.image
    ? {
        backgroundImage: `url(${book.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        transform: "scale(1.25)",
        filter: "blur(10px) brightness(0.6)",
      }
    : {};

  return (
    <section className={classes.book_modal}>
      <div className={classes.background} style={backgroundStyle} />
      <div className={classes.modal_container}>
        {book.image && (
          <div className={classes.book_modal_left}>
            <img src={book.image} />
          </div>
        )}

        <div className={classes.book_modal_right}>
          <h1 className={classes.modal_title}>{book.title}</h1>
          <h2 className={classes.modal_author}>
            {createAuthorText(book, false)}
          </h2>
          {book.description && (
            <>
              <hr />
              <p className={classes.modal_description}>{book.description}</p>
            </>
          )}

          <hr />
          <div className={classes.grid}>
            <b>Language:</b> <p>{book.language}</p>
            <b>Date Published:</b> <p>{book.publishedDate}</p>
            <b>Page Count:</b> <p> {book.pageCount}</p>
            <b>Preview Link:</b> <a href={book.previewLink}>{book.title}</a>
          </div>
        </div>
      </div>
      <button onClick={disableModal} className={classes.back}>
        Back
      </button>
    </section>
  );
}
