import { Box, Text } from "@chakra-ui/react";
import { Props } from "../helpers/models";
import { StarIcon, ChevronRightIcon } from "@chakra-ui/icons";

const RepoInfo = ({ repoInfo }: Props) => {
  return (
    <>
      {repoInfo ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          gap="10px"
          mt="16px"
        >
          <a
            href={repoInfo.owner.html_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "#3757f5" }}
          >
            {repoInfo.owner.login}
          </a>
          <ChevronRightIcon color="#3757f5" />
          <a
            href={repoInfo.clone_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: "#3757f5" }}
          >
            {repoInfo.name}
          </a>
          <Box display="flex" alignItems="center" justifyContent="start">
            <StarIcon color="#e88513" w="24px" h="24px" />
            <p>{Math.round(repoInfo.stargazers_count / 1000)} K stars</p>
          </Box>
        </Box>
      ) : (
        <Text mt="16px" fontSize="xl" color="#646cff">
          No info please enter the repo url in the search field.
        </Text>
      )}
    </>
  );
};

export default RepoInfo;
