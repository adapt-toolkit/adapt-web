import React, {Component} from 'react';
import superagent from 'superagent';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // superagent
    //   .get('/api/get-todos')
    //   .end((err, res) => {
    //     console.log('ERROR');
    //     console.log(err);
    //     console.log('RESPONSE');
    //     console.log(res);
    //   })
  }

  render() {
    const styles = require('./Main.scss');

    return (
      <div className={styles.container}>
        <img src={require("./img/home-bg.jpg")}></img>
        <div className={styles.layout}>
          <h1>
            Build and launch your own decentralized network<br/>
            <span>designed from the ground up to serve the needs of your users.</span>
          </h1>
          <h2>
            <div>
              ADAPT is a toolkit that enables decentralized software in the same way compilers enable software in general and TCP/IP enables connectivity.<br/>
            </div>
            <div>
              It provides flexibility that cannot be offered by existing decentralized platforms, which impose their economic design on everyone.
            </div>
          </h2>
        </div>
      </div>
    )
  }
}