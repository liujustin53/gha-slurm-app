import { useOidcIdToken } from "@axa-fr/react-oidc";
import { Box, Button, Center, Flex, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { AlertButton } from "./AlertButton";

interface ModifyProps {
  fetchType: string;
  gitHubURL: string;
}

export const ModifyRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gitHubURL, setURL] = useState("");
  const { idToken } = useOidcIdToken();

  const makeRequest = async (modifyProps: ModifyProps) => {
    try {
      setLoading(true);
      const reqOptions = {
        method: modifyProps.fetchType,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      };
      const response = await fetch('https://ci.in.ripley.cloud/config/repos?gitHubURL=' + modifyProps.gitHubURL, reqOptions);
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
      <Center p={5}>
        <Flex gap={5}>
          <Button onClick={() => {
            makeRequest({ fetchType: 'POST', gitHubURL });
            setURL("");
          }}>
            Add Repository
          </Button>
          <AlertButton
            buttonLabel={"Delete Repository"}
            alertMessage={"Are you sure you want to delete this repository?"}
            onClick={() => {
              makeRequest({ fetchType: 'DELETE', gitHubURL });
              setURL("");
            }} />
        </Flex>
      </Center>
      {loading && <Text>Modifying repos for this user...</Text>}
      {error && <Text>{`There was a problem adding that repo to the user - ${error}`}</Text>}
    </Box>
  );
}
