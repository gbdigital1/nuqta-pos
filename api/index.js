require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 3001;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors({
    origin: [
        'https://nuqta-pos.com',
        'http://localhost:5173'
    ]
}));
app.use(express.json());

// ─── MongoDB connection ───────────────────────────────────────
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let leadsCollection;
let usersCollection;

async function connectDB() {
    await client.connect();
    const db = client.db('nuqta_pos');
    leadsCollection = db.collection('leads');
    usersCollection = db.collection('users');
    await leadsCollection.createIndex({ createdAt: -1 });
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log('✅ Connected to MongoDB Atlas');
}

// ─── Auth middleware (JWT) ─────────────────────────────────────
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired session' });
        req.user = payload; // { id, email, role, name }
        next();
    });
}

// Restrict a route to specific roles, e.g. requireRole('super_admin', 'admin')
function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
        }
        next();
    };
}

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                  // 10 attempts per IP per window
    message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ─── Auth Routes ────────────────────────────────────────────────

// POST /api/login
app.post('/api/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing credentials' });
        }

        const user = await usersCollection.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        if (user.status === 'banned' || user.status === 'inactive') {
            return res.status(403).json({ error: 'This account is not active' });
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        const { passwordHash, ...safeUser } = user;
        res.json({ success: true, token, user: safeUser });
    } catch (err) {
        console.error('POST /api/login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/me — lets the frontend verify a stored token is still valid
app.get('/api/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});


const leadsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20, // 20 submissions per IP per 15 min — generous for real users, blocks spam bots
    message: { error: 'Too many submissions. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ─── Lead Routes ─────────────────────────────────────────────

app.post('/api/leads', leadsLimiter, async (req, res) => {
    try {
        const lead = { ...req.body, createdAt: new Date().toISOString(), status: 'new' };
        if (!lead.name || !lead.email || !lead.phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const result = await leadsCollection.insertOne(lead);
        res.status(201).json({ success: true, id: result.insertedId });
    } catch (err) {
        console.error('POST /api/leads error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/leads', authenticateToken, async (req, res) => {
    try {
        const leads = await leadsCollection.find({}).sort({ createdAt: -1 }).toArray();
        res.json(leads);
    } catch (err) {
        console.error('GET /api/leads error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.patch('/api/leads/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['new', 'contacted', 'qualified', 'closed_won', 'closed_lost'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        await leadsCollection.updateOne({ id: req.params.id }, { $set: { status } });
        res.json({ success: true });
    } catch (err) {
        console.error('PATCH /api/leads/:id/status error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/leads/:id', authenticateToken, async (req, res) => {
    try {
        await leadsCollection.deleteOne({ id: req.params.id });
        res.json({ success: true });
    } catch (err) {
        console.error('DELETE /api/leads/:id error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// ─── User Management Routes ───────────────────────────────────

// Anyone logged in can view the team list
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const users = await usersCollection
            .find({}, { projection: { passwordHash: 0 } })
            .sort({ createdAt: -1 })
            .toArray();
        res.json(users);
    } catch (err) {
        console.error('GET /api/users error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Only admins/super_admins can create new users
app.post('/api/users', authenticateToken, requireRole('super_admin', 'admin'), async (req, res) => {
    try {
        const { id, name, email, phone, role, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existing = await usersCollection.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = {
            id, name,
            email: normalizedEmail,
            phone: phone || '',
            role: role || 'support',
            status: 'active',
            passwordHash,
            createdAt: new Date().toISOString(),
        };
        await usersCollection.insertOne(user);
        const { passwordHash: _omit, ...safeUser } = user;
        res.status(201).json({ success: true, user: safeUser });
    } catch (err) {
        console.error('POST /api/users error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Any logged-in user can update basic profile fields on... themselves ideally.
// For simplicity here: only admins/super_admins can edit any profile.
app.patch('/api/users/:id', authenticateToken, requireRole('super_admin', 'admin'), async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const update = {};
        if (name) update.name = name;
        if (email) update.email = email.trim().toLowerCase();
        if (phone !== undefined) update.phone = phone;
        if (role) update.role = role;
        await usersCollection.updateOne({ id: req.params.id }, { $set: update });
        res.json({ success: true });
    } catch (err) {
        console.error('PATCH /api/users/:id error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.patch('/api/users/:id/status', authenticateToken, requireRole('super_admin', 'admin'), async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['active', 'inactive', 'banned'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        await usersCollection.updateOne({ id: req.params.id }, { $set: { status } });
        res.json({ success: true });
    } catch (err) {
        console.error('PATCH /api/users/:id/status error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Only super_admin can change roles — prevents an 'admin' from promoting themselves
app.patch('/api/users/:id/role', authenticateToken, requireRole('super_admin'), async (req, res) => {
    try {
        const { role } = req.body;
        const validRoles = ['super_admin', 'admin', 'manager', 'support'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        await usersCollection.updateOne({ id: req.params.id }, { $set: { role } });
        res.json({ success: true });
    } catch (err) {
        console.error('PATCH /api/users/:id/role error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Only super_admin can delete users
app.delete('/api/users/:id', authenticateToken, requireRole('super_admin'), async (req, res) => {
    try {
        await usersCollection.deleteOne({ id: req.params.id });
        res.json({ success: true });
    } catch (err) {
        console.error('DELETE /api/users/:id error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Serverless-safe DB connection ─────────────────────────────
let dbConnection = null;
function ensureDB() {
    if (!dbConnection) {
        dbConnection = connectDB().catch(err => {
            dbConnection = null; // allow retry on next request
            throw err;
        });
    }
    return dbConnection;
}

app.use(async (req, res, next) => {
    try {
        await ensureDB();
        next();
    } catch (err) {
        console.error('DB connection error:', err);
        res.status(500).json({ error: 'Database unavailable' });
    }
});

module.exports = app;

// Only start a real listening server when run locally (node api/index.js)
// On Vercel, the platform calls the exported app directly per-request.
if (require.main === module) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Nuqta API running on port ${PORT}`);
        });
    });
}