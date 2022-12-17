import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { FC, useState } from "react";
import { useUserContext } from "../../../contexts/user";
import { db } from "../../../firebase";

type AccountInfo = {
  age: null | number;
  status: null | string;
  country: null | string;
  city: null | string;
};

export const Settings: FC = () => {
  const { user } = useUserContext();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    age: user.age || 0,
    status: user.status || "",
    country: user.navigation.country || "",
    city: user.navigation.city || "",
  });

  console.log("rerender");

  const handleSubmit = async () => {
    console.log("update");

    const updateMyDoc = doc(db, "users", user.uid);
    await updateDoc(updateMyDoc, {
      age: accountInfo.age,
      status: accountInfo.status,
      navigation: {
        country: accountInfo.country,
        city: accountInfo.city,
      },
    });
  };

  return (
    <>
      {user ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Box sx={{ fontSize: "24px", fontWeight: 600 }}>
            Account Settings:
          </Box>
          <TextField
            id="setAge"
            label="Set your age"
            variant="outlined"
            type="number"
            value={accountInfo.age}
            inputProps={{ min: 0, max: 150 }}
            onChange={(e) => {
              setAccountInfo({
                age: Number(+e.target.value),
                status: accountInfo.status,
                country: accountInfo.country,
                city: accountInfo.city,
              });
            }}
          />
          <TextField
            id="setStatus"
            label="Set your status"
            variant="outlined"
            value={accountInfo.status}
            onChange={(e) => {
              setAccountInfo({
                age: accountInfo.age,
                status: e.target.value,
                country: accountInfo.country,
                city: accountInfo.country,
              });
            }}
          />
          <TextField
            id="setCountry"
            label="Set your country"
            variant="outlined"
            value={accountInfo.country}
            onChange={(e) => {
              setAccountInfo({
                age: accountInfo.age,
                status: accountInfo.status,
                country: e.target.value,
                city: accountInfo.city,
              });
            }}
          />
          <TextField
            id="setCity"
            label="Set your city"
            variant="outlined"
            value={accountInfo.city}
            onChange={(e) => {
              setAccountInfo({
                age: accountInfo.age,
                status: accountInfo.status,
                country: accountInfo.country,
                city: e.target.value,
              });
            }}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} />
        </Box>
      )}
    </>
  );
};
