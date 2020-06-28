import React, { Component } from "react";
import { connect } from "react-redux";

class OrderList extends Component {
  render() {
    //create list of order in JSX format
    let OrderItems = this.props.orders.map((item) => {
      let name;
      //find names of an order's store using store id
      for (let store of this.props.stores) {
        if (store.id === item.storeid) {
          name = store.storename;
          break;
        }
      }
      //generate the string to be displayed
      let text = `${item.orderid} from ${name ? name : item.storeid} for Rs ${
        item.amount
      }`;
      return (
        <li key={item.id} className="list-group-item">
          {text}
        </li>
      );
    });
    return (
      <div className="display-area d-flex justify-content-center">
        <div className="item-list">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2 className="pb-3 text-secondary">Order List</h2>
            </li>
            {OrderItems}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    stores: state.stores,
  };
};
export default connect(mapStateToProps)(OrderList);
