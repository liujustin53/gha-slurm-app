import React, { useEffect, useState } from "react";

function GETRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=10`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
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

  return (
    <div className="App">
      <h1>API Posts</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>{data && <h3>{data}</h3>}</ul>
    </div>
  );
}

export default GETRequest;
