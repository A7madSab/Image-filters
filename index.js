const jimp = require("jimp")

/* Mean Filter */

// Mean filter with the desired rows & column. Fill all filter values by: 1 / (rows×column).
const meanFilterColumnSize = 15
const meanFilterRowSize = 15
// creating the filter with the size above
const meanFilter = new Array(meanFilterRowSize)
for (let i = 0; i < meanFilterRowSize; i++) {
    meanFilter[i] = new Array(meanFilterColumnSize);
    for (let j = 0; j < meanFilterColumnSize; j++) {
        meanFilter[i][j] = 1 / (meanFilterColumnSize * meanFilterColumnSize)
    }
}


/* Gaussian Filter */
// Very hard to create the mask using the formula programmatically so I using a build in function.
const sigma = 16


/* Laplacian filter */
const laplacianFilter = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
]
Laplacian = (image) => {
    jimp
        .read(image)
        .then(image => image.convolute(laplacianFilter))
        .then(image => image.write("Result.png"))
}

/* Mean */
Mean = (image, filter, postProcessing) => {
    jimp.read(image, (err, image) => {
        if (err) throw err;
        image
            .convolute(filter)
            .write("Result.png")
    })
}

Gaussian = async (i, sigma) => {
    const image = await jimp.read(i);
    image
        .gaussian(sigma)
        .write('Result.png');
}

/* Sobel  filter */
Sobel = async (link) => {
    const HorizontalSobelFilter = [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1],
    ]
    const VerticalSobelFilter = [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
    ]
    const vertical = await jimp
        .read(link)
        .then(image => image.convolute(VerticalSobelFilter))
    const horizontal = await jimp
        .read(link)
        .then(image => image.convolute(HorizontalSobelFilter))

    vertical.write("VerticalSobel.png")
    horizontal.write("HorizontalSobel.png")

    const { width, height } = vertical.bitmap
    const newImage = new jimp(width, height)

    let color
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            color = horizontal.getPixelColor(x, y) > vertical.getPixelColor(x, y) ? horizontal.getPixelColor(x, y) : vertical.getPixelColor(x, y)
            newImage.setPixelColor(color, x, y)
        }
    }
    newImage.write("Sobel.png")
}

// Mean("Filters.png", meanFilter)                  // calling with mean filter
// Gaussian("Filters.png", sigma)                   // calling Gaussian with Sigma
// Laplacian("Filters.png", laplacianFilter)        // calling Laplacian with Sigma
// Sobel("Filters.png")                             // calling Sobel