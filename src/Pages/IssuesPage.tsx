import SearchBar from "../components/SearchBar";
import { Box, Text } from "@chakra-ui/react";
import Board from "../components/Board";
import RepoInfo from "../components/RepoInfo";
import { selectIssues, selectRepoInfo } from "../redux/selectors";
import { getIssuesThunk, getRepoInfoThunk } from "../redux/Issues/issuesThunk";
import { useAppDispatch, useAppSelector } from "../hook";

const IssuesPage = () => {
  const dispatch = useAppDispatch();
  const issues = useAppSelector(selectIssues);
  const repoInfo = useAppSelector(selectRepoInfo);

  type GetIssuesThunkArgs = {
    owner: string;
    repoName: string;
  };

  const onFormSubmit = (searchQuery: string) => {
    const value = searchQuery.split("/");
    const owner = value[3];
    const repoName = value[4];

    const args: GetIssuesThunkArgs = { owner, repoName };

    dispatch(getIssuesThunk(args));
    dispatch(getRepoInfoThunk(args));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SearchBar onFormSubmit={onFormSubmit} />

      {repoInfo ? (
        <>
          <RepoInfo repoInfo={repoInfo} />
          <Board issues={issues} repoInfo={repoInfo} />
        </>
      ) : (
        <Text mt="16px" fontSize="xl" color="#646cff">
          To get the issues enter the URL of the repository please.
        </Text>
      )}
    </Box>
  );
};

export default IssuesPage;
