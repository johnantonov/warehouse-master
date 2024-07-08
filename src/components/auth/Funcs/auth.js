export function auth() {
  if (typeof window === 'undefined') {
    // checking that the runtime is browser
    return false;
  }

  let isAuthenticated = false;

  const storedEmail = localStorage.getItem('userEmail');
  if (storedEmail) {
    isAuthenticated = true;
  }

  return isAuthenticated;
}