import axiosClient from './axiosClient';

export function loginApi(data, signal) {
    return axiosClient.post('login.php', data, { signal });
}

export function logoutApi(data, signal) {
    return axiosClient.post('logout.php', data, { signal });
}

export function registerApi(data, signal) {
    return axiosClient.post('register.php', data, { signal });
}

export function profileinfoApi(data, signal) {
    return axiosClient.post('profileinfo.php', data, { signal });
}

export function profileupdateApi(data, signal) {
    return axiosClient.post('profileupdate.php', data, { signal });
}

export function homeApi(data, signal) {
    return axiosClient.post('home.php', data, { signal });
}

export function productApi(data, signal) {
    return axiosClient.post('product.php', data, { signal });
}

export function categoryApi(signal) {
    return axiosClient.post('category.php', {}, { signal });
}

export function productlistApi(data, signal) {
    return axiosClient.post('productlist.php', data, { signal });
}

export function filterApi(data, signal) {
    return axiosClient.post('filters.php', data, { signal });
}

export function cartApi(data, signal) {
    return axiosClient.post('cart.php', data, { signal });
}

export function changepasswordApi(data, signal) {
    return axiosClient.post('changepassword.php', data, { signal });
}

export function addressApi(data, signal) {
    return axiosClient.post('address.php', data, { signal });
}

export function deliverymethodApi(data, signal) {
    return axiosClient.post('deliverymethod.php', data, { signal });
}

export function couponApi(data, signal) {
    return axiosClient.post('coupon.php', data, { signal });
}

export function createorderApi(data, signal) {
    return axiosClient.post('createorder.php', data, { signal });
}

export function capturepaymentApi(data, signal) {
    return axiosClient.post('captureorder.php', data, { signal });
}

export function orderlistApi(data, signal) {
    return axiosClient.post('orderlist.php', data, { signal });
}

export function orderApi(data, signal) {
    return axiosClient.post('order.php', data, { signal });
}

export function reviewSubmitApi(data, signal) {
    return axiosClient.post('reviewsubmit.php', data, { signal });
}

export function reviewListApi(data, signal) {
    return axiosClient.post('reviewlist.php', data, { signal });
}

export function couponListApi(data, signal) {
    return axiosClient.post('coupon.php', data, { signal });
}

export function searchApi(data, signal) {
    return axiosClient.post("search.php", data, { signal });
}
