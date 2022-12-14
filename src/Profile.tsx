import { OidcUserStatus, useOidcIdToken, useOidcUser } from "@axa-fr/react-oidc";
import React, { useEffect, useState } from "react";
import { GETRequest } from "./GETRequest";
import { ModifyRequest } from "./ModifyRequest";
import { Box, SimpleGrid, Text, useStatStyles } from "@chakra-ui/react";


export const Profile = () => {
  const { oidcUser, oidcUserLoadingState } = useOidcUser();
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
  useEffect(() => {
    if (oidcUserLoadingState === OidcUserStatus.Loaded) {
      makeRequest();
    }
  }, [makeRequest, oidcUserLoadingState]);

  switch (oidcUserLoadingState) {
    case OidcUserStatus.Loading:
      return <Text>User Information are loading</Text>;
    case OidcUserStatus.Unauthenticated:
      return <Text>You are not authenticated</Text>;
    case OidcUserStatus.LoadingError:
      return <Text>Fail to load user information</Text>;
    default:
      return (
        <Box margin={5}>
          <SimpleGrid columns={2}>
            <GETRequest data={data} makeRequest={makeRequest} />
            <ModifyRequest getRequest={makeRequest} />
          </SimpleGrid>
        </Box>
      );
  }
};
