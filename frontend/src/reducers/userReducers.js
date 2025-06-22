import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
    UPDATE_USER_DETAILS_RESET,

    DELETE_USER_ACCOUNT_REQUEST,
    DELETE_USER_ACCOUNT_SUCCESS,
    DELETE_USER_ACCOUNT_FAIL,
    DELETE_USER_ACCOUNT_RESET,

    GET_USER_ALL_ADDRESSES_REQUEST,
    GET_USER_ALL_ADDRESSES_SUCCESS,
    GET_USER_ALL_ADDRESSES_FAIL,

    GET_SINGLE_ADDRESS_REQUEST,
    GET_SINGLE_ADDRESS_SUCCESS,
    GET_SINGLE_ADDRESS_FAIL,
    GET_SINGLE_ADDRESS_RESET,

    CREATE_USER_ADDRESS_REQUEST,
    CREATE_USER_ADDRESS_SUCCESS,
    CREATE_USER_ADDRESS_FAIL,
    CREATE_USER_ADDRESS_RESET,

    UPDATE_USER_ADDRESS_REQUEST,
    UPDATE_USER_ADDRESS_SUCCESS,
    UPDATE_USER_ADDRESS_FAIL,
    UPDATE_USER_ADDRESS_RESET,

    DELETE_USER_ADDRESS_REQUEST,
    DELETE_USER_ADDRESS_SUCCESS,
    DELETE_USER_ADDRESS_FAIL,
    DELETE_USER_ADDRESS_RESET,

    CHECK_TOKEN_VALID_REQUEST,
    CHECK_TOKEN_VALID_SUCCESS,
    CHECK_TOKEN_VALID_FAIL,
    CHECK_TOKEN_VALID_RESET,

    GET_ALL_ORDERS_REQUEST,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
} from '../constants/index'

// Auth Reducers
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

// User Profile & Account
export const userDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true, user: {} }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload, user: {} }
        default:
            return state
    }
}

export const userDetailsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_DETAILS_REQUEST:
            return { loading: true, user: {}, success: false }
        case UPDATE_USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload, success: true }
        case UPDATE_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload, success: false, user: {} }
        case UPDATE_USER_DETAILS_RESET:
            return { loading: false, success: false, user: {} }
        default:
            return state
    }
}

export const deleteUserAccountReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_ACCOUNT_REQUEST:
            return { loading: true, success: false }
        case DELETE_USER_ACCOUNT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_USER_ACCOUNT_FAIL:
            return { loading: false, success: false, error: action.payload }
        case DELETE_USER_ACCOUNT_RESET:
            return { loading: false, success: false }
        default:
            return state
    }
}

// Token Validation
export const checkTokenValidationReducer = (state = {}, action) => {
    switch (action.type) {
        case CHECK_TOKEN_VALID_REQUEST:
            return { loading: true, valid: false }
        case CHECK_TOKEN_VALID_SUCCESS:
            return { loading: false, valid: true }
        case CHECK_TOKEN_VALID_FAIL:
            return { loading: false, valid: false, error: action.payload }
        case CHECK_TOKEN_VALID_RESET:
            return { loading: false, valid: false }
        default:
            return state
    }
}

// Address Reducers
export const getAllAddressesOfUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_ALL_ADDRESSES_REQUEST:
            return { loading: true, addresses: [], success: false }
        case GET_USER_ALL_ADDRESSES_SUCCESS:
            return { loading: false, addresses: action.payload, success: true }
        case GET_USER_ALL_ADDRESSES_FAIL:
            return { loading: false, addresses: [], success: false, error: action.payload }
        default:
            return state
    }
}

export const getSingleAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SINGLE_ADDRESS_REQUEST:
            return { loading: true, address: {}, success: false }
        case GET_SINGLE_ADDRESS_SUCCESS:
            return { loading: false, address: action.payload, success: true }
        case GET_SINGLE_ADDRESS_FAIL:
            return { loading: false, address: {}, success: false, error: action.payload }
        case GET_SINGLE_ADDRESS_RESET:
            return { loading: false, address: {}, success: false }
        default:
            return state
    }
}

export const createUserAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_USER_ADDRESS_REQUEST:
            return { loading: true, address: {}, success: false }
        case CREATE_USER_ADDRESS_SUCCESS:
            return { loading: false, address: action.payload, success: true }
        case CREATE_USER_ADDRESS_FAIL:
            return { loading: false, address: {}, success: false, error: action.payload }
        case CREATE_USER_ADDRESS_RESET:
            return { loading: false, address: {}, success: false }
        default:
            return state
    }
}

export const updateUserAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_ADDRESS_REQUEST:
            return { loading: true, success: false }
        case UPDATE_USER_ADDRESS_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_USER_ADDRESS_FAIL:
            return { loading: false, success: false, error: action.payload }
        case UPDATE_USER_ADDRESS_RESET:
            return { loading: false, success: false }
        default:
            return state
    }
}

export const deleteUserAddressReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_ADDRESS_REQUEST:
            return { loading: true, success: false }
        case DELETE_USER_ADDRESS_SUCCESS:
            return { loading: false, success: true }
        case DELETE_USER_ADDRESS_FAIL:
            return { loading: false, success: false, error: action.payload }
        case DELETE_USER_ADDRESS_RESET:
            return { loading: false, success: false }
        default:
            return state
    }
}

// Orders
export const getAllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_ALL_ORDERS_REQUEST:
            return { loading: true, orders: [] }
        case GET_ALL_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload }
        case GET_ALL_ORDERS_FAIL:
            return { loading: false, orders: [], error: action.payload }
        default:
            return state
    }
}

