import { Hono } from 'hono'

export type Item = {
    id: number
    name: string
    type: string
    description: string
    value: number
}

// In-memory data store
let items: Item[] = [
    { id: 1, name: 'Bloodthirsty Axe', type: 'weapon', description: 'A massive double-bladed axe forged in the fires of Mount Doom', value: 500 },
    { id: 2, name: 'Skullcrusher Mace', type: 'weapon', description: 'A heavy mace adorned with the skulls of fallen enemies', value: 450 },
    { id: 3, name: 'Ironjaw Helmet', type: 'armor', description: 'A fearsome helmet that strikes terror into enemies', value: 300 },
    { id: 4, name: 'Shadowblade Dagger', type: 'weapon', description: 'A dark dagger that never misses its mark', value: 250 },
    { id: 5, name: 'Bonebreaker Gauntlets', type: 'armor', description: 'Gauntlets that can crush stone with ease', value: 200 },
    { id: 6, name: 'Firefist Ring', type: 'accessory', description: 'A ring that channels the power of fire', value: 150 },
    { id: 7, name: 'Warhammer of Destruction', type: 'weapon', description: 'A legendary warhammer passed down through generations', value: 600 },
    { id: 8, name: 'Orcish Battle Shield', type: 'armor', description: 'A sturdy shield made from dragon scales', value: 350 }
]

let nextItemId = 9

const itemsApp = new Hono()

// GET all items
itemsApp.get('/', (c) => {
    return c.json(items)
})

// GET item by id
itemsApp.get('/:id', (c) => {
    const id = parseInt(c.req.param('id'))
    const item = items.find(i => i.id === id)

    if (!item) {
        return c.json({ error: 'Item not found' }, 404)
    }

    return c.json(item)
})

// POST create item
itemsApp.post('/', async (c) => {
    const body = await c.req.json()
    const { name, type, description, value } = body

    if (!name || !type || !description || value === undefined) {
        return c.json({ error: 'Name, type, description, and value are required' }, 400)
    }

    const newItem: Item = {
        id: nextItemId++,
        name,
        type,
        description,
        value
    }

    items.push(newItem)
    return c.json(newItem, 201)
})

// PUT update item
itemsApp.put('/:id', async (c) => {
    const id = parseInt(c.req.param('id'))
    const body = await c.req.json()
    const { name, type, description, value } = body

    const itemIndex = items.findIndex(i => i.id === id)

    if (itemIndex === -1) {
        return c.json({ error: 'Item not found' }, 404)
    }

    if (name) items[itemIndex].name = name
    if (type) items[itemIndex].type = type
    if (description) items[itemIndex].description = description
    if (value !== undefined) items[itemIndex].value = value

    return c.json(items[itemIndex])
})

// DELETE item
itemsApp.delete('/:id', (c) => {
    const id = parseInt(c.req.param('id'))
    const itemIndex = items.findIndex(i => i.id === id)

    if (itemIndex === -1) {
        return c.json({ error: 'Item not found' }, 404)
    }

    const deletedItem = items.splice(itemIndex, 1)[0]
    return c.json({ message: 'Item deleted', item: deletedItem })
})

export default itemsApp

