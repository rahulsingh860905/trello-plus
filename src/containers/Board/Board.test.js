import React from "react";
import List from "../../components/List/List";
import ConnectedBoard, { Board } from "./Board";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { getInitialState } from "../../config/list-config";
import { DragDropContext } from "react-beautiful-dnd";
import * as actions from "../../store/actions";
import * as actionTypes from "../../store/actions/actionTypes";

import reduxThunk from "redux-thunk";

describe("Board Component : SHALLOW with props", () => {
  let component;

  const props = {
    type: "TODO_LIST",
    listData: Object.entries({ tempID123: { title: "A" } }),
    addCard: () => {},
    updateCard: () => {},
    deleteCard: () => {},
    fetchList: () => {}
  };

  beforeEach(() => {
    component = shallow(<Board {...props} />);
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });

  it("should check if DragDropContext is provided", () => {
    expect(component.find(DragDropContext).length).toBe(1);
  });

  it("should check if DragDropContext is provided", () => {
    expect(component.find(List).length).toBe(3);
  });
});

describe("Board Component : MOUNT with <Provider>)", () => {
  const initialState = { lists: getInitialState() };
  const middlerWare = [reduxThunk];
  const mockStore = configureStore(middlerWare);
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <ConnectedBoard />
      </Provider>
    );
  });

  it("should render the connected(SMART) component", () => {
    expect(wrapper.find(ConnectedBoard).length).toEqual(1);
  });

  it("check if props matches with initialState", () => {
    expect(wrapper.find(Board).prop("toDoList")).toEqual(
      initialState.lists.toDoList
    );
    expect(wrapper.find(Board).prop("pendingList")).toEqual(
      initialState.lists.toDoList
    );
    expect(wrapper.find(Board).prop("completedList")).toEqual(
      initialState.lists.completedList
    );
  });

  it("check default actions and action on dispatching ", () => {
    let action;
    action = store.getActions();
    store.dispatch(actions.fetchList());
    store.dispatch(actions.addCard());
    expect(action[0].type).toBe(actionTypes.FETCH_LIST);
    expect(action[1].type).toBe(actionTypes.FETCH_LIST);
    expect(action[2].type).toBe(actionTypes.FETCH_LIST);
    expect(action[3].type).toBe(actionTypes.FETCH_LIST);
    expect(action[4].type).toBe(actionTypes.ADD_CARD);
  });
});
