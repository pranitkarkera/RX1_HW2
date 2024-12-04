import { createStore } from "redux";
import profileReducer from "./profileReducer";
import { addProfile, removeProfile } from "./actions";

// Create the Redux store
export const store = createStore(profileReducer);

// Initial profiles
const initialProfiles = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// Dispatch initial profiles to the store
initialProfiles.forEach((profile) => {
  store.dispatch(addProfile(profile));
});

// Function to render profiles
const renderProfiles = () => {
  const state = store.getState();
  const profileListContainer = document.getElementById("profileList");
  profileListContainer.innerHTML = ""; // Clear existing profiles
  const ul = document.createElement("ul");

  state.profiles.forEach((profile) => {
    const li = document.createElement("li");
    li.textContent = `${profile.name}, Age: ${profile.age}`;
    ul.appendChild(li);
  });

  profileListContainer.appendChild(ul);
  updateAverageAge(); // Update average age after rendering profiles
};

// Function to update average age
const updateAverageAge = () => {
  const state = store.getState();
  const averageAgeElement = document.getElementById("averageAge");
  averageAgeElement.textContent = state.averageAge
    ? state.averageAge.toFixed(2)
    : "N/A"; // Display with 2 decimal places or 'N/A' if undefined
};

// Subscribe to store updates
store.subscribe(() => {
  renderProfiles(); // Call renderProfiles on every state change
});

// Event listener for adding profiles
document
  .getElementById("addProfileForm")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const id = parseInt(document.getElementById("profileId").value);
    const name = document.getElementById("profileName").value;
    const age = parseInt(document.getElementById("profileAge").value);

    // Validate input
    if (!id || !name || !age) {
      alert("Please fill in all fields correctly.");
      return;
    }

    // Dispatch the action to add a profile
    store.dispatch(addProfile({ id, name, age }));

    // Clear the form
    event.target.reset();
  });

// Event listener for removing profiles
document.getElementById("removeProfileBtn").addEventListener("click", () => {
  const idToRemove = parseInt(document.getElementById("removeProfileId").value);
  // Validate input
  if (!idToRemove) {
    alert("Please enter a valid ID to remove.");
    return;
  }

  store.dispatch(removeProfile(idToRemove)); // Dispatch removeProfile action

  // Clear the input field
  document.getElementById("removeProfileId").value = "";
});
