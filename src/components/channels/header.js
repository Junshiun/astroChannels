import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { ChannelState } from "../../context/context";
import {
  RESET,
  SEARCH,
  SORT_BYNAME_ASCENDING,
  SORT_BYNAME_DESCENDING,
  SORT_BYNUM_ASCENDING,
  SORT_BYNUM_DESCENDING,
} from "../../context/reducer";
import { ParamsState } from "../../pages/channels";
import { Filter } from "./filter";
import "./header.scss";
export const Header = () => {
  const {
    channels: { sortType },
    dispatchChannels,
  } = ChannelState();

  const { params, setParams } = ParamsState();

  const [searchInput, setSearchInput] = useState(
    params.get("search") === null || params.get("search") === "null"
      ? ""
      : params.get("search")
  );

  const sortByNumAscending = () => {
    dispatchChannels({ type: SORT_BYNUM_ASCENDING });
  };

  const sortByNumDESCENDING = () => {
    dispatchChannels({ type: SORT_BYNUM_DESCENDING });
  };

  const sortByNameAscending = () => {
    dispatchChannels({ type: SORT_BYNAME_ASCENDING });
  };

  const sortByNameDESCENDING = () => {
    dispatchChannels({ type: SORT_BYNAME_DESCENDING });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let value = e.target.search.value === "" ? null : e.target.search.value;

    setParams({ search: value, categories: params.get("categories") });
  };

  return (
    <div className="header">
      <form className="searchWrap" onSubmit={(e) => handleSearch(e)}>
        <div className="searchContainer">
          <button className="iconWrap" type="submit">
            <BiSearch className="icon"></BiSearch>
          </button>
          <input
            id="search"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search Channel Name, Channel Number"
            value={searchInput}
          ></input>
        </div>
      </form>
      <div className="refineWrap">
        <div className="sortWrap">
          <span>sort: </span>
          <button
            onClick={sortByNumAscending}
            className={sortType === SORT_BYNUM_ASCENDING ? "active" : ""}
          >
            <FaSortNumericDown></FaSortNumericDown>
          </button>
          <button
            onClick={sortByNumDESCENDING}
            className={sortType === SORT_BYNUM_DESCENDING ? "active" : ""}
          >
            <FaSortNumericDownAlt></FaSortNumericDownAlt>
          </button>
          <button
            onClick={sortByNameAscending}
            className={sortType === SORT_BYNAME_ASCENDING ? "active" : ""}
          >
            <FaSortAlphaDown></FaSortAlphaDown>
          </button>
          <button
            onClick={sortByNameDESCENDING}
            className={sortType === SORT_BYNAME_DESCENDING ? "active" : ""}
          >
            <FaSortAlphaDownAlt></FaSortAlphaDownAlt>
          </button>
        </div>
        <Filter></Filter>
      </div>
    </div>
  );
};
