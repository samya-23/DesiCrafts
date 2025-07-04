import {
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RESET,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,

    CHANGE_DELIVERY_STATUS_REQUEST,
    CHANGE_DELIVERY_STATUS_SUCCESS,
    CHANGE_DELIVERY_STATUS_FAIL,
    CHANGE_DELIVERY_STATUS_RESET,
} from '../constants/index'

// Products List Reducer
export const productsListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCTS_LIST_REQUEST:
            return { ...state, loading: true, products: [], error: "" }
        case PRODUCTS_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload, error: "" }
        case PRODUCTS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

// Product Details Reducer
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true, product: {}, error: "" }
        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, loading: false, product: action.payload, error: "" }
        case PRODUCT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

// Create Product Reducer
export const createProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return { ...state, loading: true, success: false, product: {}, error: "" }
        case CREATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, success: true, product: action.payload, error: "" }
        case CREATE_PRODUCT_FAIL:
            return { ...state, loading: false, success: false, product: {}, error: action.payload }
        case CREATE_PRODUCT_RESET:
            return { ...state, loading: false, success: false, product: {}, error: "" }
        default:
            return state
    }
}

// Update Product Reducer
export const updateProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return { ...state, loading: true, success: false, product: {}, error: "" }
        case UPDATE_PRODUCT_SUCCESS:
            return { ...state, loading: false, success: true, product: action.payload, error: "" }
        case UPDATE_PRODUCT_FAIL:
            return { ...state, loading: false, success: false, product: {}, error: action.payload }
        case UPDATE_PRODUCT_RESET:
            return { ...state, loading: false, success: false, product: {}, error: "" }
        default:
            return state
    }
}

// Delete Product Reducer
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, success: false, error: "" }
        case DELETE_PRODUCT_SUCCESS:
            return { ...state, loading: false, success: true, error: "" }
        case DELETE_PRODUCT_FAIL:
            return { ...state, loading: false, success: false, error: action.payload }
        case DELETE_PRODUCT_RESET:
            return { ...state, loading: false, success: false, error: "" }
        default:
            return state
    }
}

// Change Delivery Status Reducer
export const changeDeliveryStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_DELIVERY_STATUS_REQUEST:
            return { ...state, loading: true, success: false, error: "" }
        case CHANGE_DELIVERY_STATUS_SUCCESS:
            return { ...state, loading: false, success: true, error: "" }
        case CHANGE_DELIVERY_STATUS_FAIL:
            return { ...state, loading: false, success: false, error: action.payload }
        case CHANGE_DELIVERY_STATUS_RESET:
            return { ...state, loading: false, success: false, error: "" }
        default:
            return state
    }
}
