const Inquiry = require('../models/Inquiry');

// POST: Create Inquiry with AI Logic
exports.createInquiry = async (req, res) => {
    try {
        const { specifications } = req.body;
        const specs = specifications ? specifications.toLowerCase() : "";
        
        let priority = 'Normal';
        let category = 'Standard Dyeing';
        let sentiment = 'Neutral';

        // 1. Sentiment & Tone Detection Logic
        const positiveWords = ['love', 'interested', 'great', 'quality', 'looking forward', 'impressed'];
        const frustratedWords = ['disappointed', 'delay', 'slow', 'issue', 'problem', 'urgent', 'asap'];

        if (frustratedWords.some(word => specs.includes(word))) {
            sentiment = 'Frustrated/Urgent';
            priority = 'High'; // Auto-escalate if frustrated
        } else if (positiveWords.some(word => specs.includes(word))) {
            sentiment = 'Highly Interested';
        }

        // 2. Technical Categorization
        if (specs.includes('gots') || specs.includes('organic') || specs.includes('technical')) {
            category = 'Technical Textile';
        }

        const inquiry = await Inquiry.create({
            ...req.body,
            aiAnalysis: { priority, category, sentiment }
        });

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// GET: Fetch all inquiries for Dashboard
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT: Update Inquiry Status
exports.updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedInquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
        res.status(200).json({ success: true, data: updatedInquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// DELETE: Remove an Inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        await Inquiry.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Inquiry deleted" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};