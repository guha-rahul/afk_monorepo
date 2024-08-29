import backendConfig from '../configs/backend.config.json';

/** TODO add ENV and config for prod and test */
/** TODO fix url */
// TODO used REACT_APP_NODE_ENV
// const isProduction = process.env.REACT_APP_NODE_ENV == "true" ? true : false
const isProduction = true
// export const backendUrl = 'https://' + backendConfig.host;
console.log("isProduction", isProduction)
console.log("REACT_APP_BACKEND_URL", process.env.REACT_APP_BACKEND_URL)
// export const backendUrl = process.env.REACT_APP_BACKEND_URL ?? backendConfig.host;

// export const backendUrl = process.env.REACT_APP_BACKEND_URL ? 'https://' + process.env.REACT_APP_BACKEND_URL : 'https://' + backendConfig.host + ':' + backendConfig.port;
// console.log("backendUrl", backendUrl)

export const backendUrl = isProduction
  ? 'https://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host
  : 'http://' + backendConfig.host + ':' + backendConfig.port;
console.log("backendUrl", backendUrl)

export const wsUrl = isProduction
  ? 'wss://' + backendConfig.host + '/ws'
  : 'ws://' + backendConfig.host + ':' + backendConfig.consumer_port + '/ws';
console.log("wsUrl", wsUrl)

export const nftUrl = isProduction
  ? 'https://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host
  : 'http://' + backendConfig.host + ':' + backendConfig.consumer_port;


export const templateUrl = isProduction
  ? 'https://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host
  : 'http://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host + ':' + backendConfig.port;


// export const wsUrl = backendConfig.production
//   ? 'wss://' + backendConfig.host + '/ws'
//   : 'ws://' + backendConfig.host + ':' + backendConfig.consumer_port + '/ws';
// console.log("wsUrl", wsUrl)

// export const nftUrl = backendConfig.production
//   ? 'https://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host
//   : 'http://' + backendConfig.host + ':' + backendConfig.consumer_port;

console.log("nftUrl", nftUrl)

// export const templateUrl = backendConfig.production
//   ? 'https://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host
//   : 'http://' + typeof process.env.REACT_APP_BACKEND_URL !== "undefined" ? process.env.REACT_APP_BACKEND_URL : backendConfig.host + ':' + backendConfig.port;

// TODO used REACT_APP_NODE_ENV
export const devnetMode = backendConfig.production === false;
export const convertUrl = (url) => {
  if (!url) {
    return url;
  }
  return url.replace('$BACKEND_URL', backendUrl);
};