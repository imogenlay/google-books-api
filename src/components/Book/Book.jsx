import classes from "./book.module.scss";

export default function Book({ book }) {
  function createTitleText() {
    const MAX_TITLE_LENGTH = 52;
    if (book.title.length > MAX_TITLE_LENGTH)
      return book.title.substring(0, MAX_TITLE_LENGTH - 3) + "...";

    return book.title;
  }

  function createAuthorText() {
    if (book.authors.length > 0) return book.authors.join(", ");

    return "Unknown Authorship";
  }

  // Generate author/s string and description.
  const titleText = createTitleText();
  const authorText = createAuthorText();
  const descriptionText = book.description || "No description.";

  // Generate image element.
  const hasImage = book.image;

  return (
    <div className={classes.main}>
      <div className={classes.image_area}>
        {hasImage ? <img src={book.image} /> : <p>No image available</p>}
      </div>
      <p className={classes.title}>{titleText}</p>
      <div className={classes.author}>
        <p>{authorText}</p>
        <hr />
      </div>
      <p className={classes.description}>{descriptionText}</p>
    </div>
  );
}
