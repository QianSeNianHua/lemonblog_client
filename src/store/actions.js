// 设置用户userUUID
export function setUserUUID ({ commit }, userUUID) {
  commit('setUserUUID', userUUID)
}

// 设置用户信息
export function setUserInfo ({ commit }, userInfo) {
  commit('setUserInfo', userInfo)
}
