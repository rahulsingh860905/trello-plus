import React from "react";
import ConnectedBoard, { Board } from "./Board";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { getInitialState } from "../../config/list-config";

import reduxThunk from "redux-thunk";

describe(">>>BOARD --- SHALLOW RENDER REACT COMPONENT", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Board />);
  });

  it("+++ render the DUMB component", () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe(">>>BOARD --- REACT-REDUX (Mount + wrapping in <Provider>)", () => {
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

  it("+++ render the connected(SMART) component", () => {
    expect(wrapper.find(ConnectedBoard).length).toEqual(1);
  });

  it("+++ check Prop matches with initialState", () => {
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
});
