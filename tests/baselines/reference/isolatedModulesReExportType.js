//// [tests/cases/compiler/isolatedModulesReExportType.ts] ////

//// [exportT.ts]
export type T = number;

//// [exportValue.ts]
export class C {}

//// [exportEqualsT.ts]
declare type T = number;
export = T;

//// [bar.d.ts]
export type T = number;

//// [index.d.ts]
export { T } from "./bar"; // In a declaration file, so not an error.

//// [index.d.ts]
declare module "baz" {
    export { T } from "foo"; // Also allowed.
}

//// [user.ts]
// Error, can't re-export something that's only a type.
export { T } from "./exportT";
export import T2 = require("./exportEqualsT");

// OK, has a value side
export { C } from "./exportValue";

// OK, even though the namespace it exports is only types.
import * as NS from "./exportT";
export { NS };

// OK, syntactically clear that a type is being re-exported.
export type T3 = T;

// Error, not clear (to an isolated module) whether `T4` is a type.
import { T } from "./exportT";
export { T as T4 };


//// [exportT.js]
"use strict";
exports.__esModule = true;
//// [exportEqualsT.js]
"use strict";
exports.__esModule = true;
//// [exportValue.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [user.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
// OK, has a value side
var exportValue_1 = require("./exportValue");
__createBinding(exports, exportValue_1, "C");
// OK, even though the namespace it exports is only types.
var NS = require("./exportT");
exports.NS = NS;
