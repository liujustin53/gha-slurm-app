import { useOidcIdToken } from "@axa-fr/react-oidc";
import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { AlertButton } from "./AlertButton";

interface DeleteButtonProps {
  gitHubURL: string;
  getRequest: () => void;
}

export const DeleteButton = ({ gitHubURL, getRequest }: DeleteButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { idToken } = useOidcIdToken();

  const makeRequest = async () => {
    try {
      setLoading(true);
      const reqOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      };
      const response = await fetch('https://ci.in.ripley.cloud/config/repos?gitHubURL=' + gitHubURL, reqOptions);
      console.log(response);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(error);
      setError(message);
    } finally {
      setLoading(false);
      getRequest();
    }
  };

  return (
    <>
      <AlertButton
        buttonLabel={"Delete"}
        alertMessage={"Are you sure you want to delete this repository?"}
        onClick={() => {
          makeRequest();
        }} />
      {error &&
        <Alert status='error'>
          <AlertIcon />
          {`There was a problem deleting that repo - ${error}`}
        </Alert>}
    </>
  );
}
