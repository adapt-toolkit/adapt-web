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
          <h1>Build and launch your own decentralized network</h1>
          <h2>not constrained by some platform's <span>one-size-fits-all</span> design decisions</h2>
          <p>in an interoperable<br/>ecosystem</p>
        </div>
      </div>
    )
  }
}