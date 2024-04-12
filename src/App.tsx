import IssuesPage from "./Pages/IssuesPage";

function App() {
  // const dispatch = useDispatch();
  // const issues = useSelector(selectIssues);
  // console.log(issues);
  // const [repoUrl, setRepoUrl] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [owner, setOwner] = useState("");
  // const [repoName, setRepoName] = useState("");

  // const handleRepoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setRepoUrl(event.target.value);
  // };

  // useEffect(() => {
  //   if (!searchQuery) return;
  //   dispatch(getIssuesThunk());
  // }, [dispatch, searchQuery]);

  // const onFormSubmit = (searchQuery) => {
  //   setSearchQuery(searchQuery);
  // };

  // type GetIssuesThunkArgs = {
  //   owner: string;
  //   repoName: string;
  // };

  // const onFormSubmit = (searchQuery: GetIssuesThunkArgs) => {
  //   // setSearchQuery(searchQuery);
  //   console.log(searchQuery);
  //   const value = searchQuery.split("/");
  //   const owner = value[3];
  //   const repoName = value[4];
  //   dispatch(getIssuesThunk({ owner, repoName }));
  // };

  return (
    <>
      <IssuesPage />
    </>
  );
}

export default App;
