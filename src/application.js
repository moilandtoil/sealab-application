"use strict";

class Application {

  constructor(serviceManager, connectionManager, logger) {
    this.serviceManager = serviceManager;
    this.connectionManager = connectionManager;
    this.appLogger = logger;
  }

  registerService(services) {
    return this.serviceManager.register(services, this);
  }

  registerConnection(connName, connObj) {
    return this.connectionManager.register(connName, connObj);
  }

  service(serviceId) {
    return this.serviceManager.getService(serviceId);
  }

  conn(connId) {
    return this.connectionManager.getConnection(connId);
  }

  logger() {
    return this.appLogger;
  }
}

module.exports = Application;