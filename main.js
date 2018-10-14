let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let CANVAS_WIDTH = 500
let CANVAS_HEIGHT = 500

let triangles = []

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Triangle {
    constructor(point1, point2, point3) {
        this.point1 = point1
        this.point2 = point2
        this.point3 = point3
        this.children = []
    }

    draw() {
        context.beginPath()
        context.moveTo(this.point1.x, this.point1.y)
        context.lineTo(this.point2.x, this.point2.y)
        context.lineTo(this.point3.x, this.point3.y)
        context.lineTo(this.point1.x, this.point1.y)
        context.stroke()

        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw()
        }
    }

    generateChildren() {
        if (this.children.length >= 3) return 

        let child1 = new Triangle(this.point1,
                                  new Point((this.point1.x + this.point2.x) / 2, (this.point1.y + this.point2.y) / 2),
                                  new Point((this.point1.x + this.point3.x) / 2, (this.point1.y + this.point3.y) / 2))

        let child2 = new Triangle(new Point((this.point1.x + this.point2.x) / 2, (this.point1.y + this.point2.y) / 2),
                                  this.point2,
                                  new Point((this.point2.x + this.point3.x) / 2, (this.point2.y + this.point3.y) / 2))

        let child3 = new Triangle(new Point((this.point1.x + this.point3.x) / 2, (this.point1.y + this.point3.y) / 2),
                                  new Point((this.point2.x + this.point3.x) / 2, (this.point2.y + this.point3.y) / 2),
                                  this.point3)

        this.children.push(child1)
        this.children.push(child2)
        this.children.push(child3)
    }
}

triangles.push(new Triangle(new Point(CANVAS_WIDTH / 2, 0),
                            new Point(0, CANVAS_HEIGHT),
                            new Point(CANVAS_WIDTH, CANVAS_HEIGHT)))

let draw = function() {
    for (let i = 0; i < triangles.length; i++) {
        triangles[i].draw()
        triangles[i].generateChildren()
    }
    for (let i = 0; i < triangles.length; i++) {
        triangles = triangles.concat(triangles[i].children)
    }
    triangles = Array.from(new Set(triangles))
    console.log(triangles.length)
}
setInterval(draw, 1000);