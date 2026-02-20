const express = require('express');
const router = express.Router();
const { 
    createInquiry, 
    getAllInquiries, 
    updateInquiryStatus, 
    deleteInquiry 
} = require('../controllers/inquiryController');

router.post('/', createInquiry);
router.get('/', getAllInquiries);
router.put('/:id', updateInquiryStatus);
router.delete('/:id', deleteInquiry); // Added Delete Route

module.exports = router;