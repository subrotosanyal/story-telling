const StoryLoader = require('../lib/storyLoader');

// Display a story
function displayStory(story) {
    const storyContainer = document.getElementById('story-container');
    storyContainer.innerHTML = '';

    let currentIndex = 0;

    function showSegment(index) {
        const segment = story.content[index];
        const textElement = document.createElement('p');
        textElement.textContent = segment.text;
        storyContainer.appendChild(textElement);

        segment.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.onclick = () => {
                storyContainer.innerHTML = '';
                showSegment(choice.next);
            };
            storyContainer.appendChild(button);
        });
    }

    showSegment(currentIndex);
}

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript.toLowerCase();
    console.log('Speech received: ' + speechResult);
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase() === speechResult) {
            button.click();
        }
    });
};

recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
};

document.addEventListener('DOMContentLoaded', () => {
    const storyLoader = new StoryLoader();
    try {
        const story = storyLoader.loadStory('sampleStory');
        displayStory(story);
    } catch (error) {
        console.error('Error loading story:', error);
        alert('Failed to load the story.');
    }

    const startButton = document.createElement('button');
    startButton.textContent = 'Start Voice Recognition';
    startButton.onclick = () => recognition.start();
    document.body.appendChild(startButton);
});
