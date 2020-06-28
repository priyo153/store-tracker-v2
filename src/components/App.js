import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";
import Menu from "./Menu";
import MapArea from "./MapArea";
import StoreList from "./StoreList";
import OrderList from "./OrderList";
import { getStores, getOrders } from "../actions";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super(props);
    //load all stores and orders in state on opening website
    props.getStores();
    props.getOrders();
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <div className="contents">
          <Switch>
            {/**---------route for homepage--------------- */}
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <Menu />
                  <MapArea />
                </React.Fragment>
              )}
            />
            {/**---------route for order form--------------- */}
            <Route
              path="/orderForm"
              exact
              render={() => (
                <React.Fragment>
                  <Menu />
                  <MapArea display="orderform" />
                </React.Fragment>
              )}
            />
            {/**---------route for store form--------------- */}
            <Route
              path="/storeForm"
              exact
              render={() => (
                <React.Fragment>
                  <Menu />
                  <MapArea display="storeForm" />
                </React.Fragment>
              )}
            />

            {/**---------route for store List--------------- */}
            <Route
              path="/storeList"
              exact
              render={() => (
                <React.Fragment>
                  <Menu />
                  <StoreList />
                </React.Fragment>
              )}
            />

            {/**---------route for order List--------------- */}
            <Route
              path="/OrderList"
              exact
              render={() => (
                <React.Fragment>
                  <Menu />
                  <OrderList />
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
let mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getOrders, getStores })(App);
