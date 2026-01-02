import { useRef } from "react";
import classes from "./heading.module.scss";

export default function Heading({ handleSearch, isFullscreen }) {
  const searchInputRef = useRef(null);
  const a = "GOOGLE ";
  const b = "BOOKS";

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchInputRef.current.value);
  };

  const fullScreenClass = " " + (isFullscreen ? classes.fullscreen : "");
  const headerClassName = classes.background + fullScreenClass;
  const titleClassName = classes.title + fullScreenClass;

  return (
    <header className={headerClassName}>
      <div className={classes.header_area}>
        <hgroup>
          <h1 className={`${titleClassName} ${classes.title_a}`}>{a}</h1>
          <h1 className={`${titleClassName} ${classes.title_b}`}>{b}</h1>
        </hgroup>
        <form className={classes.search_group} onSubmit={handleSubmit}>
          <input ref={searchInputRef} />
          <button className={fullScreenClass}>Search</button>
        </form>
      </div>
    </header>
  );
}
