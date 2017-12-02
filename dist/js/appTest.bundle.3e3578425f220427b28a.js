webpackJsonp([ 2 ], {
    "332": function(t, e, n) {
        "use strict";
        var o = n(90), u = function(t) {
            return t && t.__esModule ? t : {
                "default": t
            };
        }(o);
        console.log("this is test");
        var c = [ "a", "b", "c" ];
        (0, u.default)(c);
    },
    "90": function(t, e, n) {
        "use strict";
        function o(t) {
            t.map(function(t) {
                return console.log(t + 1), t + 1;
            });
        }
        Object.defineProperty(e, "__esModule", {
            "value": !0
        }), e.default = void 0, n(91), n(92), e.default = o;
    },
    "91": function(t, e) {},
    "92": function(t, e) {}
}, [ 332 ]);