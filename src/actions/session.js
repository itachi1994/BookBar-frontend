import * as userService from '../services/UserService'
import { receiveErrors } from "./error";

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});
const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const login = user => async dispatch => {
    const response = await userService.login(user);
    const data = await response.json();
    if (response.ok) {
        console.log('received OK after logging in')
        console.log(data)
        localStorage.setItem('session',JSON.stringify(data))
        return dispatch(receiveCurrentUser(data));
    }
    return dispatch(receiveErrors(data));
};
export const signup = user => async dispatch => {
    const response = await userService.register(user);
    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('session',JSON.stringify(data))
        return dispatch(receiveCurrentUser(data));
    }
    return dispatch(receiveErrors(data));
};
export const logout = () => async dispatch => {

    // const response = await userService.logout();
    // const data = await response.json();
    // if (response.ok) {
    //     localStorage.removeItem('session')
    //     return dispatch(logoutCurrentUser());
    // }
    // return dispatch(receiveErrors(data));
    localStorage.clear();
    return dispatch(logoutCurrentUser())
};
