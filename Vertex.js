var Vertex = /** @class */ (function () {
    function Vertex(x, y) {
        this.posX = x;
        this.posY = y;
    }
    Vertex.prototype.setX = function (n) {
        this.posX = n;
    };
    Vertex.prototype.setY = function (n) {
        this.posY = n;
    };
    return Vertex;
}());
