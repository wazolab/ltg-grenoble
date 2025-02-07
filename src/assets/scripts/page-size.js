const formatBytesIntl = (bytes, decimals = 2, locale = "en-US") => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Format number with Intl API (localized thousands separator)
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(bytes / Math.pow(k, i));

  return `${formattedNumber} ${sizes[i]}`;
}

// Get page size
window.onload = function () {
  let resource = performance.getEntriesByType("navigation")[0];
  let transferSize = formatBytesIntl(resource.transferSize);

  document.getElementById('page-size').innerText = transferSize + ' (compressed)'
};