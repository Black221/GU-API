module.exports.signUpErrors = (err) => {
    let errors = { login: '', email: '', password: ''};
    if (err.message.includes('login'))
        errors.login = "Invalid login or already exist";
    if (err.message.includes('email'))
        errors.email = "Invalid email";
    if (err.message.includes('password'))
        errors.password = "Invalid password";
    if (err.message.includes('email') && err.code === 11000)
        errors.email = "This email already exist";
    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { login: '', password: ''};
    if (err.message.includes('login'))
        errors.login = "Invalid login or password";
    if (err.message.includes('password'))
        errors.password = "Invalid login or password";
    return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { login: '', }
};