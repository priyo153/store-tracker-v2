import React, { Component } from "react";
import { Link } from "react-router-dom";
import { createStore } from "../actions";
import { connect } from "react-redux";

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
      console.log(this.state);
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

    //validation on client side
    switch (name) {
      case "storename":
        errors.storename =
          value.length > 3 ? "" : "must be atleast 4 characters long";
        break;
      case "lat":
        errors.lat =
          isNaN(value) || value < 0 ? "Latitude must be a positive number" : "";
        break;
      case "lng":
        errors.lng =
          isNaN(value) || value < 0
            ? "Longitude must be a positive number"
            : "";
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
      console.log("submit");

      //passed the object into an IIFE to destructure the neeeded values through a call back function and return them back
      this.props.createStore(
        (({ file, storename, lat, lng }) => ({
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
    }
  }

  render() {
    return (
      <div className="user-input-form" id="fadein">
        <Link to="/">
          <img
            alt="close"
            src="https://img.icons8.com/fluent/48/000000/close-window.png"
            className="mb-5"
          />
        </Link>

        <form onSubmit={this.onSubmit}>
          {/*----------------------file field-------------------------------------- */}
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="file"
              onChange={(e) => {
                console.log(e.target.files.item(0));
                let file = e.target.files ? e.target.files.item(0) : "";
                if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                  this.setState({
                    filename: e.target.value.split("\\").pop(),
                    file,
                    errors: { ...this.state.errors, file: "" },
                  });
                } else {
                  this.setState({
                    file: "",
                    filename: "choose file",
                    errors: { ...this.state.errors, file: "Bad File selected" },
                  });
                }
              }}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {this.state.filename}
            </label>
            {this.state.errors.file && (
              <span className="text-danger ">{this.state.errors.file}</span>
            )}
          </div>

          {/*---------------------------store name field---------------------------------*/}

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

          {/*----------------------latitude field-----------------------------------*/}

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
let mapStateToProps = () => {
  return {};
};
export default connect(mapStateToProps, { createStore })(StoreForm);
