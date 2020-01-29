import React from "react";
import List from "./List";
import { shallow, mount } from "enzyme";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

describe("List Component : SHALLOW with props", () => {
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
    component = shallow(<List {...props} />);
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });

  it("should check if Droppable is provided", () => {
    expect(component.find(Droppable).length).toBe(1);
  });
});

describe("List Component : MOUNT with props", () => {
  let component;

  const props = {
    type: "TODO_LIST",
    cards: Object.entries({ tempID123: { title: "A" } }),
    updateCard: () => {},
    deleteCard: () => {},
    fetchList: () => {}
  };

  beforeEach(() => {
    component = mount(
      <DragDropContext>
        <List {...props} />
      </DragDropContext>
    );
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });
});
