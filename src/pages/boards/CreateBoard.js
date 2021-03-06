import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/react-hooks';

import {Loader} from '../../components/loader';
import {Pallete} from '../../components/pallete';
import {Toast} from '../../components/toast/Toast';

import query from '../../queries/boards';
import mutation from '../../mutations/addBoard';

export const CreateBoard = (props) => {
    const [boardColor, setBoardColor] = useState('grey');
    const [boardName, setBoardName] = useState('');

    const {
        id,
        hideModal
    } = props;

    const [mutate, {loading: adding, error: mutationError}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    const addBoard = async () => {
        await mutate({
            variables: {
                user: id,
                name: boardName,
                color: boardColor
            },
            refetchQueries: [{
                query,
                variables: {user: id}
            }]
        });
        hideModal();
    };

    const handleInput = (event) => {
        const name = event.target.value;
        if (name.length <= 25) setBoardName(event.target.value);
    };

    useEffect(() => {
        setBoardName('');
        setBoardColor('grey');
        return (() => {
            setBoardName('');
            setBoardColor('grey');
        });
    }, []);

    return (
        <div className="create-board">
            {mutationError ? (
                <Toast content={{
                    message: 'Uh oh! Board creation failed.',
                    type: 'error'
                }} />
            ) : null}
            <header className="create-board-header">Create a Board</header>
            <div className="create-board-intro">
				A board is like a collection. For example, if you are planning for a Goa trip - the board title could be
                <span>Trip to Goa.</span>
            </div>
            <div className="create-board-form">
                <div className="form-label">
					TITLE
                </div>
                <input
                    type="text"
                    value={boardName}
                    placeholder="Maximum 25 characters"
                    onChange={handleInput}
                />
                <div className="form-label">
					COLOR
                </div>
                <Pallete
                    selected={boardColor}
                    handleChange={setBoardColor}
                />
                <div className="form-error-row" />
            </div>
            <footer className="create-board-footer">
                <button
                    className="standard-button"
                    disabled={!boardName.length}
                    onClick={addBoard}
                >
                    {adding ? <Loader /> : 'Confirm'}
                </button>
                <button
                    className="standard-button"
                    onClick={hideModal}
                >
					Cancel
                </button>
            </footer>
        </div>
    );
};

CreateBoard.propTypes = {
    id: PropTypes.string,
    hideModal: PropTypes.func
};