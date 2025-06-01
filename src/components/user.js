
const BASE_URL = "http://localhost:8000";

const TEST_USER_EMAIL = "user@example.com";
const TEST_USER_PASSWORD = "password";

export async function loginAndStoreToken() {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    }),
  });
  if (response.status === 401 || response.status === 403) {
    throw new Error("Невірний email або пароль");
  }
  if (!response.ok) {
    const errData = await response.json().catch(() => null);
    throw new Error(errData?.message || response.statusText);
  }
  const data = await response.json();
  const { accessToken, user } = data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
  return {user};
}
