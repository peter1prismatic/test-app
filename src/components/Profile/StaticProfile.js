import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import MyButton from "../../utils/MyButton";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
// import "./CreateProfile.css";
import { useParams } from "react-router-dom";

export default function StaticProfile() {
  let { firmName } = useParams();

  const { token } = useAuth();

  const [profile, setProfile] = useState();

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
        console.log(firmName);

        const test = res.data.filter(
          (profile) => profile.firmName === firmName
        );
        console.log(test);
        setProfile(test[0]);
      })
      .catch((err) => console.log(err));
  }, [config, firmName]);

  return <div className="profile-container">{profile.firmName}</div>;
}
