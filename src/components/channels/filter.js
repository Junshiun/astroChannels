import { useState } from "react";
import { ChannelState } from "../../context/context";
import { FILTER, SEARCH_FILTER } from "../../context/reducer";
import { ParamsState } from "../../pages/channels";
import { GrRadialSelected } from "react-icons/gr";
import { AiFillCheckCircle } from "react-icons/ai";
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

const GROUPS = [CATEGORIES, LANGUAGE, RESOLUTION];

const GROUPNAME = ["categories", "languages", "isHd"];

export const Filter = () => {
  const [checkedFilter, setCheckedFilter] = useState({
    categories: [],
    languages: [],
    isHd: [],
  });

  const { dispatchChannels } = ChannelState();

  const { params, setParams } = ParamsState();

  //   const handleCategories = (e) => {
  //     let array = checkedCategories;

  //     if (e.target.checked) setCheckedCategories([...array, e.target.value]);
  //     else {
  //       const exist = checkedCategories.indexOf(e.target.value);
  //       if (exist > -1) {
  //         array.splice(exist, 1);
  //         setCheckedCategories(array);
  //       }
  //     }
  //   };

  const handleCheckBox = (checked, value, group) => {
    let array = checkedFilter;

    if (checked) {
      array[group].push(value);
      setCheckedFilter(array);
    } //array[group].push(value)
    else {
      const exist = array[group].indexOf(value);
      if (exist > -1) {
        array[group].splice(exist, 1);
        setCheckedFilter(array);
      }
    }
  };

  const applyFilter = () => {
    console.log(checkedFilter);

    setParams({
      search: params.get("search"),
      categories: checkedFilter.categories.join(","),
      languages: checkedFilter.languages.join(","),
      isHd: checkedFilter.isHd.join(","),
    });
    // dispatchChannels({ type: SEARCH_FILTER, categories: checkedCategories });
  };

  return (
    <div className="filterWrap">
      {GROUPS.map((group, index) => {
        return (
          <div key={"group-" + group}>
            <span className="filterTitle">{GROUPNAME[index]}</span>
            {group.map((value, i) => {
              return (
                <CheckBox
                  key={"value-" + value + i}
                  value={value}
                  handleCheckBox={handleCheckBox}
                  group={GROUPNAME[index]}
                  initialSelected={() => {
                    const temp = params.get(GROUPNAME[index]);

                    if (!temp) return false;

                    return params.get(GROUPNAME[index]).includes(value);
                  }}
                ></CheckBox>
              );
            })}
          </div>
        );
      })}
      <button className="apply" onClick={applyFilter}>
        Apply Filter
      </button>
    </div>
  );
};

const CheckBox = ({ value, group, handleCheckBox, initialSelected }) => {
  const [selected, setSelected] = useState(initialSelected);

  return (
    <div className="checkboxWrap">
      <div
        onClick={() => {
          const checked = selected;
          setSelected(!selected);
          handleCheckBox(!checked, value, group);
        }}
        className="checkBox"
      >
        {selected ? (
          <AiFillCheckCircle className="icon"></AiFillCheckCircle>
        ) : null}
      </div>
      <span className="categoryName">{value}</span>
    </div>
  );
};
