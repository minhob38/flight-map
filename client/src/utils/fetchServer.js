const fetchServer = async (apiInfo) => {
  const { method, uri, data } = apiInfo;
  const body = method === "GET" ? undefined : JSON.stringify(data);

  const res = await fetch(uri, {
    method,
    body,
    headers: { "content-type": "application/json" },
  });

  return res.json();
};

export default fetchServer;
//test
