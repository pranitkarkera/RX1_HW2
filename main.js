import { createStore } from "redux";
import profileReducer from "./profileReducer";
import { addProfile } from "./actions";

// Create the Redux store
export const store = createStore(profileReducer);

// Subscribe to store updates
store.subscribe(() => {
  const state = store.getState();
  renderProfiles(state.profiles);
  updateAverageAge(state.averageAge);
});

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

// Function to render profiles
const renderProfiles = (profiles) => {
  const profileListContainer = document.getElementById("profileList");
  profileListContainer.innerHTML = ""; // Clear existing profiles
  const ul = document.createElement("ul");

  profiles.forEach((profile) => {
    const li = document.createElement("li");
    li.textContent = `${profile.name}, Age: ${profile.age}`;
    ul.appendChild(li);
  });

  profileListContainer.appendChild(ul);
};

// Function to update average age
const updateAverageAge = (averageAge) => {
  const averageAgeElement = document.getElementById("averageAge");
  averageAgeElement.textContent = averageAge ? averageAge.toFixed(2) : "N/A"; // Display with 2 decimal places or 'N/A' if undefined
};
