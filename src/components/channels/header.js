import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { ParamsState } from "../../pages/channels";
import "./header.scss";
export const Header = () => {
  const { params, setParams } = ParamsState();

  const [searchInput, setSearchInput] = useState(
    params.get("search") === null || params.get("search") === "null"
      ? ""
      : params.get("search")
  );

  const handleSearch = (e) => {
    e.preventDefault();

    let value = e.target.search.value === "" ? null : e.target.search.value;

    setParams({
      search: value,
    });
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
    </div>
  );
};
