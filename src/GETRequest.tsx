import React, { useEffect, useState } from "react";

interface UserProps {
  user: string;
}

function GETRequest(user: UserProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch('https://ci-dev.in.ripley.cloud/repositories/' + user.user);
        setData(await response.json());
        setError("");
      } catch (err) {
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(error);
        setError(message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    makeRequest();
  }, [error]);

  // TODO: get and display data properly
  return (
    <div className="GETRequest">
      <h1>API Posts</h1>
      {loading && <div>Getting repos for this user...</div>}
      {error && <div>{`There was an error while grabbing the repos for that user - ${error}`}</div>}
      {data && <div>{data}</div>}
    </div>
  );
}

export default GETRequest;
