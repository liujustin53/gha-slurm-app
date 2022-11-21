import { useOidc } from "@axa-fr/react-oidc";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

export const Home = () => {
  const { renewTokens, isAuthenticated } = useOidc();

  return (
    <Box m={5}>
      <VStack spacing={5}>
        <Heading>Welcome !!!</Heading>
        <Text>
          React Demo Application protected by OpenId Connect
        </Text>
          {isAuthenticated && (
            <Button
              onClick={() => renewTokens()}
            >
              Renew Tokens
            </Button>
          )}
      </VStack>
    </Box>
  );
};
