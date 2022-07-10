import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

const CATEGORIES = [
  "Variety Entertainment",
  "Special Interest",
  "Movies",
  "Music",
  "Kids",
  "News",
  "Learning",
  "Lifestyle",
  "Sports",
  "Radio",
];

const LANGUAGE = [
  "International",
  "Malay",
  "Multiple Language",
  "Indian",
  "Chinese",
  "Korean & Japanese",
];

const RESOLUTION = ["HD", "non-HD"];

export const FILTER_GROUPS = [
  { name: "categories", value: CATEGORIES },
  { name: "languages", value: LANGUAGE },
  { name: "resolution", value: RESOLUTION },
];

export const Filter = () => {
  const [checkedFilter, setCheckedFilter] = useState({
    [FILTER_GROUPS[0].name]: [],
    [FILTER_GROUPS[1].name]: [],
    [FILTER_GROUPS[2].name]: [],
  });

  const [params, setParams] = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);
  const [filterReset, setFilterReset] = useState(0);
  const [appliedFilter, setAppliedFilter] = useState(false);

  const filterRef = useRef(null);
  useEffect(() => {
    const categoriesParams = params.get(FILTER_GROUPS[0].name);
    const languagesParams = params.get(FILTER_GROUPS[1].name);
    const resolutionParams = params.get(FILTER_GROUPS[2].name);

    setCheckedFilter({
      [FILTER_GROUPS[0].name]: categoriesParams
        ? categoriesParams.split(",")
        : [],
      [FILTER_GROUPS[1].name]: languagesParams
        ? languagesParams.split(",")
        : [],
      [FILTER_GROUPS[2].name]: resolutionParams
        ? resolutionParams.split(",")
        : [],
    });

    setAppliedFilter(
      !(!categoriesParams && !languagesParams && !resolutionParams)
    );
  }, [params]);

  const clickListener = (e) => {
    if (!filterRef.current.contains(e.target) && showFilter) {
      setShowFilter(false);
    }
  };
  useEffect(() => {
    if (showFilter) {
      window.addEventListener("click", clickListener);

      return () => {
        window.removeEventListener("click", clickListener);
      };
    }
  }, [showFilter]);

  const handleCheckBox = (checked, value, group) => {
    let set = checked ? [] : [value];

    setCheckedFilter({ ...checkedFilter, [group]: set });
  };

  const applyFilter = (reset) => {
    const searchParams = params.get("search");

    if (reset) {
      setFilterReset(true);
      setCheckedFilter({
        [FILTER_GROUPS[0].name]: [],
        [FILTER_GROUPS[1].name]: [],
        [FILTER_GROUPS[2].name]: [],
      });
      setParams({
        search: searchParams ? searchParams : "",
      });
    } else {
      setParams({
        search: searchParams ? searchParams : "",
        [FILTER_GROUPS[0].name]: checkedFilter[FILTER_GROUPS[0].name],
        [FILTER_GROUPS[1].name]: checkedFilter[FILTER_GROUPS[1].name],
        [FILTER_GROUPS[2].name]: checkedFilter[FILTER_GROUPS[2].name],
      });
    }
  };

  return (
    <>
      <div className="filterWrap" ref={filterRef}>
        <div
          onClick={() => {
            setShowFilter(true);
            setFilterReset(false);
          }}
          className={"filterClickable " + (appliedFilter ? "applied" : "")}
        >
          <FaFilter className="icon"></FaFilter>
          <span>filter </span>
        </div>
        <div
          className={
            "filterGroupWrap " + (showFilter ? "showFilter" : "hideFilter")
          }
        >
          {FILTER_GROUPS.map((group, index) => {
            return (
              <div key={"group-" + group.name} className="filterGroup">
                <span className="filterTitle">{group.name}</span>
                <div className="filterGroupContent">
                  {group.value.map((value, i) => {
                    return (
                      <CheckBox
                        key={"value-" + value + i}
                        value={value}
                        handleCheckBox={handleCheckBox}
                        group={group.name}
                        reset={filterReset}
                        checked={checkedFilter}
                      ></CheckBox>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="buttonsWrap">
            <button
              className="apply"
              onClick={() => {
                applyFilter(0);
                setShowFilter(false);
              }}
            >
              Apply
            </button>
            <button
              onClick={() => {
                applyFilter(1);
                setShowFilter(false);
              }}
              className="reset"
            >
              Reset
            </button>
          </div>
          <button className="closeFilter" onClick={() => setShowFilter(false)}>
            <MdCancel></MdCancel>
          </button>
        </div>
      </div>
      {showFilter ? <div className="blackScreen"></div> : null}
    </>
  );
};

const CheckBox = ({ value, group, handleCheckBox, checked, reset }) => {
  const [selected, setSelected] = useState(checked);

  useEffect(() => {
    if (!checked) setSelected(false);
    else setSelected(checked[group].includes(value));
  }, [checked]);

  useEffect(() => {
    if (reset) setSelected(false);
  }, [reset]);

  return (
    <div className="checkboxWrap">
      <div
        onClick={() => {
          const checked = selected;
          setSelected(!selected);
          handleCheckBox(checked, value, group);
        }}
        className={"checkBox " + (selected ? "active" : "")}
      >
        {value}
      </div>
    </div>
  );
};
