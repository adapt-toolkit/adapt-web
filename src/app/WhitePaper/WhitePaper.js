import React, { Component } from 'react';

export default class WhitePaper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = require('./WhitePaper.scss');
        return (
            <div className={styles.container}>
                <section>
                    <div className={styles.colLeft}>
                        <img className={styles.shadow} src="/images/screenshot_2.jpg" />
                    </div>
                    <div className={styles.colRight}>
                        <h2><b>ADAPT</b> white paper</h2>
                        <button
                            className={styles.button} onClick={() => window.open('https://drive.google.com/file/d/1A64LT5V8s2OE6-CKgCVp-NSxvBoVO65j/view?usp=sharing', '_target')}
                        >Download</button>
                    </div>
                </section>
                <section>
                    <div className={styles.colLeft}>
                        <img className={styles.shadow} src="/images/screenshot_1.jpg" />
                    </div>
                    <div className={styles.colRight}>
                        <h2><b>ADAPT</b> Architecture Summary and Vision</h2>
                        <button
                            className={styles.button} onClick={() => window.open('https://drive.google.com/open?id=1v3s8P9SFgywNsAOaOuemI5Tm3k9-7FN6', '_blank')}
                        >Download</button>
                    </div>
                </section>
                {/*<section>*/}
                    {/*<div className={styles.colLeft}>*/}
                        {/*<img className={styles.shadow} src="/images/adoption-strategy.png" />*/}
                    {/*</div>*/}
                    {/*<div className={styles.colRight}>*/}
                        {/*<h2><b>ADAPT</b> Adoption Strategy</h2>*/}
                        {/*<button*/}
                            {/*className={styles.button} onClick={() => window.open('https://drive.google.com/file/d/1F94zj_DlYuOmMOq8mQpT4SiWudEVzeAq/view?usp=sharing', '_blank')}*/}
                        {/*>Download</button>*/}
                    {/*</div>*/}
                {/*</section>*/}
                <section>
                    <div className={styles.colLeft}>
                        <img className={styles.shadow} src="/images/mufl1p.png" />
                    </div>
                    <div className={styles.colRight}>
                        <h2><b>MUFL</b> Programming Primer</h2>
                        <button
                            className={styles.button} onClick={() => window.open('https://drive.google.com/file/d/1QjsU5qs5C9d8cZU90rtW8OvsZ60MiNm0/view?usp=sharing', '_blank')}
                        >Download</button>
                    </div>
                </section>
                <section>
                    <div className={styles.colLeft}>
                        <img className={styles.shadow} src="/images/screenshot_3.jpg" />
                    </div>
                    <div className={styles.colRight}>
                        <h2><b>MUFL</b> motivation and vision</h2>
                        <button
                            className={styles.button} onClick={() => window.open('https://drive.google.com/file/d/1o2ZHsyrEBDnGhuvzuitcTTBJLG67CMxR/view?usp=sharing', '_blank')}
                        >Download</button>
                    </div>
                </section>
            </div>
        )
    }
}