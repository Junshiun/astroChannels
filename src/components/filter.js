export const Filter = ({ initialData, filteredData, setFilteredData }) => {
  let newSort;

  const sortByChannelNum = () => {
    newSort = filteredData.sort((a, b) => a.stbNumber - b.stbNumber);
    setFilteredData([...newSort]);
  };

  const sortByChannalName = () => {
    newSort = filteredData.sort((a, b) => a.title.localeCompare(b.title));
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
    <div>
      <input onChange={(e) => searchName(e)} placeholder="search"></input>
      <button onClick={sortByChannelNum}>sort by channel number</button>
      <button onClick={sortByChannalName}>sort by channel name</button>
    </div>
  );
};
