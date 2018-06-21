import React, {Component} from 'react';
import { withRouter } from 'react-router'
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import superagent from 'superagent';

class Header extends Component {
  constructor(props) {
    super(props);

    this.quote = "Quis dirumpet ipsos dirumpentes?".split('');
    // this.quote_spaces = [19, 13, 4];
    this.styles = require('./Header.scss');

    this.state = {
      dropdownMenuActive: false,
      logoText: new Array(this.quote.length),
      removeCursor: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname) {
      this.setState({ dropdownMenuActive: false });
    };
  }

  cursorAnimation = (indexElem , index) => {
    const { logoText } = this.state;

    if (index % 2 === 0) {
      logoText[indexElem+1] = " ";
    } else {
      logoText[indexElem+1] = "_";
    };

    this.setState({
      logoText: logoText
    });

    if (index < 2) {
      setTimeout(() => { this.cursorAnimation(indexElem, index+1) }, 1600);
    } else {
      this.setState({
        removeCursor: false
      });
    };
  }

  renderSym = (index) => {
    const { logoText } = this.state;

    logoText[index] = this.quote[index];
    logoText[index + 1] = "_";

    this.setState({
      logoText: logoText
    });

    if (index < this.quote.length) {
      let timing = (this.quote[index+1] == " ") ? 250 : 20 + (Math.random() * 100);
      setTimeout(() => { this.renderSym(index+1) }, timing);
    } else {
      setTimeout(() => {
        this.cursorAnimation(index, 0);
      }, 200);
    }
  }

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        removeCursor: true
      }, () => {
        this.renderSym(0);
      })
    }, 3000)
  }

  handleBtnClick = (ev) => {
    ev.preventDefault();
    this.setState(prevState => (
      { dropdownMenuActive: !prevState.dropdownMenuActive }
    ));
  }

  addDownloadRecord = (ev) => {
      superagent
          .post('/api/download')
          .then(function(res) {})
          .catch(function(err) {});
  }

  render() {
    const styles = this.styles;

    const {
      dropdownMenuActive,
      removeCursor
    } = this.state;

    return (
      <div className={classNames(
        styles.container,
        { [styles.headerMobileActive]: dropdownMenuActive }
      )}>
        <div className={styles.logoWrap}>
          <Link to="/" className={styles.logo}>
            <span>ADAPT</span>
            <div className={classNames(
              styles.cursor,
              { [styles.removeCursor]: removeCursor }
            )}></div>
          </Link>
          <div className={styles.logoText}>
            { this.state.logoText.map((currElem, index) => {
                return <div
                    className={classNames(
                      styles.char,
                      { [styles.black]: currElem === "_" }
                    )}
                    key={index}
                  >
                    {currElem}
                  </div>
              })
            }
          </div>
        </div>
        <div className={classNames(
          styles.navMenu,
          { [styles.navMenuMobileActive]: dropdownMenuActive }
        )}>
          <NavLink exact to="/" activeClassName={styles.activeLink} style={{animationDelay: "0.3s"}}>Home</NavLink>
          <a href="/adapt.pdf" style={{animationDelay: "0.4s"}} onClick={this.addDownloadRecord} download>Download White&nbsp;Paper</a>
          <NavLink to="/team" activeClassName={styles.activeLink} style={{animationDelay: "0.5s"}}>Team</NavLink>
          <NavLink to="/partners" activeClassName={styles.activeLink} style={{animationDelay: "0.6s"}}>Partners</NavLink>
          <NavLink to="/contribute" activeClassName={styles.activeLink} style={{animationDelay: "0.7s"}}>Contribute</NavLink>
          <NavLink to="/contact" activeClassName={styles.activeLink} style={{animationDelay: "0.8s"}}>Contact</NavLink>
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