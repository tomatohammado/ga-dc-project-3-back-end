function transformProvidersArray (providerStringArray, providers) {
  return providerStringArray.map(providerString => {
    let providerIndex = providers.findIndex(providerObj => {
      return providerObj.name === providerString
    })
    return providers[providerIndex]._id
  })
}

module.exports = {
  transformProvidersArray
}
