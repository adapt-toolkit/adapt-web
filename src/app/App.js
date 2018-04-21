import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Components
import Header from './Header/Header';
import Main from './Main/Main';
import Team from './Team/Team';
import Partners from './Partners/Partners';
import Donate from './Donate/Donate';
import Confirm from './Confirm/Confirm';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./App.scss');

    return (
      <Router>
        <div className={styles.app}>
          <Header />
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/team" component={Team}/>
            <Route exact path="/partners" component={Partners}/>
            <Route exact path="/donate" component={Donate}/>
            <Route exact path="/confirm/:id" component={Confirm}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App)
