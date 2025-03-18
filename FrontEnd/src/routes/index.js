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
import Admin from '~/pages/Admin';
import AdminDocManage from '~/pages/AdminDocManage';
import AdminNotification from '~/pages/AdminNotification';
import AdminUserManage from '~/pages/AdminUserManage';
import AdminLevelManage from '~/pages/AdminLevelManage';
import AdminCategoryManage from '~/pages/AdminCategoryManage';

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
    { path: '/admin', component: Admin, layout: AdminLayout },
    { path: '/admin/doc-manage', component: AdminDocManage, layout: AdminLayout },
    { path: '/admin/notification', component: AdminNotification, layout: AdminLayout },
    { path: '/admin/user-manage', component: AdminUserManage, layout: AdminLayout },
    { path: '/admin/level-manage', component: AdminLevelManage, layout: AdminLayout },
    { path: '/admin/category-manage', component: AdminCategoryManage, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
