import jwtDecode from "jwt-decode";

const checkTokenExpiry = (token, logoutCallback) => {
  try {
    const decoded = jwtDecode(token);
    const expiry = decoded.exp * 1000; // JWT exp is in seconds
    const now = Date.now();

    if (expiry <= now) {
      logoutCallback(); // Already expired
    } else {
      const timeout = expiry - now;

      console.log("Auto-logout set for", timeout / 1000, "seconds");

      setTimeout(() => {
        logoutCallback();
      }, timeout);
    }
  } catch (err) {
    console.error("Invalid token:", err.message);
  }
};

export default checkTokenExpiry;
