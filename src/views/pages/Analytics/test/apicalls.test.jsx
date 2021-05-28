import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/user/blockedDomains', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json({
        blockedDomains: [
          "example.com"
        ]
      }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('handlers server error', async () => {
    server.use(
      // override the initial "GET /greeting" request handler
      // to return a 500 Server Error
      rest.get('/user/blockedDomains', (req, res, ctx) => {
        return res(ctx.status(200))
      })
)})