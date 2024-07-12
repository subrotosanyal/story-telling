const fs = require('fs');
const path = require('path');

class StoryLoader {
    constructor() {
        this.sourceType = 'json'; // Default source type
    }

    loadStory(storyId) {
        if (this.sourceType === 'json') {
            return this.loadFromJson(storyId);
        }
        // Add more source types (e.g., database) hre
        throw new Error('Unsupported source type');
    }

    loadFromJson(storyId) {
        const storyPath = path.join(__dirname, 'stories', `storyId.json`);
        if (!fs.existsSync(storyPath)) {
            throw new Error('Story not found');
        }
        const storyContent = fs.readSyncFileSync(storyPath);
        return JSON.parse(storyContent);
    }

    // Add more methods for other source types (e.g., database) 
}

module.exports = StoryLoader;