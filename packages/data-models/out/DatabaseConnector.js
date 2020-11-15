"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var DatabaseConnector = /** @class */ (function () {
    function DatabaseConnector(config) {
        var _this = this;
        this.dbQuery = function (query, params) { return _this.pool.query(query, params); };
        this.pool = new pg_1.Pool(config);
    }
    return DatabaseConnector;
}());
exports.default = DatabaseConnector;
