// Load usernames from storage
function loadUsernames() {
    chrome.storage.local.get({ u_name_list: [] }, (result) => {
      const uNameList = result.u_name_list;
      displayUsernames(uNameList);
    });
}

// Display usernames as checkboxes (checked by default)
function displayUsernames(usernames) {
    const usernameList = document.getElementById('usernameList');
    usernameList.innerHTML = ''; // Clear previous list

    usernames.forEach((username) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = username;
      checkbox.checked = true; // Set checkbox to checked by default

      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(username));
      usernameList.appendChild(li);
    });
}

// Add new username to list and storage
document.getElementById('addButton').addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value.trim();
    if (newUsername) {
      chrome.storage.local.get({ u_name_list: [] }, (result) => {
        const uNameList = result.u_name_list;
        if (!uNameList.includes(newUsername)) {  // Prevent duplicates
          uNameList.push(newUsername);
          chrome.storage.local.set({ u_name_list: uNameList }, () => {
            displayUsernames(uNameList);
            document.getElementById('newUsername').value = ''; // Clear input
          });
        }
      });
    }
});

// Remove unchecked usernames from storage
document.getElementById('confirmButton').addEventListener('click', () => {
    chrome.storage.local.get({ u_name_list: [] }, (result) => {
      const uNameList = result.u_name_list;

      // Filter out usernames that are unchecked
      const updatedList = uNameList.filter((username) => {
        const checkbox = [...document.querySelectorAll('input[type="checkbox"]')]
          .find(input => input.value === username);
        return checkbox && checkbox.checked; // Only keep checked usernames
      });

      // Update the storage with the filtered list and refresh display
      chrome.storage.local.set({ u_name_list: updatedList }, () => {
        displayUsernames(updatedList);
      });
    });
});

// Initialize
loadUsernames();
