// Basic tax calculation functions based on country rules
export function calculateTax(income, country, deductions = {}) {
    // This would contain country-specific tax calculations
    // For demonstration purposes we'll include a simplified US calculation
  
    if (country.toLowerCase().includes('india') || country.toLowerCase().includes('India')) {
      return calculateUsTax(income, deductions);
    }
    
    // Default simple calculation (for demo purposes)
    return income * 0.2; // Assume 20% flat tax
  }
  
  function calculateUsTax(income, deductions = {}) {
    // Simplified US tax brackets for 2024 (example)
    const taxBrackets = [
      { max: 11000, rate: 0.10 },
      { max: 44725, rate: 0.12 },
      { max: 95375, rate: 0.22 },
      { max: 182100, rate: 0.24 },
      { max: 231250, rate: 0.32 },
      { max: 578125, rate: 0.35 },
      { max: Infinity, rate: 0.37 }
    ];
    
    // Calculate total deductions
    const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + (Number(value) || 0), 0);
    
    // Taxable income
    const taxableIncome = Math.max(0, income - totalDeductions);
    
    // Calculate tax
    let tax = 0;
    let remainingIncome = taxableIncome;
    let previousMax = 0;
    
    for (const bracket of taxBrackets) {
      const taxableInBracket = Math.min(remainingIncome, bracket.max - previousMax);
      if (taxableInBracket <= 0) break;
      
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
      previousMax = bracket.max;
    }
    
    return tax;
  }