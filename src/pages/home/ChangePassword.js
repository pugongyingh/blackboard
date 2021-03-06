import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useToast} from '../../components/toast';

import {Loader} from '../../components/loader';
import {changePasswordAPI} from '../../api';

export const ChangePassword = (props) => {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [changing, setChanging] = useState(false);
    const [message, setError] = useState(null);
    const {addToast} = useToast();

    const {hideModal} = props;

    const changePassword = async () => {
        setChanging(true);
        setError(null);
        try {
            await changePasswordAPI(passwordOne);
            setChanging(false);
            addToast({
                type: 'success',
                message: 'Password changed successfully.'
            });
            hideModal();
        } catch (error) {
            setError(error.message);
            setChanging(false);
        }
    };

    const samePassword = passwordOne === passwordTwo;

    return (
        <div className="create-board">
            <header className="create-board-header">Change Password</header>
            <div className="create-board-intro">
				You can update your password here.
            </div>
            <div className="create-board-form">
                <div className="form-label">
					NEW PASSWORD
                </div>
                <input
                    type="password"
                    value={passwordOne}
                    onChange={(e) => setPasswordOne(e.target.value)}
                />
                <div className="form-label">
					CONFIRM NEW PASSWORD
                </div>
                <input
                    type="password"
                    value={passwordTwo}
                    onChange={(e) => setPasswordTwo(e.target.value)}
                />
                <div className="form-error-row">{message}</div>
                <footer className="create-board-footer">
                    <button
                        className="standard-button"
                        disabled={!passwordOne || !samePassword}
                        onClick={changePassword}
                    >
                        {changing ? <Loader /> : 'Confirm'}
                    </button>
                    <button
                        className="standard-button"
                        onClick={hideModal}
                    >
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

ChangePassword.propTypes = {
    hideModal: PropTypes.func
};