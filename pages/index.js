import React from 'react'

import getWeb3 from 'helpers/web3'
import {getAccounts} from 'helpers/web3-utils'

export default class extends React.Component {
  state = {web3: null, accounts: [], selectedAccount: null, loaded: false}

  async componentDidMount() {
    try {
      const web3 = await getWeb3()
      const accounts = await getAccounts(web3)
      this.setState({web3, accounts, selectedAccount: web3.eth.defaultAccount})
    } catch (error) {
      console.log(
        `Failed to load web3, accounts, and contract. Check console for details.`
      )
      console.log(error)
    }

    this.setState({loaded: true})
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading...</div>
    }

    if (!this.state.web3) {
      return <div>Please install metamask plugin.</div>
    }

    if (this.state.accounts.length === 0) {
      return <div>No account selected. Please unlock your metamask plugin.</div>
    }

    return <div>{this.state.selectedAccount || this.state.accounts[0]}</div>
  }
}
