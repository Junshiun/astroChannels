import { ChannelState } from "../../context/context";

import {
  SORT_BYNAME_ASCENDING,
  SORT_BYNAME_DESCENDING,
  SORT_BYNUM_ASCENDING,
  SORT_BYNUM_DESCENDING,
} from "../../context/reducer";

import {
  FaSortNumericDownAlt,
  FaSortNumericDown,
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
} from "react-icons/fa";

import { VscArrowSmallRight } from "react-icons/vsc";

import "./sort.scss";

export const Sort = () => {
  const {
    channels: { sortType },
    dispatchChannels,
  } = ChannelState();

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

  return (
    <div className="sortWrap">
      <span>sort </span>
      <button
        onClick={sortByNumAscending}
        className={sortType === SORT_BYNUM_ASCENDING ? "active" : ""}
      >
        1 - 9
      </button>
      <button
        onClick={sortByNumDESCENDING}
        className={sortType === SORT_BYNUM_DESCENDING ? "active" : ""}
      >
        9 - 1
      </button>
      <button
        onClick={sortByNameAscending}
        className={sortType === SORT_BYNAME_ASCENDING ? "active" : ""}
      >
        a - z
      </button>
      <button
        onClick={sortByNameDESCENDING}
        className={sortType === SORT_BYNAME_DESCENDING ? "active" : ""}
      >
        z - a
      </button>
    </div>
  );
};
