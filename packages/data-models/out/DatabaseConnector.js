"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Server_1 = __importDefault(require("./models/Server"));
var User_1 = __importDefault(require("./models/User"));
var DatabaseConnector = /** @class */ (function () {
    function DatabaseConnector(config) {
        var _this = this;
        this.dbQuery = function (query, params) { return _this.pool.query(query, params); };
        this.Server = new Server_1.default(this.dbQuery);
        this.User = new User_1.default(this.dbQuery);
        this.pool = new pg_1.Pool(config);
    }
    return DatabaseConnector;
}());
exports.default = DatabaseConnector;
