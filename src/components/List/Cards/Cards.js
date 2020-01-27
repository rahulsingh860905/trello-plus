import React, { Component } from "react";
import Card from "./Card/Card";
import { Draggable } from "react-beautiful-dnd";

class Cards extends Component {
  render() {
    return (
      <div className="list-items" key={"cards_" + this.props.type}>
        {this.props.cards.map((item, index) => {
          const [id, data] = item;
          return (
            <Draggable key={id} draggableId={id} index={index}>
              {provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card
                    key={"card_" + this.props.type + id}
                    type={this.props.type}
                    todo={data}
                    updateCard={cardData => this.props.updateCard(cardData, id)}
                    deleteCard={() => this.props.deleteCard(id)}
                  />
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
    );
  }
}

export default Cards;
