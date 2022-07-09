import {
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from "../../context/reducer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ChannelState } from "../../context/context";
import { useEffect, useState } from "react";
import "./favouriteIcon.scss";

export const FavouriteIcon = ({ channel }) => {
  const { id } = channel;

  const { user, dispatchUser } = ChannelState();

  const [liked, setLiked] = useState(null);

  useEffect(() => {
    setLiked(user.favourites.some((channel) => id === channel.id));
  }, [user]);

  const handleFavourites = (e) => {
    e.stopPropagation();
    if (liked === true) {
      setLiked(false);
      dispatchUser({ type: REMOVE_FROM_FAVOURITES, payload: { id: id } });
    } else if (liked === false) {
      setLiked(true);
      dispatchUser({
        type: ADD_TO_FAVOURITES,
        payload: { channel: channel },
      });
    }
  };

  return (
    <button className="favouritesWrap" onClick={handleFavourites}>
      {liked ? (
        <AiFillHeart className="liked"></AiFillHeart>
      ) : (
        <AiOutlineHeart className="unliked"></AiOutlineHeart>
      )}
    </button>
  );
};
