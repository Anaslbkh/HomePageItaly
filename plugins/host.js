import Vue from "vue";

export default ({app, req}, inject) => {
  const host = process.server ? req.headers.host : window.location.host
  Vue.prototype.$isDomain = host
  app.isDomain = host
  inject('isDomain', host)
};

