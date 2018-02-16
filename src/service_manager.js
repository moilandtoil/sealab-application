"use strict";

class ServiceManager {
  constructor() {
    this.services = {};
  }

  register(serviceClass, application) {
    const serviceInstance = new serviceClass(application);
    const serviceName = serviceInstance.name();

    if (!/^[a-zA-Z_]+$/.test(serviceName)) {
      throw new Error(`Invalid service name configured for ${serviceInstance.constructor.name}`);
    }
    return this.services[serviceName] = serviceInstance;
  }

  registerAll(serviceClasses, application) {
    for(let serviceClass of serviceClasses) {
      this.register(serviceClass, application);
    }
  }

  getService(serviceName) {
    if (!this.services.hasOwnProperty(serviceName)) {
      throw new Error("Service not configured");
    }
    return this.services[serviceName];
  }
}

module.exports = ServiceManager;