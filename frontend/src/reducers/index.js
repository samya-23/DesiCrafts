import { combineReducers } from "redux"

// Product Reducers
import {
    productsListReducer,
    productDetailsReducer,
    createProductReducer,
    updateProductReducer,
    deleteProductReducer,
    changeDeliveryStatusReducer,
} from "./productReducers"

// Card Reducers
import {
    createCardReducer,
    chargeCardReducer,
    savedCardsListReducer,
    deleteSavedCardReducer,
    updateStripeCardReducer, // ✅ Renamed to fix the typo
} from "./cardReducers"

// User Reducers
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userDetailsUpdateReducer,
    deleteUserAccountReducer,
    checkTokenValidationReducer,
    getSingleAddressReducer,
    getAllAddressesOfUserReducer,
    createUserAddressReducer,
    updateUserAddressReducer,
    deleteUserAddressReducer,
    getAllOrdersReducer,
} from "./userReducers"

const allReducers = combineReducers({
    // Products
    productsListReducer,
    productDetailsReducer,
    createProductReducer,
    updateProductReducer,
    deleteProductReducer,
    changeDeliveryStatusReducer,

    // Cards
    createCardReducer,
    chargeCardReducer,
    savedCardsListReducer,
    updateStripeCardReducer, // ✅ fixed typo here
    deleteSavedCardReducer,

    // User Authentication & Details
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userDetailsUpdateReducer,
    deleteUserAccountReducer,
    checkTokenValidationReducer,

    // Addresses
    getSingleAddressReducer,
    getAllAddressesOfUserReducer,
    createUserAddressReducer,
    updateUserAddressReducer,
    deleteUserAddressReducer,

    // Orders
    getAllOrdersReducer,
})

export default allReducers
