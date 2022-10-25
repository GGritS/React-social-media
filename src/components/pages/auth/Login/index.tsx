import { Alert, Button, Card, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/auth/AuthContext";

export const Login: FC = () => {
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
        <Button
          variant="contained"
          type="submit"
          onClick={() => setIsRegForm(false)}
        >
          Auth
        </Button>
        <Box sx={{ marginTop: 3 }}>
          <span>New in social media? </span>
          <Link to="/reg">Create account.</Link>
        </Box>
      </form>
      {regOrLoginError && (
        <Alert severity="error" sx={{ marginTop: 5 }}>
          {regOrLoginError}
        </Alert>
      )}
    </>
  );
};
