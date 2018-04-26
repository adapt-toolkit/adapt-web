import React, {Component} from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom';
import superagent from 'superagent';

class Contribute extends Component {
  constructor(props) {
    super(props);

    this.styles = require('./Contribute.scss');

    this.state = {
      images: [],
      isPopupActive: false,
      currItemId: "",
      currItemImage: "",
      isEmailSendSuccess: false,
      email: '',
      submitError: "",
      categoriesArr: [],
      categoryDescription: "",
      getImagesError: false
    };
  }

  componentDidMount() {
    const updateImages = this.updateImages;

    const saveData = (arr) => {
      let currCategoryDescription = "";
      let matchTitleWithAdress = false;

      const paramsId = this.props.match.params.id;

      arr.forEach(currElem => {
        if (paramsId) {
          if (currElem.category_name === paramsId) {
            matchTitleWithAdress = true;

            this.setState({
              categoriesArr: arr,
              categoryDescription: currElem.description
            }, () => {
              this.getImagesWithParams(paramsId);
            });
          };
        } else {
          if (currElem.index === 0) {
            matchTitleWithAdress = true;

            this.setState({
              categoriesArr: arr,
              categoryDescription: currElem.description
            }, () => {
              this.props.history.push(`/contribute/${currElem.category_name}`);
            });
          };
        };
      });

      if(!matchTitleWithAdress) {
        this.setState({
          categoriesArr: arr,
          getImagesError: true
        });
      };
    };

    superagent
      .get('/api/show-categories')
      .then(function(res) {
        if ( res.statusCode === 200 ) {
          saveData(res.body);
        };
        // res.body, res.headers, res.status
        })
      .catch(function(err) {
        // err.message, err.response
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      let nextCategoryDescription = "";
      let mainCategoryName = "";

      const nextParamsId = nextProps.match.params.id;

      if (this.state.categoriesArr.length) {
        this.state.categoriesArr.forEach(currElem => {
          if (nextParamsId) {
            if (currElem.category_name === nextParamsId) {
              nextCategoryDescription = currElem.description;
            };
          } else {
            if (currElem.index === 0) {
              mainCategoryName = currElem.category_name;
              nextCategoryDescription = currElem.description;
            };
          };
        });
      };

      if (!nextParamsId) {        
        this.setState({
          getImagesError: false
        }, () => {
          this.props.history.push(`/contribute/${mainCategoryName}`);
        });
      } else {
        this.setState({
          categoryDescription: nextCategoryDescription,
          getImagesError: false
        }, () => {
          this.getImagesWithParams(nextParamsId);
        });
      };
    };
  }

  updateImages = (arr) => {
    this.setState({
      images: arr
    });
  }

  getImagesWithParams = (params) => {
    const updateImages = this.updateImages;

    superagent
      .post('/api/show-images')
      .send({ category_name: params })
      .then(function(res) {
        if ( res.statusCode === 200 ) {
          updateImages(res.body);
        };
        // res.body, res.headers, res.status
        })
      .catch(function(err) {
        // err.message, err.response
      });
  }

  openPopup = (ev, image, id, ext) => {
    ev.preventDefault();

    const scrollBarWidth = window.innerWidth - document.body.clientWidth;

    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = `${scrollBarWidth}px`;

    this.setState({
      isPopupActive: true,
      currItemId: id,
      currItemImage: image + "." + ext
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
      .post('/api/create-reserve')
      .send({email, image: currItemId})
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

  getItems = () => {
    const styles = this.styles;
    const { images, getImagesError } = this.state;

    let maxWidth = 24;

    if (!getImagesError) {
      images.forEach(currElem => {
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

    return !getImagesError
            ? images.map((currElem, index) => (
                <div key={index} className={styles.item}>
                  <div className={styles.imageWrap}>
                    <img
                      src={`/images/${currElem.id}.${currElem.ext}`} className={styles.image}
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
                            onClick={ev => this.openPopup(ev, currElem.id, currElem["_id"], currElem.ext)}
                          >Reserve</div>
                        : ""
                    }
                  </div>
                </div>
              ))
            : <div className={styles.getImagesError}><span>Contribution collectibles</span><br/>Coming soon</div>
  }

  render() {
    const styles = this.styles;
    const {
      isPopupActive,
      isEmailSendSuccess,
      currItemImage,
      submitError,
      categoriesArr,
      categoryDescription
    } = this.state;

    return (
      <div>
        <div className={styles.intro}>
          <p>
            Because <b>ADAPT</b> is designed to give developers the most freedom possible, it does not have a token of its own. Instead, we are funding initial stages of development with donations.<br/><br/>
            Contributors may choose to get an Ethereum non-fungible asset — <b>unique digital art</b> — as a token of community appreciation for their contribution.
          </p>
          <p>
            <i>While we are getting ready the payments and non-fungible asset infrastructure, please feel free to reserve one of these images for yourself by clicking “Reserve” and entering your email.</i> If you reserve, you have to make your donation within 3 days of the beginning of the donation period, otherwise the image will be released to another supporter.
          </p>
        </div>
        <div className={styles.categories}>
          {
            categoriesArr.map((currElem, index) => (
              <NavLink to={`/contribute/${currElem.category_name}`} key={index} activeClassName={styles.activeLink}>{currElem.title}</NavLink>
            ))
          }
        </div>
        <div className={styles.description}>
          { categoryDescription }
        </div>
        {/* <div className={classNames(styles.button, styles.myArtBtn)}>My Art</div> */}
        <div className={styles.collection}>
          { this.getItems() }
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