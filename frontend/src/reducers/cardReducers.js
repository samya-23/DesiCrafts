import {
    CARD_CREATE_REQUEST,
    CARD_CREATE_SUCCESS,
    CARD_CREATE_FAIL,
    CARD_CREATE_RESET,

    CHARGE_CARD_REQUEST,
    CHARGE_CARD_SUCCESS,
    CHARGE_CARD_FAIL,
    CHARGE_CARD_RESET,

    SAVED_CARDS_LIST_REQUEST,
    SAVED_CARDS_LIST_SUCCESS,
    SAVED_CARDS_LIST_FAIL,

    UPDATE_STRIPE_CARD_REQUEST,
    UPDATE_STRIPE_CARD_SUCCESS,
    UPDATE_STRIPE_CARD_FAIL,
    UPDATE_STRIPE_CARD_RESET,

    DELETE_SAVED_CARD_REQUEST,
    DELETE_SAVED_CARD_SUCCESS,
    DELETE_SAVED_CARD_FAIL,
} from '../constants/index'


// Create Card Reducer
export const createCardReducer = (state = {}, action) => {
    switch (action.type) {
        case CARD_CREATE_REQUEST:
            return {
                loading: true,
                cardData: {},
                success: false,
                error: "",
            }
        case CARD_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                cardData: action.payload,
                error: "",
            }
        case CARD_CREATE_FAIL:
            return {
                loading: false,
                cardData: {},
                success: false,
                error: action.payload,
            }
        case CARD_CREATE_RESET:
            return {
                loading: false,
                cardData: {},
                success: false,
                error: "",
            }
        default:
            return state
    }
}


// Charge Card Reducer
export const chargeCardReducer = (state = {}, action) => {
    switch (action.type) {
        case CHARGE_CARD_REQUEST:
            return {
                loading: true,
                success: false,
                error: "",
            }
        case CHARGE_CARD_SUCCESS:
            return {
                loading: false,
                success: true,
                error: "",
            }
        case CHARGE_CARD_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload,
            }
        case CHARGE_CARD_RESET:
            return {
                loading: false,
                success: false,
                error: "",
            }
        default:
            return state
    }
}


// Saved Cards List Reducer
export const savedCardsListReducer = (state = { stripeCards: [] }, action) => {
    switch (action.type) {
        case SAVED_CARDS_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                error: "",
            }
        case SAVED_CARDS_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                stripeCards: action.payload,
                error: "",
            }
        case SAVED_CARDS_LIST_FAIL:
            return {
                loading: false,
                success: false,
                stripeCards: [],
                error: action.payload,
            }
        default:
            return state
    }
}


// Update Stripe Card Reducer
export const updateStripeCardReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_STRIPE_CARD_REQUEST:
            return {
                loading: true,
                success: false,
                stripeCard: {},
                error: "",
            }
        case UPDATE_STRIPE_CARD_SUCCESS:
            return {
                loading: false,
                success: true,
                stripeCard: action.payload,
                error: "",
            }
        case UPDATE_STRIPE_CARD_FAIL:
            return {
                loading: false,
                success: false,
                stripeCard: {},
                error: action.payload,
            }
        case UPDATE_STRIPE_CARD_RESET:
            return {
                loading: false,
                success: false,
                stripeCard: {},
                error: "",
            }
        default:
            return state
    }
}


// Delete Saved Card Reducer
export const deleteSavedCardReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case DELETE_SAVED_CARD_REQUEST:
            return {
                ...state,
                loading: true,
                error: "",
            }
        case DELETE_SAVED_CARD_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
                error: "",
            }
        case DELETE_SAVED_CARD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}
