// Calculate progress based on filled user information
export function calculateProgress(userInfo) {
    // Calculate progress based on filled sections
    let completedSections = 0;
    let totalSections = 4; // Personal, Income, Deductions, Credits
    
    if (Object.keys(userInfo.personalDetails).length > 0) completedSections++;
    if (Object.keys(userInfo.income).length > 0) completedSections++;
    if (Object.keys(userInfo.deductions).length > 0) completedSections++;
    if (Object.keys(userInfo.taxCredits).length > 0) completedSections++;
    
    return Math.round((completedSections / totalSections) * 100);
  }