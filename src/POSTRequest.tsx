import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";

interface RepoProps {
  user: string;
  repo: string;
}

function POSTRequest(repoProps: RepoProps) {
  const [error, setError] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const reqOptions = {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ repo: repoProps.repo })
        };
        await fetch('https://ci-dev.in.ripley.cloud/repositories/' + repoProps.user, reqOptions);
        // do something with response?
      } catch (err) {
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(error);
        setError(message);
      }
    };
    makeRequest();
  }, [error]);

  return (
  <div className="POSTRequest">
      <h1>API Posts</h1>
      {error && <div>{`There was a problem adding that repo to the user - ${error}`}</div>}
      {!error && <div>Successfully Added!</div>}
    </div>
  );
}

export default POSTRequest;
