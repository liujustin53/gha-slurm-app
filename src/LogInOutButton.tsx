import { OidcUserStatus, useOidc, useOidcUser } from "@axa-fr/react-oidc";
import { Button, Text } from "@chakra-ui/react";

export const LogInOutButton = () => {
  const { login, logout, isAuthenticated } = useOidc();
  const { oidcUser, oidcUserLoadingState } = useOidcUser();

  switch (oidcUserLoadingState) {
    case OidcUserStatus.Loading:
      return <Text>User Information are loading</Text>;
    case OidcUserStatus.Unauthenticated:
      return <Button
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        margin="2"
        onClick={() => login("/profile")}
      >
        Login
      </Button>
    case OidcUserStatus.LoadingError:
      return <Text>Fail to load user information</Text>;
    default:
      return (
        <Button
          size="md"
          fontSize="lg"
          variant="ghost"
          color="current"
          margin="2"
          onClick={() => logout()}
        >
          Logout
        </Button>
      );
  };
}