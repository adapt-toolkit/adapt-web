import React, {Component} from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router'
import { NavLink, Link } from 'react-router-dom';
import superagent from 'superagent';

import { getCookie } from '../utils/utils';

// For later refactoring superagent --> apiRequest

// Call
//
// this.apiGetRequest({
//   url: '/api/categories',
//   success: (res) => {

//   },
//   failed: (res) => {

//   }
// })

// Definition
//
// apiGetRequest = (opts) => {
//   const { url, params, success, failed } = opts;
//   superagent
//     .get(url, params)
//     .then(success_fun)  // res.body, res.headers, res.status
//     .catch(failed_fun); // err.message, err.response
// }


class Contribute extends Component {
  constructor(props) {
    super(props);

    this.styles = require('./Contribute.scss');

    this.state = {
      collectibles: [],
      getCollectiblesError: false,

      // Policy
      acceptPolicy: false,
      checkbox1: false,
      checkbox2: false,

      // Categories
      categories: [],
      categoryKeywordsMap: [],
      currentCategoryItemId: -1,

      // Reserve PopUp
      isPopupActive: false,
      currItemId: "",
      currItemImage: "",
      submitSuccess: false,
      email: "",
      submitError: "",
      reserveError: false,
      reserveTotal: 0
    };
  }

  componentDidMount() {
    const { storeCategoriesToState } = this;
    const cookie = getCookie(document.cookie);

    if (cookie.acceptPolicy) {
      this.setState({
        acceptPolicy: true
      });
    };

    superagent
      .get('/api/categories')
      .then((res) => {
        console.log(res.statusCode);
        if ( res.statusCode === 200 ) {
          storeCategoriesToState(res.body);
        };
        // res.body, res.headers, res.status
      })
      .catch((err) => {
        // err.message, err.response
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { keyword } = nextProps.match.params;

      if (!keyword) {
        this.setState({
          currentCategoryItemId: 0
        }, () => {
          this.retrieveCollectibles({ category_id: this.currentCategoryItem().id });
        });
      } else {
        this.setState(prevState => ({
          currentCategoryItemId: prevState.categoryKeywordsMap.indexOf(keyword)
        }), () => {
          this.retrieveCollectibles({ category_id: this.currentCategoryItem().id });
        });
      };
    };
  }

  storeCategoriesToState = (arr) => {
    if (!arr || arr.length == 0) { return }

    const { keyword } = this.props.match.params;

    if (!keyword) {
      this.setState({
        categories: arr,
        categoryKeywordsMap: arr.map((currElem, i) => ( currElem.keyword )),
        currentCategoryItemId: 0
      }, () => {
        this.props.history.push(`/contribute/${ this.currentCategoryItem().keyword }`);
      });
    } else {
      arr.forEach((currElem, i) => {
        if (currElem.keyword === keyword) {
          this.setState({
            categories: arr,
            categoryKeywordsMap: arr.map((currElem, i) => ( currElem.keyword )),
            currentCategoryItemId: i
          }, () => {
            this.retrieveCollectibles({ category_id: currElem.id });
          });
        }
      })
    }
  }

  updateState = (newState) => {
    this.setState(newState);
  }

  currentCategoryItem = () => {
    return this.state.categories[this.state.currentCategoryItemId] || {};
  }

  // getCollectiblesWithParams
  retrieveCollectibles = (params) => {
    const { updateState } = this;

    superagent
      .get('/api/collectibles', params)
      .then(function(res) {
        if ( res.statusCode === 200 ) {
          updateState({ collectibles: res.body });
        };
        // res.body, res.headers, res.status
        })
      .catch(function(err) {
        // err.message, err.response
      });
  }

  openPopup = (ev, id, hashsum, ext, reserveTotal) => {
    ev.preventDefault();

    const scrollBarWidth = window.innerWidth - document.body.clientWidth;

    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = `${scrollBarWidth}px`;

    this.setState({
      isPopupActive: true,
      currItemId: id,
      currItemImage: hashsum + "." + ext,
      reserveTotal: reserveTotal
    });
  }

  closePopup = (ev) => {
    ev.preventDefault();

    document.body.style.overflowY = 'scroll';
    document.body.style.marginRight = '0';

    if (this.state.submitSuccess) {
      this.retrieveCollectibles({ category_id: this.currentCategoryItem().id });
    };

    this.setState({
      isPopupActive: false,
      currItemId: "",
      currItemImage: "",
      email: "",
      eth_address: "",
      submitSuccess: false,
      submitError: "",
      reserveError: false,
      reserveTotal: 0
    });
  }  

  reserveHandleSubmit = (ev) => {
    ev.preventDefault();

    const { currItemId, email, eth_address, reserveTotal } = this.state;

    superagent
      .post('/api/reserve')
      .send({email: email, eth_address: eth_address, collectible_id: currItemId, reserve_total: reserveTotal})
      .then(res => {
        if ( res.statusCode === 200 ) {
          this.setState({
            submitSuccess: true,
            submitError: ""
          });
        } else {
          if ( res.statusCode === 422 ) {
            console.log("This email address is already in use");
            this.setState({
              submitError: "This email address is already in use"
            });
          } else {
            console.log("Unknown error");
            this.setState({
              submitError: "Unknown error"
            });
          };
        }
      })
      .catch(err => {
        console.log("reserveError");

        this.setState({
          submitSuccess: true,
          reserveError: true
        });
      })
  }

  handleAcceptPolicy = (ev) => {
    ev.preventDefault();

    const {
      checkbox1,
      checkbox2
    } = this.state;

    if (checkbox1 && checkbox2) {
      document.cookie = 'acceptPolicy=true' + '; path=/; expires=' + new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toUTCString();

      this.setState({
        acceptPolicy: true
      });
    };
  }

  toggleCheckbox = (ev, checkbox) => {
    console.log("Start toggleCheckbox");
    ev.preventDefault();

    this.setState(prevState => ({
      [checkbox]: !prevState[checkbox]
    }));
  }

  handleEmailInput = ev => {
    this.setState({
        email: ev.target.value,
        submitError: ""
    });
  }

  handleEthAddrInput = ev => {
    this.setState({
        eth_address: ev.target.value,
        submitError: ""
    });
  }

  renderItems = () => {
    const styles = this.styles;
    const { collectibles, getCollectiblesError } = this.state;

    let maxWidth = 24;

    if (!getCollectiblesError) {
      collectibles.forEach(currElem => {
        if (currElem.width > maxWidth) {
          maxWidth = currElem.width;
        };
      });
    };

    const getNewWidth = (width) => {
      if (width > 240) {
        return 240;
      } else {
        return width;
      };
    }

    return !getCollectiblesError
            ? collectibles.map((currElem, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.imageWrap}>
                    <img
                      src={`/images/${currElem.hashsum}.${currElem.ext}`} className={styles.image}
                      style={{ width: `${ getNewWidth(currElem.width) }px` }}
                    />
                    <div className={styles.imageSize}>{currElem.width} x {currElem.height} px</div>
                  </div>
                  <div>
                    <div className={styles.title}>{currElem.description}</div>
                    <div className={styles.countWrap}>
                      <div className={styles.count}>
                        <b>{currElem.amount - (currElem.currentReserves || 0)}</b> of <b>{currElem.amount}</b> copies available<br/>
                        <b>{currElem.currentReserves || 0}</b> reserved
                      </div>
                    </div>
                    <div className={styles.priceWrap}>
                      {
                        currElem.unsaleable ?
                          <div className={styles.price}>This item cannot be sold or reserved.</div>
                        :
                          (currElem.currentReserves !== currElem.amount
                            ? <div className={styles.price}>Donate <span>{currElem.eth}&nbsp;ETH</span> or more to get one.</div>
                            : <div className={styles.price}>Was available for donation <span>{currElem.eth}&nbsp;ETH</span> or more.</div>)
                      }
                    </div>
                    {
                      currElem.currentReserves !== currElem.amount && !currElem.unsaleable
                        ? <div
                            className={classNames(styles.button, styles.purchaseBtn)}
                            onClick={ev => this.openPopup(ev, currElem.id, currElem.hashsum, currElem.ext, currElem.amount)}
                          >Reserve</div>
                        : ""
                    }
                  </div>
                </div>
              ))
            : <div className={styles.getCollectiblesError}><span>Contribution collectibles</span><br/>Coming soon</div>
  }

  render() {
    const styles = this.styles;
    const {
      categories,
      isPopupActive,
      submitSuccess,
      currItemImage,
      submitError,
      reserveError,
      acceptPolicy,
      checkbox1,
      checkbox2
    } = this.state;

    return (
      <div>
        { true // acceptPolicy
          ? <div>
              <div className={styles.intro}>
                <p>
                  Because <b>ADAPT</b> is designed to give developers the most freedom possible, it does not have a token of its own. Instead, we are funding initial stages of development with donations.<br/><br/>
                  Contributors may choose to get an Ethereum non-fungible asset — <b>unique digital art</b> — as a token of community appreciation for their contribution.
                </p>
              </div>
              <div className={styles.comingSoon}>
                Contribution collectibles
                <div>Coming soon</div>
              </div>
              { /* <div className={styles.categories}>
                {
                  categories.map((currElem, index) => (
                    <NavLink to={`/contribute/${currElem.keyword}`} key={index} activeClassName={styles.activeLink}>{currElem.title}</NavLink>
                  ))
                }
              </div>
              <div className={styles.description}>
                { this.currentCategoryItem().description }
              </div>
              {/* <div className={classNames(styles.button, styles.myArtBtn)}>My Art</div> }
              <div className={styles.collection}>
                { this.renderItems() }
              </div>
              {
                isPopupActive &&
                <div className={styles.popupWrap}>
                  <div className={styles.popup}>
                    { !submitSuccess &&
                      <div>
                        <img src={`/images/${currItemImage}`} className={styles.image}/>
                      </div>
                    }
                    { !submitSuccess
                      ? <div className={styles.spacer}>
                          <div className={styles.text}>
                            By providing your ethereum address you may reserve the drawing prior to the beginning of the fundraising. 
                            Your reservation will be honored for 72 hours from the start of the sale. If you do not claim your drawing
                            within this time period, your reservation will be cancelled and the reward will be released to the community
                          </div>
                          <form onSubmit={ev => this.reserveHandleSubmit(ev)}>
                            { submitError
                              ? <div className={styles.submitError}>
                                  {submitError}
                                </div>
                              : ""
                            }
                            <input
                                placeholder="Enter your ETH address"
                                required
                                onInput={this.handleEthAddrInput}
                            ></input>
                            <input
                                placeholder="Enter your email"
                                required
                                onInput={this.handleEmailInput}
                            ></input>
                            <button className={classNames(styles.button, styles.sendBtn)}>Submit</button>
                          </form>
                        </div>
                      : <div className={styles.sendMailSuccess}>
                          { reserveError
                            ? <div>
                                Some error
                              </div>
                            : <div>
                                Your address {this.state.eth_address} has been recorded.<br/>
                                Please watch your email for announcements about the start of the contribution process.
                              </div>
                          }
                        </div>
                    }
                    <div className={styles.closeBtn} onClick={ev => this.closePopup(ev)}></div>
                  </div>
                </div>
              }
              */}
            </div>
          : <div className={styles.termsWrap}>
              <div className={styles.terms}>
                <div
                  className={classNames(
                    styles.policyCheckbox,
                    { [styles.checkboxActive]: checkbox1 }
                  )}
                  onClick={ev => this.toggleCheckbox(ev, "checkbox1")}
                ></div>
                <div>
                   I agree with <Link to="/terms_and_conditions">Terms and Conditions</Link>
                </div>
              </div>
              <div className={styles.terms}>
                <div
                  className={classNames(
                    styles.policyCheckbox,
                    { [styles.checkboxActive]: checkbox2 }
                  )}
                  onClick={ev => this.toggleCheckbox(ev, "checkbox2")}
                ></div>
                <div>
                  I agree with <Link to="/privacy_policy">Privacy Policy</Link>
                </div>
              </div>
              <button
                className={
                  classNames(
                    styles.button,
                    styles.acceptPolicyBtn,
                    { [styles.activeBtn]: checkbox1 && checkbox2 }
                  )
                }
                onClick={ev => this.handleAcceptPolicy(ev)}
              >Proceed to the Contribute page</button>
          </div>
        }
      </div>
    )
  }
}

Contribute = withRouter(Contribute);

export default Contribute;