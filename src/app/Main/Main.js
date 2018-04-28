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
                ADAPT is a toolkit that will do to blockchain what compilers did to software and TCP/IP did to connectivity.<br/>
            </div>
            <div>
                It does not attempt to capture value at the base economic layer, offering its users the unprecedented flexibility of economic design.
            </div>
          </h2>
        </div>
      </div>
    )
  }
}