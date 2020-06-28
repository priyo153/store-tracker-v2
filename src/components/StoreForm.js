import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createStore } from "../actions";
import { connect } from "react-redux";
import { CLOSE_BUTTON_URL } from "../constants";

class StoreForm extends Component {
  state = {
    file: "",
    storename: "",
    lat: "",
    lng: "",
    filename: "choose file",

    errors: {
      file: "",
      storename: "",
      lat: "",
      lng: "",
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
  //used to chek if the user provided a valid url or not
  validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    let { name, value } = e.target;
    let errors = this.state.errors;

    //validation on client side
    switch (name) {
      case "file":
        errors.file = this.validURL(value) ? "" : "must be a valid URL";
        break;
      case "storename":
        errors.storename =
          value.length > 3 ? "" : "must be atleast 4 characters long";
        break;
      case "lat":
        errors.lat = isNaN(value) ? "Latitude must be a number" : "";
        break;
      case "lng":
        errors.lng = isNaN(value) ? "Longitude must be a number" : "";
        break;
      default:
        break;
    }

    this.setState({ errors });
  }
  onSubmit(e) {
    e.preventDefault();

    //if form has error messages do nothing
    if (this.validateForm(this.state.errors)) {
      //passed the object into an IIFE to destructure the neeeded values through a call back function and return them back
      this.props.createStore(
        (({ file, storename, lat, lng }) => ({
          id: "ST-" + this.props.stores.length,
          file,
          storename,
          lat,
          lng,
        }))(this.state)
      );

      this.setState({
        filename: "Choose File",
        file: "",
        storename: "",
        lat: "",
        lng: "",
        errors: {
          file: "",
          storename: "",
          lat: "",
          lng: "",
        },
      });

      alert("Store created successfully!");
    }
  }

  render() {
    return (
      <div className="user-input-form " id="fadein">
        <Link to="/">
          <img alt="close" src={CLOSE_BUTTON_URL} className="mb-2" />
        </Link>

        {/**----------------thumbnail image--------------------------------------- */}
        <form onSubmit={this.onSubmit}>
          <div className="d-flex justify-content-center">
            <div
              className="thumbnail mb-2"
              style={{ backgroundImage: `url(${this.state.file})` }}
            />
          </div>
          {/*----------------------file field-------------------------------------- */}
          <div className="form-group ">
            <label htmlFor="file">Store Image URL</label>
            <input
              type="text"
              className="form-control"
              id="file"
              name="file"
              aria-describedby="file"
              placeholder="Store File URL "
              onChange={this.onChange}
              value={this.state.file}
            />
            {this.state.errors.file && (
              <span className="text-danger ">{this.state.errors.file}</span>
            )}
          </div>
          {/**---------------store name field----------------------------- */}
          <div className="form-group ">
            <label htmlFor="storename">Store Name</label>
            <input
              type="text"
              className="form-control"
              id="storename"
              name="storename"
              aria-describedby="emailHelp"
              placeholder="Store Name "
              onChange={this.onChange}
              value={this.state.storename}
            />
            {this.state.errors.storename && (
              <span className="text-danger ">
                {this.state.errors.storename}
              </span>
            )}
          </div>
          {/*------Latitude field-------------------------- */}
          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              className="form-control"
              id="latitude"
              placeholder="Latitude"
              name="lat"
              onChange={this.onChange}
              value={this.state.lat}
            />
            {this.state.errors.lat && (
              <span className="text-danger ">{this.state.errors.lat}</span>
            )}
          </div>

          {/*----------------------longitude field-----------------------------------*/}
          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              className="form-control"
              id="longitude"
              placeholder="Longitude"
              name="lng"
              onChange={this.onChange}
              value={this.state.lng}
            />
            {this.state.errors.lng && (
              <span className="text-danger ">{this.state.errors.lng}</span>
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
let mapStateToProps = (state) => {
  return {
    stores: state.stores,
  };
};
export default connect(mapStateToProps, { createStore })(StoreForm);
