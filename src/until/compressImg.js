/**
 * 压缩图片
 * @param {string} src 图片地址
 * @param {number} imgWidth 输出的图片宽度
 * @param {number} imgHeight 输出的图片高度
 */
function compress (src, imgWidth, imgHeight) {
  return new Promise((resolve, reject) => {
    // 加载图片
    let img = new Image()
    img.src = src
    img.onload = function () {
      let width = this.width
      let height = this.height
      let quality = 0.9 // 图片压缩质量，0-1，值越小，图片越模糊

      let scale = width / height
      let imgScale = imgWidth / imgHeight
      if (scale > imgScale) {
        // 图片宽度太大
        width = imgWidth
        height = Math.floor(width / scale)
      } else {
        // 图片高度太大
        height = imgHeight
        width = Math.floor(height * scale)
      }

      try {
        // 生成canvas
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        // 创建属性节点
        let anw = document.createAttribute('width')
        anw.nodeValue = width
        canvas.setAttributeNode(anw)
        let anh = document.createAttribute('height')
        anh.nodeValue = height
        canvas.setAttributeNode(anh)
        context.drawImage(this, 0, 0, width, height)

        canvas.toBlob(blob => {
          let file = blobToFile(blob, 'test.jpg', 'image/jpg')

          resolve(file)
        }, 'image/jpg', quality)
      } catch (error) {
        resolve(null)
      }
    }
  })
}

// Blob转File
function blobToFile (blob, name, type) {
  return new window.File([blob], name, { type })
}

export default compress
