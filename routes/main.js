const router = require('express').Router();
const Main = require('../models/main');
const multer = require('multer');
const XLSX = require('xlsx');

const ExcelJS = require('exceljs');

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

// Delete multiple by bookid
router.delete("/multiple-bookids", (req, res) => {
    const bookIds = req.body.bookIds;

    Main.deleteMany({ _id: { $in: bookIds } })
        .then((data) => {
            if (data.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No book data found for the provided bookIds'
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

// Create multer storage for Excel file upload
const excelStorage = multer.memoryStorage(); // 저장 방식을 메모리로 설정 (파일 시스템에 저장하지 않음)
const excelUpload = multer({ storage: excelStorage });

// Upload Excel file
router.post('/upload-excel', excelUpload.single('excelFile'), (req, res) => {
    try {
        const file = req.files;

        if (!file){
            return res.status(400).json({
                success: false,
                message: 'Excel 파일을 업로드해주세요.' 
            });
        }

        const workbook = XLSX.read(file.buffer, {type: 'buffer'});
        const sheet= workbook.Sheets[workbook.SheetName[0]];        

        const data = XLSX.utils.sheet_to_json(sheet);

        return res.json({ 
            success: true, 
            message: 'Excel 파일 업로드 성공'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false, message: 'Excel 파일 업로드 중 오류 발생'
        });
    }
});

// Downloaded Excel file
router.post('/download-excel', async (req, res) => {
    try {
        const books = req.body.books;

        // Excel 워크북 및 워크시트 생성
        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet('도서 목록');

        // 엑셀 헤더 행 추가
        workSheet.addRow(['책장', '칸', '도서명', '저자', '최종권수', '완결여부', '장르', '업데이트 일자', '비고1', '비고2']);

        books.forEach((book) => {
            workSheet.addRow([
                book.row,
                book.column,
                book.title,
                book.author,
                book.volumes,
                book.completed ? '완결' : '미완결',
                book.genre,
                book.update,
                book.note1,
                book.note2,
            ]);
        });

        // 엑셀파일 생성 후 응답으로 전송
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="daytoon_booklist.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Excel 파일 다운로드 중 오류 발생:', error);
        res.status(500).json({ success: false, error: 'Excel 파일 다운로드 중 오류 발생' });
    }
});

module.exports = router;