import { Hono } from 'hono'
import itemsApp from './items.js'
import usersApp from './users.js'

const app = new Hono()

// Root route
app.get('/', (c) => {
  return c.json({
    message: 'Orcish API',
    endpoints: {
      users: '/api/users',
      items: '/api/items'
    }
  })
})

// Mount routes
app.route('/api/users', usersApp)
app.route('/api/items', itemsApp)

export default app
