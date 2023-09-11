const express = require('express')
const app = express()
const path = require('path');
const bodyparser = require('body-parser');
const { body, validationResult } = require('express-validator');
const xss = require('xss');
const axios = require('axios')
const users = require('../data/db.json')
const jwt = require('jsonwebtoken')
const secret = 'YassirHakimi'
const cookies = require('cookie-parser')
const multer = require('multer')
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 7500;












app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });