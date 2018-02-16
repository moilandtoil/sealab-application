"use strict";

const BaseService = require("../base_service.js");
const ServiceManager = require("../service_manager.js");
const ConnectionManager = require("../connection_manager.js");
const DefaultLogger = require("../default_logger.js");
const Application = require("../application.js");

class TestService extends BaseService {
  name() {
    return "test_service";
  }
}


class OtherService extends BaseService {
  name() {
    return "other_service";
  }

  foo() {
    return "bar"
  }
}

describe("An application", () => {

  let connectionManager = null;
  let serviceManager = null;
  let application = null;
  beforeEach(() => {
    connectionManager = new ConnectionManager();
    serviceManager = new ServiceManager();
    application = new Application(serviceManager, connectionManager, true);
  });

  describe("with service manager", () => {

    test("can get registered service", () => {
      let service = application.registerService(TestService);
      expect(application.service(service.name())).toEqual(service);
    });

    test("throw error getting unregistered service", () => {
      expect(() => {
        application.service("derp");
      }).toThrow();
    });
  });

  describe("with connection manager", () => {

    test("can get registered connection", () => {
      let connection = application.registerConnection("foo", "bar");
      expect(application.conn("foo")).toEqual("bar");
    });

    test("throw error getting unregistered connection", () => {
      expect(() => {
        connectionManager.register("foo", "bar");
        connectionManager.register("foo", "derp");
      }).toThrow();
    });
  });

  describe("with logger", () => {

    test("#logger()", () => {
      expect(application.logger()).toEqual(true);
    });
  });

  describe("with a registered service", () => {

    test("can get other service", () => {
      let test = application.registerService(TestService);
      let other = application.registerService(OtherService);
      expect(test.service(other.name())).toBeDefined();
    });

    test("can get other service and run foo", () => {
        let test = application.registerService(TestService);
        application.registerService(OtherService);
        let other = test.service("other_service");
        expect(other.foo()).toEqual("bar");
    });

    test("throw error getting non existent other service", () => {
      expect(() => {
        let test = application.registerService(TestService);
        let other = test.service("derp");
      }).toThrow();
    });
  });
});