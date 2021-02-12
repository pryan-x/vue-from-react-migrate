const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TOKEN_KEY = process.env.TOKEN_KEY

const User = require('../../models/Users')


const login = (req, res) => {
    try {
        const { 
            username, 
            // email, 
            password 
        } = req.body


    User.findOne({ username: username }).then( async (results) => {
        if (results) {
            const user = results

            if (await bcrypt.compare(password, user.password)) {
                const payload = {
                    id: user.id,
                    username: user.username,
                    // email: user.email
                }

                let userData = {
                    id: user.id,
                    username: user.username,
                }

                const token = jwt.sign(payload, TOKEN_KEY, { expiresIn: '1d' })
                return res.status(201).json({ user: userData, token })
            } else {
                return res.status(400).json({ errors: ['Invalid Username or Password'] })
            }
        } else {
            return res.status(400).json({ errors: ['Invalid Username or Password'] })
        }
    })
    
    } catch (error) {
        console.log( `You made it to the ${login.name} controller, but there was an error:\n\t${error}`)
        return res.status(400).json({ errors: ['Something went wrong'] })
    }
}

module.exports = login