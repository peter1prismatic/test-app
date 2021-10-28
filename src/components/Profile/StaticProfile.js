import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import StaticDocSend from "../StaticDocSend";
import "./StaticProfile.css";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import ButtonsSection from "./ButtonsSection";
import LockedMaterials from "./LockedMaterials";
import BounceLoader from "react-spinners/BounceLoader";

export default function StaticProfile({ firmNameId }) {
  // let { firmNameUrl } = useParams();

  const { token } = useAuth();

  const [profile, setProfile] = useState({});
  const [videoNum, setVideoNum] = useState(1);
  const [videoUrl, setVideoUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/profiles`)
      .then((res) => {
        console.log("profile.firmNameUrl: ");
        console.log(res.data);
        console.log("firmNameId");
        console.log(firmNameId);

        const test = res.data.filter(
          (profile) => profile.firmNameId === firmNameId
        );
        setProfile(test[0]);
        setVideoUrl(test[0].videoUrl1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [firmNameId]);

  const handleButtonClick = (num) => {
    switch (num) {
      case 1:
        setVideoUrl(profile.videoUrl1);
        setVideoNum(1);
        break;
      case 2:
        setVideoUrl(profile.videoUrl2);
        setVideoNum(2);
        break;
      case 3:
        setVideoUrl(profile.videoUrl3);
        setVideoNum(3);
        break;
      case 4:
        setVideoUrl(profile.videoUrl4);
        setVideoNum(4);
        break;
      case 5:
        setVideoUrl(profile.videoUrl5);
        setVideoNum(5);
        break;
      case 6:
        setVideoNum(6);
        break;
      default:
        setVideoUrl(profile.videoUrl1);
        setVideoNum(1);
    }
  };

  if (isLoading) {
    return <div className="loading-screen">{/* <BounceLoader /> */}</div>;
  } else {
    return (
      <div className="profile-container">
        <div className="user-header-container">
          <div className="inner-user-header-container">
            <img className="user-logo" src={profile.logo} alt="logo" />
            <h2 className="firm-name-h2">{profile.firmName}</h2>
            <div className="social-media-container">
              <span style={{ color: "#1DA1F2", padding: 5, fontSize: 20 }}>
                <a
                  href="https://twitter.com/FitzBowen"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <i class="fab fa-twitter"></i>
                </a>
              </span>
              <span style={{ color: "#0077b5", padding: 5, fontSize: 20 }}>
                <a
                  href="https://www.linkedin.com/company/oneprismatic/about/"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <i class="fab fa-linkedin"></i>
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="main-body-container">
          <div className="introduction-div">Introduction</div>
          <div className="inner-main-container">
            <div className="video-nav-container">
              <div className="video-nav-dots">
                <div className="nav-dot-container">
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot-active"></div>
                  </div>
                </div>
                {videoNum > 1 ? (
                  <div className="nav-dot-bar-active"></div>
                ) : (
                  <div className="nav-dot-bar"></div>
                )}
                {videoNum > 1 ? (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot-active"></div>
                  </div>
                ) : (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot"></div>
                  </div>
                )}

                {videoNum > 2 ? (
                  <div className="nav-dot-bar-active"></div>
                ) : (
                  <div className="nav-dot-bar"></div>
                )}
                {videoNum > 2 ? (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot-active"></div>
                  </div>
                ) : (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot"></div>
                  </div>
                )}

                {videoNum > 3 ? (
                  <div className="nav-dot-bar-active"></div>
                ) : (
                  <div className="nav-dot-bar"></div>
                )}
                {videoNum > 3 ? (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot-active"></div>
                  </div>
                ) : (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot"></div>
                  </div>
                )}

                {videoNum > 4 ? (
                  <div className="nav-dot-bar-active"></div>
                ) : (
                  <div className="nav-dot-bar"></div>
                )}
                {videoNum > 4 ? (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot-active"></div>
                  </div>
                ) : (
                  <div className="inner-nav-dot-container">
                    <div className="nav-dot"></div>
                  </div>
                )}
              </div>
              <div className="video-nav">
                <div className="nav-item" onClick={() => handleButtonClick(1)}>
                  Founder Background
                </div>
                <div className="nav-item" onClick={() => handleButtonClick(2)}>
                  Firm Background
                </div>
                <div className="nav-item" onClick={() => handleButtonClick(3)}>
                  Strategy Overview
                </div>
                <div className="nav-item" onClick={() => handleButtonClick(4)}>
                  Competitive Advantage
                </div>
                <div className="nav-item" onClick={() => handleButtonClick(5)}>
                  Special Topic
                </div>
              </div>
            </div>

            <div className="image-wrapper">
              {videoNum === 6 ? (
                <StaticDocSend />
              ) : (
                <div className="inner-inner-video-container">
                  <video
                    className="video-component"
                    src={videoUrl}
                    controls
                  ></video>
                </div>
              )}
            </div>
          </div>
          <ButtonsSection transcript={profile.transcript} />
          <LockedMaterials
            title={"Onboarding Materials"}
            items={["Pitch Deck", "Investment Examples", "Recent Factsheet"]}
          />
          <LockedMaterials
            title={"Due Dilligence Materials"}
            items={[
              "Offering Memorandum",
              "Investment Examples",
              "Reference List",
            ]}
          />
        </div>
      </div>
    );
  }
}
