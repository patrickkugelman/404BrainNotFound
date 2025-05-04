
// Key for storing token in localStorage
const MAPBOX_TOKEN_KEY = 'mapbox_token';

// Default public token - will work for basic usage
// Note: this is a low-usage public token, for production use your own token
const DEFAULT_PUBLIC_TOKEN = 'pk.eyJ1IjoiZGVtby1tYXBib3giLCJhIjoiY2w5NzBodHhyMDZ5bTNub2R0YzBxNHhtNSJ9.Z9r3c0bBIGbEW6QTJiVzOg';

export const saveMapboxToken = (token: string): void => {
  localStorage.setItem(MAPBOX_TOKEN_KEY, token);
};

export const getMapboxToken = (): string => {
  const savedToken = localStorage.getItem(MAPBOX_TOKEN_KEY);
  return savedToken || DEFAULT_PUBLIC_TOKEN;
};

export const hasMapboxToken = (): boolean => {
  return true; // Always return true since we have a default token
};
