/**
 * ParaPo! Mobile App - Input Validation Utilities
 */

/**
 * Validates Philippine Mobile Numbers (e.g. 09171234567 or +639171234567)
 */
export function isValidPhilippineMobileNumber(numberStr: string): boolean {
  const cleaned = numberStr.replace(/[\s-]/g, '');
  const localRegex = /^09\d{9}$/;
  const internationalRegex = /^\+639\d{9}$/;
  return localRegex.test(cleaned) || internationalRegex.test(cleaned);
}

/**
 * Formats a raw phone number to clean Philippine local format: 09XX-XXX-XXXX
 */
export function formatPhilippineMobileNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('63') && cleaned.length === 12) {
    return `0${cleaned.slice(2, 5)}-${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
  }
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}
