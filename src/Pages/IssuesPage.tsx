import { useDispatch, useSelector } from "react-redux";
import { selectIssues, selectRepoInfo } from "../redux/Issues/selectors";
import SearchBar from "../components/SearchBar";
import { Container, SimpleGrid } from "@chakra-ui/react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backe nd } from "react-dnd-html5-backend";
import ListIssue from "../components/ListIssue";
import { ListIssueType } from "../helpers/enums";
import { useState } from "react";
import { getIssuesThunk, getRepoInfoThunk } from "../redux/Issues/issuesThunk";
import Board from "../components/Board";
import RepoInfo from "../components/RepoInfo";
import { Issue } from "../helpers/models";
// import useIssueCollection from "../hooks/useIssueCollection";

const IssuesPage = () => {
  const dispatch = useDispatch();
  const issues = useSelector(selectIssues);
  const repoInfo = useSelector(selectRepoInfo);

  // const [issuesSet, setIssuesSet] = useState<Issue[]>(issues);

  // console.log(issuesSet);
  console.log(repoInfo);
 

  type GetIssuesThunkArgs = {
    owner: string;
    repoName: string;
  };

  const onFormSubmit = (searchQuery: GetIssuesThunkArgs) => {
    // setSearchQuery(searchQuery);

    // ----------------------------------------
    console.log(searchQuery);

    const value = searchQuery.split("/");
    const owner = value[3];
    const repoName = value[4];

    // const inputValue = searchQuery.trim();

    // Object.keys(localStorage).forEach((key) => {
    //   if (inputValue === key) {
    //     const storedIssues = localStorage.getItem(key);
    //     if (storedIssues !== null) {
    //       const parsedIssues = JSON.parse(storedIssues);
    //       // Виклик функції з отриманими збереженими даними
    //       // handleStoredIssues(parsedIssues);
    //     }
    //     console.log(`Ключ: ${key}, Значення: ${storedIssues}`);
    //     // JSON.parse(storedIssues);
    //   }
    //   // if (storedIssues !== null) {
    //   else {
    dispatch(getIssuesThunk({ owner, repoName }));
    dispatch(getRepoInfoThunk({ owner, repoName }));
    //   }
    // });

    // const storedIssues = localStorage.getItem(repoInfo.html_url);
    // console.log(storedIssues);

    // if (storedIssues) {
    //   JSON.parse(storedIssues);
    // } else {
    //   dispatch(getIssuesThunk({ owner, repoName }));
    //   dispatch(getRepoInfoThunk({ owner, repoName }));
    // }

    // const storedIssues =
    //   // repoInfo && repoInfo.html_url ?
    //   localStorage.getItem("repoInfo.html_url");
    // // : null;
    // if (storedIssues) {
    //   // dispatch(
    //   //   getIssuesThunk(JSON.parse(localStorage.getItem(repoInfo.html_url)))
    //   // );
    //   JSON.parse(storedIssues);
    // } else {
    //   console.log(searchQuery);
    //   const value = searchQuery.split("/");
    //   const owner = value[3];
    //   const repoName = value[4];
    //   dispatch(getIssuesThunk({ owner, repoName }));
    //   dispatch(getRepoInfoThunk({ owner, repoName }));
    // }

    // ----------------------------------------
    // console.log(searchQuery);
    // const value = searchQuery.split("/");
    // const owner = value[3];
    // const repoName = value[4];
    // dispatch(getRepoInfoThunk({ owner, repoName }));
    // dispatch(getIssuesThunk({ owner, repoName }));
  };

  // const { issues: columnIssues } = useIssueCollection(issues);

  return (
    <div>
      <SearchBar onFormSubmit={onFormSubmit} />
      {repoInfo && <RepoInfo repoInfo={repoInfo} />}
      <Board issues={issues} repoInfo={repoInfo} />
      {/* parsedIssues={parsedIssues} */}
    </div>
  );
};

export default IssuesPage;
