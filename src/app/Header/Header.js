import React, {Component} from 'react';
import { Link, NavLink } from 'react-router-dom';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./Header.scss');

    return (
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span>ADAPT</span>
          <div className={styles.cursor}></div>
        </Link>
        <div className={styles.navMenu}>
          <NavLink exact to="/" activeClassName={styles.activeLink}>Home</NavLink>
          <a target="_blank" href="/adapt_white_paper.pdf">White&nbsp;Paper</a>
          <NavLink to="/team" activeClassName={styles.activeLink}>Team</NavLink>
          <NavLink to="/partners" activeClassName={styles.activeLink}>Partners</NavLink>
          <NavLink to="/donate" activeClassName={styles.activeLink}>Donate</NavLink>
        </div>
      </div>
    )
  }
}