import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createOrder } from "../actions";
import { CLOSE_BUTTON_URL } from "../constants";

class OrderForm extends Component {
  state = {
    orderid: "",
    selectstore: "",
    amount: "",
    errors: {
      selectstore: "",
      orderid: "",
      amount: "",
    },
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //used in onSubmit to check if any error attribute has a message in which case the form isnt valid
  validateForm = (errors) => {
    let valid = true;

    //check for empty fields before submit
    for (let item in this.state) {
      if (this.state[item].length === 0) {
        errors[item] = "This field can not be empty";

        valid = false;
      }
    }
    if (!valid) {
      this.setState({ errors });
      return false;
    }
    //check for existing error messages before submit
    for (let item in errors) {
      if (errors[item].length > 0) {
        return false;
      }
    }
    return valid;
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    let { name, value } = e.target;
    let errors = this.state.errors;
    //validation for all fields with the appropriate error messages
    switch (name) {
      case "selectstore":
        errors.selectstore = value === "" ? "Please select a valid option" : "";

        errors.orderid = errors.orderid && value ? "" : errors.orderid;
        this.setState({ orderid: "" });

        break;
      case "orderid":
        if (!this.state.selectstore) {
          errors.orderid = "Select a store first";
          break;
        } else {
          let selectedStoreID = this.state.selectstore; //extract store id from listbox
          let orderidsForCurrentStore = this.props.orders //filter all orders using the store is and map the orderid's of the remaining orders
            .filter((item) => selectedStoreID === item.storeid)
            .map((item) => item.orderid);

          errors.orderid = orderidsForCurrentStore.includes(value) // if the user is trying to give an order id already present for the selected store then error msg displayed
            ? "Order Id is already reserved"
            : "";
        }
        break;

      case "amount":
        errors.amount =
          isNaN(value) || value < 1 ? "Amount must be a positive number" : "";
        break;
      default:
        break;
    }
    this.setState({ errors });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validateForm(this.state.errors)) {
      //passed the object into an IIFE to destructure the neeeded values through a call back function and return them back
      this.props.createOrder(
        (({ orderid, selectstore, amount }) => ({
          id: "ORD-" + (this.props.orders.length + 1),
          orderid,
          storeid: selectstore,
          amount: parseFloat(amount), //only floating numbers will be entered
        }))(this.state)
      );
      //clear out the errors and values
      this.setState({
        orderid: "",
        selectstore: "",
        amount: 0,
        errors: {
          selectstore: "",
          orderid: "",
          amount: "",
        },
      });
      alert("Order Placed successfully!");
    }
  }
  render() {
    //extracts the list of all stores and turns them into jsx to be used in the select store list box later
    let storeJSX = this.props.stores.map((item, index) => {
      return (
        <option key={index} value={`${item.id}`}>
          {item.id + " --- " + item.storename}
        </option>
      );
    });

    return (
      <div className="user-input-form " id="fadein">
        {/**-------------Close button----------------------------- */}
        <Link to="/">
          <img alt="close" src={CLOSE_BUTTON_URL} className="mb-5" />
        </Link>

        <form onSubmit={this.onSubmit}>
          {/*--------------------------------select store field---------------------------------------------------*/}
          <div className="form-group">
            <label htmlFor="selectstore">Select Store</label>
            <select
              className="form-control"
              id="selectstore"
              name="selectstore"
              aria-describedby="select store"
              placeholder="Select Store"
              onChange={this.onChange}
              value={this.state.selectstore}
            >
              {/**default option */}
              <option value="" default>
                Select
              </option>
              {storeJSX}
            </select>

            {this.state.errors.selectstore && (
              <span className="text-danger ">
                {this.state.errors.selectstore}
              </span>
            )}
          </div>
          {/*-------------------order id field------------------------------------- */}
          <div className="form-group">
            <label htmlFor="orderid">Order ID</label>
            <input
              type="text"
              className="form-control"
              id="orderid"
              name="orderid"
              placeholder="Order ID"
              onChange={this.onChange}
              value={this.state.orderid}
            />
            {this.state.errors.orderid && (
              <span className="text-danger ">{this.state.errors.orderid}</span>
            )}
          </div>

          {/*-----------------amount field--------------------------------------- */}
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              placeholder="Amount"
              onChange={this.onChange}
              value={this.state.amount}
            />
            {this.state.errors.amount && (
              <span className="text-danger ">{this.state.errors.amount}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
let mapStateToProps = (state) => ({
  stores: state.stores,
  storeids: state.stores.map((item) => item.id),
  orders: state.orders,
});
export default connect(mapStateToProps, { createOrder })(OrderForm);
