"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var DatabaseConnector = /** @class */ (function (_super) {
    __extends(DatabaseConnector, _super);
    function DatabaseConnector(config) {
        var _this = _super.call(this, config) || this;
        _this.dbQuery = function (query, params) { return _this.query(query, params); };
        return _this;
    }
    return DatabaseConnector;
}(pg_1.Pool));
exports.default = DatabaseConnector;
