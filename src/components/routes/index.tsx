import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { PageNotFound } from "../layout/page-not-found";
import { privateRoutes, publicRoutes } from "./List";

export const Root: FC = () => {
  const { isUserLogined } = useAuth();

  return (
    <div>
      {isUserLogined ? (
        <Routes>
          {privateRoutes.map(({ path, component }) => (
            <Route path={path} element={component} key={`Route-${path}`} />
          ))}
          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="*" element={<Navigate to="/pageNotFound" replace />} /> */}
          {/* <Route path="/pageNotFound" element={<PageNotFound />} /> */}
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map(({ path, component }) => (
            <Route path={path} element={component} key={`Route-${path}`} />
          ))}
          <Route path="*" element={<Navigate to="/pageNotFound" replace />} />
          <Route path="/pageNotFound" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
};
