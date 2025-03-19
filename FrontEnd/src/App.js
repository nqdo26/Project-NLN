import { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import axios from './utils/axios.custiomize';
import { AuthContext } from './components/Context/auth.context';
import { getAccountApi } from './utils/api';

function App() {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchAccount = async () => {
            const res = await getAccountApi();

            if (res && !res.message) {

                setAuth({
                    isAuthenticated: false,
                    user: {
                        email: res.email,
                        fullName: res.fullName,
                        avatar: res.avatar,
                    },
                });
                return;
            }

            setAuth({
                isAuthenticated: true,
                user: {
                    email: res.email,
                    fullName: res.fullName,
                    avatar: res.avatar,
                },
            });
        };
        fetchAccount();
    }, []);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
