import axios from "../../utils/axios";

export function listContactInfo(data,method = "post") {
    let url = "/contact/info";
    return axios({
        url: url,
        method: method,
        data: data
    })
}

export function deleteContactLogical(id,method = "get") {
    let url = "/contact/delete";
    return axios({
        url: url,
        method: method,
        params: {
            id: id
        }
    })
}

export function getContacterCompanyCurrent(id,method = "get") {
    let url = "/contact/edit/companyCurrent";
    return axios({
        url: url,
        method: method,
        params: {
            id: id
        }
    })
}

export function getContacterCurrent(id,method = "get") {
    let url = "/contact/edit/info";
    return axios({
        url: url,
        method: method,
        params: {
            id: id
        }
    })
}

export function getMyWindowList(method = "post") {
    let url = "/user/list/name";
    return axios({
        url: url,
        method: method
    })
}

export function getCompanyList(method = "post") {
    let url = "/company/list/name";
    return axios({
        url: url,
        method: method
    })
}
