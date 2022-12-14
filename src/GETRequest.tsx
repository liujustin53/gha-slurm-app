import { useOidcIdToken } from "@axa-fr/react-oidc";
import { Box, Button, Center, Flex, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteButton } from "./DeleteButton";

interface GETProps {
  data: string[];
  makeRequest: () => void;
}

export const GETRequest = ({ data, makeRequest }: GETProps) => {

  return (
    <Box>
      <Heading>API Gets</Heading>
      {data &&
        <Center>
          <UnorderedList spacing={2}>
            {data.map((repo) =>
              <Flex gap={5} alignItems='center'>
                <ListItem><Link href={repo}>{repo}</Link></ListItem>
                <DeleteButton gitHubURL={repo} getRequest={makeRequest} />
              </Flex>)}
          </UnorderedList>
        </Center>}
    </Box>

  );
}