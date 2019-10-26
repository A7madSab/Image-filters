const jimp = require("jimp")

/* Mean filter */
Mean = (image, n, m) => {
    console.log("mean filter")
    /* Mean filter*/ // Mean filter with the desired rows & column. Fill all filter values by: 1 / (rows×column).
    const meanFilterColumnSize = n
    const meanFilterRowSize = m
    // creating the filter with the size above
    const meanFilter = new Array(meanFilterRowSize)
    for (let i = 0; i < meanFilterRowSize; i++) {
        meanFilter[i] = new Array(meanFilterColumnSize);
        for (let j = 0; j < meanFilterColumnSize; j++) {
            meanFilter[i][j] = 1 / (meanFilterColumnSize * meanFilterColumnSize)
        }
    }
    jimp.read(image, (err, image) => {
        if (err) throw err;
        image
            .convolute(meanFilter)
            .write("Result/Mean.png")
    })
}
/* Laplacian filter */
Laplacian = (image, laplacianFilter) => {
    console.log("Laplacian")
    jimp
        .read(image)
        .then(image => image.convolute(laplacianFilter))
        .then(image => image.write("Result/Laplacian.png"))
}
/* Gaussian filter */ // Very hard to create the mask using the formula programmatically so I using a build in function.
Gaussian = async (i, sigma) => {
    console.log("Gaussian")
    const image = await jimp.read(i);
    image
        .gaussian(sigma)
        .write('Result/Gaussian.png');
}
/* EdgeMagnit filter */
EdgeMagnit = async (link, VerticalSobelFilter, HorizontalSobelFilter) => {
    console.log("EdgeMagnit, sobel vertial, sobel horizontal")

    const vertical = await jimp
        .read(link)
        .then(image => image.convolute(VerticalSobelFilter))
    const horizontal = await jimp
        .read(link)
        .then(image => image.convolute(HorizontalSobelFilter))

    vertical.write("Result/VerticalSobel.png")
    horizontal.write("Result/HorizontalSobel.png")

    const { width, height } = vertical.bitmap
    const newImage = new jimp(width, height)

    let color
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            color = horizontal.getPixelColor(x, y) > vertical.getPixelColor(x, y) ? horizontal.getPixelColor(x, y) : vertical.getPixelColor(x, y)
            newImage.setPixelColor(color, x, y)
        }
    }
    newImage.write("Result/Sobel.png")
}
/* SobelHorizEdge */
SobelHorizEdge = (i, HorizontalSobelFilter) => {
    console.log("Horizontal Sobel Edge")
    jimp
        .read(i)
        .then(image => image.convolute(HorizontalSobelFilter))
        .then(image => image.write("Result/SobelHorizEdge.png"))
}
/* SobelVertEdge */
SobelVertEdge = (i, VerticalSobelFilter) => {
    console.log("Vertial Sobel Edge")
    jimp
        .read(i)
        .then(image => image.convolute(VerticalSobelFilter))
        .then(image => image.write("Result/SobelVertEdge.png"))
}

/**** THE RUN ****/
Mean("Filters.png", 15, 15)              // calling with mean filter
Gaussian("Filters.png", 2)               // calling Gaussian with Sigma
const laplacianFilter = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
]
Laplacian("Filters.png", laplacianFilter)  // calling Laplacian with Sigma
const HorizontalSobelFilter = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
]
SobelHorizEdge("Filters.png", HorizontalSobelFilter)    // calling SobelHorizEdge
const VerticalSobelFilter = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
]
SobelVertEdge("Filters.png", VerticalSobelFilter)   // calling SobelVertEdge
EdgeMagnit("Filters.png", VerticalSobelFilter, HorizontalSobelFilter) // calling EdgeMagnit


// Linear didn't work
// const laplacianFilter = [
//     [0, -1, 0],
//     [-1, 5, -1],
//     [0, -1, 0],
// ]
// const HorizontalSobelFilter = [
//     [-1, -2, -1],
//     [0, 0, 0],
//     [1, 2, 1],
// ]
// const VerticalSobelFilter = [
//     [-1, 0, 1],
//     [-2, 0, 2],
//     [-1, 0, 1],
// ]
// LinearFilter = async (i, filter, filter2) => {
//     Mean(i, filter, filter2)          // calling with mean filter
//     Gaussian(i, filter.length)          // calling Gaussian with Sigma
//     Laplacian(i, filter)             // calling Laplacian with Sigma
//     EdgeMagnit(i, VerticalSobelFilter, HorizontalSobelFilter)            // calling EdgeMagnit
// }