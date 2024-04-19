import i18n from '../i18n';

describe('i18n', () => {
    // Save the original navigator object
    const originalNavigator = global.navigator;
  
    beforeAll(() => {
      // Define a new navigator object
      global.navigator = {
        ...originalNavigator,
        userLanguage: 'en-US', // Set a non-null value for userLanguage
      };
    });
  
    afterAll(() => {
      // Restore the original navigator object
      global.navigator = originalNavigator;
    });

    it('should initialize with the correct configuration', () => {
        // Your existing test case code here
    });
});