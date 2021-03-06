import { FILTER_GROUPS } from "../components/channels/filter";
import moment from "moment";

export const FETCH_DATA = "fetch data";
export const SORT_BYNUM_ASCENDING = "sort by number ascending";
export const SORT_BYNUM_DESCENDING = "sort by number descending";
export const SORT_BYNAME_ASCENDING = "sort by name ascending";
export const SORT_BYNAME_DESCENDING = "sort by name descending";
export const FILTER = "filter";
export const SEARCH = "search";
export const SEARCH_FILTER = "search and filter";
export const RESET = "reset";

export const ADD_TO_FAVOURITES = "add to favourites";
export const REMOVE_FROM_FAVOURITES = "remove from favourites";
export const ONLY_FAVOURITES = "only show favourites channels";
export const REVERT_TO_NORMAL = "when only favourites is not selected";

const SCHEDULETOTAL = 5;

export const channelsReducer = (state, action) => {
  const { initial, filtered, dataTemp, sortType, sortTemp } = state;

  const { payload } = action;

  let results;

  switch (action.type) {
    case FETCH_DATA:
      const current = moment();

      // console.log(moment());

      const dataFetched = payload.data.map((channel) => {
        const { currentSchedule } = channel;

        let array = Array(5).fill({
          time: "N/A",
          name: "No Information Available",
        });

        let firstMeet = 0;

        for (let i = 0; i < SCHEDULETOTAL; i++) {
          if (i < currentSchedule.length) {
            if (
              compareCurrentTime(
                currentSchedule[i].datetime,
                currentSchedule[i].duration
              ) > current
            ) {
              if (!firstMeet) {
                array[0] = {
                  time: "On Now",
                  name: currentSchedule[i].title,
                };
              } else {
                array[firstMeet] = {
                  time: moment(currentSchedule[i].datetime).format("hh:mm a"),
                  name: currentSchedule[i].title,
                };
              }
              firstMeet++;
            }
          }
        }

        return { ...channel, scheduleArray: array };
      });

      return {
        ...state,
        initial: dataFetched,
        filtered: dataFetched,
      };
    case SORT_BYNUM_ASCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => a.stbNumber - b.stbNumber),
        filtered: filtered.sort((a, b) => a.stbNumber - b.stbNumber),
        sortType: SORT_BYNUM_ASCENDING,
      };
    case SORT_BYNUM_DESCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => b.stbNumber - a.stbNumber),
        filtered: filtered.sort((a, b) => b.stbNumber - a.stbNumber),
        sortType: SORT_BYNUM_DESCENDING,
      };
    case SORT_BYNAME_ASCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => a.title.localeCompare(b.title)),
        filtered: filtered.sort((a, b) => a.title.localeCompare(b.title)),
        sortType: SORT_BYNAME_ASCENDING,
      };
    case SORT_BYNAME_DESCENDING:
      return {
        ...state,
        initial: initial.sort((a, b) => b.title.localeCompare(a.title)),
        filtered: filtered.sort((a, b) => b.title.localeCompare(a.title)),
        sortType: SORT_BYNAME_DESCENDING,
      };
    case SEARCH_FILTER:
      results = initial
        .filter((channel) => {
          if (payload.search === "") {
            return true;
          }
          return (
            channel.title
              .toLowerCase()
              .includes(payload.search.toLowerCase()) ||
            channel.stbNumber.includes(payload.search)
          );
        })
        .filter((channel) => {
          if (payload[FILTER_GROUPS[0].name].length === 0) {
            return true;
          }
          // return payload[FILTER_GROUPS[0].name].includes(channel.category);
          return payload[FILTER_GROUPS[0].name].every((category) => {
            return channel.category.includes(category);
          });
        })
        .filter((channel) => {
          if (payload[FILTER_GROUPS[1].name].length === 0) {
            return true;
          }
          // return payload[FILTER_GROUPS[1].name].includes(channel.language);
          return payload[FILTER_GROUPS[1].name].every((language) => {
            return channel.language.includes(language);
          });
        })
        .filter((channel) => {
          if (
            payload[FILTER_GROUPS[2].name].length === 0 ||
            (payload[FILTER_GROUPS[2].name].includes("HD") &&
              payload[FILTER_GROUPS[2].name].includes("non-HD"))
          ) {
            return true;
          } else if (payload[FILTER_GROUPS[2].name].includes("HD"))
            return channel.isHd;
          else if (payload[FILTER_GROUPS[2].name].includes("non-HD"))
            return !channel.isHd;
          else return false;
        });
      return {
        ...state,
        filtered: results,
      };
    case ONLY_FAVOURITES:
      results = filtered.filter((channel) => {
        return payload.user.favourites.some(
          (element) => channel.id === element.id
        );
      });
      return {
        ...state,
        filtered: results,
        dataTemp: filtered,
        sortTemp: sortType,
      };
    case REVERT_TO_NORMAL:
      return {
        ...state,
        filtered: dataTemp,
        sortType: sortTemp,
      };
    case RESET:
      return {
        ...state,
        filtered: initial,
      };
    default:
      return state;
  }
};

export const userReducer = (state, action) => {
  const { favourites } = state;

  const { payload } = action;

  switch (action.type) {
    case ADD_TO_FAVOURITES:
      return { ...state, favourites: [...favourites, payload.channel] };
    case REMOVE_FROM_FAVOURITES:
      const remain = favourites.filter((channel) => channel.id !== payload.id);
      return { ...state, favourites: remain };
    default:
      return state;
  }
};

export const compareCurrentTime = (programmeTime, programmeDuration) => {
  const startTime = moment(programmeTime);
  const durationSplit = programmeDuration.split(":");

  // const duration =
  //   +durationSplit[0] * 60 * 60 * 1000 +
  //   +durationSplit[1] * 60 * 1000 +
  //   +durationSplit[2] * 1000;

  const endTime = moment(startTime)
    .add(durationSplit[0], "hours")
    .add(durationSplit[1], "minutes")
    .add(durationSplit[2], "seconds");

  return endTime;
};
