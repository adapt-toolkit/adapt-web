import React, {Component} from 'react';
import superagent from 'superagent';

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = require('./Main.scss');

        return (
            <div className={styles.container}>
                <img src={require("./img/home-bg.jpg")}></img>
                <div className={styles.layout}>
                    <h1>
                        Build and launch your own decentralized network<br/>
                        <span>designed from the ground up to serve the needs of your users.</span>
                    </h1>
                    <h2>
                        ADAPT is a software component toolkit for building a new generation of business-to-business and
                        business-to-consumer blockchain/database systems. It offers unprecedented flexibility of
                        decentralized software design and a suite of reusable components for rapid software development
                        in this context. <a href='/contact'>Leave us your email for updates.</a>
                        {/*<div>*/}
                        {/*ADAPT is a toolkit that will do to blockchain what compilers did to software and what TCP/IP did to connectivity.<br/>*/}
                        {/*</div>*/}
                        {/*<div>*/}
                        {/*It does not attempt to capture value at the base economic layer, offering its users the unprecedented flexibility of economic design. <a href='/contact'>Leave us your email for updates.</a>*/}
                        {/*</div>*/}
                    </h2>
                </div>
            </div>
        )
    }
}
