"use strict";

const ConnectionManager = require("../connection_manager.js");

describe("Check that ConnectionManager", () => {

  let connectionManager = null;
  beforeEach(() => {
    connectionManager = new ConnectionManager();
  });

  describe("when registering a connection", () => {
    test("that hasn't been", () => {
      let connection = connectionManager.register("foo", "bar");
      expect(connection).toEqual("bar");
    });

    test("that has already been", () => {
      expect(() => {
        connectionManager.register("foo", "bar");
        connectionManager.register("foo", "derp");
      }).toThrow();
    });
  });

  describe("can get registered connection", () => {

    let connectionManager = null;
    beforeEach(() => {
      connectionManager = new ConnectionManager();
    });

    test("that exists", () => {
      connectionManager.register("foo", "bar");
      expect(connectionManager.getConnection("foo")).toEqual("bar");
    });
  });
});
