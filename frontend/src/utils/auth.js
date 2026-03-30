// utils/auth.js
import { jwtDecode } from "jwt-decode";

/**
 * Checks whether a JWT token is expired.
 * @param {string} token - The JWT token to check
 * @returns {boolean} - True if token is missing, invalid, or expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); // exp is in seconds
    return Date.now() >= exp * 1000;  // convert to milliseconds
  } catch {
    return true; // invalid token
  }
};
