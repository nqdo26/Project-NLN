// Layouts
import { DefaultLayout, DocViewLayout, AdminLayout } from '~/components/Layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Uploaded from '~/pages/Uploaded';
import Search from '~/pages/Search';
import Doc from '~/pages/Doc';
import Library from '~/pages/Library';
import NewDoc from '~/pages/NewDoc';
import Login from '~/pages/Login';
import Signup from '~/pages/Signup';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/uploaded', component: Uploaded, layout: DefaultLayout },
    { path: '/search', component: Search, layout: DefaultLayout },
    { path: '/doc/:docId', component: Doc, layout: DocViewLayout },
    { path: '/library', component: Library, layout: DefaultLayout },
    { path: '/new-doc', component: NewDoc, layout: DefaultLayout },
    { path: '/login', component: Login, layout: null },
    { path: '/signup', component: Signup, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
