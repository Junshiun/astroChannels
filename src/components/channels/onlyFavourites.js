import { useEffect, useState } from "react";
import { ChannelState } from "../../context/context";
import { ParamsState } from "../../pages/channels";
import { ONLY_FAVOURITES, REVERT_TO_NORMAL } from "../../context/reducer";
import "./onlyFavourites.scss";

export const OnlyFavourites = () => {
  const { dispatchChannels, user } = ChannelState();
  const { params } = ParamsState();

  const [onlyFavourites, setOnlyFavourites] = useState(false);

  useEffect(() => {
    setOnlyFavourites(false);
  }, [params]);

  const handleOnlyFavourites = () => {
    if (!onlyFavourites) {
      dispatchChannels({ type: ONLY_FAVOURITES, payload: { user: user } });
      setOnlyFavourites(true);
    } else {
      dispatchChannels({ type: REVERT_TO_NORMAL });
      setOnlyFavourites(false);
    }
  };

  return (
    <div className="favouritesWrap">
      <div
        onClick={handleOnlyFavourites}
        className={"switchBox " + (onlyFavourites ? "on" : "off")}
      ></div>
      <span>only show favourite channels</span>
    </div>
  );
};
