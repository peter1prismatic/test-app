import React, { useMemo, useState, useEffect } from "react";
import CreateProfile from "./CreateProfile";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import StaticProfile from "./Profile/StaticProfile";
import { useParams } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import Footer from "./Footer";

export default function CheckUser() {
  const dispatch = useDispatch();
  let { firmNameId } = useParams();
  const { token, currentUser } = useAuth();
  const [profile, setProfile] = useState({ credentials: "" });

  const bearerToken = `Bearer ${token}`;

  console.log("current user: ");
  console.log(currentUser);
  console.log("token: ");
  console.log(token);

  console.log("Check User component");

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: bearerToken,
        "Content-Type": "multipart/form-data",
      },
    };
  }, [bearerToken]);

  useEffect(() => {
    let isMounted = true;

    if (!currentUser.isAnonymous) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user`, config)
        .then((res) => {
          console.log("current user uid");
          console.log(currentUser.uid);
          console.log("porfile user id");
          console.log(res.data.userId);
          dispatch(setUser(res.data));
          if (isMounted) setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {
        isMounted = false;
      };
    }
  }, [config, currentUser, token, dispatch]);

  return (
    <div>
      {currentUser.isAnonymous ? (
        <>
          <StaticProfile firmNameId={firmNameId} />
          <Footer />
        </>
      ) : currentUser.uid === profile.userId ? (
        <CreateProfile />
      ) : (
        <div>Not authorized</div>
      )}
      {/* {currentUser.uid === profile.userId ? (
        <CreateProfile />
      ) : (
        <>
          <StaticProfile firmNameId={firmNameId} />
          <Footer />
        </>
      )} */}
    </div>
  );
}
