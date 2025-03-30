// Configuration settings for the application
const config = {
    // OpenAI API settings
    openai: {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000
    },
    
    // Supported countries and their tax years
    supportedCountries: {
        'India':{
        currentTaxYear: 2024,
        filingDeadline: '2025-04-15'
        },
      'United States': {
        currentTaxYear: 2024,
        filingDeadline: '2025-04-15'
      },
      'United Kingdom': {
        currentTaxYear: 2024,
        filingDeadline: '2025-01-31'
      },
      'Canada': {
        currentTaxYear: 2024,
        filingDeadline: '2025-04-30'
      },
      'Australia': {
        currentTaxYear: 2024,
        filingDeadline: '2025-10-31'
      }
    },
    
    // UI settings
    ui: {
      messagesToRetain: 50, // Maximum number of messages to keep in chat history
      suggestionsCount: 3,  // Number of suggestions to show
      typingIndicatorDelay: 300 // ms
    }
  };
  
  export default config;