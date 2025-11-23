const handleError = (res, status = 400, message = "", err) => {
  return res.status(status).json({
    message: message,
    error: err ? err : "",
  });
};

const handleSuccess = (res, status = 200, message, obj = {}) => {
  return res.status(status).json({
    message: message,
    response: obj ? obj : "",
  });
};

export { handleError, handleSuccess };
