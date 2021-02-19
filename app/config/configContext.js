import React from 'react';

const ConfigContext = React.createContext('red')

const ConfigProvider = ConfigContext.Provider
const ConfigConsumer = ConfigContext.Consumer

export { ConfigProvider, ConfigConsumer }