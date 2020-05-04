// 设置用户信息
export function setUserInfo ({ commit }, userInfo) {
  commit('setUserInfo', userInfo)
}

// 设置token，并存进localstorage
export function setToken ({ commit }, token) {
  if (typeof token !== 'string') {
    token = ''
  }

  window.localStorage.setItem('token', token)
  commit('setToken', token)
}

// 设置用户userInfo，并存进localstorage
export function setUserInfoStorage ({ commit }, userInfo) {
  window.localStorage.setItem('userInfo', JSON.stringify(userInfo || {}))
  commit('setUserInfo', userInfo)
}

// 设置用户isLogin，并存进localstorage
export function setIsLogin ({ commit }, isLogin) {
  window.localStorage.setItem('isLogin', JSON.stringify(isLogin))
  commit('setIsLogin', isLogin)
}
