import './App.css';
import {useState} from 'react';
import {InviteModal} from './InviteModal';

const topTitle = 'Broccoli & Co.'.toLocaleUpperCase();

function App() {
    // 控制modal 显隐
    const [isModalShow, setIsModalShow] = useState(false);

    const openInviteModal = () => {
        // 受控
        setIsModalShow(true);
    }

    const hideMask = () => {
        setIsModalShow(false);
    }

    return (
        <div className="App">
            <header className="pageHeader">
                <h4>{topTitle}</h4>
            </header>
            <div className="middleArea">
                <section className="slogan">
                    <div className="block">
                        A better way
                    </div>
                    <div className="block">
                        to enjoy every day.
                    </div>
                    <p>Be the first to know when we launch.</p>
                </section>
                <section className="invite">
                    <button onClick={openInviteModal}>Request an invite</button>
                </section>
            </div>
            <footer className="pageFooter">
                <div>Made with ❤ in Melbourne.</div>
                <div>© 2016 Broccoli & Co. All rights reserved.</div>
            </footer>
            <InviteModal isShow={isModalShow} onClose={() => hideMask()} />
        </div>
    );
}

export default App;
