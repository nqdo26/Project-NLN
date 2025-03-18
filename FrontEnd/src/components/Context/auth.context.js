import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        fullName: '',
        avatar: '',
    },
});

export const AuthWrapper = (props) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {
            email: '',
            fullName: '',
            avatar: '',
        },
    });

    const [appLoading, setAppLoading] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                appLoading,
                setAppLoading,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
