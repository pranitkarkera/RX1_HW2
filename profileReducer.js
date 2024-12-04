import { ADD_PROFILE, REMOVE_PROFILE } from "./actions";

// profileReducer.js
const initialState = { profiles: [], averageAge: 0 };

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      const newProfiles = [...state.profiles, action.payload];
      return {
        ...state,
        profiles: newProfiles,
        averageAge: calculateAverage(newProfiles), // Update average age
      };

    case REMOVE_PROFILE:
      const updatedProfiles = state.profiles.filter(
        (profile) => profile.id !== action.payload // Access id directly from payload
      );
      return {
        ...state,
        profiles: updatedProfiles,
        averageAge: calculateAverage(updatedProfiles), // Update average age after removal
      };

    default:
      return state;
  }
};

// Function to calculate average age
const calculateAverage = (profiles) => {
  if (profiles.length === 0) return 0;
  const totalAge = profiles.reduce((sum, profile) => sum + profile.age, 0);
  return totalAge / profiles.length;
};

export default profileReducer;
