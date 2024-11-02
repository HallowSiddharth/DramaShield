console.log("Drama Shield - extension loaded");

async function loadUsernames() {
    const url = chrome.runtime.getURL("usernames.json");
    //console.log("Fetching usernames from:", url);
    try {
        const response = await fetch(url);  // Await the fetch call
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();  // Await the json parsing
        console.log("Usernames loaded:", data.u_name_list); // Log loaded usernames
        return data.u_name_list;
    } catch (error) {
        console.error("Error loading usernames:", error);
        return [];
    }
}

async function deleteUserTweets() {
    //console.log("deleteUserTweets function has started");
    const usernamesToDelete = await loadUsernames(); // Load the usernames as an array
  
    // Select all elements with the username class
    const tweetUsernames = document.querySelectorAll('.css-175oi2r.r-1wbh5a2.r-dnmrzs');
    //console.log(`Total username elements found: ${tweetUsernames.length}`);
  
    let matchedCount = 0;
  
    tweetUsernames.forEach((usernameElement) => {
      const usernameText = usernameElement.innerText.trim();
      //console.log(`Found username: ${usernameText}`);
  
      // Check if the username matches any in the usernamesToDelete array
      console.log(usernamesToDelete);
      if (usernamesToDelete.includes(usernameText.substring(1))) { // Remove the '@' for the comparison
        matchedCount++;
        //console.log(`Match found for ${usernameText}. Attempting to delete tweet...`);
        
        // Delete the parent article element containing the tweet
        const tweet = usernameElement.closest('article');
        if (tweet) {
          tweet.remove();
          //console.log("Tweet deleted successfully.");
        } else {
          //console.log("No parent article found for this username element.");
        }
      }
    });
  
    //console.log(`Total matches found and removed: ${matchedCount}`);
  }
  

// Run the function every few seconds to handle dynamically loaded tweets
setInterval(deleteUserTweets, 3000);
