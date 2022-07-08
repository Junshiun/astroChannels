import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChannelState } from "../../context/context";
import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from "../../context/reducer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./channelBox.scss";

const SCHEDULETOTAL = 5;
const SCHEDULENUMBER = 3;

export const ChannelBox = ({ details }) => {
  const { id, stbNumber, title, imageUrl, currentSchedule, detailUrl } =
    details;

  const [image, setImage] = useState(null);
  const [schedule, setSchedule] = useState(
    Array(5).fill({ time: "N/A", name: "No Information Available" })
  );

  const navigate = useNavigate();

  const { user, dispatchUser } = ChannelState();
  const [liked, setLiked] = useState(null);

  useEffect(() => {
    setLiked(user.favourites.some((channel) => id === channel.id));
  }, [user]);

  useEffect(() => {
    let array = [];

    for (let i = 0; i < SCHEDULETOTAL; i++) {
      if (i >= currentSchedule.length)
        array[i] = { time: "N/A", name: "No Information Available" };
      else if (i === 0) {
        array[i] = {
          time: "On Now",
          name: currentSchedule[i].title,
        };
      } else {
        array[i] = {
          time: new Date(currentSchedule[i].datetime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          name: currentSchedule[i].title,
        };
      }
    }

    setSchedule(array);
    setImage(imageUrl);
  }, [currentSchedule, imageUrl]);

  const handleFavourites = (e) => {
    e.stopPropagation();
    if (liked === true) {
      setLiked(false);
      dispatchUser({ type: REMOVE_FROM_FAVOURITES, payload: { id: id } });
    } else if (liked === false) {
      setLiked(true);
      dispatchUser({ type: ADD_TO_FAVOURITES, payload: { channel: details } });
    }
  };

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
      <button className="favouritesWrap" onClick={handleFavourites}>
        {/* <button onClick={handleFavourites}> */}
        {liked ? (
          <AiFillHeart className="liked"></AiFillHeart>
        ) : (
          <AiOutlineHeart className="unliked"></AiOutlineHeart>
        )}
        {/* </button> */}
      </button>
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
