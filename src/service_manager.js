"use strict";

const ChangeCase = require("change-case");

class ServiceManager {
  constructor() {
    this.services = {};
  }

  register(serviceClass, application) {
    const serviceInstance = new serviceClass(application);
    const serviceName = ChangeCase.snakeCase(serviceInstance.constructor.name);

    return this.services[serviceName] = serviceInstance;
  }

  getService(serviceName) {
    if (!this.services.hasOwnProperty(serviceName)) {
      throw new Error("Service not configured");
    }
    return this.services[serviceName];
  }
}

module.exports = ServiceManager;