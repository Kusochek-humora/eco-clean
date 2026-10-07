export const PHONE_DIGITS = 10; // после +7 — 10 цифр

// маска +7 (XXX) XXX-XX-XX; «+7» в начале и ведущие 7/8 у 11 цифр — код страны, не цифры номера
export function formatPhone(raw) {
  let digits = raw.startsWith('+7') ? raw.slice(2) : raw;
  digits = digits.replace(/\D/g, '');
  if (digits.length > PHONE_DIGITS && /^[78]/.test(digits)) digits = digits.slice(1);
  digits = digits.slice(0, PHONE_DIGITS);

  if (!digits) return '';
  let out = `+7 (${digits.slice(0, 3)}`;
  if (digits.length > 3) out += `) ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) out += `-${digits.slice(8, 10)}`;
  return out;
}

// только цифры номера без кода страны (10 штук у полного номера)
export const phoneDigits = (value) => formatPhone(value).replace(/\D/g, '').slice(1);
