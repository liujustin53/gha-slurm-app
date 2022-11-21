import React from "react";
import { OidcProvider, useOidc } from "@axa-fr/react-oidc";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Profile } from "./Profile";
import {
  ChakraProvider,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from "@chakra-ui/react"
import ColorModeSwitcher from "./ColorModeSwitcher";
import { LogInOutButton } from "./LogInOutButton";

const configuration = {
  client_id: "77fa7230908ba5638c1f8619943cc6605de7542a",
  redirect_uri: window.location.origin + "/authentication/callback",
  silent_redirect_uri:
    window.location.origin + "/authentication/silent-callback",
  scope: "openid profile email api offline_access slurmUser", // offline_access scope allow your client to retrieve the refresh_token
  authority: "https://auth.in.ripley.cloud/application/o/react-auth-test",
  service_worker_relative_url: "/OidcServiceWorker.js",
  service_worker_only: false,
};

function App() {
  return (
    <ChakraProvider>
      <OidcProvider configuration={configuration}>
        <Box margin={5}>
          <Breadcrumb p={5}>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile">
                Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <LogInOutButton />
          <ColorModeSwitcher />
          <Box textAlign='center' p={5}>
            <Router>
              <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/profile" element={<Profile></Profile>} />
              </Routes>
            </Router>
          </Box>
        </Box>
      </OidcProvider>
    </ChakraProvider>
  );
}

export default App;