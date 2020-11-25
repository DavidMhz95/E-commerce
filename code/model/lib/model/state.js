"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State;
(function (State) {
    State[State["PROCESSING"] = 0] = "PROCESSING";
    State[State["SHIPPED"] = 1] = "SHIPPED";
    State[State["INTRANSIT"] = 2] = "INTRANSIT";
    State[State["DELIVERED"] = 3] = "DELIVERED";
})(State = exports.State || (exports.State = {}));
