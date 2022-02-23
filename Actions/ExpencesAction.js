export const ADD_EXPENCE = "ADD_EXPENCE";
export const ADD_ORDER = "ADD_ORDER";
export const SUBTRACT_ORDER = "SUBTRACT_ORDER";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ITEM = "DELETE_ITEM";
export const RESET = "RESET";
export const RESTORE_VALUE = "RESTORE_VALUE";

export const addExpence = (item) => {
  return {
    type: ADD_EXPENCE,
    value: item,
  };
};

export const addOrder = (item) => {
  return {
    type: ADD_ORDER,
    value: item,
  };
};

export const subtractOrder = (item) => {
  return {
    type: SUBTRACT_ORDER,
    value: item,
  };
};

export const updateItem = (item, newItem) => {
  return {
    type: UPDATE_ITEM,
    value: { item: item, newItem: newItem },
  };
};

export const addNewItem = (newItem) => {
  return {
    type: ADD_ITEM,
    value: newItem,
  };
};

export const deleteCurrentItem = (item) => {
  return {
    type: DELETE_ITEM,
    value: item,
  };
};

export const resetExpences = () => {
  return {
    type: RESET,
  };
};

export const restoreStateValue = (state) => {
  return {
    type: RESTORE_VALUE,
    value: state,
  };
};
