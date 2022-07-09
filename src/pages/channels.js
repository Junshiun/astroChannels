import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChannelBox } from "../components/channels/channelBox";
import { Header } from "../components/header/header";
import { ChannelState } from "../context/context";
import { SEARCH_FILTER } from "../context/reducer";
import { FILTER_GROUPS } from "../components/channels/filter";
import "./channels.scss";
import { TopBar } from "../components/channels/topBar";

const Params = createContext();

export const Channels = () => {
  const {
    channels: { filtered },
  } = ChannelState();

  const { dispatchChannels, loading } = ChannelState();
  const [params, setParams] = useSearchParams();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (!loading) {
      const searchParams = params.get("search");
      const categoriesParams = params.get(FILTER_GROUPS[0].name);
      const languagesParams = params.get(FILTER_GROUPS[1].name);
      const hdParams = params.get(FILTER_GROUPS[2].name);

      dispatchChannels({
        type: SEARCH_FILTER,
        payload: {
          search: searchParams,
          [FILTER_GROUPS[0].name]: categoriesParams,
          [FILTER_GROUPS[1].name]: languagesParams,
          [FILTER_GROUPS[2].name]: hdParams,
        },
      });
    }
  }, [reload]);

  useEffect(() => {
    if (!loading) setReload(!reload);
  }, [loading, params]);

  return (
    <div className="channelsPage">
      <TopBar></TopBar>
      <div className="channelsWrap">
        {filtered
          ? filtered.map((element, index) => {
              return (
                <ChannelBox
                  details={element}
                  key={"channel-" + element.title + "-" + index}
                ></ChannelBox>
              );
            })
          : null}
      </div>
    </div>
  );
};

// const ParamsContext = ({ children, params, setParams, reload }) => {
//   return (
//     <Params.Provider value={{ params, setParams, reload }}>
//       {children}
//     </Params.Provider>
//   );
// };

// export const ParamsState = () => {
//   return useContext(Params);
// };
