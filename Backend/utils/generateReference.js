const generateReference = (userId) => {
  const shortId = userId.toString().slice(-4);
  return `KWC-${shortId}-${Date.now()}`;
};

export default generateReference;