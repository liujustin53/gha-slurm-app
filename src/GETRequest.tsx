import { useOidcIdToken } from "@axa-fr/react-oidc";
import { Box, Button, Center, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";

export const GETRequest = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { idToken } = useOidcIdToken();

  const makeRequest = async () => {
    try {
      setLoading(true);
      const reqOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      };
      const response = await fetch('https://ci.in.ripley.cloud/config/repos', reqOptions);
      setData(await response.json());
      setError("");
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(error);
      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Heading>API Gets</Heading>
      <Box padding={2}>
        <Button
          onClick={() => {
            makeRequest();
          }}
        >
          Get Repositories
        </Button>
      </Box>
      {data &&
        <Center>
          <UnorderedList spacing={2}>
            {data.map((repo) => <ListItem key={repo}>{repo}</ListItem>)}
          </UnorderedList>
        </Center>}
      {loading && <Box>Getting repos for this user...</Box>}
      {error && <Box>{`There was an error while grabbing the repos for this user - ${error}`}</Box>}
    </Box>
  );
}