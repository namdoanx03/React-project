import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);

    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger"  className='mt-3'> 
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                       You don't have permisson to access this route.
                    </p>
                </Alert>
            </>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute