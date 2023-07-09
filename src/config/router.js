import {createRouter, createWebHistory} from 'vue-router';

//page components
import UsersPage from "@/views/UsersPage.vue";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import CreateNewsPage from "@/views/CreateNewsPage.vue";
import LogoutPage from "@/views/LogoutPage.vue";
import {currSession, roles, status} from "@/config/session";
import CategoriesPage from "@/views/CategoriesPage.vue";

// App routes
const routes = [
    {
        path: '/',
        component: HomePage,
        meta: {
            authenticationRequired: false,
            authorizationRequired: null
        }
    },
    {
        path: '/createNews',
        component: CreateNewsPage,
        meta: {
            authenticationRequired: true,
            authorizationRequired: roles.contentCreator,

        }
    },
    {
        path: '/categories',
        component: CategoriesPage,
        meta: {
            authenticationRequired: false,
            authorizationRequired: roles.contentViewer,

        }
    },
    {
        path: '/login',
        component: LoginPage,
        meta: {
            authenticationRequired: false,
            authorizationRequired: null
        }
    },
    {
        path: '/logout',
        component: LogoutPage,
        meta: {
            authenticationRequired: true,
            authorizationRequired: null
        }
    },
    {
        path: '/users',
        component: UsersPage,
        meta: {
            authenticationRequired: true,
            authorizationRequired: roles.admin
        }
    }
];

//router constant that will be used by app root, mount the created app component to index.html #app
export const myRouter = createRouter({
    history: createWebHistory(),
    routes,
});


myRouter.beforeEach((to, from, next) => {
    const authenticationReq = to.meta.authenticationRequired;
    const authorizationReq = to.meta.authorizationRequired;

    if (authenticationReq) {
        let redirectMessage;

        if (currSession() === null) {
            redirectMessage = 'Authentication is required for route: ' + to.path + '. Please log in.';
        } else if (currSession().status !== status.active) {
            redirectMessage = 'Can\'t access route ' + to.path + '. Your account is deactivated.';
        } else if (authorizationReq === roles.admin && currSession().role !== roles.admin) {
            redirectMessage = 'Not authorized to access this route. If you want to access this route please log in as administrator.';
        } else if (authorizationReq === roles.contentCreator && currSession().role === roles.contentViewer) {
            redirectMessage = 'Content creators can access this route. If you want to create News, change your account\'s role in settings.';
        }

        if (redirectMessage) {
            if (from === undefined) {
                redirect('/', redirectMessage, next);
            } else {
                redirect(from.path, redirectMessage, next);
            }
            return; // Exit the function early after redirection
        }
    } else if (to.path === '/login' && currSession()) {
        redirect(from.path, 'You are already logged in. Please refresh your browser window .', next);
        return;
    }

    next();
});

function redirect(redirectRoute, redirectMessage, next) {
    console.log("ROUTER SE JAVLJA");
    alert(redirectMessage);

    setTimeout(() => {
        next(redirectRoute);
    }, 2000);
}

