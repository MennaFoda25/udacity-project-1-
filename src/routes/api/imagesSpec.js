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
var express_1 = __importDefault(require("express"));
var file_1 = __importDefault(require("./../../file"));
/**
 * @param {ImageQuery} query
 * @return {null|string}
 */
var validate = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var availableImageNames, width, height;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file_1.default.isImageAvailable(query.filename)];
            case 1:
                if (!!(_a.sent())) return [3 /*break*/, 3];
                return [4 /*yield*/, file_1.default.getAvailableImageNames()];
            case 2:
                availableImageNames = (_a.sent()).join(', ');
                return [2 /*return*/, "Please pass a valid filename in the 'filename' query segment. Available filenames are: ".concat(availableImageNames, ".")];
            case 3:
                if (!query.width && !query.height) {
                    return [2 /*return*/, null];
                }
                width = parseInt(query.width || '');
                if (Number.isNaN(width) || width < 1) {
                    return [2 /*return*/, "Please provide a positive numerical value for the 'width' query segment."];
                }
                height = parseInt(query.height || '');
                if (Number.isNaN(height) || height < 1) {
                    return [2 /*return*/, "Please provide a positive numerical value for the 'height' query segment."];
                }
                return [2 /*return*/, null];
        }
    });
}); };
var images = express_1.default.Router();
images.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var validationMessage, error, path;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, validate(request.query)];
            case 1:
                validationMessage = _a.sent();
                if (validationMessage) {
                    response.send(validationMessage);
                    return [2 /*return*/];
                }
                error = '';
                return [4 /*yield*/, file_1.default.isThumbAvailable(request.query)];
            case 2:
                if (!!(_a.sent())) return [3 /*break*/, 4];
                return [4 /*yield*/, file_1.default.createThumb(request.query)];
            case 3:
                error = _a.sent();
                _a.label = 4;
            case 4:
                if (error) {
                    response.send(error);
                    return [2 /*return*/];
                }
                return [4 /*yield*/, file_1.default.getImagePath(request.query)];
            case 5:
                path = _a.sent();
                if (path) {
                    response.sendFile(path);
                }
                else {
                    response.send('This should not have happened :-D What did you do?');
                }
                return [2 /*return*/];
        }
    });
}); });
exports.default = images;
