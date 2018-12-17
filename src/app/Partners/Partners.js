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
        <a target="_blank" href="https://mattereum.com">
          <img src={require("./img/mattereum.svg")}/>
        </a>
        {/*<a target="_blank" href="https://www.linkedin.com/company/135b/">*/}
          {/*<img src={require("./img/135b.jpg")}/>*/}
        {/*</a>*/}

      </div>
    )
  }
}
