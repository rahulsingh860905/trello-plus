import React from "react";
import List from "./List";
import { shallow } from "enzyme";

describe("List Component", () => {
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
});
