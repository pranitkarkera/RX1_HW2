// actions.js
export const ADD_PROFILE = "profile/added";
export const REMOVE_PROFILE = "profile/removed";

// Action creator for adding a profile
export const addProfile = (profile) => ({
  type: ADD_PROFILE,
  payload: profile,
});

// Action creator for removing a profile
export const removeProfile = (id) => ({
  type: REMOVE_PROFILE,
  payload: id, // Directly use the id as payload
});
