import * as actionTypes from "./actionTypes";
import {
  checkAndSyncUpdate,
  checkAndSyncDelete
} from "../../shared/offlineCRUD";

export const addCard = (type, data, id) => {
  let cardData = {};
  cardData[id] = data;
  return dispatch => {
    dispatch({
      type: actionTypes.ADD_CARD,
      payload: {
        data: { cardData: cardData },
        meta: { listType: type }
      },
      meta: {
        offline: {
          effect: {
            method: "patch",
            url: type + ".json",
            data: cardData
          },
          commit: {
            type: actionTypes.ADD_CARD_COMMIT,
            meta: { listType: type }
          }
        }
      }
    });
  };
};

export const updateCard = (type, cardData, key) => {
  return (dispatch, getState) => {
    if (checkAndSyncUpdate(getState(), type, cardData, key)) {
      dispatch(dummyAction());
      return;
    }
    dispatch({
      type: actionTypes.EDIT_CARD,
      payload: {
        data: { key: key, cardData: cardData },
        meta: { listType: type }
      },
      meta: {
        offline: {
          effect: {
            method: "patch",
            url: type + "/" + key + ".json",
            data: cardData
          },
          commit: {
            type: actionTypes.EDIT_CARD_COMMIT,
            meta: { key: key, listType: type }
          }
        }
      }
    });
  };
};

export const deleteCard = (type, key) => {
  return (dispatch, getState) => {
    if (checkAndSyncDelete(getState(), type, key)) {
      dispatch(dummyAction());
      return;
    }
    dispatch({
      type: actionTypes.DELETE_CARD,
      payload: { data: { key: key }, meta: { listType: type } },
      meta: {
        offline: {
          effect: {
            method: "delete",
            url: type + "/" + key + ".json"
          },
          commit: {
            type: actionTypes.DELETE_CARD_COMMIT,
            meta: { key: key, listType: type }
          }
        }
      }
    });
  };
};

export const fetchList = type => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.FETCH_LIST,
      payload: { data: {}, meta: { listType: type } },
      meta: {
        offline: {
          effect: {
            method: "get",
            url: type + ".json"
          },
          commit: {
            type: actionTypes.FETCH_LIST_COMMIT,
            meta: { listType: type }
          }
        }
      }
    });
  };
};

export const reorderList = (type, listData) => ({
  type: actionTypes.REORDER_LIST,
  payload: {
    data: listData,
    meta: { listType: type }
  },
  meta: {
    offline: {
      effect: {
        method: "put",
        url: type + ".json",
        data: listData
      },
      commit: {
        type: actionTypes.REORDER_LIST_COMMIT,
        meta: { listType: type }
      }
    }
  }
});

export const deleteList = type => ({
  type: actionTypes.DELETE_LIST,
  payload: {
    data: [],
    meta: { listType: type }
  },
  meta: {
    offline: {
      effect: {
        method: "delete",
        url: type + ".json"
      },
      commit: {
        type: actionTypes.DELETE_LIST,
        meta: { listType: type }
      }
    }
  }
});

export const reorderLists = (types, reorderedLists, movedData) => {
  return dispatch => {
    if (reorderedLists[0].length === 0) {
      dispatch(deleteCard(types[0], movedData[0][0]));
    } else {
      dispatch(reorderList(types[0], Object.fromEntries(reorderedLists[0])));
    }
    if (types.length === 2) {
      dispatch(reorderList(types[1], Object.fromEntries(reorderedLists[1])));
    }
    return;
  };
};

export const dummyAction = () => ({
  type: "DUMMY_ACTION"
});
