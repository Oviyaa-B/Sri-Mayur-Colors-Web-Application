const express = require('express');
const router = express.Router();
const { 
    createInquiry, 
    getAllInquiries, 
    updateInquiryStatus, 
    deleteInquiry 
} = require('../controllers/inquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', createInquiry); // Keep public for customers to submit inquiries (or protect if internal only, assuming public as it's an inquiry)
router.get('/', protect, getAllInquiries);
router.put('/:id', protect, admin, updateInquiryStatus);
router.delete('/:id', protect, deleteInquiry);

module.exports = router;