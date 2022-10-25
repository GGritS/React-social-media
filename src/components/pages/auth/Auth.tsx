import { Alert, Button, ButtonGroup, TextField } from "@mui/material";
import React, { FC } from "react";
import {} from "firebase/auth";
import { useAuth } from "../../../contexts/auth/AuthContext";

export const Auth: FC = () => {
  const { handleSubmit, setUserData, userData, setIsRegForm, regOrLoginError } =
    useAuth();

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          type="text"
          id="auth-name"
          label="name"
          variant="outlined"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          sx={{ display: "block", marginBottom: 3 }}
        />
        <TextField
          type="email"
          id="auth-email"
          label="email"
          variant="outlined"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          sx={{ display: "block", marginBottom: 3 }}
          required
        />
        <TextField
          type="password"
          id="auth-password"
          label="password"
          variant="outlined"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          sx={{ display: "block", marginBottom: 3 }}
          required
        />
        <ButtonGroup variant="contained">
          <Button type="submit" onClick={() => setIsRegForm(false)}>
            Auth
          </Button>
          <Button type="submit" onClick={() => setIsRegForm(true)}>
            Register
          </Button>
        </ButtonGroup>
      </form>
      {regOrLoginError && (
        <Alert severity="error" sx={{ marginTop: 5 }}>
          {regOrLoginError}
        </Alert>
      )}
    </>
  );
};
