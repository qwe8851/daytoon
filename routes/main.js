const router = require('express').Router();
const Main = require('../models/main');

// Find all main content
router.get('/', (req, res) => {
    Main.findAll()
        .then((main) => {
            res.status(200).json({
                success: true,
                data: main,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        });
});

// Find One by bookid
router.get('/bookid/:bookid', (req, res) => {
    const bookid = req.params.bookid;

    Main.findById(bookid)
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: 'Book data not found',
                });
            }

            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        });
});

// Create new Book data
router.post('/', (req, res) => {
    const main = new Main(req.body);

    main.save()
        .then((data) => {
            res.status(200).json({
                success: true,
                data: data,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                error: error.message
            });
        });
});

// Update by bookid
router.put('/bookid/:bookid', (req, res) => {
    const bookId = req.params.bookid;
    const updateData = req.body;

    Main.findByIdAndUpdate(bookId, updateData, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: 'Book data not found'
                });
            }

            res.status(200).json({
                success: true,
                data: data
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                error: error.message
            });
        });
});

// Delete by bookid
router.delete("/bookid/:bookid", (req, res) => {
    const bookId = req.params.bookid;

    Main.findByIdAndRemove(bookId)
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    success: false,
                    error: 'Book data not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Book data deleted successfully!'
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                error: error.message
            });
        });
});

module.exports = router;