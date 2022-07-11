import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavouriteIcon } from "../favouriteIcon/favouriteIcon";
import "./channelBox.scss";

const SCHEDULENUMBER = 3;

export const ChannelBox = ({ details }) => {
  const { stbNumber, title, imageUrl, scheduleArray, detailUrl } = details;

  const [image, setImage] = useState(imageUrl);

  const navigate = useNavigate();

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
      {scheduleArray ? (
        <>
          <div className="channelTime">
            {scheduleArray.map((element, index) => {
              if (index >= SCHEDULENUMBER) return null;
              return (
                <div key={"time-" + title + "-" + index}>{element.time}</div>
              );
            })}
          </div>
          <div className="channelProgramme">
            {scheduleArray.map((element, index) => {
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
