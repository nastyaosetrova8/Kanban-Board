const RepoInfo = ({ repoInfo }) => {
  console.log(repoInfo);
  return (
    <>
      {/* {repoInfo && ( */}
      <div>
        <a
          href={repoInfo.owner.html_url}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {repoInfo.owner.login}
        </a>
        <a
          href={repoInfo.clone_url}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {repoInfo.name}
        </a>
        <p>{Math.round(repoInfo.stargazers_count / 1000)} K stars</p>
      </div>
      {/* )} */}
    </>
  );
};

export default RepoInfo;
