"use strict";

const ServiceManager = require("../service_manager.js");
const BaseService = require("../base_service.js");

class ValidService extends BaseService {}

describe("Check that ServiceManager", () => {

  let serviceManager = null;
  beforeEach(() => {
    serviceManager = new ServiceManager();
  });

  describe("can get registered service", () => {

    let serviceManager = null;
    beforeEach(() => {
      serviceManager = new ServiceManager();
    });

    test("that exists", () => {
      let service = serviceManager.register(ValidService, {});
      expect(serviceManager.getService("valid_service")).toEqual(service);
    });

    test("that doesn't exist", () => {
      expect(() => {
        serviceManager.getService("some_service");
      }).toThrow();
    });

  });
});
