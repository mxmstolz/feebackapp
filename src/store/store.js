import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import getWeek from '../helper/helper'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:3000/api'

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        memberId: localStorage.getItem('memberId') || null,
        feedback: '',
        sumMood: [],
        weeks: []
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },


    },
    mutations: {
        getAvgMood(state) {
            state.weeks = []
            state.sumMood = new Array();
            var sumMood = [];
            var oldWeek = 0;
            var newWeek = 0;
            var index = 0;
            var counter = 0;
            if (state.feedback != null) {
                oldWeek = getWeek(state.feedback[0].createdAt);
                newWeek = oldWeek;
                state.weeks.push(oldWeek)
                state.sumMood.push(0);
            }
            // var prom = new Promise((resolve, reject) => {
            state.feedback.forEach((v, k, arr) => {
                newWeek = getWeek(v.createdAt);
                if (newWeek == oldWeek) {
                    state.sumMood[index] += v.mood;
                    counter++;
                } else {
                    state.sumMood[index] = state.sumMood[index] / counter;
                    counter = 1;
                    state.sumMood.push(v.mood);
                    oldWeek = newWeek;
                    state.weeks.push(oldWeek)
                    index++;
                }
                if (k === arr.length - 1) {
                    state.sumMood[(state.sumMood.length - 1)] = state.sumMood[(state.sumMood.length - 1)] / counter;
                }

            })
            // });
            // prom.then(() => {
            //     // console.log(counter)
            //     state.sumMood[(state.sumMood.length - 1)] = state.sumMood[(state.sumMood.length - 1)] / counter;
            //     console.log(state.sumMood)
            // })

        },
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
        },
        retrieveFeedback(state, feedback) {
            state.feedback = feedback
        },


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
        },
        retrieveFeedback(context, id) {
            return new Promise((resolve, reject) => {
                axios.defaults.headers.common[
                    'Authorization'
                ] = context.state.token;
                axios
                    .get('/project_groups/' + id + '/feedbacks')
                    .then(v => {
                        //   this.dataset = v.data;
                        context.commit('retrieveFeedback', v.data)
                        resolve(v);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    });
            });
        },
    },



})