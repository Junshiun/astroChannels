import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  channelsReducer,
  FETCH_DATA,
  SORT_BYNUM_ASCENDING,
  userReducer,
} from "./reducer";

const Channels = createContext();

export const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://contenthub-api.eco.astro.com.my/channel/all.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatchChannels({ type: FETCH_DATA, payload: { data: res.response } });
      })
      .then(() => setLoading(false));
  }, []);

  const [channels, dispatchChannels] = useReducer(channelsReducer, {
    initial: null,
    filtered: null,
    dataTemp: null,
    sortType: SORT_BYNUM_ASCENDING,
    sortTemp: null,
  });

  const [user, dispatchUser] = useReducer(userReducer, {
    favourites: JSON.parse(localStorage.getItem("astroUser")).favourites || [],
  });

  useEffect(() => {
    localStorage.setItem("astroUser", JSON.stringify(user));
  }, [user]);

  return (
    <Channels.Provider
      value={{
        channels,
        dispatchChannels,
        loading,
        user,
        dispatchUser,
      }}
    >
      {children}
    </Channels.Provider>
  );
};

export const ChannelState = () => {
  return useContext(Channels);
};
