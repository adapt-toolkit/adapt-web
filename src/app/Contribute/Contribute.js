import React, {Component} from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';
import superagent from 'superagent';

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

      // Categories
      categories: [],
      categoryKeywordsMap: [],
      currentCategoryItemId: -1,

      // Reserve PopUp
      isPopupActive: false,
      currItemId: "",
      currItemImage: "",
      isEmailSendSuccess: false,
      email: "",
      submitError: ""
    };
  }

  componentDidMount() {
    const { storeCategoriesToState } = this;

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

  openPopup = (ev, id, hashsum, ext) => {
    ev.preventDefault();

    const scrollBarWidth = window.innerWidth - document.body.clientWidth;

    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = `${scrollBarWidth}px`;

    this.setState({
      isPopupActive: true,
      currItemId: id,
      currItemImage: hashsum + "." + ext
    });
  }

  closePopup = (ev) => {
    ev.preventDefault();

    document.body.style.overflowY = 'scroll';
    document.body.style.marginRight = '0';

    this.setState({
      isPopupActive: false,
      currItemId: "",
      currItemImage: "",
      email: "",
      isEmailSendSuccess: false,
      submitError: ""
    });
  }  

  handleSubmit = (ev) => {
    ev.preventDefault();

    const { currItemId, email } = this.state;

    superagent
      .post('/api/reserve')
      .send({email, collectible_id: currItemId})
      .then(res => {
        if ( res.statusCode === 200 ) {
          this.setState({
            isEmailSendSuccess: true,
            submitError: ""
          });
        } else {
          if ( res.statusCode === 422 ) {
            this.setState({
              submitError: "This email address is already in use"
            });
          } else {
            this.setState({
              submitError: "Unknown error"
            });
          };
        }
      })
  }

  handleEmailInput = ev => {
    this.setState({
        email: ev.target.value,
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

    const getNewWidth = (prevWidth) => {
      const nextWidth = (240 * ((prevWidth * 100) / maxWidth)) / 100;

      if (nextWidth < 24) {
        return 24;
      } else {
        return nextWidth;
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
                        <b>0</b> acquired / <b>{currElem.currentReserves || 0}</b> reserved
                      </div>
                    </div>
                    <div className={styles.priceWrap}>
                      {
                        currElem.currentReserves !== currElem.amount
                          ? <div className={styles.price}>Donate <span>{currElem.eth}&nbsp;ETH</span> or more to get one.</div>
                          : <div className={styles.price}>Was available for donation <span>{currElem.eth}&nbsp;ETH</span> or more.</div>
                      }
                    </div>
                    {
                      currElem.currentReserves !== currElem.amount
                        ? <div
                            className={classNames(styles.button, styles.purchaseBtn)}
                            onClick={ev => this.openPopup(ev, currElem.id, currElem.hashsum, currElem.ext)}
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
      isEmailSendSuccess,
      currItemImage,
      submitError
    } = this.state;

    // <p>
    //   <i>While we are getting ready the payments and non-fungible asset infrastructure, please feel free to reserve one of these images for yourself by clicking “Reserve” and entering your email.</i> If you reserve, you have to make your donation within 3 days of the beginning of the donation period, otherwise the image will be released to another supporter.
    // </p>

    return (
      <div>
        <div className={styles.intro}>
          <p>
            Because <b>ADAPT</b> is designed to give developers the most freedom possible, it does not have a token of its own. Instead, we are funding initial stages of development with donations.<br/><br/>
            Contributors may choose to get an Ethereum non-fungible asset — <b>unique digital art</b> — as a token of community appreciation for their contribution.
          </p>
        </div>
        <div className={styles.categories}>
          {
            categories.map((currElem, index) => (
              <NavLink to={`/contribute/${currElem.keyword}`} key={index} activeClassName={styles.activeLink}>{currElem.title}</NavLink>
            ))
          }
        </div>
        <div className={styles.description}>
          { this.currentCategoryItem().description }
        </div>
        {/* <div className={classNames(styles.button, styles.myArtBtn)}>My Art</div> */}
        <div className={styles.collection}>
          { this.renderItems() }
        </div>
        {
          isPopupActive &&
          <div className={styles.popupWrap}>
            <div className={styles.popup}>
              { !isEmailSendSuccess &&
                <div>
                  <img src={`/images/${currItemImage}`} className={styles.image}/>
                </div>
              }

              { !isEmailSendSuccess
                ? <div className={styles.spacer}>
                    <div className={styles.text}>
                      Please enter your email and we will send you further instructions
                    </div>
                    <form onSubmit={ev => this.handleSubmit(ev)}>
                      { submitError
                        ? <div className={styles.submitError}>
                            {submitError}
                          </div>
                        : ""
                      }
                      <input
                          placeholder="Enter your email"
                          required
                          onInput={this.handleEmailInput}
                      ></input>
                      <button className={classNames(styles.button, styles.sendBtn)}>Send</button>
                    </form>
                  </div>
                : <div className={styles.sendMailSuccess}>
                    Thank you! Letter send successful.
                  </div>
              }
              <div className={styles.closeBtn} onClick={ev => this.closePopup(ev)}></div>
            </div>
          </div>
        }
      </div>
    )
  }
}

Contribute = withRouter(Contribute);

export default Contribute;