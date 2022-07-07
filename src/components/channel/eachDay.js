import { useEffect, useState } from "react";

export const DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const EachDay = ({
  date,
  programme,
  index,
  setSelected,
  active,
  setActive,
}) => {
  const day = DAY[new Date(date).getDay()];
  const current = new Date();

  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    let next, nextIndex, filteredProgramme;

    if (index === 0) {
      filteredProgramme = programme.filter((element, index) => {
        if (new Date(element.datetime) > current) {
          if (!next) nextIndex = index;
          return true;
        }

        return false;
      });

      if (filteredProgramme.length === 0)
        //get last programme before 12am
        filteredProgramme.unshift(programme[programme.length - 1]);
      else filteredProgramme.unshift(programme[nextIndex - 1]);
    } else filteredProgramme = programme;

    // if (index === 0) console.log(filteredProgramme);

    filteredProgramme = filteredProgramme.map((element, i) => {
      if (index === 0 && i === 0) return { ...element, time: "On Now" };
      return {
        ...element,
        time: new Date(element.datetime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    });

    if (active === index) {
      setSelected(filteredProgramme);
    }

    setFiltered(filteredProgramme);
  }, []);

  return (
    <div
      onClick={() => {
        setSelected(filtered);
        setActive(index);
      }}
      className={"eachDay " + (index === active ? "active" : "")}
    >
      {index === 0 ? "TODAY" : day}
    </div>
  );
};
