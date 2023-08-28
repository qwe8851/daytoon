const router = require('express').Router();
const Member = require('../models/member');

router.post('/signin', (req, res) => {
    const { id, password } = req.body;

    Member.findOne({ id }) // id로 회원 정보 조회
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    success: false,
                    error: '존재하지 않는 아이디입니다.',
                });
            }

            if (member.password === password) {
                res.status(200).json({
                    success: true,
                    message: '아이디와 비밀번호가 일치합니다.',
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: '비밀번호가 일치하지 않습니다.',
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        });
});

// 회원가입
router.post('/signup', async (req, res) => {
    const { id, password } = req.body; 

    try {
        // 이미 사용 중인 아이디인지 확인
        const existingMember = await Member.findOne({ id });
        if (existingMember) {
            return res.status(400).json({
                success: false,
                error: '이미 사용 중인 아이디입니다.',
            });
        }

        // 새로운 Member 인스턴스 생성
        const member = new Member({
            id: id,
            password: password,
        });

        const savedMember = await member.save();
        res.status(200).json({
            success: true,
            message: '회원가입이 성공적으로 완료되었습니다.',
            member: savedMember,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

module.exports = router;