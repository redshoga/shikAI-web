import * as api from '~/plugins/api'

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
  routes: null
})

export const getters = {
  // { name: "name", id: "locationId" }
  selectedLocationId: state => state.selectedLocationId,
  // [ {label: "name", value: "nodeId"}, ... ]
  destinationsArray: (state) => {
    return state.destinations === null ? []
      : Object.keys(state.destinations).map((nodeId) => {
        return {
          label: state.destinations[nodeId],
          value: nodeId
        }
      })
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
    state.selectedDestinationNodeId = nodeId
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
    commit('setDestinationNodeId', val)
  },
  async setRoutes({ commit, state }, currentNodeId) {
    if (state.selectedDestinationNodeId === null) return

    try {
      const response = await api.getRoutes(state.selectedLocationId, currentNodeId, state.selectedDestinationNodeId)
      commit('setRoutes', response.data)
    } catch (err) {
      console.error(err)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
