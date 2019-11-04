import * as api from '~/plugins/api'
import toastr from '~/plugins/toastr'

export const strict = false

export const state = () => ({
  selectedLocationId: null,
  // { "locationId": "name", ... }
  locations: {
    'pt-main-office': 'オフィス',
    'TokyoMetro.Yurakucho.ShinKiba': '新木場駅',
    'TokyoMetro.Yurakucho.Tatsumi': '辰巳駅'
  },
  // { "nodeId": "name", ... }
  destinations: null,
  // "DAI-0001-0000"
  selectedDestinationNodeId: null,
  // [ {"id":"DAI-0001-0000","distance":7.0,"direction":"Front"}, ... ]
  routes: null,
  apiWait: false,
  alertWait: false
})

export const getters = {
  // { name: "name", id: "locationId" }
  selectedLocationId: state => state.selectedLocationId,
  // [ {label: "name", value: "nodeId"}, ... ]
  destinationsArray: (state) => {
    if (state.destinations === null) return []
    const retArray = Object.keys(state.destinations).map((nodeId) => {
      return {
        label: state.destinations[nodeId],
        value: nodeId
      }
    })
    retArray.unshift({ label: '選択してください', value: null })
    return retArray
  },
  // "nodeId"
  selectedDestinationNodeId: state => state.selectedDestinationNodeId,
  // [ {"id":"DAI-0001-0000","distance":7.0,"direction":"Front"}, ... ]
  routes: state => state.routes,
  // [ { "value": "locationId", "label": "name"}, ... ]
  locationsArray: (state) => {
    return state.locations === null ? []
      : Object.keys(state.locations).map((locationId) => {
        return {
          label: state.locations[locationId],
          value: locationId
        }
      })
  }
}

export const mutations = {
  init: (state) => {
    state.selectedLocationId = null
    state.destinations = null
    state.selectedDestinationNodeId = null
    state.currentNodeId = null
    state.routes = null
  },
  setLocationId: (state, locationId) => {
    state.selectedLocationId = locationId
  },
  setDestinations: (state, val) => {
    state.destinations = val
  },
  setRoutes: (state, val) => {
    state.routes = val
  },
  setDestinationNodeId: (state, nodeId) => {
    console.log('mutation setDestinationNodeId', nodeId)
    state.selectedDestinationNodeId = nodeId
    console.log('finally state.selectedDestinationNodeId', state.selectedDestinationNodeId)
  },
  setApiWait: (state, val) => {
    state.apiWait = val
  },
  setAlertWait: (state, val) => {
    state.alertWait = val
  }
}

export const actions = {
  async setLocationId({ commit, state }, locationId) {
    commit('init')
    commit('setLocationId', locationId)

    try {
      const response = await api.getDestinations(state.selectedLocationId)
      commit('setDestinations', response.data)
    } catch (err) {
      console.error(err)
    }
  },
  setDestinationNodeId({ commit }, val) {
    console.log('action setDestinationNodeId', val)
    commit('setDestinationNodeId', val)
  },
  async setRoutes({ commit, state }, currentNodeId) {
  // setRoutes({ commit, state }, currentNodeId) {
    if (state.selectedDestinationNodeId === null && state.alertWait === false) {
      commit('setAlertWait', true)
      toastr.error('先に目的地を設定してください')
      toastr.options.onHidden = () => {
        console.log('hide')
        commit('setAlertWait', false)
      }
      return
    }

    if (state.selectedDestinationNodeId === null) {
      return
    }

    // console.log('currentNodeId', currentNodeId)
    // console.log('state.selectedLocationId', state.selectedLocationId)
    // console.log('state.selectedDestinationNodeId', state.selectedDestinationNodeId)
    // console.log('state.apiWait', state.apiWait)

    if (state.apiWait === true) {
      return
    }

    try {
      commit('setApiWait', true)
      const response = await api.getRoutes(state.selectedLocationId, currentNodeId, state.selectedDestinationNodeId)
      console.log(response.data)
      commit('setRoutes', response.data)
    } catch (err) {
      console.error(err)
    } finally {
      await new Promise((resolve, reject) => setTimeout(() => { resolve() }, 1000))
      commit('setApiWait', false)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
