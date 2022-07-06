import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./channel.scss";

const CHANNEL_DETAILS_BASE = "https://contenthub-api.eco.astro.com.my/channel/";
const DAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const Channel = () => {
  const { channel } = useParams();
  const [details, setDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const id = channel.match(/[0-9]{0,3}$/)[0];

    fetch(CHANNEL_DETAILS_BASE + id + ".json")
      .then((res) => res.json())
      .then((res) => {
        const response = res.response;

        console.log(res);
        setDetails(response);
        setImage(response.imageUrl);
        setSchedule(response.schedule);
      });
  }, []);

  //   const arrangeSchedule = (schedule) => {
  //     const date = new Date();
  //     const current =
  //       date.getFullYear() +
  //       "-" +
  //       ("0" + (date.getMonth() + 1)).slice(-2) +
  //       "-" +
  //       ("0" + date.getDate()).slice(-2);
  //     console.log(current);
  //     console.log(schedule[current]);

  //     console.log(Object.keys(schedule));
  //   };

  return (
    <div>
      {details ? (
        <div className="channelPageWrap">
          <div className="channelMainInfo">
            <div className="imageWrap">
              <img
                src={image}
                onError={() =>
                  setImage(
                    "https://teelindy.com/wp-content/uploads/2019/03/default_image.png"
                  )
                }
                alt={details.title}
              ></img>
            </div>
            <div className="channelName">
              <span>CH{details.stbNumber}</span>
              <span>{details.title}</span>
            </div>
          </div>
          <div className="channelDescription">{details.description}</div>
          {schedule
            ? Object.keys(schedule).map((date, index) => {
                return (
                  <EachDay
                    key={"schedule-" + index}
                    date={date}
                    programme={schedule[date]}
                    index={index}
                    setSelected={setSelected}
                  ></EachDay>
                );
              })
            : null}
        </div>
      ) : null}
    </div>
  );
};

const EachDay = ({ date, programme, index, setSelected }) => {
  const day = DAY[new Date(date).getDay()];
  const current = new Date();

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

  if (index === 0) console.log(filteredProgramme);

  return <div>{index === 0 ? "TODAY" : day}</div>;
};
