function transformProvidersArray (providerStringArray, providers) {
  return providerStringArray.map(providerString => {
    // you might be able to simplify or refactor this code using filter,
    // though you'd have to change your collection handling elsewhere,
    // specifically in the cases where you use the return of -1 in a particular
    let providerIndex = providers.findIndex(providerObj => {
      return providerObj.name === providerString
    })
    return providers[providerIndex]._id
  })
}

module.exports = {
  transformProvidersArray
}
