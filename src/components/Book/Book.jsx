import { createAuthorText } from "../../functionality/books";
import classes from "./book.module.scss";

export default function Book({ book, isLoading, handleSelectModal }) {
  function createTitleText() {
    if (isLoading) return "...";

    const MAX_TITLE_LENGTH = 52;
    if (book.title.length > MAX_TITLE_LENGTH)
      return book.title.substring(0, MAX_TITLE_LENGTH - 3) + "...";

    return book.title;
  }

  function createDescriptionText() {
    if (isLoading) return "";

    return book.description || "No description.";
  }

  function imageReplacementText() {
    if (isLoading) return "Loading";

    return "No image available";
  }

  return (
    <div
      className={`${classes.main} ${isLoading ? classes.fake : ""}`}
      onClick={handleSelectModal}
    >
      <div className={`${classes.image_area} ${isLoading ? classes.fake : ""}`}>
        {book?.image ? (
          <img src={book.image} />
        ) : (
          <p>{imageReplacementText()}</p>
        )}
      </div>
      <p className={classes.title}>{createTitleText()}</p>
      <div className={classes.author}>
        <p>{createAuthorText(book, isLoading)}</p>
        <hr />
      </div>
      <p className={classes.description}>{createDescriptionText()}</p>
    </div>
  );
}
