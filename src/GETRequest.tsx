import React, { useState } from 'react'

function GETRequest () {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const makeRequest = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10`);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  }



  return (
    <div>Our TSX</div>
  );
};

export default GETRequest;