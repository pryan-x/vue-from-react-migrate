import Vue from 'vue'
import Vuex from 'vuex'
import { fetchHomepageGames } from './services/igdbCalls'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homepageData: []
    },
    mutations: {
        setHomepageData( state, data ) {
            state.homepageData = data
        }
    },
    actions: {
        async getHomepageData({commit}) {
            try {
                console.log('here')
                const resp = await fetchHomepageGames()
                console.log(resp)
                commit('setHomepageData', resp)
              } catch(err) {
                console.log(err.message)
              }
        }
    },
    getters : {
        homepageData(state) {
            console.log(state.homepageData)
            return state.homepageData
        }
    }  
})
