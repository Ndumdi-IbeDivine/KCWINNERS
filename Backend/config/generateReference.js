const generateReference = (userId) => {
  const shortId = userId.toString().slice(-4);
  return `USR${shortId}${Date.now()}`;
};

export default generateReference;