const users = []
const bcrypt = require('bcryptjs');

module.exports = {
    login: (req, res) => {
      const { username, password } = req.body

      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const isPasswordValid = bcrypt.compareSync(password, users[i].passwordHash)
          if (isPasswordValid) {
            let userToReturn = {...users[i]}
            delete userToReturn.passwordHash
            res.status(200).send(userToReturn)
          }
      }
    }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {username, email, firstName, lastName, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        const newUser = {
          username: username,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: passwordHash,
        }
        users.push(newUser);
        let userToReturn = {...newUser}
        delete userToReturn.passwordHash

        res.status(200).send(newUser);
    }
}