import reducer from "./list";
import { getInitialState } from "../../config/list-config";
import * as actionTypes from "../actions/actionTypes";

const initialState = getInitialState();

describe("List reducer", () => {
  let lastState;

  beforeEach(() => {
    lastState = initialState;
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD CARD", () => {
    const addPayload = {
      data: { cardData: { "101": { title: "Added Card" } } },
      meta: { listType: "TODO_LIST" }
    };
    const addCardAction = {
      type: actionTypes.ADD_CARD,
      payload: addPayload
    };

    let finalState = { ...lastState };
    let newToDoList = [
      ...initialState.toDoList,
      ...Object.entries(addPayload.data.cardData)
    ];
    finalState.toDoList = newToDoList;
    expect(reducer(lastState, addCardAction).toDoList).toEqual(
      finalState.toDoList
    );
    lastState = { ...finalState };
  });

  it("should handle UPDATE CARD", () => {
    const editPayload = {
      data: { key: "101", cardData: { title: "Updated Card" } },
      meta: { listType: "TODO_LIST" }
    };
    const editCardAction = {
      type: actionTypes.EDIT_CARD,
      payload: editPayload
    };

    let finalState = { ...lastState };
    const editedToDoList = finalState.toDoList.map(item => {
      if (item[0] === editPayload.data.key) {
        let updatedItem = [];
        updatedItem = [...item];
        updatedItem[1] = editPayload.data.cardData;
        return updatedItem;
      }
      return item;
    });

    finalState.toDoList = editedToDoList;
    expect(reducer(lastState, editCardAction).toDoList).toEqual(
      finalState.toDoList
    );

    lastState = { ...finalState };
  });

  it("should handle DELETE CARD", () => {
    const deletePayload = {
      data: { key: "101" },
      meta: { listType: "TODO_LIST" }
    };
    const deleteCardAction = {
      type: actionTypes.DELETE_CARD,
      payload: deletePayload
    };

    let finalState = { ...lastState };
    const afterDeleteToDoList = finalState.toDoList.filter(
      item => item[0] !== deletePayload.data.key
    );

    finalState.toDoList = afterDeleteToDoList;
    expect(reducer(lastState, deleteCardAction).toDoList).toEqual(
      finalState.toDoList
    );
    lastState = { ...finalState };
  });

  it("should handle FETCH LIST", () => {
    const payload = {
      data: {
        "102": { title: "New Card Added" },
        "103": { title: "New Card Added" }
      },
      meta: { listType: "TODO_LIST" }
    };
    const deleteCardAction = {
      type: actionTypes.FETCH_LIST,
      payload: payload
    };

    let finalState = { ...lastState };
    let newToDoList = [
      ...initialState.toDoList,
      ...Object.entries(payload.data)
    ];
    finalState.toDoList = newToDoList;
    expect(reducer(lastState, deleteCardAction).toDoList).toEqual(
      finalState.toDoList
    );
    lastState = { ...finalState };
  });
});
