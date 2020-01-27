import * as actionTypes from "../actions/actionTypes";
import {
  getInitialState,
  getStateFromListType,
  updateList
} from "../../config/list-config";

const initialState = getInitialState();

const addCard = (state, data, listType) => {
  let newToDoList = [
    ...getStateFromListType(state, listType),
    ...Object.entries(data)
  ];
  return updateList(state, newToDoList, listType);
};

const addCardCommit = (state, data, listType) => {
  return state;
};

const reorderListCommit = (state, data, listType) => {
  return state;
};

const editCard = (state, data, listType) => {
  const editedToDoList = getStateFromListType(state, listType).map(item => {
    if (item[0] === data.key) {
      let updatedItem = [];
      updatedItem = [...item];
      updatedItem[1] = data.cardData;
      return updatedItem;
    }
    return item;
  });
  return updateList(state, editedToDoList, listType);
};

const editCardCommit = (state, data, listType) => {
  return state;
};

const deleteCard = (state, data, listType) => {
  const afterDeleteToDoList = getStateFromListType(state, listType).filter(
    item => item[0] !== data.key
  );
  return updateList(state, afterDeleteToDoList, listType);
};

const deleteCardCommit = (state, data, listType) => {
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIST:
    case actionTypes.REORDER_LIST:
    case actionTypes.DELETE_LIST:
      return updateList(
        state,
        Object.entries(action.payload.data),
        action.payload.meta.listType
      );
    case actionTypes.FETCH_LIST_COMMIT:
      if (action.payload.data === null) {
        action.payload.data = {};
      }
      return updateList(
        state,
        Object.entries(action.payload.data),
        action.meta.listType
      );
    case actionTypes.REORDER_LIST_COMMIT:
      return reorderListCommit(
        state,
        Object.entries(action.payload.data),
        action.meta.listType
      );
    case actionTypes.DELETE_LIST_COMMIT:
      return state;
    case actionTypes.ADD_CARD:
      return addCard(
        state,
        action.payload.data.cardData,
        action.payload.meta.listType
      );
    case actionTypes.ADD_CARD_COMMIT:
      return addCardCommit(state, action.payload.data, action.meta.listType);
    case actionTypes.EDIT_CARD:
      return editCard(state, action.payload.data, action.payload.meta.listType);
    case actionTypes.EDIT_CARD_COMMIT:
      return editCardCommit(state, action.payload.data, action.meta.listType);
    case actionTypes.DELETE_CARD:
      return deleteCard(
        state,
        action.payload.data,
        action.payload.meta.listType
      );
    case actionTypes.DELETE_CARD_COMMIT:
      return deleteCardCommit(state, action.payload.data, action.meta.listType);
    default:
      return state;
  }
};

export default reducer;
