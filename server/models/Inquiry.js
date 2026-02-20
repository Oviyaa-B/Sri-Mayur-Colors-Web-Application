const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    country: { type: String, required: true },
    fabricType: { type: String, required: true },
    quantity: { type: Number, required: true },
    specifications: { type: String },
    status: { type: String, default: 'Pending' },
    // New AI fields to store categorization insights
    aiAnalysis: {
        priority: { type: String, default: 'Normal' },
        category: { type: String, default: 'Standard Dyeing' },
        sentiment: { type: String, default: 'Neutral' }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inquiry', inquirySchema);