function createDankReplyButton() {
  const button = document.createElement('button');
  button.className = 'dank-reply-btn';
  
  const icon = document.createElement('img');
  icon.src = 'https://raw.githubusercontent.com/Shivamc489/bedank/main/assets/dank.svg';
  icon.alt = 'Dank Reply';
  icon.style.width = '24px';
  icon.style.height = '24px';
  
  button.appendChild(icon);
  button.onclick = generateDankReply;
  return button;
}

function injectButton() {
  const tweetElements = document.querySelectorAll('[data-testid="tweetTextarea_0"]');
  
  tweetElements.forEach(tweet => {
    if (tweet && !document.querySelector('.dank-reply-btn')) {
      const replyButton = document.querySelector('[data-testid="toolBar"]');
      const dankReplyButton = createDankReplyButton();
      replyButton.insertBefore(dankReplyButton, replyButton.children[1]);
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
  let text = "you are the best dank replier of all time. this is a twitter thread, your task is to write a dank reply to the following tweets which are separated by 'next tweet: '";
  
  parentTweets.forEach(tweet => {
    const tweetText = tweet.querySelector('[data-testid="tweetText"]')?.innerText || '';
    // uncomment if you want to include usernames
    // const usernameElement = tweet.querySelector('[data-testid="User-Name"]');
    // let username = usernameElement?.innerText.match(/@\w+/)?.[0] || '@unknown-user';
    // console.log(username);
    text += `${tweetText} next tweet: `;
  });
  
  text += "your reply: ";
  text = text.replace(/[\n\r\t\f\v]/g, ' ');
  console.log(text);
  return text;
}

injectButton();
setInterval(injectButton, 2000);
