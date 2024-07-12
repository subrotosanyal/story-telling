document.addEventListener('DOMContentLoaded', () => {
    const storySourceSelect = document.getElementById('story-source');
    const dbSettingsDiv = document.getElementById('db-settings');
    const settingsForm = document.getElementById('settings-form');

    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('settings') || {});
    if (savedSettings.storySource) {
        storySourceSelect.value = savedSettings.storySource;
        if (savedSettings.storySource === 'database') {
            dbSettingsDiv.style.display = 'block';
            document.getElementById('db-url').value = savedSettings.dbUrl || '';
        }
    }

    storySourceSelect.addEventListener('change', () => {
        if (storySourceSelect.value === 'database') {
            dbSettingsDiv.style.display = 'block';
        } else {
            dbSettingsDiv.style.display = 'none';
        }
    });

    settingsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const settings = {
            storySource: storySourceSelect.value,
            dbUrl: storySourceSelect.value === 'database' ? document.getElementById('db-url').value : ''
        };
        localStorage.setItem('settings', JSON.stringify(settings));
        alert('Settings saved');
    });
});