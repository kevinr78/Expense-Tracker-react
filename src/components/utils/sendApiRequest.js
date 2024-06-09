export async function sendApiRequest(method, body, endpoint) {
  const token = JSON.parse(localStorage.getItem("token"));
  const result = await fetch(`http://localhost:3000/${endpoint}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await result.json();
}
