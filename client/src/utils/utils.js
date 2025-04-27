export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const getPaginationData = (data, from, to) => {
  return data.slice(from,to);
}

export const getRandomLogoIcon = () => {
  return "";
}

export const renderValue = (value) => {
  return value === null || value === undefined ? "N.A." : value;
};