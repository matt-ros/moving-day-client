const STORE = {
  boxes: [
    {
      id: 1,
      name: 'Kitchen Box 1',
      destination: 'Shed',
      transport: 'Steve\'s Car',
      notes: 'Fragile',
      inventory: [
        'Plates',
        'Serving Utensils'
      ]
    },
    {
      id: 2,
      name: 'Kitchen Box 2',
      destination: null,
      transport: null,
      notes: null,
      inventory: [
        'Various Gadgets'
      ]
    },
    {
      id: 3,
      name: 'Living Room Box 1',
      destination: 'Storage Unit',
      transport: 'Truck',
      notes: null,
      inventory: [
        'Games',
        'DVDs'
      ]
    },
  ],
  lists: [
    {
      id: 1,
      name: 'Matt\'s To-Do',
      items: [
        'Buy tape',
        'Pack video games'
      ]
    },
    {
      id: 2,
      name: 'Mel\'s To-Do',
      items: [
        'Pack kitchen stuff',
        'Play with Leko'
      ]
    }
  ],
  moving_date: new Date('2020/12/31')
}

export default STORE;