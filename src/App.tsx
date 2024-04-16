import IssuesPage from "./Pages/IssuesPage";
import { useAppSelector } from "./hook";
import { selectError, selectIsLoading } from "./redux/selectors";

function App() {
  const loading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return (
    <div>
      <IssuesPage />

      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
    </div>
  );
}

export default App;
