import React, { Component } from "react";
import OrderForm from "./OrderForm";
import StoreForm from "./StoreForm";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { connect } from "react-redux";
import {
  DEFAULT_LNG,
  DEFAULT_LAT,
  MAP_ZOOM,
  API_KEY,
  ICON_URL,
  ICON_SIZE,
} from "../constants";

class MapArea extends Component {
  state = {};

  constructor() {
    super();

    //determine the location of the user from the system and position the map to that location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          startLat: position.coords.latitude,
          startLng: position.coords.longitude,
        });
      });
    }
  }

  //provides the icon details
  iconMarker = new window.google.maps.MarkerImage(
    ICON_URL, // image URL for icon
    null /* size is determined at runtime */,
    null /* origin is 0,0 */,
    null /* anchor is bottom center of the scaled image */,
    new window.google.maps.Size(ICON_SIZE, ICON_SIZE)
  );

  //find the number of orders for a given store id
  getOrderCountForStore = (id) => {
    let orders = this.props.orders.filter((order) => order.storeid === id);
    return orders.length;
  };

  // take coords from store and renders the markers in jsx format
  markerRender = () => {
    let markerJSX = this.props.stores.map((store) => {
      return (
        <Marker
          icon={this.iconMarker}
          key={store.id}
          position={{ lat: store.lat, lng: store.lng }}
          label={`${this.getOrderCountForStore(store.id)}`}
          title={`${store.storename} has got ${this.getOrderCountForStore(
            store.id
          )} order(s)`}
          onClick={() => {
            alert(
              `${store.storename} has got ${this.getOrderCountForStore(
                store.id
              )} order(s)`
            );
          }}
        ></Marker>
      );
    });

    return markerJSX;
  };

  //render the Google Map object
  displayGoogleMap = (lat, lng) => {
    let mapStyles = {
      height: "100%",
      width: "100%",
    };
    if (lat === undefined || lng === undefined) {
      lat = DEFAULT_LAT;
      lng = DEFAULT_LNG;
    }
    return (
      <Map
        className="googlemap"
        google={this.props.google}
        zoom={MAP_ZOOM}
        style={mapStyles}
        initialCenter={{
          lat: lat,
          lng: lng,
        }}
      >
        {this.markerRender()}
      </Map>
    );
  };

  render() {
    let form;
    const { startLat, startLng } = this.state;
    let googlemap = this.displayGoogleMap(startLat, startLng); //generate jsx for google map

    //depending on the props provided in app.js either render the order form or the store form
    if (this.props.display === "orderform") {
      form = <OrderForm />;
    } else if (this.props.display === "storeForm") {
      form = <StoreForm />;
    }

    return (
      <div className="display-area">
        {googlemap}
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stores: state.stores,
  orders: state.orders,
});
export default GoogleApiWrapper({
  apiKey: API_KEY,
})(connect(mapStateToProps)(MapArea));
