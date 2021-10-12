import React, { useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function TestComponent() {
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
        console.log("got the user");
        console.log(res.data);
        console.log("dispatching...");
        const firmNameUrl = res.data.credentials.firmName
          .replace(/\s+/g, "-")
          .toLowerCase();
        console.log(firmNameUrl);

        history.push(`/user/${firmNameUrl}`);

        // dispatch(setUser(res.data));
        // setVideoUrl(res.data.credentials.videoUrl1);
        // setLogoUrl(res.data.credentials.logo);
      })
      .catch((err) => console.log(err));
  }, [config]);

  return <div>Helloooo</div>;
}
