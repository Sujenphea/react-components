/* -------------------------------------------------------------------------- */
/*                                   helpers                                  */
/* -------------------------------------------------------------------------- */
const luminance = (r: number, g: number, b: number) => {
  return (r + r + b + g + g) / 6
}

// ref: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/* -------------------------------- constants ------------------------------- */
let logoUrl: string
let logoSizePercentage: number
let logoLeftPaddingPercentage: number
let logoTopPaddingPercentage: number
let logoLightColor: string
let logoDarkColor: string

let textInput: string
let textSizePercentage: number
let textRightPaddingPercentage: number
let textBottomPaddingPercentage: number
let textFont: string
let textLightColor: string
let textDarkColor: string

let textIconURL: string
let textIconWidthPercentage: number
let textIconOffsetXPercentage: number
let textIconOffsetYPercentage: number

let maxImageSize: number

/* -------------------------------------------------------------------------- */
/*                                  handlers                                  */
/* -------------------------------------------------------------------------- */
const calculateLuminance = (imgData: ImageData) => {
  let totalLuminance = 0

  // loop every (r, g, b, a)
  for (let i = 0; i < imgData.data.length; i += 4) {
    totalLuminance += luminance(
      imgData.data[i],
      imgData.data[i + 1],
      imgData.data[i + 2]
    )
  }

  const averageLuminance = totalLuminance / (imgData.data.length / 4)

  return averageLuminance
}

const replaceColor = (imgData: ImageData, color: string) => {
  const colorRgb = hexToRgb(color)

  for (let i = 0; i < imgData.data.length; i += 4) {
    if (imgData.data[i + 3] !== 0) {
      imgData.data[i] = colorRgb!.r
      imgData.data[i + 1] = colorRgb!.g
      imgData.data[i + 2] = colorRgb!.b
    }
  }
}

// ref: https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly
// down step image to reduce anti-aliasing
const shrinkImage = (
  image: HTMLImageElement,
  currentWidth: number,
  currentHeight: number,
  targetWidth: number
) => {
  // purpose of having two canvas
  // - need to copy image from one canvas to another canvas
  // - but need to clear the space to paste onto
  // - cannot be done in one canvas
  let tempCanvas1 = document.createElement('canvas')
  let tempContext1 = tempCanvas1.getContext('2d')
  let tempCanvas2 = document.createElement('canvas')
  let tempContext2 = tempCanvas2.getContext('2d')

  // keep track of the current canvas + context
  // - draw canvas1 onto canvas2 using context2
  // - draw canvas2 onto canvas1 using context1
  let currentContext = tempContext2
  let currentCanvas = tempCanvas1

  // - setup current dimension
  let currentDimension = {
    width: Math.floor(currentWidth),
    height: Math.floor(currentHeight),
  }

  // - setup width
  tempCanvas1.width = currentDimension.width
  tempCanvas1.height = currentDimension.height
  tempCanvas2.width = currentDimension.width
  tempCanvas2.height = currentDimension.height

  /* ------------------------- process logo shrinking ------------------------ */
  // draw first logo
  tempContext1!.drawImage(
    image,
    0,
    0,
    currentDimension.width,
    currentDimension.height
  )

  // shrink logo in half until required
  while (currentDimension.width * 0.5 > targetWidth) {
    // update dimension
    currentDimension = {
      width: Math.floor(currentDimension.width * 0.5),
      height: Math.floor(currentDimension.height * 0.5),
    }

    // copy and paste image in half
    currentContext!.drawImage(
      currentCanvas,
      0,
      0,
      currentDimension.width * 2,
      currentDimension.height * 2,
      0,
      0,
      currentDimension.width,
      currentDimension.height
    )

    // switch context
    currentContext =
      currentContext === tempContext2 ? tempContext1 : tempContext2

    // clear canvas that is copied
    currentContext!.clearRect(
      0,
      0,
      currentDimension.width,
      currentDimension.height
    )

    // switch canvas
    currentCanvas = currentCanvas === tempCanvas1 ? tempCanvas2 : tempCanvas1
  }

  // get the correct context for the canvas with the logo
  currentContext = currentContext === tempContext2 ? tempContext1 : tempContext2

  return { currentCanvas, currentContext, currentDimension }
}

const drawImage = (
  _image: HTMLImageElement,
  context: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  imageOriginX: number,
  imageOriginY: number
) => {
  // apply default white background on image
  context.beginPath()
  context.rect(0, 0, canvasWidth, canvasHeight)
  context.fillStyle = 'white'
  context.fill()

  // apply image
  context.drawImage(
    _image,
    imageOriginX,
    imageOriginY,
    canvasWidth,
    canvasHeight,
    0,
    0,
    canvasWidth,
    canvasHeight
  )
}

const drawBottomRightText = (
  text: string,
  context: CanvasRenderingContext2D,
  paddingRight: number,
  paddingBottom: number
) => {
  // get dimensions of text
  const textMeasurement = context.measureText(text)

  // calculate average brightness
  const imgData = context.getImageData(
    paddingRight - textMeasurement.width,
    paddingBottom - textMeasurement.actualBoundingBoxAscent,
    textMeasurement.width,
    textMeasurement.actualBoundingBoxAscent
  )

  const averageLuminance = calculateLuminance(imgData)

  // calculate text color using brighness
  let textColor = textLightColor
  if (averageLuminance > 140) textColor = textDarkColor

  // apply text in the bottom right corner
  context.fillStyle = textColor
  context.fillText(text, paddingRight, paddingBottom, textMeasurement.width)

  return textColor
}

const drawBottomRightIcon = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  imageId: string,
  text: string,
  textColor: string,
  paddingRight: number,
  paddingBottom: number
) => {
  var lightningSymbol = new Image()

  lightningSymbol.onload = () => {
    const charMeasurement = context.measureText('8')
    const newWidth = charMeasurement.width * textIconWidthPercentage
    const newHeight =
      newWidth * (lightningSymbol.height / lightningSymbol.width) // maintain aspect ratio

    // modify symbol color
    // - create temp canvas
    const lightningCanvas = document.createElement('canvas')
    const lightningContext = lightningCanvas.getContext('2d')
    lightningCanvas.width = newWidth
    lightningCanvas.height = newHeight

    // - draw symbol into temp canvas
    lightningContext?.drawImage(
      lightningSymbol,
      0,
      0,
      lightningSymbol.width,
      lightningSymbol.height,
      0,
      0,
      newWidth,
      newHeight
    )

    // - replace color of logo with new color
    const lightningData = lightningContext!.getImageData(
      0,
      0,
      newWidth,
      newHeight
    )
    replaceColor(lightningData, textColor)
    lightningContext?.putImageData(lightningData, 0, 0)

    // draw symbol into image canvas
    context.drawImage(
      lightningCanvas,
      0,
      0,
      newWidth,
      newHeight,
      paddingRight -
        (text.length + 1 + textIconOffsetXPercentage) * charMeasurement.width,
      paddingBottom -
        charMeasurement.actualBoundingBoxAscent *
          (0.5 - textIconOffsetYPercentage) -
        newHeight * 0.5, // vertically align: centerY - half lightning symbol height
      newWidth,
      newHeight
    )

    // apply changes to image
    const el = document.getElementById(imageId) as HTMLImageElement
    el.src = canvas.toDataURL()
  }

  lightningSymbol.src = textIconURL
}

const drawBottomRightWatermark = (
  text: string,
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  imageId: string
) => {
  const paddingRight = canvas.width * (1 - textRightPaddingPercentage)
  const paddingBottom = canvas.height * (1 - textBottomPaddingPercentage)
  const fontSize = canvas.height * textSizePercentage

  context.textAlign = 'right'
  context.font = `bold ` + fontSize + `px ` + textFont

  const textColor = drawBottomRightText(
    text,
    context,
    paddingRight,
    paddingBottom
  )

  drawBottomRightIcon(
    context,
    canvas,
    imageId,
    text,
    textColor,
    paddingRight,
    paddingBottom
  )
}

const drawTopLeftWatermark = (
  logoURL: string,
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  imageEdgeLength: number,
  imageId: string
) => {
  var logo = new Image()
  logo.onload = () => {
    const newWidth = Math.min(logo.width, imageEdgeLength * logoSizePercentage)
    const newHeight = newWidth * (logo.height / logo.width) // maintain aspect ratio

    /* ------------------------------- shrink logo ------------------------------ */
    const { currentCanvas, currentContext, currentDimension } = shrinkImage(
      logo,
      logo.width,
      logo.height,
      newWidth
    )

    /* ----------------------------- set logo color ----------------------------- */
    // calculate brightness in the top left corner of the image
    const imageData = context!.getImageData(
      imageEdgeLength * logoLeftPaddingPercentage,
      imageEdgeLength * logoTopPaddingPercentage,
      newWidth,
      newHeight
    )
    const logoAverageLuminance = calculateLuminance(imageData)

    // calculate logo color given brightness
    let logoColor = logoLightColor
    if (logoAverageLuminance > 200) logoColor = logoDarkColor

    // replace logo color with new color
    const logoData = currentContext!.getImageData(
      0,
      0,
      currentDimension.width,
      currentDimension.height
    )
    replaceColor(logoData, logoColor)
    currentContext?.putImageData(logoData, 0, 0)

    /* ------------------------------- apply logo ------------------------------- */
    // draw logo onto canvas
    context.drawImage(
      currentCanvas,
      0,
      0,
      currentDimension.width,
      currentDimension.height,
      imageEdgeLength * logoLeftPaddingPercentage,
      imageEdgeLength * logoTopPaddingPercentage,
      newWidth,
      newHeight
    )

    // apply changes to image
    const el = document.getElementById(imageId) as HTMLImageElement
    el.src = canvas.toDataURL()
  }
  logo.src = logoURL
}

/* -------------------------------------------------------------------------- */
/*                                    main                                    */
/* -------------------------------------------------------------------------- */
export default function WatermarkImage(props: {
  imageURL: string
  imageId: string
  logoUrl?: string
  logoSizePercentage?: number
  logoLeftPaddingPercentage?: number
  logoTopPaddingPercentage?: number
  logoLightColor?: string
  logoDarkColor?: string
  textInput?: string
  textSizePercentage?: number
  textRightPaddingPercentage?: number
  textBottomPaddingPercentage?: number
  textFont?: string
  textLightColor?: string
  textDarkColor?: string
  textIconURL?: string
  textIconWidthPercentage?: number
  textIconOffsetXPercentage?: number
  textIconOffsetYPercentage?: number
  maxImageSize?: number
}) {
  /* ---------------------------------- main ---------------------------------- */
  // assumptions:
  // - output image is square
  // - output image background is white if transparent
  // - if input image > maxImageSize:
  // -   the image is cropped at the center
  // - max width of logo = image edge * 0.15
  const imageOnLoad = (_image: HTMLImageElement, imageId: string) => {
    // calculate the smallest edge (maxed at 1024px)
    const imageEdgeLength = Math.min(
      Math.min(_image.width, _image.height),
      maxImageSize
    )

    // top left corner coordinates of cropped image
    const imageOriginX = (_image.width - imageEdgeLength) * 0.5
    const imageOriginY = (_image.height - imageEdgeLength) * 0.5

    // width + height of canvas
    const canvasWidth = imageEdgeLength
    const canvasHeight = imageEdgeLength

    // create canvas to draw the image onto
    const canvas = document.createElement('canvas')
    const context = canvas!.getContext('2d', { willReadFrequently: true })!
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    /* ---------------------------------- image --------------------------------- */
    drawImage(
      _image,
      context,
      canvasWidth,
      canvasHeight,
      imageOriginX,
      imageOriginY
    )

    /* ---------------------- bottom right corner watermark --------------------- */
    drawBottomRightWatermark(textInput, context, canvas, imageId)

    /* ----------------------- top right corner watermark ----------------------- */
    drawTopLeftWatermark(logoUrl, context, canvas, imageEdgeLength, imageId)

    // apply changes to image
    const el = document.getElementById(imageId) as HTMLImageElement
    el.src = canvas.toDataURL()
  }

  // setup variables
  logoSizePercentage = props.logoSizePercentage ?? 0.15
  logoUrl = props.logoUrl ?? './Apple_logo_white.svg.png'
  logoSizePercentage = props.logoSizePercentage ?? 0.15 // relative to image
  logoLeftPaddingPercentage = props.logoLeftPaddingPercentage ?? 0.05
  logoTopPaddingPercentage = props.logoTopPaddingPercentage ?? 0.05
  logoLightColor = props.logoLightColor ?? '#fff'
  logoDarkColor = props.logoDarkColor ?? '#ccc'
  textInput = props.textInput ?? '123'
  textSizePercentage = props.textSizePercentage ?? 0.15 // relative to image
  textRightPaddingPercentage = props.textRightPaddingPercentage ?? 0.1
  textBottomPaddingPercentage = props.textBottomPaddingPercentage ?? 0.1
  textFont = props.textFont ?? 'OxygenMono'
  textLightColor = props.textLightColor ?? '#fff'
  textDarkColor = props.textDarkColor ?? '#444'
  textIconURL = props.textIconURL ?? './pictures/noun-lightning.png'
  textIconWidthPercentage = props.textIconWidthPercentage ?? 1 // relative to font size
  textIconOffsetXPercentage = props.textIconOffsetXPercentage ?? 0.1
  textIconOffsetYPercentage = props.textIconOffsetYPercentage ?? 0
  maxImageSize = props.maxImageSize ?? 1024

  // setup function
  const img = new Image()
  img.onload = () => {
    imageOnLoad(img, props.imageId)
  }
  img.src = props.imageURL

  return img
}
