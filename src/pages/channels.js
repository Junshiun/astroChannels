import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChannelBox } from "../components/channels/channelBox";
import { ChannelState } from "../context/context";
import { SEARCH_FILTER } from "../context/reducer";
import { FILTER_GROUPS } from "../components/channels/filter";
import { TopBar } from "../components/channels/topBar";
import { BiLoaderAlt, BiArrowToTop } from "react-icons/bi";
import "./channels.scss";

export const Channels = () => {
  const {
    channels: { filtered },
  } = ChannelState();

  const { dispatchChannels, loading } = ChannelState();
  const [params] = useSearchParams();
  const [reload, setReload] = useState(true);
  const [enableScrollTop, setEnableScrollTop] = useState(false);

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

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 100) setEnableScrollTop(true);
      else if (enableScrollTop) setEnableScrollTop(false);
    };

    return () => {
      window.onscroll = null;
    };
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="channelsPage">
      {loading ? (
        <div className="loadingIconWrap">
          <BiLoaderAlt className="loadingIcon"></BiLoaderAlt>
        </div>
      ) : (
        <>
          <TopBar></TopBar>
          <div
            className="channelsWrap"
            onScroll={(e) => {
              console.log(e);
            }}
          >
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
          {enableScrollTop ? (
            <div className="scrollTopWrap" onClick={scrollTop}>
              <BiArrowToTop></BiArrowToTop>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
