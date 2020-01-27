import React from "react";
import Card from "./Card";
import { shallow } from "enzyme";

describe("Card Component", () => {
  let component;
  const props = {
    todo: { title: "A" },
    updateCard: () => {},
    deleteCard: () => {}
  };

  beforeEach(() => {
    component = shallow(<Card {...props} />);
  });

  it("should render this component", () => {
    expect(component.length).toEqual(1);
  });

  it("should check for initial state with the prop value", () => {
    expect(component.state("editable")).toEqual(false);
    expect(component.state("cardTitleValue")).toEqual("A");
  });

  // it("should check state change when edit icon is clicked", () => {
  //   const editIcon = component.find(".fa-edit");
  //   editIcon.props().onClick();
  //   expect(component.state("editable")).toEqual(true);
  // });

  it("should check state change when input is changed", () => {
    const editIcon = component.find(".list-item-field");
    editIcon.props().onChange({
      target: {
        value: "B"
      }
    });
    expect(component.state("cardTitleValue")).toEqual("B");
  });

  it("should check state change when save icon is clicked", () => {
    const editIcon = component.find(".saveBtn");
    editIcon.props().onClick();
    expect(component.state("editable")).toEqual(false);
  });

  it("should check state change when delete icon is clicked", () => {
    const editIcon = component.find(".fa-trash-alt");
    editIcon.props().onClick();
  });
});
