import React, { Component } from "react";
import classNames from "classnames";

class Card extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  state = {
    editable: false,
    enableSave: true,
    cardTitleValue: this.props.todo.title
  };

  editCard = () => {
    this.setState({ editable: true });
  };

  componentDidUpdate() {
    if (this.state.editable) {
      this.inputRef.current.focus();
    }
  }

  updateCard = () => {
    const { cardTitleValue } = this.state;
    this.setState({ editable: false });
    this.props.updateCard({ title: cardTitleValue });
  };

  deleteCard = () => {
    this.props.deleteCard();
  };

  inputChangeHandler = e => {
    if (e.target.value.length > 0) {
      this.setState({ enableSave: true, cardTitleValue: e.target.value });
    } else {
      this.setState({ enableSave: false, cardTitleValue: e.target.value });
    }
  };

  render() {
    const { cardTitleValue } = this.state;
    return (
      <div
        type={this.props.type}
        className={classNames("list-item", {
          editable: this.state.editable
        })}
      >
        <div className="list-name-block">
          <label>{cardTitleValue}</label>
          <input
            ref={this.inputRef}
            className="list-item-field"
            value={cardTitleValue}
            onChange={this.inputChangeHandler}
            type="text"
          />
          <button
            className="save-card-btn btn saveBtn"
            disabled={this.state.enableSave ? "" : "disabled"}
            onClick={this.updateCard}
          >
            Save
          </button>
        </div>
        <div className="control-icons">
          <i className="fas fa-edit" onClick={this.editCard}></i>
          <i className="far fa-trash-alt" onClick={this.deleteCard}></i>
        </div>
      </div>
    );
  }
}

export default Card;
