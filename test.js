async function captureReplies() {
  // Load the Twitter page and wait for it to load
  await window.location.replace("https://twitter.com/Twitter/status/1654211976485126150");
  await new Promise(resolve => setTimeout(resolve, 5000)); // wait for 5 seconds for the page to load completely

  // Scroll through the page to load all the replies
  let currentHeight = document.documentElement.scrollHeight;
  while (true) {
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second for the new replies to load
    let newHeight = document.documentElement.scrollHeight;
    if (newHeight === currentHeight) break;
    currentHeight = newHeight;
  }

  // Extract the tweet ID from the page URL
  let tweetId = window.location.pathname.split("/").pop();
  let INSERT_ACCESS_TOKEN_HERE = "AAAAAAAAAAAAAAAAAAAAAM9YcwEAAAAAS%2FH7UI5PWUjV7j4aN%2Fm%2BimGqNUQ%3DmES0mZy3unggHYxF84IK1PrH9pvNtyo7NBfPl87XLVN1lhhX17"
  // Send requests to Twitter's servers to fetch the reply data
  let url = `https://api.twitter.com/2/timeline/conversation/${tweetId}.json?tweet_mode=extended&count=100&cursor=`;
  let cursor = "";
  let replies = [];
  while (true) {
    let response = await fetch(url + cursor, {
      headers: {
        "authorization": `Bearer ${INSERT_ACCESS_TOKEN_HERE}`
      }
    });
    let json = await response.json();
    replies = replies.concat(json.globalObjects.tweets);
    if (!json.timeline.instructions[0].hasOwnProperty("addEntries")) break;
    cursor = json.timeline.instructions[0].addEntries.entries.pop().content.operation.cursor.value;
  }

  // Process the reply data as needed
  for (let tweetId in replies) {
    let tweet = replies[tweetId];
    console.log(tweet.full_text);
  }
}

captureReplies();
