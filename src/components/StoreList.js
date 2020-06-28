import React, { Component } from "react";
import { connect } from "react-redux";
//import { connect } from "react-redux";

class StoreList extends Component {
  render() {
    //create a list of stores in jsx format
    let storeNames = this.props.stores.map((item) => {
      let text = `${item.id} ---  ${item.storename} `;
      return (
        <li key={item.id} className="list-group-item">
          {text}
        </li>
      );
    });

    return (
      <div className="display-area">
        <div className="item-list">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h2 className="pb-3 text-secondary">Store List</h2>
            </li>
            {storeNames}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    stores: state.stores,
  };
};
export default connect(mapStateToProps)(StoreList);
