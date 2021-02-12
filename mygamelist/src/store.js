import Vue from 'vue'
import Vuex from 'vuex'
import { fetchHomepageGames } from './services/igdbCalls'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homepageData: [],
        user: {}
    },
    mutations: {
        setHomepageData( state, data ) {
            state.homepageData = data
        },
        setUser( state, data ) {
            state.user = data
        }
    },
    actions: {
        async getHomepageData({commit}) {
            try {
                const resp = await fetchHomepageGames()
                commit('setHomepageData', resp)
              } catch(err) {
                console.log(err.message)
              }
        },
        async getUser({commit}) {
            let user = await JSON.parse(localStorage.getItem('user'))
            commit('setUser', user)
        },
    },
    getters : {
        homepageData: state => state.homepageData,
        user: state => state.user,
        isLoggedIn: state => !!state.user
    }  
})
