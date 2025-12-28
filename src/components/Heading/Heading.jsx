import classes from "./heading.module.scss";

export default function Heading() {
  const a = "GOOGLE ";
  const b = "BOOKS";

  return (
    <header className={classes.background}>
      <div className={classes.header_area}>
        <hgroup>
          <h1 className={`${classes.title} ${classes.title_a}`}>{a}</h1>
          <h1 className={`${classes.title} ${classes.title_b}`}>{b}</h1>
        </hgroup>
        <div className={classes.search_group}>
          <input />
          <button>Search Books</button>
        </div>
      </div>
    </header>
  );
}
