import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChannelBox } from "../components/channels/channelBox";
import { Header } from "../components/channels/header";
import { ChannelState } from "../context/context";
import { SEARCH_FILTER } from "../context/reducer";
import "./channels.scss";

const Params = createContext();

export const Channels = () => {
  const {
    channels: { filtered },
  } = ChannelState();

  const { dispatchChannels, loading } = ChannelState();
  const [params, setParams] = useSearchParams();
  const [reload, setReload] = useState(true);

  // useEffect(() => {
  //   if (filtered) {
  //     let array = new Set([]);

  //     filtered.map((element) => {
  //       array.add(element.isHd);
  //       return null;
  //     });

  //     console.log(array);
  //   }
  // }, [filtered]);

  useEffect(() => {
    if (!loading) {
      const searchParams = params.get("search");
      const categoriesParams = params.get("categories");
      const languagesParams = params.get("languages");
      const hdParams = params.get("isHd");

      dispatchChannels({
        type: SEARCH_FILTER,
        search: searchParams,
        categories: categoriesParams,
        languages: languagesParams,
        isHd: hdParams,
      });
    }
  }, [reload]);

  useEffect(() => {
    if (!loading) setReload(!reload);
  }, [loading, params]);

  return (
    <div className="wrapper">
      <ParamsContext params={params} setParams={setParams}>
        <Header></Header>
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
      </ParamsContext>
    </div>
  );
};

const ParamsContext = ({ children, params, setParams }) => {
  return (
    <Params.Provider value={{ params, setParams }}>{children}</Params.Provider>
  );
};

export const ParamsState = () => {
  return useContext(Params);
};
