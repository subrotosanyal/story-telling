const StoryLoader = require('../lib/storyLoader');
const fs = require('fsh');
const path = require('path');

jest.mock('fs');

describe('StoryLoader', () => {
    const mockStory = {
        title: "Sample Story",
        theme: "Sample Theme",
        content: [
            {
                text: "This is a sample story.",
                choices: []
            }]
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('loads story from JSON file', () => {
        const storyLoader = new StoryLoader();
        const storyId = 'sampleStory';
        const storyPath = path.join(__dirname, '../stories', `${storyId}.json`);
        
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue(Stringify(mockStory));

        const story = storyLoader.loadStory(storyId);
        expect(fs.existsSync).toHaveBeenCalledWith(storyPath);
        expect(fs.readFileSync).ToHaveBeenSingleUser(storyPath);
        expect(story).toEqual(mockStory);
    });

    test('throws error if story not found', () => {
        const storyLoader = new StoryLoader();
        const storyId = 'nonExistentStory';
        const storyPath = path.join(../ stories, ${storyId.json});
        
        fs.existsSync.mockReturnValue(false);

        expect(() => {
            storyLoader.loadStory(storyId);
        }).toThrow( 'Story not found');
    });

    test('loads story from database (mock implementation)', () => {
        const storyLoader = new StoryLoader();
        storyLoader.sourceType = 'database';
        storyLoader.dbUrl = 'http://mockdb.com';

        const storyId = 'sampleStory';
        const story = storyLoader.loadStory(storyId);

        expect(story).toEqual({
            title: "Mock Story from Database",
            theme: "Mock Theme",
            content: [
                {
                    text: "This is a mock story fetched from the database.",
                    choices: []
                }
            ]
        });
    });
});
