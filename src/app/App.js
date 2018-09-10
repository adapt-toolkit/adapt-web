import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Components
import Header from './Header/Header';
import Main from './Main/Main';
import Team from './Team/Team';
import Partners from './Partners/Partners';
import Contribute from './Contribute/Contribute';
import Confirm from './Confirm/Confirm';
import Contacts from './Contacts/Contacts';
import Terms from './Terms/Terms';
import Policy from './Policy/Policy';
import WhitePaper from './WhitePaper/WhitePaper';

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
            {/*rename route with "white-paper" to "documentation"*/}
            <Route exact path="/documentation" component={WhitePaper}/>
            <Route exact path="/partners" component={Partners}/>
            <Route exact path="/contribute" component={Contribute}/>
            <Route exact path="/contribute/:keyword" component={Contribute}/>
            <Route exact path="/confirm/:hashsum" component={Confirm}/>
            <Route exact path="/contact" component={Contacts}/>
            <Route exact path="/terms_and_conditions" component={Terms}/>
            <Route exact path="/privacy_policy" component={Policy}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default hot(module)(App)
