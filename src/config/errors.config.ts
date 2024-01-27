const errors = {
  idNotFound: {
    statusCode: 404,
    message: 'Task with this ID not found',
    error: 'Not Found',
  },
  userNameAlreadyExists: {
    statusCode: 409,
    message: 'Username already exists',
    error: 'Conflict',
  },
  unauthorized: {
    statusCode: 401,
    message: 'Please check your login credentials',
    error: 'Unauthorized',
  },
};

export default errors;
