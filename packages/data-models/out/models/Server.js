"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerModel = /** @class */ (function () {
    function ServerModel(dbQuery) {
        var _this = this;
        this.create = function (discordId, discordName) { return __awaiter(_this, void 0, void 0, function () {
            var dbResServer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query("\n      INSERT INTO servers(discord_id, discord_name)\n      VALUES ($1, $2) RETURNING id;\n    ", [discordId, discordName])];
                    case 1:
                        dbResServer = _a.sent();
                        return [2 /*return*/, dbResServer.rows[0].id];
                }
            });
        }); };
        this.createRole = function (serverId, roleId) { return __awaiter(_this, void 0, void 0, function () {
            var dbResRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query("INSERT INTO server_roles(server_id, discord_role_id) VALUES($1, $2) RETURNING id", [serverId, roleId])];
                    case 1:
                        dbResRole = _a.sent();
                        return [2 /*return*/, dbResRole.rows[0].id];
                }
            });
        }); };
        this.getServer = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var queryString, dbResServer, fRow, server, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queryString = "\n      SELECT\n        s.id AS id,\n        s.discord_id AS discord_id,\n        s.discord_name AS discord_name,\n        s.subdomain AS subdomain,\n        s.created_on AS created_on,\n        sr.id AS role_id,\n        sr.discord_role_id AS discord_role_id,\n        sr.last_updated AS role_last_updated\n      FROM servers AS s\n      LEFT JOIN server_roles AS sr ON sr.server_id = s.id\n      WHERE " + (typeof id === 'number' ? 's.id' : 's.discord_id') + " = $1\n    ";
                        return [4 /*yield*/, this.query(queryString, [id])];
                    case 1:
                        dbResServer = _a.sent();
                        if (dbResServer.rowCount === 0) {
                            throw new Error('NoServerFound');
                        }
                        fRow = dbResServer.rows[0];
                        server = {
                            id: fRow.id,
                            discordId: fRow.discord_id,
                            discordName: fRow.discord_name,
                            subdomain: fRow.subdomain,
                            createdOn: fRow.created_on,
                            roles: dbResServer.rows.map(function (r) { return ({
                                id: r.role_id,
                                discordRoleId: r.discord_role_id,
                                lastUpdated: r.role_last_updated,
                            }); }),
                        };
                        return [2 /*return*/, server];
                    case 2:
                        err_1 = _a.sent();
                        // TODO add logging here
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getServerIdBySubdomain = function (subDomain) { return __awaiter(_this, void 0, void 0, function () {
            var dbResServer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query("SELECT id FROM servers WHERE subdomain = $1", [subDomain])];
                    case 1:
                        dbResServer = _a.sent();
                        if (dbResServer.rowCount === 0) {
                            throw new Error('NoServerFound');
                        }
                        return [2 /*return*/, dbResServer.rows[0].id];
                }
            });
        }); };
        this.query = dbQuery;
    }
    return ServerModel;
}());
exports.default = ServerModel;
