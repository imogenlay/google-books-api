import { useRef } from "react";
import classes from "./heading.module.scss";

export default function Heading({ handleSearch }) {
  const searchInputRef = useRef(null);
  const a = "GOOGLE ";
  const b = "BOOKS";

  const onSearch = () => {
    handleSearch(searchInputRef.current.value);
  };

  return (
    <header className={classes.background}>
      <div className={classes.header_area}>
        <hgroup>
          <h1 className={`${classes.title} ${classes.title_a}`}>{a}</h1>
          <h1 className={`${classes.title} ${classes.title_b}`}>{b}</h1>
        </hgroup>
        <div className={classes.search_group}>
          <input ref={searchInputRef} defaultValue="Skulduggery Pleasant" />
          <button onClick={onSearch}>Search</button>
        </div>
      </div>
    </header>
  );
}
