import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export const getInitUser = () => {
  const localUser = localStorage.getItem('user');
  if (localUser) {
    try {
      const user = JSON.parse(localUser);
      return user;
    } catch (error) {
      return {};
    }
  }
  return {};
};
export default new Vuex.Store({
  state: {
    user: getInitUser(),
    token: localStorage.getItem('token') || '',
    tabs: [],
    organizes: [],
    classes: [],
    years: [],
    artRoomInfo: undefined
  },
  mutations: {
    setUser(state, userInfo) {
      state.user = userInfo;
      localStorage.setItem('user', JSON.stringify(userInfo));
      if (!userInfo.token) return;
      state.token = userInfo.token;
      localStorage.setItem('token', userInfo.token);
    },
    setLesson(state, data) {
      state.lesson = data;
    },
    setOrganizes(state, data) {
      state.organizes = data;
    },
    setArtRoomInfo(state, data) {
      state.artRoomInfo = data;
    },
    setClasses(state, data) {
      state.classes = data;
    },
    setYears(state, data) {
      state.years = data;
    },
    clearState(state) {
      state.user = {};
      state.token = '';
    }
  },
  actions: {
    clearState({ commit }) {
      commit('clearState');
    },
    async getUser({ commit }, data) {
      try {
        const res = await Ajax.get('/user/token', {
          token: data
        });
        commit('setUser', res.body);
        return true;
      } catch (error) {
        return false;
      }
    }
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    tabs: state => state.tabs,
    lesson: state => state.lesson,
    organizes: state => state.organizes,
    classes: state => state.classes,
    years: state => state.years,
    artRoomInfo: state => state.artRoomInfo
  }
});
