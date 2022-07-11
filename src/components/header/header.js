import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import "./header.scss";
export const Header = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const initial = params.get("search") ? params.get("search") : "";
    setSearchInput(initial);
  }, [params]);

  const [cancelVisible, setCancelVisible] = useState(false);

  useEffect(() => {
    if (searchInput !== "") setCancelVisible(true);
    else setCancelVisible(false);
  }, [searchInput]);

  useEffect(() => {});

  const handleSearch = (e) => {
    e.preventDefault();

    let value = e.target.search.value;

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
              <div
                onClick={() => {
                  setSearchInput("");
                }}
                className="cancel"
              >
                <MdCancel></MdCancel>
              </div>
            ) : null}
          </div>
          <button className="iconButtonWrap" type="submit">
            <div className="iconWrap">
              <BiSearch className="icon"></BiSearch>
            </div>
          </button>
        </form>
      </div>
      <div className="wrapper">{children}</div>
    </>
  );
};
