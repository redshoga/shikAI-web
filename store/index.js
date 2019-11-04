import * as api from '~/plugins/api'

export const strict = false

export const state = () => ({
  selectedLocationId: null,
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
  selectedLocation: (state) => {
    return {
      name: state.locations[state.selectedLocationId],
      id: state.selectedLocationId
    }
  },
  // [ {name: "name", nodeId: "nodeId"}, ... ]
  destinationsArray: (state) => {
    return state.destinations === null ? []
      : Object.keys(state.destinations).map((nodeId) => {
        return {
          name: state.destinations[nodeId],
          nodeId: nodeId
        }
      })
  },
  // {name: "name", nodeId: "nodeId"}
  selectedDestination: (state) => {
    if (state.selectedDestinationNodeId === null || state.destinations === null) return null
    return {
      name: state.destinations[state.selectedDestinationNodeId],
      nodeId: state.selectedDestinationNodeId
    }
  },
  // [ {"id":"DAI-0001-0000","distance":7.0,"direction":"Front"}, ... ]
  routes: state => state.routes
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
  async setLocation({ commit, state }, locationId) {
    commit('init')
    commit('setLocationId', locationId)

    try {
      const response = await api.getDestinations(state.selectedLocationId)
      commit('setDestinations', response.data)
    } catch (err) {
      console.error(err)
    }
  },
  setDestinationNodeId({ commit }, nodeId) {
    commit('setDestinationNodeId', nodeId)
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
