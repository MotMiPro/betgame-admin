// import { call, put, takeLatest } from "redux-saga/effects";
// import { DISPATCH_TYPE } from "../ducks/types";
// import { userLogin, userRegister } from "./apiMiddleWare";

// function* registerApi({ payload }) {
//   try {
//     const { data } = yield call(() => userRegister(payload));
//     console.log({ data });
//     yield put({
//       type: DISPATCH_TYPE.REGISTER_SUCCESS,
//       payload: data,
//     });
//   } catch ({ response }) {
//     const { data } = !!response && response;
//     console.log("registerApi failed", data);
//   }
// }

// function* loginApi({ payload }) {
//   try {
//     const { data } = yield call(() => userLogin(payload));
//     yield put({
//       type: DISPATCH_TYPE.LOGIN,
//       payload: data,
//     });
//   } catch ({ response }) {
//     const { data } = !!response && response;
//     console.log("loginApi fail", data);
//   }
// }

// function* rootSaga() {
//   yield takeLatest(DISPATCH_TYPE.LOGIN_API, loginApi);
//   yield takeLatest(DISPATCH_TYPE.REGISTER_API, registerApi);
// }

// export default rootSaga;
