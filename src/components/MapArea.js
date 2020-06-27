import React, { Component } from "react";
import OrderForm from "./OrderForm";
import StoreForm from "./StoreForm";

class MapArea extends Component {
  render() {
    let form;
    if (this.props.display === "orderform") {
      form = <OrderForm />;
    } else if (this.props.display === "storeForm") {
      form = <StoreForm />;
    }
    return <div className="display-area">{form}</div>;
  }
}
export default MapArea;
