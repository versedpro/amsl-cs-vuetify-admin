/**
 * Vuetify theme options.
 */
import { userAdmin, userEditor, userCs, userCsAdmin, userSales, userSalesAdmin } from "@/api/mock";
import Axios from "axios";
/**
 * Login by email and password
 *
 * @param {String} email user email
 * @param {String} password user password
 */
export const loginByEmail = async (email, password) => {
  console.log(`[loginByEmail] email ${email}`);
  let user = {};
  try {
     await Axios({
      url: "/api/staffauth/signin",
      method: "POST",
      data: {login: email, password}
    }).then((response)=>{
      user = response["data"];
    }).catch((error)=>{
      console.log(error);
    });
    if (!user || !user["token"]) {
      throw new Error("User is not found");
    }
  } catch (err) {
    console.warn(`[loginByEmail] ${err}`);
  }
  return { user };
};

/**
 * Login by email and password
 *
 * @param {String} email user email
 * @param {String} password user password
 */
export const loginByPhone = async (phone, password) => {
  console.log(`[loginByPhone] email ${phone}`);
  let user = {};
  try {
    await Axios({
      url: "/api/staffauth/signin",
      method: "POST",
      data: {login: phone, password}
    }).then((response)=>{
      user = response["data"];
    }).catch((error)=>{
      console.log(error);
    });
    if (!user || !user["token"]) {
      throw new Error("User is not found");
    }
  } catch (err) {
    console.warn(`[loginByPhone] ${err}`);
  }
  return { user };
};

/**
 * Get user information by token
 *
 * @param {String} token user token
 */
export const getUserInfo = async token => {
  console.log(`[getUserInfo] token ${token}`);
  let user = {};
  try {
    if (!token) {
      throw new Error("Invalid token");
    }

    if (token === userAdmin.token) {
      user = userAdmin;
    } else {
      user = userEditor;
    }
  } catch (err) {
    console.warn(`[getUserInfo] ${err}`);
  }
  return { user };
};
