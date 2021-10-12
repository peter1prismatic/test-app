import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import MyButton from "../utils/MyButton";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { Button } from "./lib";
import "./CreateProfile.css";
import Form from "./Todo/Form";
import TodoApp from "./Todo/TodoApp";
import DocSend from "./DocSend";
import { useParams } from "react-router-dom";

export default function CreateProfile() {
  let { firmName } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log("User from redux: ");
  console.log(user);

  const [videoNum, setVideoNum] = useState(1);
  const [videoUrl, setVideoUrl] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [todos, setTodos] = useState();

  const { token } = useAuth();

  const bearerToken = `Bearer ${token}`;

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "multipart/form-data",
      },
    };
  }, [bearerToken]);

  useEffect(() => {
    console.log("config...");
    console.log(config);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
      .then((res) => {
        console.log("got the user");
        console.log(res.data);
        console.log("dispatching...");

        dispatch(setUser(res.data));
        setVideoUrl(res.data.credentials.videoUrl1);
        setLogoUrl(res.data.credentials.logo);
        setTodos(res.data.todos);
      })
      .catch((err) => console.log(err));
  }, [config, dispatch, user.credentials.videoUrl1]);

  function getUser() {
    console.log("video num");
    console.log(videoNum);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
      .then((res) => {
        console.log("got the user");
        console.log(res.data);
        console.log("dispatching...");

        setLogoUrl(res.data.credentials.logo);
        dispatch(setUser(res.data));
        switch (videoNum) {
          case 1:
            setVideoUrl(res.data.credentials.videoUrl1);

            break;
          case 2:
            setVideoUrl(res.data.credentials.videoUrl2);

            break;
          case 3:
            setVideoUrl(res.data.credentials.videoUrl3);

            break;
          case 4:
            setVideoUrl(res.data.credentials.videoUrl4);

            break;
          case 5:
            console.log("setting video 5 url");
            console.log(res.data.credentials.videoUrl5);
            setVideoUrl(res.data.credentials.videoUrl5);

            break;
          default:
            setVideoUrl(res.data.credentials.videoUrl1);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleVideoChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log("Image details:");
    console.log(image);
    formData.append("video", image, image.name);

    console.log("form Data");
    console.log(formData);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/video${videoNum}`,
        formData,
        config
      )
      .then(() => {
        console.log("image uploaded");
        getUser();

        // handleButtonClick(videoNum);
      })
      .catch((err) => {
        console.log("Image upload failed");
        console.log(err);
        console.log(err.message);
      });
  };
  const handleEditVideo = () => {
    const fileInput = document.getElementById("videoInput");
    fileInput.click();
  };

  const handleLogoChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log("Image details:");
    console.log(image);
    formData.append("logo", image, image.name);

    console.log("form Data");
    console.log(formData);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/logo`, formData, config)
      .then(() => {
        console.log("logo uploaded");
        getUser();

        // handleButtonClick(videoNum);
      })
      .catch((err) => {
        console.log("Image upload failed");
        console.log(err);
        console.log(err.message);
      });
  };
  const handleEditLogo = () => {
    const fileInput = document.getElementById("logoInput");
    fileInput.click();
  };

  const handleLogout = () => {
    this.props.logoutUser();
  };

  const handleButtonClick = (num) => {
    console.log("handle submit triggered");
    console.log(num);
    switch (num) {
      case 1:
        setVideoUrl(user.credentials.videoUrl1);
        setVideoNum(1);
        break;
      case 2:
        setVideoUrl(user.credentials.videoUrl2);
        setVideoNum(2);
        break;
      case 3:
        setVideoUrl(user.credentials.videoUrl3);
        setVideoNum(3);
        break;
      case 4:
        setVideoUrl(user.credentials.videoUrl4);
        setVideoNum(4);
        break;
      case 5:
        console.log("setting video 5 url");
        console.log(user.credentials.videoUrl5);
        setVideoUrl(user.credentials.videoUrl5);
        setVideoNum(5);
        break;
      case 6:
        setVideoNum(6);
        break;
      default:
        setVideoUrl(user.credentials.videoUrl1);
        setVideoNum(1);
    }
  };

  return (
    <div className="profile-container">
      <div className="user-header-container">
        <img
          className="user-logo"
          src={logoUrl}
          alt="logo"
          onClick={handleEditLogo}
        />
        <input
          type="file"
          id="logoInput"
          hidden="hidden"
          onChange={handleLogoChange}
        />
        <h2>PK CAPITAL</h2>
      </div>

      <div className="main-body-container">
        <div className="inner-main-container">
          <div className="video-tabs">
            <button
              style={{ fontWeight: videoNum === 1 ? 700 : "normal" }}
              className="button-tabs"
              onClick={() => handleButtonClick(1)}
            >
              Founder Background
            </button>
            <div style={{ fontSize: 30, fontWeight: 200 }}> | </div>
            <button
              style={{ fontWeight: videoNum === 2 ? 700 : "normal" }}
              className="button-tabs"
              onClick={() => handleButtonClick(2)}
            >
              Firm Background
            </button>
            <div style={{ fontSize: 30, fontWeight: 200 }}> | </div>
            <button
              style={{ fontWeight: videoNum === 3 ? 700 : "normal" }}
              className="button-tabs"
              onClick={() => handleButtonClick(3)}
            >
              Investment Strategy
            </button>
            <div style={{ fontSize: 30, fontWeight: 200 }}> | </div>
            <button
              style={{ fontWeight: videoNum === 4 ? 700 : "normal" }}
              className="button-tabs"
              onClick={() => handleButtonClick(4)}
            >
              The NFX Advantage
            </button>
            <div style={{ fontSize: 30, fontWeight: 200 }}> | </div>
            <button
              style={{ fontWeight: videoNum === 5 ? 700 : "normal" }}
              className="button-tabs"
              onClick={() => handleButtonClick(5)}
            >
              Special Topic
            </button>
            <div style={{ fontSize: 30, fontWeight: 200 }}> | </div>
            <button
              style={{ fontWeight: videoNum === 6 ? 700 : "normal" }}
              className="button-tabs"
              onClick={() => handleButtonClick(6)}
            >
              Request more material
            </button>
            {/* <LockIcon /> */}
          </div>
          <div className="image-wrapper">
            {videoNum === 6 ? (
              <DocSend />
            ) : (
              <div className="inner-inner-video-container">
                <video
                  className="video-component"
                  src={videoUrl}
                  controls
                ></video>
                <div className="edit-button2">
                  <input
                    type="file"
                    id="videoInput"
                    hidden="hidden"
                    onChange={handleVideoChange}
                  />
                  <MyButton
                    tip="Edit video"
                    onClick={handleEditVideo}
                    btnClassName="button"

                    // style={{ width: 20, height: 20 }}
                  >
                    <EditIcon color="primary" />
                  </MyButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div className="transcript-container">
          <div className="fake-30"></div>
          <div className="transcript-section">
            <h3>Transcript</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              congue eros sed facilisis pretium. Duis blandit feugiat rutrum.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Ut tempor lorem egestas risus mattis
              pretium. Aliquam sagittis, felis aliquet efficitur scelerisque,
              purus dui tincidunt mauris, sit amet rhoncus mi sapien sed sapien.
              Morbi porta sapien quis libero volutpat volutpat. Vestibulum
              tincidunt magna vel arcu ornare malesuada. Aliquam fermentum nunc
              non mauris varius sodales. Sed vitae volutpat magna. Duis nec ex
              enim.
            </p>
          </div>
        </div> */}
      </div>

      <div className="profile-body">
        {/* <div className="image-wrapper">
          <video src={videoUrl} controls></video>
          <input
            type="file"
            id="videoInput"
            hidden="hidden"
            onChange={handleVideoChange}
          />
          <MyButton
            tip="Edit video"
            onClick={handleEditVideo}
            btnClassName="button"
          >
            <EditIcon color="primary" />
          </MyButton>
        </div> */}
      </div>
    </div>
  );
}
