import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = new Vuex.Store({
  state: {
		uid: "",
		username: "",
		avatar: "",
	},
	mutations: {
		setUserId (state, value) {
			state.uid = value;
		},
		setUsername (state, value) {
			state.username = value;
		},
		setUserAvatar (state, value) {
			state.avatar = value;
		}
	}
});

export default storage;