import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChannelBox } from "../components/channels/channelBox";
import { Header } from "../components/header/header";
import { ChannelState } from "../context/context";
import { SEARCH_FILTER } from "../context/reducer";
import { FILTER_GROUPS } from "../components/channels/filter";
import "./channels.scss";
import { TopBar } from "../components/channels/topBar";

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
          search: searchParams ? searchParams : "",
          [FILTER_GROUPS[0].name]: categoriesParams
            ? categoriesParams.split(",")
            : [],
          [FILTER_GROUPS[1].name]: languagesParams
            ? languagesParams.split(",")
            : [],
          [FILTER_GROUPS[2].name]: hdParams ? hdParams.split(",") : [],
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
        {filtered ? (
          filtered.length > 0 ? (
            filtered.map((element, index) => {
              return (
                <ChannelBox
                  details={element}
                  key={"channel-" + element.title + "-" + index}
                ></ChannelBox>
              );
            })
          ) : (
            <span style={{ marginTop: "1rem" }}>No results found.</span>
          )
        ) : null}
      </div>
    </div>
  );
};
