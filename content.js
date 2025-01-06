console.log("Drama Shield - extension loaded");


async function loadUsernames() {
    return new Promise((resolve) => {
        chrome.storage.local.get({ u_name_list: [] }, (result) => {
            console.log("Usernames loaded from storage:", result.u_name_list);
            resolve(result.u_name_list);
        });
    });
}


async function saveUsernames(usernames) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ u_name_list: usernames }, () => {
            console.log("Usernames saved to storage:", usernames);
            resolve();
        });
    });
}


async function handleShieldButtonClick(tweet) {
    const usernames = await loadUsernames(); 

    const usernameElements = tweet.querySelectorAll('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0');

    let username = null;


    for (const element of usernameElements) {
        const text = element.innerText.trim();
        if (text.startsWith('@')) {
            username = text.substring(1); 
            break; 
        }
    }

    if (username) {
        console.log("Found username:", username);

        
        if (!usernames.includes(username)) {
            usernames.push(username);
            await saveUsernames(usernames); 
            console.log(`Username ${username} added to the block list!`);
        } else {
            console.log(`Username ${username} is already in the block list.`);
        }

        
        removeUserTweetsFromTimeline(username);
    } else {
        console.warn("No valid username starting with '@' found in the tweet.");
    }
}





async function removeUserTweetsFromTimeline(username) {
    const tweetUsernames = document.querySelectorAll('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0');

    tweetUsernames.forEach((usernameElement) => {
        const usernameText = usernameElement.innerText.trim();

        
        if (usernameText.startsWith('@')) {
            const extractedUsername = usernameText.substring(1); 

            if (extractedUsername === username) { 
                
                const tweet = usernameElement.closest('article');
                if (tweet) {
                    tweet.remove();
                    console.log(`Tweet from ${username} removed from timeline.`);
                }
            }
        }
    });
}



function addHoverButtonToTweets() {
    try {

        const tweets = document.querySelectorAll('article');

        tweets.forEach((tweet) => {
            
            if (!tweet.querySelector('.shield-button')) {
                const shieldButton = document.createElement('button');
                shieldButton.innerText = "🛡️";
                shieldButton.className = "shield-button";
                shieldButton.style.cssText = `
                    display: none; /* Hidden by default */
                    background-color: #2980b9;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 5px 10px;
                    font-size: 12px;
                    cursor: pointer;
                    z-index: 1000;
                    position: absolute;
                    top: 10px; /* Adjust position */
                    right: 140px; /* Adjust position */
                `;


                shieldButton.addEventListener('click', (event) => {
                    event.stopPropagation(); 
                    event.preventDefault(); 
                    handleShieldButtonClick(tweet); 
                });

                
                tweet.style.position = "relative"; 
                tweet.appendChild(shieldButton);

                
                tweet.addEventListener('mouseenter', () => {
                    shieldButton.style.display = "block";
                });
                tweet.addEventListener('mouseleave', () => {
                    shieldButton.style.display = "none";
                });
            }
        });
    } catch (error) {
        console.error("Error adding hover button to tweets:", error);
    }
}


async function deleteUserTweets() {
    const usernamesToDelete = await loadUsernames(); 
    console.log("Loaded usernames to delete:", usernamesToDelete);

    const tweetElements = document.querySelectorAll('article');

    let matchedCount = 0;

    tweetElements.forEach((tweet) => {
        console.log("Processing tweet:", tweet);

        const usernameElements = tweet.querySelectorAll('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0');
        console.log("Found username elements:", usernameElements);

        for (const usernameElement of usernameElements) {
            const text = usernameElement.innerText.trim();
            console.log("Processing username element:", text);

            
            if (text.startsWith('@')) {
                const username = text.substring(1); 
                console.log("Extracted username:", username);

                
                if (usernamesToDelete.includes(username)) {
                    matchedCount++;

                    
                    tweet.remove();
                    console.log(`Tweet from ${username} removed from timeline.`);
                    break; 
                }
            }
        }
    });

    console.log(`Total matches found and removed: ${matchedCount}`);
}




setInterval(deleteUserTweets, 3000);


function observeTweets() {
    const observer = new MutationObserver(() => {
        try {
            addHoverButtonToTweets(); 
        } catch (error) {
            console.error("Error observing tweets:", error);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}


function initializeExtension() {
    try {
        console.log("Initializing Drama Shield extension...");
        addHoverButtonToTweets();
        observeTweets();
    } catch (error) {
        console.error("Error initializing the extension:", error);
    }
}


window.addEventListener('load', initializeExtension);
