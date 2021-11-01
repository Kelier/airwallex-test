import {useEffect, useState, useRef} from 'react';
import {isValidFullName, isValidEmail, isValidCheckEmail} from './tool';

const url = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

const validColor = {'color': '#000', borderColor: '#000'};
const notValidColor = {'color': '#df2727', borderColor: '#df2727'};
const infoStyle = "width: 200px; height: auto;position: absolute;top: 30px; right: 100px;background:#fff;padding: 7px 10px;border: 2px solid #0c0101;transition: all .5s ease-in;";

export function InviteModal(Props) {
    // modal 唯一实例
    const modalRef = useRef();
    // props 传递
    const {isShow, onClose} = Props;

    // modal button show
    const [loading, setLoading] = useState(false);
    // next step if get work
    const [isAccomplish, setIsAccomplish] = useState(false);

    // form list
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState('');

    // form list validstyle
    const [fullNameStyle, setFullNameStyle] = useState(null);
    const [emailStyle, setEmailStyle] = useState(null);
    const [checkEmailStyle, setCheckEmailStyle] = useState(null);

    /* show tip warning */
    const showWarning = (info, duration = 5000) => {
        const node = document.createElement('div');
        node.id = 'tempTip';
        node.innerHTML = `<div style="${infoStyle}"> ⚠︎ Tips Error: <br> ${info}</div>`
        document.body.appendChild(node);
        setTimeout(() => {
            const target = document.querySelector('#tempTip');
            target.parentNode.removeChild(target);
        }, duration)
    }

    /* jump second step */
    const accomplish = () => {
        // render another
        setIsAccomplish(true);
    }

    const requestAPI = () => {
        // request interface
        // 1st button content change + loading
        setLoading(true);
        // 2st load data
        fetch(url, {
            method: 'post',
            body: JSON.stringify({
                name: fullName,
                // email: 'usedemail@airwallex.com'
                email: email
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(res => {
            // res.status code=>???
            return res.json()
        }).then(data => {
            if (data.errorMessage) {
                showWarning(data.errorMessage);
                setLoading(false);
            }
            if (data === 'Registered') {
                setLoading(false);
                accomplish();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    /* validate */
    const checkValidate = () => {
        if (isValidFullName(fullName) && isValidEmail(email) && isValidCheckEmail(email, checkEmail)) {
            // next step: request api
            setFullNameStyle(isValidFullName(fullName) ? validColor : notValidColor);
            setEmailStyle(isValidEmail(email) ? validColor : notValidColor);
            setCheckEmailStyle(isValidCheckEmail(email, checkEmail) ? validColor : notValidColor);
            requestAPI();
        } else {
            setFullNameStyle(isValidFullName(fullName) ? validColor : notValidColor);
            setEmailStyle(isValidEmail(email) ? validColor : notValidColor);
            setCheckEmailStyle(isValidCheckEmail(email, checkEmail) ? validColor : notValidColor);
        }
    }

    /* new regis flow */
    const resetFlow = () => {
        setFullName('');
        setEmail('');
        setCheckEmail('');
        // reset 流程 回归 first step
        setIsAccomplish(false);
        onClose();
    }

    /* click listener */
    useEffect(() => {
        if (onClose && isShow) {
            const handler = (event) => {
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    // 点击外层消失
                    if (isAccomplish) {
                        // 这时候可以选择清空表单
                        // 多判断isAccomplish 因为此时点击外层也可以直接消失
                        resetFlow();
                    } else {
                        // 为了填写方便，不清空form
                        onClose();
                    }
                }
            }
            window.addEventListener('click', handler)
            return () => {
                window.removeEventListener('click', handler)
            }
        }
        /* eslint-disable */ 
    }, [isShow, onClose])

    const modalWrapper = <div className="invite-modal-entry">
        <div className="invite-modal" ref={modalRef}>
            <div className="invite-modal-block">
                <h4>{isAccomplish ? 'All done!' : 'Request on invite'}</h4>
                <span></span>
            </div>
            {isAccomplish ? <div className="complete-wrapper">
                <div className="promise-slogan">
                    <p>You will be one of the first to experience</p>
                    <p>Broccoli & Co. when we launch.</p>
                </div>
                <button onClick={resetFlow}>OK</button>
            </div> : <div>
                    <form>
                        <input placeholder="Full name" type="text" value={fullName} onChange={(e) => {
                            setFullName(e.target.value);
                        }} style={fullNameStyle} />
                        <input placeholder="Email" type="email" value={email} onChange={(e) => {
                            setEmail(e.target.value);
                        }} style={emailStyle} />
                        <input placeholder="Confirm email" type="email" value={checkEmail} onChange={(e) => {
                            setCheckEmail(e.target.value);
                        }} style={checkEmailStyle} />
                    </form>
                    {loading ? <button disabled >Sending, please wait...</button> : <button onClick={checkValidate}>Send</button>}
                </div>}

        </div>
        <div className="invite-modal-mask"></div>
    </div>
    return isShow ? modalWrapper : null;
}