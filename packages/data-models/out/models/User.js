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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = __importDefault(require("./Server"));
var UserModel = /** @class */ (function () {
    function UserModel(dbQuery) {
        var _this = this;
        this.create = function (userInfo, servers, refreshToken) { return __awaiter(_this, void 0, void 0, function () {
            var serverModel_1, existingServers, dbResUser, userId_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userInfo.username) {
                            throw new Error('NoUsername');
                        }
                        if (!userInfo.discriminator) {
                            throw Error('NoUserDiscriminator');
                        }
                        if (!refreshToken) {
                            throw Error('NoRefreshToken');
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        serverModel_1 = new Server_1.default(this.query);
                        return [4 /*yield*/, Promise.all(servers.map(function (s) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, serverModel_1.getServer(s.id)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 2:
                        existingServers = _a.sent();
                        if (existingServers.length === 0) {
                            throw Error('NoServersFoundForUser');
                        }
                        return [4 /*yield*/, this.query("\n      INSERT INTO users(discord_id, discord_name, discord_discriminator, discord_refresh)\n      VALUES ($1, $2, $3, $4) RETURNING id;\n      ", [userInfo.id, userInfo.username, userInfo.discriminator, refreshToken])];
                    case 3:
                        dbResUser = _a.sent();
                        userId_1 = dbResUser.rows[0].id;
                        return [4 /*yield*/, Promise.all(existingServers.map(function (s) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.query("INSERT INTO user_servers(user_id, server_id) VALUES($1, $2)", [userId_1, s.id])];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); }))];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, userId_1];
                    case 5:
                        err_1 = _a.sent();
                        throw new Error(err_1);
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.addRoles = function (userId, roleId) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query("INSERT INTO user_roles(user_id, role_id) VALUES($1, $2)", [userId, roleId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        }); };
        this.getUser = function (userId, serverId) { return __awaiter(_this, void 0, void 0, function () {
            var dbResUser, fRow, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query("\n      SELECT u.id AS id,\n        u.discord_id AS discord_id,\n        u.discord_name AS discord_name,\n        u.discord_discriminator AS discriminator,\n        u.discord_refresh AS refresh,\n        u.created_on AS created_on\n        sr.server_id AS server_id,\n        sr.discord_role_id AS role_id\n      FROM users AS u\n      JOIN user_servers AS us ON us.user_id = u.id\n      JOIN server_roles AS sr ON sr.id = us.server_id\n      JOIN user_roles AS ur ON ur.user_id = u.id AND ur.role_id = sr.id\n      WHERE " + (typeof userId === 'string' ? 'u.discord_id' : 'u.id') + " = $1\n        AND sr.server_id = $2\n    ", [userId, serverId])];
                    case 1:
                        dbResUser = _a.sent();
                        fRow = dbResUser.rows[0];
                        user = {
                            id: fRow.id,
                            discordId: fRow.discord_id,
                            discordName: fRow.discord_name + "#" + fRow.discriminator,
                            discordRefresh: fRow.refresh,
                            createdOn: fRow.created_on,
                            serverAccess: dbResUser.rows.map(function (r) { return ({
                                serverId: r.server_id,
                                roleId: r.role_id,
                            }); }),
                        };
                        return [2 /*return*/, user];
                }
            });
        }); };
        this.query = dbQuery;
    }
    return UserModel;
}());
exports.default = UserModel;
