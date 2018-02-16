"use strict";

class BaseService {
  constructor(application) {
    this.application = application;
  }

  name() {
    throw Error("Incomplete service implementation");
  }

  // helper functions
  logger() {
    if (this.application === null) {
      throw new Error("Application container must be attached to service");
    }
    return this.application.logger;
  }

  debug(message, ...additional) {
    this.logger().debug(message, ...additional);
  }

  info(message, ...additional) {
    this.logger().info(message, ...additional);
  }

  error(message, ...additional) {
    this.logger().error(message, ...additional);
  }

  service(serviceName) {
    if (this.application === null) {
      throw new Error("Application container must be attached to service");
    }
    return this.application.service(serviceName);
  }

  conn(connName) {
    if (this.application === null) {
      throw new Error("Application container must be attached to service");
    }
    return this.application.conn(connName);
  }
}

module.exports = BaseService;