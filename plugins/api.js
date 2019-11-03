import axios from 'axios'

const API_BASEURL = 'https://shikai.appspot.com/routes/'

const axiosClient = axios.create({
  baseURL: API_BASEURL
})

export const getDestinations = (locationId) => {
  return axiosClient.get('/destinations', {
    params: {
      locationId: locationId
    }
  })
}

export const getNodes = (locationId) => {
  return axiosClient.get('/nodes', {
    params: {
      locationId: locationId
    }
  })
}

export const getRoutes = (locationId, startNode, destinationNode, qrDirection = 'Front') => {
  return axiosClient.get('/nodes', {
    params: {
      locationId: locationId,
      start: startNode,
      destination: destinationNode,
      qrDirection
    }
  })
}
