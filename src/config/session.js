// session.js
import {removeAuthorizationHeader, setAuthorizationHeader} from "@/config/api";

const roles = {admin: 'ADMIN', contentCreator: 'CONTENT_CREATOR', contentViewer: 'CONTENT_VIEWER'}
const status = {active: 'ACTIVE', deactivated: 'DEACTIVATED'}


/** Set the JWT and update the authorization header */
const beginSession = (token) => {
    localStorage.setItem('jwt', token)
    setAuthorizationHeader(token);
};

/** Clears the JWT and remove the authorization header */
const endSession = () => {
    localStorage.removeItem('jwt')
    removeAuthorizationHeader();
};

/** Deconstructs JWT and extract session payload information */
const unwrapJwtPayload = (jwt) => {
    if (!jwt) return null

    try {
        let token = jwt.split('.')[1];
        return JSON.parse(atob(token));
    } catch {
        return null
    }
}

/** Checks if the jwt has expired */
const isJwtExpired = (payload) => {
    if (!payload)
        return null

    const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();
    return currentTime > expirationTime;
};

/** Provides current session information if there is any and if the session has not expired */
function currSession() {
    let token = localStorage.getItem('jwt');
    console.log(token)
    if (!token) return null

    let payload = unwrapJwtPayload(token)

    if (payload === null)
        return null
    /* if (isJwtExpired(payload))
         endSession()*/

    return payload

}


export {roles, status, currSession, beginSession, endSession};




