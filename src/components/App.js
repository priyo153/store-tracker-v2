import React, { Component } from "react";
import { Route, Router, Switch } from "react-router-dom";
import Header from "./Header";
import history from "../history";
import Menu from "./Menu";
import MapArea from "./MapArea";
import StoreList from "./StoreList";
import OrderList from "./OrderList";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <div className="contents">
          <Switch>
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
export default App;
