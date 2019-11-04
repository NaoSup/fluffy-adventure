'use strict'

require('dotenv').config({ path: process.env.DOTENV || '.env' })

const Hapi = require('hapi')
const path = require('path') // resolving path module
const Boom = require('boom')
const dialogFlowHelper = require('./helpers/dialogflow')
// Paths
global.appRoot = path.resolve(__dirname)
const mongoose = require('mongoose') // mongodb

const PORT = process.env.PORT || 3000
const ADDRESS = process.env.ADDRESS || '127.0.0.1'
const ENTRY = path.join(__dirname, '../frontend/dist') // if path change, only edit this
const Pack = require('./package')

const server = Hapi.Server({
  port: PORT,
  host: ADDRESS,
  routes: {
    files: { relativeTo: ENTRY },
    payload: { maxBytes: 10485760 },
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          // In prod, log a limited error message and throw the default Bad Request error.
          console.error('ValidationError:', err.message)
          throw Boom.badRequest(`Invalid request payload input`)
        } else {
          // During development, log and respond with the full error.
          console.error('validate', err)
          throw err
        }
      }
    },
    cors: {
      origin: ['*'], // not needed for now
      additionalHeaders: ['x-token'], // requested for login
      credentials: true
    },
    security: false
  }
})

require('./lib/dbConnection')(mongoose, server) // Init DB

const init = async () => {
  await server.register([
    require('inert'), // Hapi module for static files,
    require('blipp'), // hapi plugin to display the routes table to console at startup
    require('vision'), // to use templating system (for swagger),
    {
      plugin: require('hapi-swagger'), // to display documentation
      options: {
        info: {
          title: 'API Documentation',
          description: 'This is a sample of API documentation.',
          termsOfService: 'https://github.com/glennjones/hapi-swagger/',
          contact: { email: 'naomi.paulmin@ynov.com' },
          version: Pack.version
        }
      }
    },
    {
      plugin: require('good'),
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          consoleReporter: [
            {
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            },
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    }
  ])

  await server.register([
    // ROUTING PLUGIN
    require('./routes/action'),
    require('./routes/dialogFlow'),
    require('./routes/ticket'),
    require('./routes/front')
  ])

  await server.start()
  console.info(
    `Server running at: ${server.info.uri}, ENTRY: ${ENTRY}, __dirname ${__dirname}`
  )
  // uncomment to test
  // const test = await dialogFlowHelper.sendTextToDiagFlow('Bonjour')
  // console.log(test)
}

process.on('unHandledRejection', err => {
  if (err) {
    console.error('unHandledRejection', err)
    process.exit(1)
  }
})

init().catch(err => {
  console.error('Error during server init : ' + err.stack)
  process.exit(1)
})
