import React from 'react';
import Card from '../UI/Card';
import styles from './CreateUser.module.css';
import Button from '../UI/Button';
import { useState } from 'react';
import ErrorModal from '../UI/ErrorModal';
const CreateUser = (props) => {
    const [inputName, setInputName] = useState('');
    const [inputAge, setAge] = useState('');
    const [error, setError] = useState();

    const createUserHandler = (e) => {
        e.preventDefault();
        if (inputName.trim().length === 0 || inputAge.trim().length === 0) {
            setError({
                title: 'invalid input',
                message: 'these fields cannot be empty',
            });
            return;
        }
        if (+inputAge < 1) {
            setError({
                title: 'incorrect age',
                message: 'age must be greater than 0',
            });
            return;
        }
        props.onCreateUser(inputName, inputAge);

        setInputName('');
        setAge('');
    };

    const ageChangeHandler = (e) => {
        setAge(e.target.value);
    };

    const nameChangeHandler = (e) => {
        setInputName(e.target.value);
    };

    const errorHandler = () => {
        setError(false);
    };

    return (
        <div>
            {error && (
                <ErrorModal
                    onCloseModal={errorHandler}
                    title={error.title}
                    message={error.message}
                />
            )}
            <Card className={styles.input}>
                <form onSubmit={createUserHandler}>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        onChange={nameChangeHandler}
                        type='text'
                        value={inputName}
                    />

                    <label htmlFor='name'>Age</label>
                    <input
                        id='name'
                        type='number'
                        onChange={ageChangeHandler}
                        value={inputAge}
                    />
                    <Button type='submit'>Add user</Button>
                </form>
            </Card>
        </div>
    );
};

export default CreateUser;
