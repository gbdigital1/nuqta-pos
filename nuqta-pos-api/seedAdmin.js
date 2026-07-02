require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function seed() {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    if (!email || !password) {
        console.error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD env vars first.');
        process.exit(1);
    }

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db('nuqta_pos');
    const users = db.collection('users');

    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
        console.log('User already exists, skipping.');
        process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await users.insertOne({
        id: 'NQ-USER-' + Math.floor(Math.random() * 90000 + 10000),
        name: 'Super Admin',
        email: email.toLowerCase(),
        phone: '',
        role: 'super_admin',
        status: 'active',
        passwordHash,
        createdAt: new Date().toISOString(),
    });

    console.log('✅ Super admin created:', email);
    process.exit(0);
}

seed();