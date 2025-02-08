// Layouts
import { DefaultLayout } from '~/components/Layouts';

// Pages
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: DefaultLayout },
    { path: '/search', component: Search, layout: DefaultLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
