const router = require('express').Router()
const apiCtrl = require('../controllers/apiCtrl')

router.get('/users', apiCtrl.getUsers)
router.get('/user', apiCtrl.getUser)

router.get('/conversations/:userId', apiCtrl.getConversations)
router.get('/messages/:conversationId', apiCtrl.getMessages)

router.post('/conversations', apiCtrl.postConversations)
router.post('/messages', apiCtrl.postMessages)


module.exports = router