import React, {Component} from 'react';

export default class Partners extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./Partners.scss');

    return (
      <div className={styles.container}>
        <a target="_blank" href="https://blog.coinfund.io">
          <img src={require("./img/coinfund.png")}/>
        </a>
        <a target="_blank" href="https://sweetbridge.com">
          <img src={require("./img/sweetbridge.png")}/>
        </a>
        <a target="_blank" href="https://consensuslabs.com">
          <img src={require("./img/consensuslabs.png")}/>
        </a>
      </div>
    )
  }
}