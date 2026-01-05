import classes from "./page_select.module.scss";

export default function PageSelect({ searchPage, goToPage }) {
  const useableClass = searchPage <= 0 ? classes.disabled : "";

  return (
    <div className={classes.page_select}>
      <button className={useableClass} onClick={() => goToPage(0)}>
        First
      </button>

      <button className={useableClass} onClick={() => goToPage(searchPage - 1)}>
        Prev
      </button>

      <button className={classes.disabled}> {searchPage}</button>
      <button onClick={() => goToPage(searchPage + 1)}>Next</button>
    </div>
  );
}
