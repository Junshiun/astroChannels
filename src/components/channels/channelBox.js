import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavouriteIcon } from "../favouriteIcon/favouriteIcon";
import "./channelBox.scss";

const SCHEDULETOTAL = 5;
const SCHEDULENUMBER = 3;

export const ChannelBox = ({ details }) => {
  const { stbNumber, title, imageUrl, currentSchedule, detailUrl } = details;

  const [image, setImage] = useState(null);
  const [schedule, setSchedule] = useState(
    Array(5).fill({ time: "N/A", name: "No Information Available" })
  );

  const navigate = useNavigate();

  useEffect(() => {
    let array = Array(3).fill({
      time: "N/A",
      name: "No Information Available",
    });

    let current = new Date();

    let firstMeet = 0;

    for (let i = 0; i < SCHEDULETOTAL; i++) {
      if (i < currentSchedule.length) {
        if (
          compareCurrentTime(
            currentSchedule[i].datetime,
            currentSchedule[i].duration
          ) > current
        ) {
          if (!firstMeet) {
            array[0] = {
              time: "On Now",
              name: currentSchedule[i].title,
            };
          } else {
            array[firstMeet] = {
              time: new Date(currentSchedule[i].datetime).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              ),
              name: currentSchedule[i].title,
            };
          }
          firstMeet++;
        }
      }
    }

    setSchedule(array);
    setImage(imageUrl);
  }, []);

  return (
    <div className="channelBox" onClick={() => navigate(detailUrl)}>
      <div className="channelImg">
        <img
          src={image}
          alt=""
          onError={() =>
            setImage(
              "https://teelindy.com/wp-content/uploads/2019/03/default_image.png"
            )
          }
        ></img>
      </div>
      <div className="channelTitle">
        <span>CH{stbNumber}</span>
        <span>{title}</span>
      </div>
      <FavouriteIcon channel={details}></FavouriteIcon>
      {schedule ? (
        <>
          <div className="channelTime">
            {schedule.map((element, index) => {
              if (index >= SCHEDULENUMBER) return null;
              return (
                <div key={"time-" + title + "-" + index}>{element.time}</div>
              );
            })}
          </div>
          <div className="channelProgramme">
            {schedule.map((element, index) => {
              if (index >= SCHEDULENUMBER) return null;
              return (
                <div key={"programme-" + title + "-" + index}>
                  {element.name}
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export const compareCurrentTime = (programmeTime, programmeDuration) => {
  const startTime = new Date(programmeTime);
  const durationSplit = programmeDuration.split(":");
  const duration =
    +durationSplit[0] * 60 * 60 * 1000 +
    +durationSplit[1] * 60 * 1000 +
    +durationSplit[2] * 1000;

  const endTime = new Date(startTime.getTime() + duration);

  return endTime;
};
