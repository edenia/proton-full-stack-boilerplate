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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = hapi_1.default.server({
        port: config_1.serverConfig.port,
        host: config_1.serverConfig.host,
        routes: {
            cors: { origin: ['*'] }
        },
        debug: { request: ['handler'] }
    });
    (0, routes_1.default)(server);
    yield server.start();
    console.log(`🚀 Server ready at ${server.info.uri}`);
    server.table().forEach(route => console.log(`${route.method}\t${route.path}`));
});
process.on('uncaughtException', (err, origin) => {
    console.log('Uncaught Exception:', err, 'Exception origin:', origin);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection:', promise, 'reason:', reason);
});
init();
