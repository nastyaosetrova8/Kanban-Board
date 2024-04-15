import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import { Box } from "@chakra-ui/react";
import Board from "../components/Board";
import RepoInfo from "../components/RepoInfo";
import { selectIssues, selectRepoInfo } from "../redux/selectors";
import { getIssuesThunk, getRepoInfoThunk } from "../redux/Issues/issuesThunk";

const IssuesPage = () => {
  const dispatch = useDispatch();
  const issues = useSelector(selectIssues);
  const repoInfo = useSelector(selectRepoInfo);

  type GetIssuesThunkArgs = {
    owner: string;
    repoName: string;
  };

  const onFormSubmit = (searchQuery: GetIssuesThunkArgs) => {
    const value = searchQuery.split("/");
    const owner = value[3];
    const repoName = value[4];

    dispatch(getIssuesThunk({ owner, repoName }));
    dispatch(getRepoInfoThunk({ owner, repoName }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SearchBar onFormSubmit={onFormSubmit} />
      <RepoInfo repoInfo={repoInfo} />
      <Board issues={issues} repoInfo={repoInfo} />
    </Box>
  );
};

export default IssuesPage;
