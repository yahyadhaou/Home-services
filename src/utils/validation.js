export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
export const isValidPhone = (phone) => /^(\+49|0)[0-9\s\-().]{6,20}$/.test(phone.trim());
export const isValidZip   = (zip) => /^\d{5}$/.test(zip.trim());
export const isValidIBAN  = (iban) => /^DE\d{2}[A-Z0-9]{18}$/i.test(iban.replace(/\s/g, ''));
export const isStrongPassword = (pw) => pw.length >= 8 && /[a-zA-Z]/.test(pw) && /\d/.test(pw);

export const isValidCardNumber = (number) => {
  const n = number.replace(/\s/g, '');
  if (!/^\d{13,19}$/.test(n)) return false;
  let sum = 0, double = false;
  for (let i = n.length - 1; i >= 0; i--) {
    let d = parseInt(n[i], 10);
    if (double) { d *= 2; if (d > 9) d -= 9; }
    sum += d; double = !double;
  }
  return sum % 10 === 0;
};

export default { isValidEmail, isValidPhone, isValidZip, isValidIBAN, isStrongPassword, isValidCardNumber };
