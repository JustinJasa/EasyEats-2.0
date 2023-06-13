export const ValidateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } 

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  return errors;
};

export const ValidateSignUp = (values) => {
  const errors = {};
  const emailEnding = /@student\.ju\.se$/

  if (!values.username) {
    errors.username = "Required";
  } 

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!emailEnding.test(values.email)){ 
    errors.email = "Must be a student email with @student.ju.se"
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 ) {
    errors.password = "Must be 8 characters or more";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password ) {
    errors.confirmPassword = "Your password must match!";
  }

  return errors;
};

export const ValidateUserForm = (values) => {
  console.log(values)
  const errors = {};
  const emailEnding = /@student\.ju\.se$/


  if (!values.username) {
    errors.username = "Required";
  } 

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!emailEnding.test(values.email)){ 
    errors.email = "Must be a student email with @student.ju.se"
  }

  return errors;
};

