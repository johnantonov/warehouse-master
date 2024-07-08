export function enter(email) {
  if (typeof window === 'undefined') {
    return false;  // checking that the runtime is browser
  }

  let isAuthenticated = false;

  // Saving email in localStorage
  localStorage.setItem('userEmail', email);

  const storedEmail = localStorage.getItem('userEmail');
  
  if (storedEmail) {
    isAuthenticated = true;
  }

  return isAuthenticated;
}