import { useOidcIdToken } from "@axa-fr/react-oidc";
import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Heading, IconButton, Link, ListItem, Stack, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteButton } from "./DeleteButton";
import { NotInstalledAlert } from "./NotInstalledAlert";

interface RepoListProps {
  data: string[];
  makeRequest: () => void;
}

export const RepoList = ({ data, makeRequest }: RepoListProps) => {
  return (
    <Box>
      <Center padding='2'>
        <Stack direction='row' spacing={4} alignItems='center'>
          <Heading>Repositories</Heading>
          <IconButton aria-label='Refresh' icon={<RepeatIcon />} onClick={makeRequest} />
        </Stack>
      </Center>
      {data &&
        <Center padding='2'>
          <UnorderedList spacing={2}>
            {data.map((repo) =>
              <Flex gap={5} alignItems='center'>
                <ListItem><Link href={repo}>{repo}</Link></ListItem>
                <DeleteButton gitHubURL={repo} getRequest={makeRequest} />
                <NotInstalledAlert gitHubURL={repo} />
              </Flex>)}
          </UnorderedList>
        </Center>}
    </Box>
  );
}