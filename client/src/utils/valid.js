/**
 * This function validates the user input for registration.
 * @param {Object} user - The user object containing username, email, password, and confirm password.
 * @returns {Object} The function returns an object with two properties: errMsg and errLength.
 * errMsg is an object containing error messages for each input field if there is an error.
 * errLength is the number of properties in errMsg object.
 */
const valid = ({ username, email, password, cf_password}) => {
    // Initialize an object to store error messages
    const err = {}

    // Check if username is empty
    if(!username) {
        err.username = "Please add your user name."
    // Check if username is longer than 25 characters
    }else if(username.replace(/ /g, '').length > 25){
        err.username = "User name is up to 25 characters long."
    }

    // Check if email is empty
    if(!email) {
        err.email = "Please add your email."
    // Check if email format is correct
    }else if(!validateEmail(email)) {
        err.email = "Email format is incorrect."
    }

    // Check if password is empty
    if(!password) {
        err.password = "Please add your password."
    // Check if password is shorter than 6 characters
    }else if(password.length < 6) {
        err.password = "Password must be at least 6 characters."
    }

    // Check if confirm password matches password
    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match."
    }

    // Return an object with error messages and number of errors
    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

/**
 * This function validates if an email is in the correct format.
 * @param {string} email - The email to be validated.
 * @returns {boolean} Returns true if the email is in the correct format, false otherwise.
 */
function validateEmail(email) {
    // Regular expression to validate email format
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
 
export default valid
