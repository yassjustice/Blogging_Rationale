const axios = require('axios')

async function nameCheck(name) {
    const response = await axios.get(`http://localhost:3000/users`);
    const users = response.data;

    let nameExists = false;  // Initialize a variable to track if the name exists

    for (const user of users) {
        if (user.name === name) {
            nameExists = true;
            break; // Name is found, no need to continue the loop
        }
    }

    return nameExists; // Return the result after the loop has completed
}


module.exports = nameCheck;