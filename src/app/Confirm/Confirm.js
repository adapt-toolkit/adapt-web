import React, {Component} from 'react';
import superagent from 'superagent';

export default class Confirm extends Component {
  constructor(props){
    super(props);

    this.state={
      success: false
    }
  }

  componentDidMount(){
    superagent
      .post('/api/confirm-reserve')
      .send({id: this.props.match.params.id})
      .then(res => {
        if ( res.statusCode === 200 ) {
          this.setState({
            success: true
          });
        }
      })
  }

  render() {
    const styles = require('./Confirm.scss');

    const {success} = this.state;

    return (
      <div className={styles.container}>
        {success ? 'Your email successfully confirmed' : 'Some problem has occured'}
      </div>
    )
  }
}
