"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imagesSpec_1 = __importDefault(require("./api/imagesSpec"));
var routes = express_1.default.Router();
routes.use('/api/images', imagesSpec_1.default);
routes.get('/', function (request, response) {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send('<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/api/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li><li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li></ul></p>');
});
exports.default = routes;
