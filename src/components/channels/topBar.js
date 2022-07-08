import { Filter } from "./filter";
import { OnlyFavourites } from "./onlyFavourites";
import { Sort } from "./sort";
import "./topBar.scss";

export const TopBar = () => {
  return (
    <div className="topBarWrap">
      <div className="upper">
        <Sort></Sort>
        <Filter></Filter>
      </div>
      <div className="lower">
        <OnlyFavourites></OnlyFavourites>
      </div>
    </div>
  );
};
