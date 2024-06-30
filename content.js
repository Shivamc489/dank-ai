function createDankReplyButton() {
  const button = document.createElement('button');
  button.className = 'dank-reply-btn';
  button.innerText = 'Dank Reply';
  button.onclick = generateDankReply;
  return button;
}

function injectButton() {
  const tweetElements = document.querySelectorAll('[data-testid="tweetTextarea_0"]');
  
  tweetElements.forEach(tweet => {
    console.log(tweet);
    if (tweet && !document.querySelector('.dank-reply-btn')) {
      const replyButton = document.querySelector('[data-testid="tweetButtonInline"]');
      console.log("Injecting button");
      const dankReplyButton = createDankReplyButton();
      replyButton.parentNode.insertBefore(dankReplyButton, replyButton.nextSibling);
    }
  });
}

async function generateDankReply(event) {
  console.log("Generating dank reply");
  const model = await window.ai.createTextSession();
  var reply = await model.prompt(getTextForParentTweets());
  console.log(reply);
  displayReply(reply);
}

function displayReply(reply) {
  const replyBox = document.querySelector('[data-testid="tweetTextarea_0"]');
  
  if (replyBox) {
    replyBox.focus();
    replyBox.value = '';
    document.execCommand('insertText', false, reply);
  } else {
    console.log("Reply box not found");
  }
}

function getTextForParentTweets() {
  const parentTweets = document.querySelectorAll('[data-testid="tweet"]');
  let text = "you are the best dank replier of all time. this is a twitter thread, your task is to write a dank reply to the following tweets which are separated by 'next tweet: ' and contains the username of who tweeted it: ";
  
  parentTweets.forEach(tweet => {
    const tweetText = tweet.querySelector('[data-testid="tweetText"]')?.innerText || '';
    const username = tweet.querySelector('[data-testid="User-Name"]')?.innerText || 'unknown user';
    text += `@${username}: ${tweetText} next tweet: `;
  });
  
  text += "your reply: ";
  text = text.replace(/[\n\r\t\f\v]/g, ' ');
  console.log(text);
  return text;
}

injectButton();
setInterval(injectButton, 3000);
