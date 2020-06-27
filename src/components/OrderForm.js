import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createOrder } from "../actions";

class OrderForm extends Component {
  state = {
    orderid: "",
    selectstore: "",
    amount: 0,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    createOrder(this.state);

    this.setState({
      orderid: "",
      selectstore: "",
      amount: 0,
    });
  }
  render() {
    let storeJSX = this.props.stores.map((item, index) => {
      return (
        <option key={index} value={`"${item.id}"`}>
          {item.id + " --- " + item.name}
        </option>
      );
    });
    return (
      <div className="user-input-form " id="fadein">
        <Link to="/">
          <img
            alt="close"
            src="https://img.icons8.com/fluent/48/000000/close-window.png"
            className="mb-5"
          />
        </Link>

        <form onSubmit={this.onSubmit}>
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
              <option value="" default>
                Select
              </option>
              {storeJSX}
            </select>
          </div>

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
          </div>

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
});
export default connect(mapStateToProps, { createOrder })(OrderForm);
