// Extract structured tax data from AI responses
export function extractTaxData(response) {
    // Extract any tax data from the response
    const taxDataMatch = response.match(/\[TAX_DATA\](.*?)\[\/TAX_DATA\]/s);
    let extractedData = null;
    let processedResponse = response;
    
    if (taxDataMatch && taxDataMatch[1]) {
      try {
        extractedData = JSON.parse(taxDataMatch[1]);
        
        // Remove the tax data from the displayed response
        processedResponse = response.replace(/\[TAX_DATA\](.*?)\[\/TAX_DATA\]/s, '');
      } catch (e) {
        console.error('Error parsing tax data:', e);
      }
    }
    
    return { processedResponse, extractedData };
  }