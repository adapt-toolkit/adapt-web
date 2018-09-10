import React, {Component} from 'react';

export default class Team extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./Team.scss');

    return (
      <div className={styles.container}>
        <div className={styles.team}>
          <h1>Team</h1>
          <a target="_blank" href="https://twitter.com/coinfund_al" className={styles.member}>
            <img src={require("./img/bulkin.png")}/>
            <div className={styles.name}>Aleksandr Bulkin</div>
          </a>
          <div className={styles.member}>
            <img src={require("./img/delany.png")}/>
            <div className={styles.name}>Mack Delany</div>
          </div>
          <div className={styles.member}>
            <img src={require("./img/bogdan_lysak.jpg")}/>
            <div className={styles.name}>Bogdan Lysak</div>
          </div>
          <div className={styles.member}>
            <img src={require("./img/evgeniy_babiy.jpg")}/>
            <div className={styles.name}>(Evgeniy Babiy</div>
          </div>
          <div className={styles.member}>
            <img src={require("./img/questionmark.png")}/>
            <div className={styles.name}>You?</div>
          </div>
        </div>
        <div className={styles.advisors}>
          <h1>Advisors and Supporters</h1>
          <div className={styles.member}>
            <img src={require("./img/brukhman.png")}/>
            <div className={styles.name}>Jake Brukhman</div>
          </div>
          <div className={styles.member}>
            <img src={require("./img/burniske.png")}/>
            <div className={styles.name}>Chris Burniske</div>
          </div>
          <div className={styles.member}>
            <img src={require("./img/nelson.png")}/>
            <div className={styles.name}>J. Scott Nelson</div>
          </div>
          <div className={styles.member}>
            <img src={require("./img/questionmark.png")}/>
            <div className={styles.name}>You?</div>
          </div>
        </div>
      </div>
    )
  }
}
