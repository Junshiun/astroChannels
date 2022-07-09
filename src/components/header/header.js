import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import "./header.scss";
export const Header = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(
    params.get("search") === null || params.get("search") === "null"
      ? ""
      : params.get("search")
  );

  const [cancelVisible, setCancelVisible] = useState(false);

  useEffect(() => {
    if (searchInput !== "") setCancelVisible(true);
    else setCancelVisible(false);
  }, [searchInput]);

  const handleSearch = (e) => {
    e.preventDefault();

    let value = e.target.search.value === "" ? null : e.target.search.value;

    navigate("/?search=" + value);
  };

  return (
    <>
      <div className="header">
        <div className="logoWrap" onClick={() => navigate("/")}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logoAstro.png`}
            alt="logo"
          ></img>
        </div>
        <form className="searchWrap" onSubmit={(e) => handleSearch(e)}>
          <div className="inputWrap">
            <input
              id="search"
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search Channel Name, Channel Number"
              value={searchInput}
            ></input>
            {cancelVisible ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSearchInput("");
                }}
                className="cancel"
              >
                <MdCancel></MdCancel>
              </button>
            ) : null}
          </div>
          <button className="iconWrap" type="submit">
            <BiSearch className="icon"></BiSearch>
          </button>
        </form>
      </div>
      <div className="wrapper">{children}</div>
    </>
  );
};
