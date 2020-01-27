import React, { Component } from "react";
import Cards from "./Cards/Cards";
import { Droppable } from "react-beautiful-dnd";

class List extends Component {
  state = {
    enableAdd: false,
    cardTitleValue: ""
  };

  inputChangeHandler = e => {
    if (e.target.value.length > 0) {
      this.setState({ enableAdd: true, cardTitleValue: e.target.value });
    } else {
      this.setState({ enableAdd: false, cardTitleValue: e.target.value });
    }
  };

  addCard = e => {
    const { cardTitleValue } = this.state;
    this.props.addCard(this.props.type, { title: cardTitleValue });
    e.preventDefault();
    this.setState({ enableAdd: false, cardTitleValue: "" });
  };

  renderList() {
    const { listData } = this.props;
    const { cardTitleValue } = this.state;
    return (
      <div className="list">
        <h3 className="list-title">{this.props.title}</h3>
        <Droppable droppableId={this.props.type}>
          {provided => (
            <div ref={provided.innerRef}>
              {listData ? (
                <Cards
                  key={"list_" + this.props.type}
                  type={this.props.type}
                  cards={listData}
                  updateCard={(cardData, keyString) =>
                    this.props.updateCard(this.props.type, cardData, keyString)
                  }
                  deleteCard={keyString =>
                    this.props.deleteCard(this.props.type, keyString)
                  }
                />
              ) : null}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="new-card-field-wrap">
          <input
            type="text"
            placeholder="Enter Task Name"
            className="new-card-field"
            value={cardTitleValue}
            onChange={this.inputChangeHandler}
          />
          <button
            className="add-card-btn btn"
            disabled={this.state.enableAdd ? "" : "disabled"}
            onClick={this.addCard}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.fetchList(this.props.type);
  }

  render() {
    return this.renderList();
  }
}

export default List;
