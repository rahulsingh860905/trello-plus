import React from "react";
import Cards from "./Cards";
import { shallow } from "enzyme";

describe("Cards Component", () => {
  let component;
  const props = {
    type: "TODO_LIST",
    cards: Object.entries({ tempID123: { title: "A" } }),
    updateCard: () => {},
    deleteCard: () => {}
  };

  beforeEach(() => {
    component = shallow(<Cards {...props} />);
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });
});
