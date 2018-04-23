import React, {Component} from 'react';
import classNames from 'classnames';
import superagent from 'superagent';

export default class Donate extends Component {
  constructor(props) {
    super(props);

    this.styles = require('./Donate.scss');

    this.state = {
      images: [],
      isPopupActive: false,
      currItemId: "",
      currItemImage: "",
      isEmailSendSuccess: false,
      email: '',
      submitError: ""
    };
  }

  componentDidMount() {
    const updateImages = (arr) => {
      this.setState({
        images: arr
      });
    };

    superagent
      .get('/api/show-images')
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

  openPopup = (ev, image, id) => {
    ev.preventDefault();

    const scrollBarWidth = window.innerWidth - document.body.clientWidth;

    document.body.style.overflowY = 'hidden';
    document.body.style.marginRight = `${scrollBarWidth}px`;

    this.setState({
      isPopupActive: true,
      currItemId: id,
      currItemImage: image
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

    const { images } = this.state;

    return images.map((currElem, index) => (
      <div key={index} className={styles.item}>
        <img src={`/images/${currElem.id}.png`} className={styles.image}/>
        <div className={styles.title}>{currElem.description}</div>
        <div className={styles.countWrap}>
          {
            !currElem.currentReserves
              ? <div className={styles.count}>
                  {
                    currElem.amount !== 1
                      ? <span>{currElem.amount} copies left</span>
                      : <span>single copy left</span>
                  }
                </div>
              : currElem.currentReserves === currElem.amount
                ? <div className={styles.count}>No copies left</div>
                : <div className={styles.count}>
                    {currElem.amount - currElem.currentReserves} of {currElem.amount} copies left
                  </div>
          }
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
                onClick={ev => this.openPopup(ev, currElem.id, currElem["_id"])}
              >Reserve</div>
            : ""
        }
      </div>
    ));
  }

  render() {
    const styles = this.styles;
    const {
      isPopupActive,
      isEmailSendSuccess,
      currItemImage,
      submitError
    } = this.state;

    return (
      <div>
        <p className={styles.intro}>
          Because ADAPT is attempting to give developers the most freedom possible,<br/>
          it does not and will not have a token of its own. We are funding initial stages of development with donations. Donors may choose to get a piece of unique digital art depicting figures from the crypto space.
        </p>
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
                  <img src={`/images/${currItemImage}.png`} className={styles.image}/>
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