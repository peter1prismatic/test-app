import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { TextField } from "@material-ui/core";
import Button from "@mui/material/Button";

import "./DocSend.css";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Document from "./Document";
import { useDispatch } from "react-redux";
import { addDocument } from "../store/userSlice";

export default function StaticDocSend() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div>
        {user.credentials.documents &&
          user.credentials.documents.map((doc) => (
            <Document key={uuidv4()} doc={doc} />
          ))}
      </div>
    </div>
  );
}
