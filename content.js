console.log("Drama Shield - extension loaded");

// Load usernames from chrome.storage.local
async function loadUsernames() {
    return new Promise((resolve) => {
        chrome.storage.local.get({ u_name_list: [] }, (result) => {
            console.log("Usernames loaded from storage:", result.u_name_list);
            resolve(result.u_name_list);
        });
    });
}

async function deleteUserTweets() {
    const usernamesToDelete = await loadUsernames(); // Load the usernames as an array
    
    // Check the current URL
    const currentUrl = window.location.href;
    const userPagePrefix = "https://x.com/"; 

    if (currentUrl.startsWith(userPagePrefix)) {
        const username = currentUrl.substring(userPagePrefix.length); // Extract username after the prefix
        
        // If the username is in the usernamesToDelete array, skip tweet deletion
        if (usernamesToDelete.includes(username)) {
            console.log(`Currently on personal profile page: ${username}. Skipping tweet deletion.`);
            return; // Exit the function if on personal page
        }
    }
     
    // Select all elements with the username class
    const tweetUsernames = document.querySelectorAll('.css-175oi2r.r-1wbh5a2.r-dnmrzs');
  
    let matchedCount = 0;
  
    tweetUsernames.forEach((usernameElement) => {
      const usernameText = usernameElement.innerText.trim();

      // Check if the username matches any in the usernamesToDelete array
      if (usernamesToDelete.includes(usernameText.substring(1))) { // Remove the '@' for the comparison
        matchedCount++;
        
        // Delete the parent article element containing the tweet
        const tweet = usernameElement.closest('article');
        if (tweet) {
          tweet.remove();
        }
      }
    });
  
    console.log(`Total matches found and removed: ${matchedCount}`);
}
  
// Run the function every few seconds to handle dynamically loaded tweets
setInterval(deleteUserTweets, 3000);
