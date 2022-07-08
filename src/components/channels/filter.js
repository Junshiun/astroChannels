import { useEffect, useRef, useState } from "react";
import { ParamsState } from "../../pages/channels";
import { FaFilter } from "react-icons/fa";
import "./filter.scss";

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

const RESOLUTION = ["HD"];

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

  const { params, setParams } = ParamsState();

  const [showFilter, setShowFilter] = useState(false);
  const [filterReset, setFilterReset] = useState(0);

  const filterRef = useRef(null);
  useEffect(() => {
    setCheckedFilter({
      [FILTER_GROUPS[0].name]: (params.get(FILTER_GROUPS[0].name) || "").split(
        ","
      ),
      [FILTER_GROUPS[1].name]: (params.get(FILTER_GROUPS[1].name) || "").split(
        ","
      ),
      [FILTER_GROUPS[2].name]: (params.get(FILTER_GROUPS[2].name) || "").split(
        ","
      ),
    });
  }, [params]);

  const clickListener = (e) => {
    console.log(filterRef.current.contains(e.target));
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
    let array = checkedFilter;

    if (checked) {
      array[group].push(value);
      setCheckedFilter(array);
    } else {
      const exist = array[group].indexOf(value);
      if (exist > -1) {
        array[group].splice(exist, 1);
        setCheckedFilter(array);
      }
    }
  };

  const applyFilter = (reset) => {
    if (reset) {
      setFilterReset(true);
      setCheckedFilter({
        [FILTER_GROUPS[0].name]: [],
        [FILTER_GROUPS[1].name]: [],
        [FILTER_GROUPS[2].name]: [],
      });
      setParams({
        search: params.get("search"),
      });
    } else {
      setParams({
        search: params.get("search"),
        [FILTER_GROUPS[0].name]: checkedFilter[FILTER_GROUPS[0].name].join(","),
        [FILTER_GROUPS[1].name]: checkedFilter[FILTER_GROUPS[1].name].join(","),
        [FILTER_GROUPS[2].name]: checkedFilter[FILTER_GROUPS[2].name].join(","),
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
          className="filterClickable"
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
                        initialSelected={checkedFilter[group.name]}
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
        </div>
      </div>
      {showFilter ? <div className="blackScreen"></div> : null}
    </>
  );
};

const CheckBox = ({ value, group, handleCheckBox, initialSelected, reset }) => {
  const [selected, setSelected] = useState(initialSelected);

  useEffect(() => {
    if (!initialSelected) setSelected(false);
    else setSelected(initialSelected.includes(value));
  }, [initialSelected]);

  useEffect(() => {
    if (reset) setSelected(false);
  }, [reset]);

  return (
    <div className="checkboxWrap">
      <div
        onClick={() => {
          const checked = selected;
          setSelected(!selected);
          handleCheckBox(!checked, value, group);
        }}
        className={"checkBox " + (selected ? "active" : "")}
      >
        {value}
      </div>
    </div>
  );
};
