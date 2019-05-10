import React, {Component} from 'react';

export default class WhitePaper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = require('./WhitePaper.scss');
        return (
            <div className={styles.container}>
                {/*<section>*/}
                {/*<div className={styles.colLeft}>*/}
                {/*<img className={styles.shadow} src="/images/screenshot_2.jpg" />*/}
                {/*</div>*/}
                {/*<div className={styles.colRight}>*/}
                {/*<h2><b>ADAPT</b> white paper</h2>*/}
                {/*<button*/}
                {/*className={styles.button} onClick={() => window.open('https://drive.google.com/file/d/1A64LT5V8s2OE6-CKgCVp-NSxvBoVO65j/view?usp=sharing', '_target')}*/}
                {/*>Download</button>*/}
                {/*</div>*/}
                {/*</section>*/}

                <section>
                    <div className={styles.colLeft}>
                        <img
                            className={styles.shadow} src="/images/screenshot_1.jpg"
                            onClick={() => window.open('https://drive.google.com/file/d/1ddWoEngf1Z7VaPK3q7uLo3OQkBv0SkbU/view', '_blank')}
                        />
                    </div>
                    <div className={styles.colRight}>
                        <h2>Summary of Vision and Architecture</h2>
                        <button
                            className={styles.button}
                            onClick={() => window.open('https://drive.google.com/file/d/1ddWoEngf1Z7VaPK3q7uLo3OQkBv0SkbU/view', '_blank')}
                        >Download
                        </button>
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

                {/*<section>*/}
                    {/*<div className={styles.colLeft}>*/}
                        {/*<img*/}
                            {/*className={styles.shadow} src="/images/mufl1p.png"*/}
                            {/*onClick={() => window.open('https://drive.google.com/file/d/1QjsU5qs5C9d8cZU90rtW8OvsZ60MiNm0/view?usp=sharing', '_blank')}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    {/*<div className={styles.colRight}>*/}
                        {/*<h2><b>MUFL</b> Programming Primer</h2>*/}
                        {/*<button*/}
                            {/*className={styles.button}*/}
                            {/*onClick={() => window.open('https://drive.google.com/file/d/1QjsU5qs5C9d8cZU90rtW8OvsZ60MiNm0/view?usp=sharing', '_blank')}*/}
                        {/*>Download*/}
                        {/*</button>*/}
                    {/*</div>*/}
                {/*</section>*/}

                {/*<section>*/}
                {/*<div className={styles.colLeft}>*/}
                {/*<img className={styles.shadow} src="/images/screenshot_3.jpg"/>*/}
                {/*</div>*/}
                {/*<div className={styles.colRight}>*/}
                {/*<h2><b>MUFL</b> motivation and vision</h2>*/}
                {/*<button*/}
                {/*className={styles.button}*/}
                {/*onClick={() => window.open('https://drive.google.com/file/d/1o2ZHsyrEBDnGhuvzuitcTTBJLG67CMxR/view?usp=sharing', '_blank')}*/}
                {/*>Download*/}
                {/*</button>*/}
                {/*</div>*/}
                {/*</section>*/}
            </div>
        )
    }
}
