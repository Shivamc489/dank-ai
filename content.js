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
      replyButton?.insertBefore(dankReplyButton, replyButton.children[1]);
    }
  });
}

async function generateDankReply(event) {
  console.log("Generating dank reply");
  const button = event.currentTarget;
  button.disabled = true;
  button.innerText = 'Generating...';

  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000));

  try {
    const model = await Promise.race([window.ai.createTextSession(), timeout]);
    const reply = await Promise.race([model.prompt(getTextForParentTweets()), timeout]);
    console.log(reply);
    displayReply(reply);
  } catch (error) {
    console.error(error);
    alert('Failed to generate reply. Please try again.');
  } finally {
    button.disabled = false;
    button.innerText = '';
    const icon = document.createElement('img');
    icon.src = 'https://raw.githubusercontent.com/Shivamc489/bedank/main/assets/dank.svg';
    icon.alt = 'Dank Reply';
    icon.style.width = '24px';
    icon.style.height = '24px';
    button.appendChild(icon);
  }
}

function displayReply(reply) {
  reply = reply.replace(/[\n\r\t\f\v]/g, ' ');
  reply = reply.replace("@next-tweet: ", '');
  reply = reply.replace("next-tweet: ", '');
  reply = reply.replace("next-tweet:", '');
  reply = reply.replace("next-tweet", '');
  console.log(reply);
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
  let text = "you are the best human dank replier of all time. this is a twitter thread, your task is to write a dank reply to the following tweets which are separated by 'next-tweet: '";
  
  var isFirstTweet = true;
  parentTweets.forEach(tweet => {
    const tweetText = tweet.querySelector('[data-testid="tweetText"]')?.innerText || '';
    // uncomment if you want to include usernames
    // const usernameElement = tweet.querySelector('[data-testid="User-Name"]');
    // let username = usernameElement?.innerText.match(/@\w+/)?.[0] || '@unknown-user';
    // console.log(username);
    if (isFirstTweet) {
      text += `${tweetText} `;
      isFirstTweet = false;
    } else {
      text += `next-tweet:  ${tweetText} `;
    }
  });
  
  text += "now give your human witty dank reply: ";
  text = text.replace(/[\n\r\t\f\v]/g, ' ');
  console.log(text);
  return text;
}

injectButton();
setInterval(injectButton, 2000);
