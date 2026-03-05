const Inquiry = require('../models/Inquiry');

// --- OPTIMIZED AI LOOKUP TABLES (O(1) Set-based lookups) ---
const POSITIVE_WORDS = new Set(['love', 'interested', 'great', 'quality', 'looking forward', 'impressed', 'amazing', 'excellent', 'fantastic']);
const FRUSTRATED_WORDS = new Set(['disappointed', 'delay', 'slow', 'issue', 'problem', 'urgent', 'asap', 'stuck', 'waiting', 'waiting']);
const TECHNICAL_WORDS = new Set(['gots', 'organic', 'technical', 'eco', 'sustainable', 'recycled']);

// Simple in-memory cache for repeated analyses (TTL: 5 minutes)
const analysisCache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

// Helper: Check if any word from Set A exists in string B
const containsAnyWord = (text, wordSet) => {
    const words = text.split(/\s+/);
    for (const word of words) {
        if (wordSet.has(word)) return true;
    }
    return false;
};

// Helper: Generate cache key from specs
const getCacheKey = (specs) => {
    return specs.slice(0, 100); // First 100 chars as key
};

// POST: Create Inquiry with AI Logic
exports.createInquiry = async (req, res) => {
    try {
        const { specifications } = req.body;
        const specs = specifications ? specifications.toLowerCase() : "";
        
        let priority = 'Normal';
        let category = 'Standard Dyeing';
        let sentiment = 'Neutral';

        // Check cache first (O(1) lookup)
        const cacheKey = getCacheKey(specs);
        const cached = analysisCache.get(cacheKey);
        
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            priority = cached.priority;
            category = cached.category;
            sentiment = cached.sentiment;
        } else {
            // 1. Sentiment & Tone Detection Logic - O(n) where n = words in specs
            const hasFrustrated = containsAnyWord(specs, FRUSTRATED_WORDS);
            const hasPositive = containsAnyWord(specs, POSITIVE_WORDS);

            if (hasFrustrated) {
                sentiment = 'Frustrated/Urgent';
                priority = 'High'; // Auto-escalate if frustrated
            } else if (hasPositive) {
                sentiment = 'Highly Interested';
            }

            // 2. Technical Categorization - O(n) lookup
            const isTechnical = containsAnyWord(specs, TECHNICAL_WORDS);
            if (isTechnical) {
                category = 'Technical Textile';
            }

            // Cache the analysis result
            analysisCache.set(cacheKey, {
                priority,
                category,
                sentiment,
                timestamp: Date.now()
            });
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