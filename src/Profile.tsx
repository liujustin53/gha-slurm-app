import { OidcUserStatus, useOidcUser } from "@axa-fr/react-oidc";
import React from "react";
import { GETRequest } from "./GETRequest";
import { ModifyRequest } from "./ModifyRequest";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

export const Profile = () => {
  const { oidcUser, oidcUserLoadingState } = useOidcUser();

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
            <GETRequest />
            <ModifyRequest />
          </SimpleGrid>
        </Box>
      );
  }
};
