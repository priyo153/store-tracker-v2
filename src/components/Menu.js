import React, { Component } from "react";
import history from "../history";

class Menu extends Component {
  render() {
    return (
      <div className="menulist">
        <div className="list-group">
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => {
              history.push("/storeForm");
            }}
          >
            Create Store
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => {
              history.push("/orderForm");
            }}
          >
            Create Order
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => {
              history.push("/storeList");
            }}
          >
            View Stores
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => {
              history.push("/OrderList");
            }}
          >
            View orders
          </button>
        </div>
      </div>
    );
  }
}

export default Menu;
