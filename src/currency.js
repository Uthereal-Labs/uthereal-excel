/** Supported ISO 4217 monetary codes provided by the maintained Intl runtime. */
export const SUPPORTED_CURRENCIES = Object.freeze(Intl.supportedValuesOf('currency'));
const supportedCurrencies = new Set(SUPPORTED_CURRENCIES);
/** @param {unknown} code @returns {string} Validated uppercase currency; never coerces invalid input. */
export function normalizeCurrency(code) {
  if (typeof code !== 'string' || !/^[A-Z]{3}$/.test(code) || !supportedCurrencies.has(code)) throw new RangeError('Currency must be a supported uppercase ISO 4217 code.');
  return code;
}
/** @param {{currency?: string, format?: string, decimals?: number}} style */
export function normalizeCurrencyStyle(style) {
  if (Object.hasOwn(style, 'currency')) normalizeCurrency(style.currency);
  return style;
}
/** Exact format emitted by Gridline; other custom number formats remain custom. */
export function currencyNumberFormat(style) {
  normalizeCurrencyStyle(style);
  return `[\u0024${style.currency ?? 'USD'}]#,##0${style.decimals === 0 ? '' : '.' + '0'.repeat(style.decimals ?? 0)}`;
}
/** @param {string} format @returns {{format: string, currency?: string, decimals?: number}} */
export function styleFromNumberFormat(format) {
  const match = /^\[\$([A-Z]{3})\]#,##0(?:\.(0+))?$/.exec(format);
  return match ? { format: 'currency', currency: normalizeCurrency(match[1]), decimals: match[2]?.length ?? 0 } : { format };
}
