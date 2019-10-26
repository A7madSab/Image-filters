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

// Mean("Filters.png", meanFilter)                  // calling with mean filter
// Gaussian("Filters.png", sigma)                   // calling Gaussian with Sigma
// Laplacian("Filters.png", laplacianFilter)           // calling Laplacian with Sigma
