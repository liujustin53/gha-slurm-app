import { useOidcIdToken } from "@axa-fr/react-oidc";
import { WarningIcon } from "@chakra-ui/icons";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface NotInstalledAlertProps {
  gitHubURL: string;
}

export const NotInstalledAlert = ({ gitHubURL }: NotInstalledAlertProps) => {
  // make request to check if app is installed
  // if not, show alert
  // if yes, do nothing
  const [isInstalled, setIsInstalled] = useState(true);
  const { idToken } = useOidcIdToken();

  const checkInstalled = async () => {
    try {
      const reqOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': idToken
        }
      };
      const res = await fetch('https://ci-dev.in.ripley.cloud/gha/installations?url=' + gitHubURL, reqOptions);
      setIsInstalled(await res.text() === 'true');
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkInstalled();
  });

  return (
    <>
      {!isInstalled &&
        <Popover>
          <PopoverTrigger>
            <IconButton aria-label='Not installed' icon={<WarningIcon />} />
          </PopoverTrigger>
          <PopoverContent border='0'>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight='bold' border='0'>
              GitHub App not installed
            </PopoverHeader>
            <PopoverBody>
              Looks like you haven't installed the GitHub App on this repository or the app does not have access to this repository. Please click the button below to be redirected to the installation page.
            </PopoverBody>
            <PopoverFooter border='0'>
              <Button colorScheme='blue' onClick={() => checkInstalled()}>Install App</Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>}
    </>
  );
}