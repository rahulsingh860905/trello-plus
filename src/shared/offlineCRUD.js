import { getStateFromListType, updateList } from "../config/list-config";

export const checkAndSyncUpdate = (state, listType, cardData, key) => {
  let outbox = [...state.offline.outbox];
  for (let item of outbox) {
    if (item.type === "ADD_CARD" && key === item.payload.data.key) {
      item.payload.data.cardData = cardData;
      item.meta.offline.effect.data = cardData;
      let newOfflineState = { ...state.offline };
      newOfflineState.outbox = outbox;
      state.offline = newOfflineState;
      syncAddState(state, listType, cardData, key);
      return true;
    }
  }
  return false;
};

export const syncAddState = (state, listType, cardData, key) => {
  const updatedToDoList = getStateFromListType(state.board, listType).map(
    item => {
      if (item[0] === key) {
        item[1] = cardData;
      }
      return item;
    }
  );
  state.board = updateList(state.board, updatedToDoList, listType);
};

export const checkAndSyncDelete = (state, listType, key) => {
  let outbox = [...state.offline.outbox];
  let index = 0;
  for (const item of outbox) {
    if (item.type === "ADD_CARD" && key === item.payload.data.key) {
      outbox.splice(index, 1);
      let newOfflineState = { ...state.offline };
      newOfflineState.outbox = outbox;
      state.offline = newOfflineState;
      syncDeleteState(state, listType, key);
      return true;
    }
    index++;
  }
  return false;
};

export const syncDeleteState = (state, listType, key) => {
  const afterDeleteToDoList = getStateFromListType(
    state.board,
    listType
  ).filter(item => item[0] !== key);
  state.board = updateList(state.board, afterDeleteToDoList, listType);
};
