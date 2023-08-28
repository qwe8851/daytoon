const router = require('express').Router();
const Member = require('../models/member');

router.get('/memberid/:memberid', (req, res) => {
    const { id, pw } = req.body;

    Member.findById(memberid)
        .then((member) => {
            if (!member) {
                return res.status(404).json({
                    success: false,
                    error: '존재하지 않는 아이디입니다.',
                });
            }

            if(member.pw === pw) {
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
router.post('/', (req, res) => {
    const { id, pw } = req.body; 

    // 새로운 Member 인스턴스 생성
    const member = new Member({
        id: id,
        pw: pw,
    });

    member.save()
        .then((savedMember) => {
            res.status(200).json({
                success: true,
                message: '회원가입이 성공적으로 완료되었습니다.',
                member: savedMember,
            });
        }).then((savedMember) => {
            res.status(200).json({
                success: true,
                message: '회원가입이 성공적으로 완료되었습니다.',
                member: savedMember, 
            });
        })
});

module.exports = router;