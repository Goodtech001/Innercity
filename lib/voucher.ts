export function generateVoucherCode() {
  const prefix = "FUND";
  const year = new Date().getFullYear();
  const random = crypto.randomUUID().split("-")[0].toUpperCase();

  return `${prefix}-${year}-${random}`;
}
