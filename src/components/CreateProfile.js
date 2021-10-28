import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import MyButton from "../utils/MyButton";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { Button } from "./lib";
import "./CreateProfile.css";
import DocSend from "./DocSend";
import { useParams } from "react-router-dom";
import ManageEmailAccessList from "./ManageEmailAccessList";
import FirmName from "./FirmName";
import Footer from "./Footer";
import Delayed from "./Delayed";

export default function CreateProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const videoInputRef = useRef();

  const [videoNum, setVideoNum] = useState(1);
  const [videoUrl, setVideoUrl] = useState(user.credentials.videoUrl1);
  const [logoUrl, setLogoUrl] = useState(user.credentials.logo);
  const [firmName, setFirmName] = useState(user.credentials.firmName);

  console.log("User: ");
  console.log(user);

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

  function getUser() {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
      .then((res) => {
        console.log("res.data");
        console.log(res.data);
        setLogoUrl(res.data.logo);
        dispatch(setUser(res.data));
        switch (videoNum) {
          case 1:
            setVideoUrl(res.data.videoUrl1);

            break;
          case 2:
            setVideoUrl(res.data.videoUrl2);

            break;
          case 3:
            setVideoUrl(res.data.videoUrl3);

            break;
          case 4:
            setVideoUrl(res.data.videoUrl4);

            break;
          case 5:
            setVideoUrl(res.data.videoUrl5);

            break;
          default:
            setVideoUrl(res.data.videoUrl1);
        }
      })
      .catch((err) => console.log(err));
  }

  const handleVideoChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    console.log("helloooo");

    formData.append("video", image, image.name);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/video${videoNum}`,
        formData,
        config
      )
      .then(() => {
        getUser();

        // handleButtonClick(videoNum);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleEditVideo = () => {
    const fileInput = videoInputRef.current;
    console.log("helloooo1");
    console.log(fileInput);
    fileInput.click();
  };

  const handleLogoChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();

    console.log("hey1");

    formData.append("logo", image, image.name);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/logo`, formData, config)
      .then(() => {
        console.log("logo uploaded");
        getUser();

        // handleButtonClick(videoNum);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleEditLogo = () => {
    const fileInput = document.getElementById("logoInput");
    console.log("hey");
    fileInput.click();
  };

  const handleButtonClick = (num) => {
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
        {/* <h2 onClick={handleEditFirmName}>{firmName.toUpperCase()}</h2> */}
        <FirmName firmName={firmName} />
        <ManageEmailAccessList />
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
          </div>
          <div className="image-wrapper">
            {videoNum === 6 ? (
              <DocSend />
            ) : (
              <div className="inner-inner-video-container">
                {videoUrl === "" ? (
                  <div className="upload-video">Upload video</div>
                ) : (
                  <video
                    height="236"
                    preload="auto"
                    className="video-component"
                    src={videoUrl}
                    controls
                  ></video>
                )}
                <div className="edit-button2">
                  <input
                    ref={videoInputRef}
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
