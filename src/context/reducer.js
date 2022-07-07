export const FETCH_DATA = "fetch data";
export const SORT_BYNUM_ASCENDING = "sort by number ascending";
export const SORT_BYNUM_DESCENDING = "sort by number descending";
export const SORT_BYNAME_ASCENDING = "sort by name ascending";
export const SORT_BYNAME_DESCENDING = "sort by name descending";
export const FILTER = "filter";
export const SEARCH = "search";
export const SEARCH_FILTER = "search and filter";
export const RESET = "reset";

export const channelsReducer = (state, action) => {
  const { initial, filtered } = state;

  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        initial: action.data,
        filtered: action.data,
      };
    case SORT_BYNUM_ASCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => a.stbNumber - b.stbNumber),
        filtered: filtered.sort((a, b) => a.stbNumber - b.stbNumber),
        sortType: SORT_BYNUM_ASCENDING,
        // searched: searched.sort((a, b) => a.stbNumber - b.stbNumber),
      };
    case SORT_BYNUM_DESCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => b.stbNumber - a.stbNumber),
        filtered: filtered.sort((a, b) => b.stbNumber - a.stbNumber),
        sortType: SORT_BYNUM_DESCENDING,
        // searched: searched.sort((a, b) => b.stbNumber - a.stbNumber),
      };
    case SORT_BYNAME_ASCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => a.title.localeCompare(b.title)),
        filtered: filtered.sort((a, b) => a.title.localeCompare(b.title)),
        sortType: SORT_BYNAME_ASCENDING,
        // searched: searched.sort((a, b) => a.title.localeCompare(b.title)),
      };
    case SORT_BYNAME_DESCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => b.title.localeCompare(a.title)),
        filtered: filtered.sort((a, b) => b.title.localeCompare(a.title)),
        sortType: SORT_BYNAME_DESCENDING,
        // searched: searched.sort((a, b) => b.title.localeCompare(a.title)),
      };
    // case FILTER:
    //   dataUsed = searching ? searched : initial;

    //   return {
    //     ...state,
    //     filtered:
    //       action.categories.length > 0
    //         ? dataUsed.filter((channel) =>
    //             action.categories.includes(channel.category)
    //           )
    //         : searched,
    //     filtering: action.categories.length > 0 ? true : false,
    //   };
    // case SEARCH:
    //   dataUsed = filtering ? filtered : initial;

    //   const search = dataUsed.filter(
    //     (channel) =>
    //       channel.title.toLowerCase().includes(action.value) ||
    //       channel.stbNumber.includes(action.value)
    //   );

    //   return {
    //     ...state,
    //     filtered: search,
    //     searched: search,
    //     searching: true,
    //   };
    case SEARCH_FILTER:
      const results = initial
        .filter((channel) => {
          if (
            action.search === null ||
            action.search === "null" ||
            action.search === ""
          ) {
            return true;
          }
          return (
            channel.title.toLowerCase().includes(action.search) ||
            channel.stbNumber.includes(action.search)
          );
        })
        .filter((channel) => {
          if (
            action.categories === null ||
            action.categories === "null" ||
            action.categories === ""
          ) {
            return true;
          }
          return action.categories.includes(channel.category);
        })
        .filter((channel) => {
          if (
            action.languages === null ||
            action.languages === "null" ||
            action.languages === ""
          ) {
            return true;
          }
          return action.languages.includes(channel.language);
        })
        .filter((channel) => {
          if (
            action.isHd === null ||
            action.isHd === "null" ||
            action.isHd === ""
          ) {
            return true;
          }
          return channel.isHd;
        });
      return {
        ...state,
        filtered: results,
        // searched: results,
        // searching: true,
      };
    case RESET:
      return {
        ...state,
        filtered: initial,
        // searched: initial,
        // searching: false,
      };
    default:
      return state;
  }
};
