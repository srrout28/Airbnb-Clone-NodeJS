const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/property-img")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+'-'+file.originalname)
  }
})

const uploadFile = multer({ storage: storage });

// Above code to upload file to given stotage path...

module.exports = uploadFile;