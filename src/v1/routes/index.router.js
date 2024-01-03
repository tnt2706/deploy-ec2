const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    name: 'Tran Tinh',
  });
});

router.get('/checkstatus', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'api ok',
  });
});

router.get('/api/users', (req, res, next) => {
  res.status(200).json({
    status: 'success api',
    message: 'api ok',
    metadata: [
      {
        name: 'tinhtranss',
        age: 40,
      },
      {
        name: 'Ronaldooooo',
        age: 39,
      },
      {
        name: 'Messii',
        age: 37,
      },
    ],
  });
});

module.exports = router;
