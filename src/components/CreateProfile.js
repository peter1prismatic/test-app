import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import MyButton from "../utils/MyButton";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";

export default function CreateProfile() {
  const [user, setUser] = useState();

  const { token } = useAuth();

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    const bearerToken = `Bearer ${token}`;
    console.log("bearer token: ");
    console.log(bearerToken);
    let config = {
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/image`, formData, config)
      .then(() => {
        // dispatch(getUserData());
        console.log("image uploaded");
      })
      .catch((err) => console.log(err));
    // this.props.uploadImage(formData);
  };
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleLogout = () => {
    this.props.logoutUser();
  };

  return (
    <>
      <h1>Create profile page</h1>

      <div className="image-wrapper">
        {/* <img src={imageUrl} alt="profile" className="profile-image" /> */}
        <input
          type="file"
          id="imageInput"
          hidden="hidden"
          onChange={handleImageChange}
        />
        <MyButton
          tip="Edit profile picture"
          onClick={handleEditPicture}
          btnClassName="button"
        >
          <EditIcon color="primary" />
        </MyButton>
      </div>
    </>
  );
}
