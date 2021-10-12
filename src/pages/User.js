import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function User() {
  const [profile, setProfile] = useState();
  let { handle } = useParams();

  useEffect(() => {
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  });
  return (
    <div>
      {profile === null ? <div>Loading Profile</div> : <p>static profile</p>}
    </div>
  );
}
