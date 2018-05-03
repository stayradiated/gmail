/* @flow */

const fetch = require('node-fetch')
const auth = require('basic-auth-token')
const { parseString } = require('xml2js')
const { promisify } = require('util')

const parseStringAsync = promisify(parseString)

const fetchEmail = async (username /*: string */, password /*: string */) => {
  const authToken = auth(username, password)

  const res = await fetch('https://mail.google.com/mail/feed/atom', {
    headers: {
      authorization: `Basic ${authToken}`
    }
  })

  const text = await res.text()
  const atom = await parseStringAsync(text)

  return atom
}

module.exports = fetchEmail
