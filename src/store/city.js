const city = {
  state: {
    cityId: window.localStorage.getItem('cityId') || 1,
    cityName: window.localStorage.getItem('cityName') || '北京'
  },
  mutations: {
    CITY_INFO (state, payload) {
      state.cityId = payload.id
      state.cityName = payload.nm
    }
  },
  actions: {

  }
}

export default city
