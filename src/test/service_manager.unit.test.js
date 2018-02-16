"use strict";

const ServiceManager = require("../service_manager.js");
const BaseService = require("../base_service.js");

class ValidService extends BaseService {
  name() {
    return "valid_service";
  }
}

class BadName extends BaseService {
  name() {
    return "@bad"
  }
}

class NoName extends BaseService {}

describe("Check that ServiceManager", () => {

  let serviceManager = null;
  beforeEach(() => {
    serviceManager = new ServiceManager();
  });

  describe("can register services with names that are", () => {
    test("valid", () => {
      let service = serviceManager.register(ValidService, {});
      expect(service.name()).toEqual("valid_service");
    });

    test("invalid", () => {
      expect(() => {
        serviceManager.register(BadName, {});
      }).toThrow();
    });

    test("not overridden", () => {
      expect(() => {
        serviceManager.register(NoName, {});
      }).toThrow();
    });
  });

  describe("can get registered service", () => {

    let serviceManager = null;
    beforeEach(() => {
      serviceManager = new ServiceManager();
    });

    test("that exists", () => {
      let service = serviceManager.register(ValidService, {});
      expect(serviceManager.getService(service.name())).toEqual(service);
    });

    test("that doesn't exist", () => {
      expect(() => {
        serviceManager.getService("some_service");
      }).toThrow();
    });

  });
});
