import { useOidcIdToken } from "@axa-fr/react-oidc";
import { Alert, AlertIcon, Box, Button, Center, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface ModifyProps {
  getRequest: () => void;
}

export const ModifyRequest = ({ getRequest }: ModifyProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gitHubURL, setURL] = useState("");
  const { idToken } = useOidcIdToken();

  const makeRequest = async () => {
    try {
      setLoading(true);
      setError("");
      const reqOptions = {
        method: 'POST',
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
    <Box>
      <Heading>API Posts</Heading>
      <Text padding={5}>Please type the URL of the GitHub repository you wish to add or remove</Text>
      <Input
        type='url'
        value={gitHubURL}
        placeholder='GitHub URL'
        onChange={(e) => setURL(e.currentTarget.value)}
      />
      <Button marginTop={5} onClick={() => {
        makeRequest();
        setURL("");
      }}
      >
        Add Repository
      </Button>
      {loading && <Text>Modifying repos for this user...</Text>}
      {error &&
        <Alert marginTop={5} status="error">
          <AlertIcon />
          {`There was a problem adding that repo to the user - ${error}`}
        </Alert>}
    </Box>
  );
}
