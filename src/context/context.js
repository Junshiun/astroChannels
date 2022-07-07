import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { channelsReducer, FETCH_DATA, SORT_BYNUM_ASCENDING } from "./reducer";

const Channels = createContext();

export const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://contenthub-api.eco.astro.com.my/channel/all.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        dispatchChannels({ type: FETCH_DATA, data: res.response });
      })
      .then(() => setLoading(false));
  }, []);

  const [channels, dispatchChannels] = useReducer(channelsReducer, {
    initial: null,
    filtered: null,
    sortType: SORT_BYNUM_ASCENDING,
  });

  return (
    <Channels.Provider
      value={{
        channels,
        dispatchChannels,
        loading,
      }}
    >
      {children}
    </Channels.Provider>
  );
};

export const ChannelState = () => {
  return useContext(Channels);
};
