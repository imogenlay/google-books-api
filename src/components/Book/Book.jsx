import classes from "./book.module.scss";

export default function Book({ book }) {
  // Generate title string.
  let titleText = book.title;
  const MAX_TITLE_LENGTH = 52;
  if (titleText.length > MAX_TITLE_LENGTH)
    titleText = titleText.substring(0, MAX_TITLE_LENGTH - 3) + "...";

  // Generate author/s string and description.
  const authorText = book.authors.join(", ");
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
