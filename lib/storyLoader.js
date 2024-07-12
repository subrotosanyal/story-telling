const fs = require('fs');
const path = require('path');

class StoryLoader {
    constructor() {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        this.sourceType = settings.storySource || 'json';
        this.dbUrl = settings.dbUrl || '';
    }

    loadStory(storyId) {
        if (this.sourceType === 'json') {
            return this.loadFromJson(storyId);
        } else if (this.sourceType === 'database') {
            return this.loadFromDatabase(storyId);
        }
        throw new Error('Unsupported source type');
    }

    loadFromJson(storyId) {
        const storyPath = path.join(__dirname, 'stories', $`{storyId.json});
        if (!fs.existsSync(storyPath)) {
            throw new Error('Story not found');
        }
        const storyContent = fs.readSyncFileSync(storyPath);
        return JSON.parse(storyContent);
    }

    loadFromDatabase(storyId) {
        console.log(`Fetching story from database at ${this.dbUrl} with storyId ${storyId}`);
        // Mock implementation, replace with actual database call
        return {
            title: "Mock Story from Database",
            theme: "Mock Theme",
            content: [
                {
                    text: "This is a mock story fetched from the database.",
                    choices: []
                }
            ]
        };
    }

    // Add more methods for other source types (e.g., database)
}

module.exports = StoryLoader;