import React, { useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

export default function TestComponent() {
  const dispatch = useDispatch();
  const history = useHistory();

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
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
      .then((res) => {
        dispatch(setUser(res.data));

        history.push(`/user/${res.data.firmNameId}`);

        // dispatch(setUser(res.data));
        // setVideoUrl(res.data.credentials.videoUrl1);
        // setLogoUrl(res.data.credentials.logo);
      })
      .catch((err) => console.log(err));
  }, [config, history]);

  return <div></div>;
}
