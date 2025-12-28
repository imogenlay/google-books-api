import classes from "./book.module.scss";

export default function Book({ title, authors, description, image }) {
  // Generate title string.
  let titleText = title;
  const MAX_TITLE_LENGTH = 60;
  if (title.length > MAX_TITLE_LENGTH)
    titleText = title.substring(0, MAX_TITLE_LENGTH - 3) + "...";

  // Generate author/s string and description.
  const authorText = authors.join(", ");
  const descriptionText = description || "No description.";

  // Generate image element.
  const hasImage = image;

  return (
    <div className={classes.main}>
      <div className={classes.image_area}>
        {hasImage ? <img src={image} /> : <p>No image available</p>}
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
