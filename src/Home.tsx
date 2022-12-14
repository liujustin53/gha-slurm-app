import { OidcUserStatus, useOidc, useOidcUser } from "@axa-fr/react-oidc";
import { Box, Button, Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/react";

export const Home = () => {
  const { oidcUser, oidcUserLoadingState } = useOidcUser();

  return (
    <Box m={5}>
      <VStack spacing={5}>
        <Heading>Welcome</Heading>
        <Text>
          React Application protected by OpenId Connect
        </Text>
        {oidcUserLoadingState == OidcUserStatus.Loaded && (
          <Box>
            <Text>Hello, {oidcUser.name}. Welcome to your dashboard</Text>
            {/* <Button margin={5}
              onClick={() => renewTokens()}
            >
              Renew Tokens
            </Button> */}
          </Box>
        )}
      </VStack>
    </Box>
  );
};
