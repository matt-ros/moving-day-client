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
  updateBox: () => {},
  updateContact: () => {},
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

  updateBox = fields => {
    // eslint-disable-next-line
    const currentBox = this.state.boxes.find(box => box.id == fields.box_id)
    const updatedBox = {
      ...currentBox,
      ...fields
    }
    this.setState({ box: updatedBox })
  }

  updateContact = fields => {
    // eslint-disable-next-line
    const currentContact = this.state.contacts.find(contact => contact.id == fields.contact_id)
    const updatedContact = {
      ...currentContact,
      ...fields
    }
    this.setState({ box: updatedContact })
  }

  updateList = fields => {
    // eslint-disable-next-line
    const currentList = this.state.lists.find(list => list.id == fields.list_id)
    const updatedList = {
      ...currentList,
      ...fields
    }
    this.setState({ box: updatedList })
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
      updateBox: this.updateBox,
      updateContact: this.updateContact,
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
