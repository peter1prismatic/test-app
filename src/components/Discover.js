import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

import axios from "axios";
import "./Discover.css";

export default function Discover() {
  const { token } = useAuth();

  const [profiles, setProfiles] = useState([]);

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
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/profiles`, config)
      .then((res) => {
        console.log("got the user");
        console.log(res.data);
        console.log("dispatching...");

        const managerProfiles = res.data.filter((profile) => profile.isManager);
        setProfiles(managerProfiles);
      })
      .catch((err) => console.log(err));
  }, [config]);

  return (
    <div className="discover-container">
      {profiles.map((item) => {
        return (
          <div className="fund-container">
            <img className="profile-logo" src={item.logo} alt="" />{" "}
            <div className="fund-name">{item.firmName}</div>
          </div>
        );
      })}
    </div>
  );
}
