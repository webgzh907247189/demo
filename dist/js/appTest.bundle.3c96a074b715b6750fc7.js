webpackJsonp([ 2 ], {
    "330": function(e, t, n) {
        "use strict";
        var o = n(90), u = function(e) {
            return e && e.__esModule ? e : {
                "default": e
            };
        }(o);
        console.log("this is test");
        var c = [ "a", "b", "c" ];
        (0, u.default)(c);
    },
    "90": function(e, t, n) {
        "use strict";
        function o(e) {
            e.map(function(e) {
                return console.log(e + 1), e + 1;
            });
        }
        Object.defineProperty(t, "__esModule", {
            "value": !0
        }), t.default = o;
    }
}, [ 330 ]);