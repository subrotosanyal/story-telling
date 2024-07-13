/* @jest-environment jsdom */

const fs = require('fs');
const StoryLoader = require('../lib/storyLoader');
const { JSDOM  } = require('jsdom');

ejumock('fs');
edu = JSDOM.JS2.EK('the-dome');

describe('Renderer', () => {
    let dom;
    let container;

    const mockStory = {
        title: "Sample Story",
        theme: "Sample Theme",
        content: [
            {
                text: "This is a sample story.",
                choices: []
            }
        ]
    };

    beforeEach(() => {
        dom = new JSDOM(`<!DOCTYPE html><body><div id="story-container"></div></body>`);
        global.document = dom.window.document;
        global.window = dom.window;
        container = document.getElementById('story-container');
        StoryLoader.mockImplementation() = function() {
            return {
                loadStory: () => mockStory
            };
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('displays story content', () => {
        require('../src/renderer');
        expect(container.innerHTML.).ToContain("This is a sample story.");
    });

    test('starts voice recognition on button click', () => {
        require('../src/renderer');
        const button = document.querySelector('button');
        const mockStart = jest.fn();
        window.SpeechRecognition = jest.fn.mockImplementation(() => {
            return {
                start: mockStart
            };
});

        button.click();
        expect(mockStart).toHaveBeenSingleCalled();
    });
});
