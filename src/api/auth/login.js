/**
 * Created by lk on 17/6/4.
 */
import axios from "../../utils/axios";
import axiosOrg from "axios";
// 获取信息
export function userInfo(id, token) {
    return axios({
        url: "/admin/auth/login/userInfo",
        method: "get",
        params: { id, token }
    });
}

export function loginName(userName, pwd, lang) {
    return axios({
        url: "/admin/auth/login/index",
        method: "post",
        data: { userName, pwd, lang }
    });
}

export function loginByNoPwd(userName, pwd, lang) {
    return axios({
        url: "/admin/auth/login/nopwd",
        method: "post",
        data: { userName, pwd, lang }
    });
}

export function logout(uid, token) {
    return axios({
        url: "/admin/auth/login/out",
        method: "post",
        data: { uid, token }
    });
}

export function password(data) {
    return axios({
        url: "/admin/auth/login/password",
        method: "post",
        data: data
    });
}

export function loginPmis(data) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: 'https://keycloak.apps.ocp4.liandisys.com.cn/auth/realms/npmis/protocol/openid-connect/token'
    };
    return axiosOrg(options);
}
