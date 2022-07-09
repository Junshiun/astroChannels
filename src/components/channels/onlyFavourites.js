import { useEffect, useState } from "react";
import { ChannelState } from "../../context/context";
import { ONLY_FAVOURITES, REVERT_TO_NORMAL } from "../../context/reducer";
import "./onlyFavourites.scss";
import { useSearchParams } from "react-router-dom";

export const OnlyFavourites = () => {
  const { dispatchChannels, user } = ChannelState();
  const [params] = useSearchParams();

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
    <div className="onlyFavouritesWrap">
      <div
        onClick={handleOnlyFavourites}
        className={"switchBox " + (onlyFavourites ? "on" : "off")}
      ></div>
      <span>only show favourite channels</span>
    </div>
  );
};
