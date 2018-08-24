import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:3000/api'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        memberId: localStorage.getItem('memberId') || null,
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        }
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        retrieveMemberId(state, memberId) {
            state.memberId = memberId
        },
        destroyMemberId(state) {
            state.memberId = null
        }

    },
    actions: {
        register(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/members', {
                    name: data.name,
                    vorname: data.vorname,
                    email: data.email,
                    password: data.password,
                })
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = context.state.token

            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('/members/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('memberId')
                            context.commit('destroyToken')
                            context.commit('destroyMemberId')
                            resolve(response)
                            // console.log(response);
                            // context.commit('addTodo', response.data)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token')
                            localStorage.removeItem('memberId')
                            context.commit('destroyToken')
                            context.commit('destroyMemberId')
                            reject(error)
                        })
                })
            }
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/members/login', {
                    email: credentials.email,
                    password: credentials.password,
                })
                    .then(response => {
                        const token = response.data.id
                        const memberId = response.data.userId

                        localStorage.setItem('access_token', token)
                        localStorage.setItem('memberId', memberId)
                        context.commit('retrieveToken', token)
                        context.commit('retrieveMemberId', memberId)
                        resolve(response)
                        // console.log(response);
                        // context.commit('addTodo', response.data)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    })
            })
        }
    }
})