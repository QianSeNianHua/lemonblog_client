// 设置token，并存进localstorage
export function setToken ({ commit }, token) {
  if (typeof token !== 'string') {
    token = ''
  }

  window.localStorage.setItem('token', token)
  commit('setToken', token)
}

// 设置用户userInfo
export function setUserInfo ({ commit }, userInfo) {
  commit('setUserInfo', userInfo)
}

// 设置用户isLogin
export function setIsLogin ({ commit }, isLogin) {
  commit('setIsLogin', isLogin)
}
