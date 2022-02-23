import {
  ADD_EXPENCE,
  ADD_ORDER,
  SUBTRACT_ORDER,
  UPDATE_ITEM,
  ADD_ITEM,
  RESET,
  DELETE_ITEM,
  RESTORE_VALUE,
} from "../Actions/ExpencesAction";

const getInitialState = () => {
  return {
    totalExpence: 0,
    items: [
      {
        key: "milkTea",
        name: "Milk Tea",
        img: require("../assets/milkTea.jpg"),
        price: 6,
        type: "static",
      },
      {
        key: "redTea",
        name: "Red Tea",
        img: require("../assets/redTea.jpg"),
        price: 4,
        type: "static",
      },
      {
        key: "coffee",
        name: "Coffee",
        img: require("../assets/coffee.jpg"),
        price: 10,
        type: "static",
      },
      {
        key: "silkCutBlue",
        name: "Silk Cut Blue",
        img: require("../assets/cigaratte.jpg"),
        price: 5,
        type: "static",
      },
      {
        key: "goldFlakeLight",
        name: "Gold Flake Light",
        img: require("../assets/cigaratte.jpg"),
        price: 17,
        type: "static",
      },
      {
        key: "potato",
        name: "Potato",
        img: require("../assets/potato.jpg"),
        price: 10,
        type: "static",
      },
    ],
    orders: [],
  };
};

const ExpencesReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_EXPENCE:
      return {
        ...state,
        totalExpence: state.totalExpence + action.value.price,
        orders: updateOrders(state, action.value),
      };
    case ADD_ORDER:
      return {
        ...state,
        totalExpence: updateTotalExpence(state, action.value, ADD_ORDER),
        orders: addOrder(state, action.value),
      };
    case SUBTRACT_ORDER:
      return {
        ...state,
        totalExpence: updateTotalExpence(state, action.value, SUBTRACT_ORDER),
        orders: subtractOrder(state, action.value),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: saveNewItem(state, action.value),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: addNewItem(state, action.value),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: deleteItem(state, action.value),
        totalExpence: updateTotalExpenceOnDeleteItem(state, action.value),
        orders: updateOrdersOnDeleteItems(state, action.value),
      };
    case RESET:
      return {
        ...state,
        totalExpence: 0,
        orders: [],
      };
    case RESTORE_VALUE: {
      return {
        ...state,
        state: restore(state, action.value),
      };
    }
  }
  return state;
};

const updateOrders = (state, item) => {
  const orders = state.orders;
  var orderFound = false;

  orders.map((order) => {
    if (orders.length > 0 && order.key === item.key) {
      order.qty = order.qty + 1;
      order.total = item.price * order.qty;
      orderFound = true;
    }
  });
  if (!orderFound) {
    const newOrder = {
      key: item.key,
      name: item.name,
      qty: 1,
      total: item.price,
    };
    orders.push(newOrder);
  }
  return orders;
};

const addOrder = (state, order) => {
  const orders = state.orders;
  const items = state.items;
  orders.map((o) => {
    if (o.key === order.key) {
      o.qty = o.qty + 1;
      items.map((t) => {
        if (t.key === order.key) {
          o.total = t.price * o.qty;
        }
      });
    }
  });

  return orders;
};

const subtractOrder = (state, order) => {
  const orders = state.orders;
  const items = state.items;
  var updatedOrder = [];
  orders.map((o) => {
    if (o.key === order.key) {
      o.qty = o.qty > 0 ? o.qty - 1 : 0;
      items.map((t) => {
        if (t.key === order.key) {
          o.total = t.price * o.qty;
        }
      });
      if (o.qty == 0) {
        updatedOrder = orders.filter((ord) => ord.key != o.key);
      } else {
        updatedOrder = orders;
      }
    }
  });
  return updatedOrder;
};

const deleteItem = (state, item) => {
  const items = state.items;
  var updatedItems = [];
  updatedItems = items.filter((i) => i.key != item.key);
  return updatedItems;
};

const updateOrdersOnDeleteItems = (state, item) => {
  const orders = state.orders;
  var updatedOrder = [];
  updatedOrder = orders.filter((ord) => ord.key != item.key);
  return updatedOrder;
};

const updateTotalExpenceOnDeleteItem = (state, item) => {
  const orders = state.orders;
  var totalExpence = 0;
  orders.map((ord) => {
    if (ord.key === item.key) {
      totalExpence =
        state.totalExpence - ord.total > 0 ? state.totalExpence - ord.total : 0;
    }
  });

  return totalExpence;
};

const updateTotalExpence = (state, reqItem, action) => {
  const items = state.items;
  items.map((item) => {
    if (item.key === reqItem.key) {
      state.totalExpence =
        action === ADD_ORDER
          ? state.totalExpence + item.price
          : reqItem.qty > 0
          ? state.totalExpence - item.price >= 0
            ? state.totalExpence - item.price
            : 0
          : state.totalExpence;
    }
  });

  return state.totalExpence;
};

const saveNewItem = (state, newReqItem) => {
  const items = state.items;
  const reqItem = newReqItem.item;
  items.map((item) => {
    if (item.key === reqItem.key) {
      item.name = newReqItem.newItem.name;
      item.price = Number(newReqItem.newItem.price);
    }
  });
  return items;
};

const addNewItem = (state, newItem) => {
  const items = state.items;
  var itemFound = false;
  items.map((item) => {
    if (item.name === newItem.name) {
      alert("Item with same name exist");
      itemFound = true;
    }
  });
  if (!itemFound) {
    const obj = {
      key: newItem.name,
      name: newItem.name,
      img: newItem.image,
      price: Number(newItem.price),
      type: "dynamic",
    };
    items.push(obj);
    console.log("New item added with name : ", newItem.name);
  }

  return items;
};

const restore = (state, value) => {
  state.totalExpence = value.totalExpence;
  state.items = value.items;
  state.orders = value.orders;
};
export default ExpencesReducer;
