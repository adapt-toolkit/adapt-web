import React, {Component} from 'react';
import superagent from 'superagent';

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  setInputValue = (ev) => {
    console.log(ev.target.value);

    this.setState({
      email: ev.target.value
    });
  }

  handleSubscribe = (ev) => {
    const {
      email
    } = this.state;

    if (this.state.email) {
      superagent
        .post('/api/subscribe')
        .send({email: email})
        .then(res => {
          if ( res.statusCode === 200 ) {
            this.setState({
            });
          } else {
            console.log("subscribeError");
          }
        })
        .catch(err => {
          console.log("subscribeError");
        })
    };
  }

  render() {
    const styles = require('./Contacts.scss');

    return (
      <div className={styles.container}>
        <form>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
          <input required type="email" placeholder="Enter your email" onChange={ev => this.setInputValue(ev)} />
          <button
            className={styles.button}
            onClick={ev => this.handleSubscribe(ev)}
          >Subscribe</button>
        </form>
      </div>
    )
  }
}