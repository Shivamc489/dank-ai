# Dank Reply Button

This project injects a "Dank Reply" button into Twitter's web interface. When clicked, the button generates a dank reply to a tweet using an the Gemini Nano model provided in the Chrome window.ai API.

## Features

- **Inject Button**: Automatically adds a "Dank Reply" button next to the reply button on each tweet.
- **Generate Dank Reply**: Uses an AI model to generate a humorous reply to the tweet.
- **Display Reply**: Automatically fills the reply box with the generated reply.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/dank-reply-button.git
    ```
2. Navigate to the project directory:
    ```bash
    cd dank-reply-button
    ```

## Usage

1. Open the `content.js` file and ensure the AI model integration is correctly set up.
2. Load the script into your browser. You can do this by creating a browser extension or using a tool like Tampermonkey.
3. Navigate to Twitter and you should see the "Dank Reply" button next to the reply button on each tweet.

## Functions

### `createDankReplyButton()`

Creates the "Dank Reply" button element.

### `injectButton()`

Injects the "Dank Reply" button next to the reply button on each tweet.

### `generateDankReply(event)`

Generates a humorous reply using an AI model and displays it in the reply box.

### `displayReply(reply)`

Displays the generated reply in the reply box.

### `getTextForParentTweets()`

Gathers the text from parent tweets to provide context for the AI model.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
