import React, {Component} from 'react';
import superagent from 'superagent';
import classNames from 'classnames';

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      successMessage: "",
      errorMessage: ""
    };
  }

  setInputValue = (ev) => {
    this.setState({
      email: ev.target.value
    });
  }

  handleSubscribe = (ev) => {
    ev.preventDefault();

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
              successMessage: "You have successfully subscribed."
            });
          }
        })
        .catch(err => {
          this.setState({
            errorMessage: "This address is already in our list."
          });
        })
    };
  }

  render() {
    const styles = require('./Contacts.scss');

    const {
      successMessage,
      errorMessage
    } = this.state;

    return (
      <div className={styles.container}>
        <form onSubmit={ev => this.handleSubscribe(ev)}>
          <div>
            Subscribe to updates on project status.
          </div>
          <input required type="email" placeholder="Enter your email" onChange={ev => this.setInputValue(ev)} />
          <button
            className={styles.button}
          >Subscribe</button>
          <div className={styles.successMessage}>{successMessage}</div>
          <div className={styles.errorMessage}>{errorMessage}</div>
        </form>
        <div className={styles.orLine}>
          <span>OR</span>
        </div>
        <div className={styles.socialLinks}>
          Seek us on<br/><br/>
          <a className={styles.twitter} href={"https://twitter.com/adaptkit"}></a>
          <a className={styles.telegram} href={"https://t.me/joinchat/GSMa9w954pYtbs6v-e8Oww"}></a>
        </div>
      </div>
    )
  }
}