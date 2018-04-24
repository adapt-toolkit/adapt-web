import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownMenuActive: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname) {
      this.setState({ dropdownMenuActive: false });
    };
  }

  handleBtnClick = (ev) => {
    ev.preventDefault(); 
    this.setState(prevState => (
      { dropdownMenuActive: !prevState.dropdownMenuActive }
    ));
  }

  render() {
    const styles = require('./Header.scss');

    const { dropdownMenuActive } = this.state;

    return (
      <div className={classNames(
        styles.container,
        { [styles.headerMobileActive]: dropdownMenuActive }
      )}>
        <div className={styles.logoWrap}>
          <Link to="/" className={styles.logo}>
            <span>ADAPT</span>
            <div className={styles.cursor}></div>
          </Link>
        </div>
        <div className={classNames(
          styles.navMenu,
          { [styles.navMenuMobileActive]: dropdownMenuActive }
        )}>
          <NavLink exact to="/" activeClassName={styles.activeLink} style={{animationDelay: "0.3s"}}>Home</NavLink>
          <a target="_blank" href="/adapt.pdf" style={{animationDelay: "0.4s"}}>White&nbsp;Paper</a>
          <NavLink to="/team" activeClassName={styles.activeLink} style={{animationDelay: "0.5s"}}>Team</NavLink>
          <NavLink to="/partners" activeClassName={styles.activeLink} style={{animationDelay: "0.6s"}}>Partners</NavLink>
          <NavLink to="/donate" activeClassName={styles.activeLink} style={{animationDelay: "0.7s"}}>Donate</NavLink>
        </div>
        <div
          className={classNames(
            styles.dropdownMenuBtn,
            { [styles.dropdownMenuBtnActive]: dropdownMenuActive }
          )}
          onClick={ev => this.handleBtnClick(ev)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}

Header = withRouter(Header);

export default Header;