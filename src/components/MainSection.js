import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import "./MainSection.css";

function MainSection() {
  const [logo, setLogo] = useState(true);

  const showLogo = () => {
    if (window.innerWidth <= 960) {
      setLogo(false);
    } else {
      setLogo(true);
    }
  };

  useEffect(() => {
    showLogo();
  }, []);

  window.addEventListener("resize", showLogo);

  return (
    <div className="body">
      <div className="hero-container">
        {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
        <div className="left-container">
          <p className="main-text">
            A Community for Business Builders at Hedge Funds
          </p>
          <p className="sub-text">Learn, share, and connect.</p>
          <div className="request-to-join">
            <form>
              {/* <input type="text" id="email" placeholder="Enter your email" /> */}
              <TextField
                id="outlined-basic"
                label="Enter your email"
                variant="outlined"
                className="email-input"
              />
            </form>
            {/* <button className="request-to-join-button">Request to Join</button> */}
            <div className="request-to-join-button">
              <Button variant="contained" color="primary">
                Request to Join
              </Button>
            </div>
          </div>
        </div>
        {logo && (
          <div className="right-container">
            <img
              className="prismatic-logo2"
              src="/prismatic/Prismatic FINAL LOGO-4 copy.png"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainSection;
