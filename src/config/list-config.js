export const TODO_LIST = "TODO_LIST";
export const PENDING_LIST = "PENDING_LIST";
export const COMPLETED_LIST = "COMPLETED_LIST";

export const listTypes = [
  { type: TODO_LIST, label: "Tasks To Do", stateName: "toDoList" },
  {
    type: PENDING_LIST,
    label: "Pending Tasks",
    stateName: "pendingList"
  },
  {
    type: COMPLETED_LIST,
    label: "Completed Tasks",
    stateName: "completedList"
  }
];

export const getInitialState = () => {
  let state = {};
  listTypes.forEach(element => {
    state[element.stateName] = [];
  });
  return state;
};

export const getStateName = type => {
  let stateName = null;
  listTypes.forEach(element => {
    if (element.type === type) {
      stateName = element.stateName;
    }
  });
  return stateName;
};

export const getStateFromListType = (state, listType) => {
  return state[getStateName(listType)];
};

export const updateList = (state, data, listType) => {
  let newState = {};
  newState[getStateName(listType)] = data;
  return { ...state, ...newState };
};
