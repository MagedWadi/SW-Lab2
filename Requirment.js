/* IMPORTANT NOTES
1. Using JS Naming Conventions (camelCase)
2. Writing clean and readable code
3. Applying best practices learned during the lab (Naming, Comments, Functions)
*/

// Class representing a point in 2D space
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// Class representing a rectangle
class Rectangle {
  constructor(startingPoint, width, height) {
    if (!width || width <= 0 || !height || height <= 0) {
      throw new Error("Invalid width and height"); // Error for invalid dimensions
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  // Calculate and return the area
  getArea() {
    return this.width * this.height;
  }

  // Calculate and return the perimeter
  getPerimeter() {
    return 2 * (this.width + this.height);
  }

  // Update height, ensuring square consistency
  updateHeight(newHeight) {
    if (newHeight > 0) {
      if (this.width === this.height) {
        this.width = newHeight; // Maintain square shape
      }
      this.height = newHeight;
    }
  }

  // Update rectangle properties
  update({ startingPoint, width, height }) {
    if (!width || width <= 0 || !height || height <= 0) {
      throw new Error("Invalid width and height");
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  // Get rectangle height
  getHeight() {
    return this.height;
  }

  // Get rectangle width
  getWidth() {
    return this.width;
  }

  // Print rectangle's endpoints
  printEndpoints() {
    const topRightX = this.startingPoint.x + this.width;
    const bottomLeftY = this.startingPoint.y + this.height;
    console.log(`End Point X-Axis (Top Right): ${topRightX}`);
    console.log(`End Point Y-Axis (Bottom Left): ${bottomLeftY}`);
  }
}

// Function to create a Rectangle object
function createRectangle(width, x, height, y) {
  const startPoint = new Point(x, y);
  return new Rectangle(startPoint, width, height);
}

// Function to create and print details of a square
function createSquare(x, y, size) {
  if (!size || size <= 0) {
    throw new Error("Invalid square size");
  }

  const square = createRectangle(size, x, size, y);
  console.log("Square Area:", square.getArea());
  console.log("Square Perimeter:", square.getPerimeter());

  return square;
}

// Example Usage
const myRectangle = createRectangle(2, 3, 5, 4);
console.log("Rectangle Perimeter:", myRectangle.getPerimeter());

const mySquare = createSquare(0, 0, 4);
mySquare.printEndpoints();

// Updating rectangle height
myRectangle.updateHeight(3);
console.log("Updated Rectangle Height:", myRectangle.getHeight());
