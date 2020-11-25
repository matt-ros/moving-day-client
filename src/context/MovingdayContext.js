import React from 'react'
import GetAllApiService from '../services/getAll-api-service'
import TokenService from '../services/token-service'

const MovingdayContext = React.createContext({
  user: {},
  boxes: [],
  contacts: [],
  lists: [],
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setBoxes: () => {},
  setContacts: () => {},
  setLists: () => {},
  updateUser: () => {},
  addBox: () => {},
  updateBox: () => {},
  deleteBox: () => {},
  addContact: () => {},
  updateContact: () => {},
  deleteContact: () => {},
  addList: () => {},
  updateList: () => {},
  deleteList: () => {},
  onLogin: () => {},
  onLogOut: () => {},
})

export default MovingdayContext

export class MovingdayProvider extends React.Component {
  state = {
    user: {},
    boxes: [],
    contacts: [],
    lists: [],
    error: null
  }

  componentDidMount() {
    if (TokenService.hasUnexpiredAuthToken()) {
      this.onLogin()
    }
  }

  setError = (error) => {
    console.error(error);
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setBoxes = boxes => {
    this.setState({ boxes })
  }

  setContacts = contacts => {
    this.setState({ contacts })
  }
  
  setLists = lists => {
    this.setState({ lists })
  }

  updateUser = fields => {
    const updatedUser = {
      ...this.state.user,
      ...fields
    }
    this.setState({ user: updatedUser })
  }

  addBox = box => {
    const newBoxes = [
      ...this.state.boxes,
      box
    ]
    this.setBoxes(newBoxes)
  }

  updateBox = (boxId, fields) => {
    const { boxes } = this.state
    // eslint-disable-next-line
    const currentBox = this.state.boxes.find(box => box.id == boxId)
    const updatedBox = {
      ...currentBox,
      ...fields
    }
    boxes.splice(boxes.findIndex(box => box.id === currentBox.id), 1, updatedBox)
    this.setBoxes(boxes)
  }

  deleteBox = boxId => {
    const boxes = this.state.boxes
    const newBoxes = boxes.filter(box => box.id !== Number(boxId))
    this.setBoxes(newBoxes)
  }

  addContact = contact => {
    const newContacts = [
      ...this.state.contacts,
      contact
    ]
    this.setContacts(newContacts)
  }

  updateContact = (contactId, fields) => {
    const { contacts } = this.state
    // eslint-disable-next-line
    const currentContact = this.state.contacts.find(contact => contact.id == contactId)
    const updatedContact = {
      ...currentContact,
      ...fields
    }
    contacts.splice(contacts.findIndex(contact => contact.id === currentContact.id), 1, updatedContact)
    this.setContacts(contacts)
  }

  deleteContact = contactId => {
    const contacts = this.state.contacts
    const newContacts = contacts.filter(contact => contact.id !== Number(contactId))
    this.setContacts(newContacts)
  }

  addList = list => {
    const newLists = [
      ...this.state.lists,
      list
    ]
    this.setLists(newLists)
  }

  updateList = (listId, fields) => {
    const { lists } = this.state
    // eslint-disable-next-line
    const currentList = this.state.lists.find(list => list.id == listId)
    const updatedList = {
      ...currentList,
      ...fields
    }
    lists.splice(lists.findIndex(list => list.id === currentList.id), 1, updatedList)
    this.setLists(lists)
  }

  deleteList = listId => {
    const { lists } = this.state
    const newLists = lists.filter(list => list.id !== Number(listId))
    this.setLists(newLists)
  }

  onLogin = () => {
    GetAllApiService.getAll()
      .then(res => {
        const { user, boxes, contacts, lists } = res
        this.setState({
          user,
          boxes,
          contacts,
          lists
        })
      })
      .catch(res => this.setError(res.error))
  }

  onLogOut = () => {
    this.setState({
      user: {},
      boxes: [],
      contacts: [],
      lists: [],
      error: null
    })
  }

  render() {
    const value = {
      user: this.state.user,
      boxes: this.state.boxes,
      contacts: this.state.contacts,
      lists: this.state.lists,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setBoxes: this.setBoxes,
      setContacts: this.setContacts,
      setLists: this.setLists,
      updateUser: this.updateUser,
      addBox: this.addBox,
      updateBox: this.updateBox,
      deleteBox: this.deleteBox,
      addContact: this.addContact,
      updateContact: this.updateContact,
      deleteContact: this.deleteContact,
      addList: this.addList,
      updateList: this.updateList,
      deleteList: this.deleteList,
      onLogin: this.onLogin,
      onLogOut: this.onLogOut,
    }

    return (
      <MovingdayContext.Provider value={value}>
        {this.props.children}
      </MovingdayContext.Provider>
    )
  }
}
