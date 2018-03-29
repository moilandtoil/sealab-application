"use strict";

const ServiceManager = require("./service_manager.js");
const ConnectionManager = require("./connection_manager.js");
const ModelManager = require("./model_manager.js");

class Application {

  constructor(managers, logger) {
    this.serviceManager = managers.serviceManager || new ServiceManager();
    this.connectionManager = managers.connectionManager || new ConnectionManager();
    this.modelManager = managers.modelManager || new ModelManager();
    this.appLogger = logger;
  }

  registerService(services) {
    return this.serviceManager.register(services, this);
  }

  registerServices(services) {
    for(let service of services) {
      this.registerService(service);
    }
  }

  registerConnection(connName, connObj) {
    return this.connectionManager.register(connName, connObj);
  }

  registerModel(model) {
    return this.modelManager.register(model);
  }

  registerModels(models) {
    for(let model of models) {
      this.registerModel(model)
    }
  }

  service(serviceName) {
    return this.serviceManager.getService(serviceName);
  }

  conn(connId) {
    return this.connectionManager.getConnection(connId);
  }

  model(modelName) {
    return this.modelManager.getModel(modelName);
  }

  logger() {
    return this.appLogger;
  }
}

module.exports = Application;