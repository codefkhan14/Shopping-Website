import backend_ref from "./Backend_ref";

export const USER_GOOGLE = `${backend_ref}/auth/google`;
export const USER_GOOGLE_SUCCESS = `${backend_ref}/auth/login/success`;
export const USER_REGISTER = `${backend_ref}/user/register`;
export const USER_LOGIN = `${backend_ref}/user/login`;
export const USER_CHECK_EMAIL = `${backend_ref}/user/checkemail/forgotpassword`;
export const USER_FORGOTPASSWORD = `${backend_ref}/user/forgotpassword`;

// CART

export const ADD_TO_CART = `${backend_ref}/user/addtocart`;
export const GET_CART_DATA = `${backend_ref}/user/cart`;
export const REMOVE_CART_DATA = `${backend_ref}/user/removefromcart`;

// GET POST
export const GET_PRODUCT_BY_ID = `${backend_ref}/user/getproductbyid`;
export const GET_PRODUCT_BY_TAG = `${backend_ref}/user/getproductbytag`;
export const GET_PRODUCT_BY_CATEGORY = `${backend_ref}/user/getproductbycategory`;

// PAYMENT
export const PAYMENT = `${backend_ref}/payment`;
export const PAYMENTVERIFY = `${backend_ref}/payment/verification`;

//USER ORDER
export const GET_ORDER = `${backend_ref}/order/user-order`;
