const Account = require('../../models/account')

async function createUser(req, res) {
  try {
    const { body } = req
    const obj = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    }

    const user = Account.build(obj)
    await user.save()
    res.send({ succes: true })
  } catch(err) {
    console.log('err', err)
    throw new Error(err)
  }
}

module.exports = {
  createUser,
}