import { useEffect, useRef, useState } from "react";
import { compareCurrentTime } from "../../context/reducer";
import moment from "moment";

export const DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const EachDay = ({
  date,
  programme,
  index,
  setSelected,
  active,
  setActive,
  setLength,
  setOffset,
}) => {
  const day = DAY[new Date(date).getDay()];
  const current = moment();

  const [filtered, setFiltered] = useState(null);

  const dayLength = useRef(null);

  useEffect(() => {
    let filteredProgramme;

    if (index === 0) {
      filteredProgramme = programme.filter((element) => {
        if (compareCurrentTime(element.datetime, element.duration) > current) {
          return true;
        }

        return false;
      });
    } else filteredProgramme = programme;

    filteredProgramme = filteredProgramme.map((element, i) => {
      if (index === 0 && i === 0) return { ...element, time: "On Now" };
      return {
        ...element,
        time: moment(element.datetime).format("hh:mm a"),
      };
    });

    if (active === index) {
      setSelected(filteredProgramme);
    }

    setFiltered(filteredProgramme);

    if (index === 0) {
      setLength(dayLength.current.clientWidth);
      setOffset(dayLength.current.offsetLeft);
    }
  }, []);

  return (
    <div
      onClick={() => {
        setSelected(filtered);
        setActive(index);
        setLength(dayLength.current.clientWidth);
        setOffset(dayLength.current.offsetLeft);
      }}
      className={"eachDay " + (index === active ? "active" : "")}
    >
      <div ref={dayLength} style={{ width: "fit-content" }}>
        {index === 0 ? "TODAY" : day}
      </div>
    </div>
  );
};
