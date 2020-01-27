import React, { Component } from "react";
import { connect } from "react-redux";
import * as listConfig from "../../config/list-config";
import * as actions from "../../store/actions";
import { reorderList, reorderLists } from "../../shared/utility";
import List from "../../components/List/List";
import { DragDropContext } from "react-beautiful-dnd";
import { ulid } from "ulid";
import axios from "../../config/axios-config";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

export class Board extends Component {
  state = {
    listTypes: listConfig.listTypes
  };

  cardDnDHandler = ({ draggableId, source, destination }) => {
    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    let reorderedLists = [];
    let types = [source.droppableId];

    let sourceList = this.props[listConfig.getStateName(source.droppableId)];
    const movedData = [...sourceList].splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      reorderedLists.push(
        reorderList(sourceList, source.index, destination.index)
      );
    } else {
      let destinationList = this.props[
        listConfig.getStateName(destination.droppableId)
      ];
      types.push(destination.droppableId);
      reorderedLists = reorderLists(
        sourceList,
        destinationList,
        source.index,
        destination.index
      );
    }

    this.props.reorderLists(types, reorderedLists, movedData);
  };

  render() {
    const { listTypes } = this.state;
    return (
      <DragDropContext onDragEnd={this.cardDnDHandler}>
        {listTypes.map(listType => (
          <List
            key={listType.type + "_key"}
            type={listType.type}
            title={listType.label}
            fetchList={this.props.fetchList}
            listData={this.props[listType.stateName]}
            addCard={this.props.addCard}
            updateCard={this.props.updateCard}
            deleteCard={this.props.deleteCard}
          />
        ))}
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => {
  return {
    toDoList: state.lists.toDoList,
    pendingList: state.lists.pendingList,
    completedList: state.lists.completedList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCard: (type, cardData) =>
      dispatch(actions.addCard(type, cardData, ulid())),
    updateCard: (type, cardData, key) =>
      dispatch(actions.updateCard(type, cardData, key)),
    deleteCard: (type, key) => dispatch(actions.deleteCard(type, key)),
    fetchList: type => dispatch(actions.fetchList(type)),
    reorderLists: (types, reorderedLists, movedData) =>
      dispatch(actions.reorderLists(types, reorderedLists, movedData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Board, axios));
