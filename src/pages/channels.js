import { useEffect, useState } from "react";
import { ChannelBox } from "../components/channelBox";
import "./channels.scss";

export const Channels = () => {
  const [initialData, setInitialData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    fetch("https://contenthub-api.eco.astro.com.my/channel/all.json")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setInitialData(res.response);
        setFilteredData(res.response);
      });
  }, []);

  const sortByChannelNum = () => {
    const newSort = filteredData.sort((a, b) => a.stbNumber - b.stbNumber);
    setFilteredData([...newSort]);
  };

  const sortByChannalName = () => {
    const newSort = filteredData.sort((a, b) => a.title.localeCompare(b.title));
    setFilteredData([...newSort]);
  };

  const searchName = (e) => {
    if (e.target.value === "") {
      setFilteredData(initialData);
      return;
    }

    const newSort = initialData.filter(
      (channel) =>
        channel.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        channel.stbNumber.includes(e.target.value)
    );
    setFilteredData([...newSort]);
  };

  return (
    <div className="wrapper">
      <input onChange={(e) => searchName(e)} placeholder="search"></input>
      <button onClick={sortByChannelNum}>sort by channel number</button>
      <button onClick={sortByChannalName}>sort by channel name</button>
      <div className="channelsWrap">
        {filteredData
          ? filteredData.map((element, index) => {
              return (
                <ChannelBox
                  details={element}
                  key={"channel-" + index}
                ></ChannelBox>
              );
            })
          : null}
      </div>
    </div>
  );
};
