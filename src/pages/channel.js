import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EachDay } from "../components/channel/eachDay";
import "./channel.scss";

const CHANNEL_DETAILS_BASE = "https://contenthub-api.eco.astro.com.my/channel/";
export const Channel = () => {
  const { channel } = useParams();
  const [details, setDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(0);
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
          <div className="channelDaysBar">
            {schedule
              ? Object.keys(schedule).map((date, index) => {
                  return (
                    <EachDay
                      key={"schedule-" + index}
                      date={date}
                      programme={schedule[date]}
                      index={index}
                      setSelected={setSelected}
                      active={active}
                      setActive={setActive}
                    ></EachDay>
                  );
                })
              : null}
          </div>
          <div className="channelSchedule">
            {selected
              ? selected.map((programme, index) => {
                  return (
                    <div
                      key={"programme-" + index}
                      className={programme.time === "On Now" ? "onNow" : ""}
                    >
                      <span>{programme.time}</span>
                      <span>{programme.title}</span>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
