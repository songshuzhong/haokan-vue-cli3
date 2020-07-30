self.importScripts('./spark-md5.min.js')

self.onmessage = e => {
    const {chunkFiles} = e.data
    const spark = new self.SparkMD5.ArrayBuffer()
    let count = 0
    let percentAge = 0
    let mdHash

    const next = index => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(chunkFiles[index].chunk)
        reader.onload = e => {
            count++
            spark.append(e.target.result)
            if (count === chunkFiles.length) {
                mdHash = spark.end()
                self.postMessage({
                    percentAge: 100,
                    mdHash
                })
                self.close()
            } else {
                percentAge = Math.round(count / chunkFiles.length * 100)
                self.postMessage({
                    percentAge
                })
                next(count)
            }
        }
    }
    next(count)
}
