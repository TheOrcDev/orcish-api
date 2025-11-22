import { Hono } from 'hono'

export type User = {
    id: number
    name: string
    email: string
}

// In-memory data store
let users: User[] = [
    { id: 1, name: 'Grukthar the Mighty', email: 'grukthar@orcclan.com' },
    { id: 2, name: 'Zog Bloodaxe', email: 'zog.bloodaxe@darkforge.net' },
    { id: 3, name: 'Thrak Ironjaw', email: 'thrak@ironjaw.war' },
    { id: 4, name: 'Morgok Skullcrusher', email: 'morgok@skullcrusher.clan' },
    { id: 5, name: 'Gorak the Destroyer', email: 'gorak@destruction.org' },
    { id: 6, name: 'Urgok Bonebreaker', email: 'urgok@bonebreaker.tribe' },
    { id: 7, name: 'Draknar Firefist', email: 'draknar@firefist.stronghold' },
    { id: 8, name: 'Kragnak Shadowblade', email: 'kragnak@shadowblade.net' }
]

let nextUserId = 9

const usersApp = new Hono()

// GET all users
usersApp.get('/', (c) => {
    return c.json(users)
})

// GET user by id
usersApp.get('/:id', (c) => {
    const id = parseInt(c.req.param('id'))
    const user = users.find(u => u.id === id)

    if (!user) {
        return c.json({ error: 'User not found' }, 404)
    }

    return c.json(user)
})

// POST create user
usersApp.post('/', async (c) => {
    const body = await c.req.json()
    const { name, email } = body

    if (!name || !email) {
        return c.json({ error: 'Name and email are required' }, 400)
    }

    const newUser: User = {
        id: nextUserId++,
        name,
        email
    }

    users.push(newUser)
    return c.json(newUser, 201)
})

// PUT update user
usersApp.put('/:id', async (c) => {
    const id = parseInt(c.req.param('id'))
    const body = await c.req.json()
    const { name, email } = body

    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return c.json({ error: 'User not found' }, 404)
    }

    if (name) users[userIndex].name = name
    if (email) users[userIndex].email = email

    return c.json(users[userIndex])
})

// DELETE user
usersApp.delete('/:id', (c) => {
    const id = parseInt(c.req.param('id'))
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return c.json({ error: 'User not found' }, 404)
    }

    const deletedUser = users.splice(userIndex, 1)[0]
    return c.json({ message: 'User deleted', user: deletedUser })
})

export default usersApp

