import { Box } from "@chakra-ui/react";
import { RepoInfoProp } from "../helpers/models";
import { StarIcon, ChevronRightIcon } from "@chakra-ui/icons";

const RepoInfo: React.FC<RepoInfoProp> = ({ repoInfo }) => {
  return (
    <>
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
    </>
  );
};

export default RepoInfo;
