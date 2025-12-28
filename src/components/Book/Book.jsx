import classes from "./book.module.scss";

export default function Book({ title, authors, description, image }) {
  //Each book in the grid should have an image, author, title and description

  const authorText = authors.join(", ");

  return (
    <div className={classes.main}>
      <div className={classes.image_area}>{image && <img src={image} />}</div>
      <p className={classes.title}>{title}</p>
      <div className={classes.author}>
        <p>{authorText}</p>
        <hr />
      </div>
      <p className={classes.description}>{description}</p>
    </div>
  );
}
