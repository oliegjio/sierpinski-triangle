const WIDTH = 600
const HEIGHT = 600

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  add(other) {
    return new Point(this.x + other.x, this.y + other.y)
  }
  scalarMultiply(number) {
    return new Point(this.x * number, this.y * number)
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
    line(this.point1.x, this.point1.y, this.point2.x, this.point2.y)
    line(this.point2.x, this.point2.y, this.point3.x, this.point3.y)
    line(this.point3.x, this.point3.y, this.point1.x, this.point1.y)
    this.children.forEach((c) => c.draw())
  }
  makeChildren() {
    if (this.children.length >= 3) return

    let child1 = new Triangle(
      this.point1,
      this.point1.add(this.point2).scalarMultiply(0.5),
      this.point1.add(this.point3).scalarMultiply(0.5))

    let child2 = new Triangle(
      this.point1.add(this.point2).scalarMultiply(0.5),
      this.point2,
      this.point2.add(this.point3).scalarMultiply(0.5))

    let child3 = new Triangle(
      this.point1.add(this.point3).scalarMultiply(0.5),
      this.point2.add(this.point3).scalarMultiply(0.5),
      this.point3)

    this.children.push(child1)
    this.children.push(child2)
    this.children.push(child3)
  }
}

let triangles = new Set
let offset = 10
triangles.add(
  new Triangle(
    new Point(WIDTH / 2 - offset, offset),
    new Point(offset, HEIGHT - offset),
    new Point(WIDTH - offset, HEIGHT - offset)))

function setup() {
  createCanvas(WIDTH, HEIGHT)
  frameRate(1);
}

function draw() {
  triangles.forEach((triangle) => {
    triangle.draw()
    triangle.makeChildren()
  })
  triangles.forEach((triangle) => {
    triangle.children.forEach((child) => {
      triangles.add(child)
    })
  })
}
