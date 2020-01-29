import React, { Component } from "react";
import Cards from "./Cards";
import Card from "./Card/Card";
import { shallow, mount } from "enzyme";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

describe("Cards Component : SHALLOW with props", () => {
  let component;
  const props = {
    type: "TODO_LIST",
    cards: Object.entries({
      tempID123: { title: "A" },
      tempID124: { title: "A" }
    }),
    updateCard: () => {},
    deleteCard: () => {}
  };

  beforeEach(() => {
    component = shallow(<Cards {...props} />);
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });

  it("should check if Draggable is provided", () => {
    expect(component.find(Draggable).length).toBe(2);
  });
});

describe("List Component : MOUNT with props", () => {
  let component;

  const props = {
    type: "TODO_LIST",
    cards: Object.entries({ tempID123: { title: "A" } }),
    updateCard: () => {},
    deleteCard: () => {}
  };

  const DragDropContextProvider = ComponentToWrap => {
    return class Provider extends Component {
      render() {
        return (
          <DragDropContext>
            <Droppable>
              <ComponentToWrap {...this.props} />
            </Droppable>
          </DragDropContext>
        );
      }
    };
  };

  beforeEach(() => {
    component = mount(
      <DragDropContextProvider>
        <Cards {...props} />
      </DragDropContextProvider>
    );
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });
});
