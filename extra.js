const jimp = require("jimp")

/* Mean Filter */

// Mean filter with the desired rows & column.
// Fill all filter values by: 1 / (rows×column).
// (no postprocessing) 
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
/*
 * const N = Number(3.7 * sigma - 0.5)
 * const MaskSize = 2 * (N + 1)
 * // creating the Gaussian Filter
 * const gaussianFilter = new Array(MaskSize)
 * for (let i = 0; i < MaskSize; i++) {
 *     gaussianFilter[i] = new Array(MaskSize)
 * }
 * // Filling the Gaussian Filter
 * for (let i = 0; i < MaskSize; i++) {
 *     for (let j = 0; j < MaskSize; j++) {
 *         gaussianFilter[i][j] = 
 *     }
 * }
*/



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
        .then(image => image.write("lap.png"))
}
// Laplacian = (image) => {
//     /*
//      *  using filter = [
//      *      [0,-1,0],
//      *      [-1,5,-1],
//      *      [0,-1,0],
//      *  ] 
//      * 
//      */
//     jimp
//         .read(image)
//         .then(image => {
//             const { width, height } = image.bitmap
//             for (let x = 1; x < width - 1; x++) {
//                 for (let y = 1; y < height - 1; y++) {
//                     // cross
//                     const topMiddle = image.getPixelColor(x, y - 1) * -1
//                     const leftMiddle = image.getPixelColor(x - 1, y) * -1
//                     const bottomMiddle = image.getPixelColor(x, y + 1) * -1
//                     const rightMiddle = image.getPixelColor(x + 1, y) * -1

//                     const center = image.getPixelColor(x, y) * 9

//                     let resultingColor = Math.abs(center + topMiddle + leftMiddle + bottomMiddle + rightMiddle)//+ topLeft + topRight + bottomRight + bottomLeft)

//                     // Post Processing
//                     if (resultingColor > 4294967295) resultingColor = 4294967295
//                     else if (resultingColor < 0) resultingColor = 0

//                     // console.log("x:", x, "y:", y, "topMiddle: ", topMiddle, "leftMiddle: ", leftMiddle, "bottomMiddle: ", bottomMiddle, "rightMiddle: ", rightMiddle, "center: ", center, "resultingColor: ", resultingColor)
//                     image.setPixelColor(resultingColor, x, y)
//                 }
//             }
//             console.log("width:", width, "height:", height)
//             return image
//         })
//         .then(image => image.write("Result.png"))
// }
/* LinearFilter */

LinearFilter = (image, filter, postProcessing) => {
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

// LinearFilter("Filters.png", meanFilter)          // calling with mean filter
// Gaussian("Filters.png", sigma)                   // calling Gaussian with Sigma
Laplacian("Filters.png", laplacianFilter)           // calling Laplacian with Sigma
