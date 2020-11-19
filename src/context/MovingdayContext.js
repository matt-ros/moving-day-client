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
  addContact: () => {},
  updateContact: () => {},
  addList: () => {},
  updateList: () => {},
  onLogin: () => {},
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
    if (TokenService.hasAuthToken()) {
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
    boxes.splice(boxes.findIndex(box => box.id === currentBox.id), 1, updatedBox).sort((a, b) => a.id - b.id)
    this.setBoxes(boxes)
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
      addContact: this.updateContact,
      updateContact: this.updateContact,
      addList: this.addList,
      updateList: this.updateList,
      onLogin: this.onLogin
    }
    return (
      <MovingdayContext.Provider value={value}>
        {this.props.children}
      </MovingdayContext.Provider>
    )
  }
}
