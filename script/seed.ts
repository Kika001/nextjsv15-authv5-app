import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users } from '@/database/schema';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seed() {
  try {
    console.log('🌱 Initialisation de la base de données...');

    // Créer un utilisateur admin par défaut
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    await db.insert(users).values({
      email: 'admin@example.com',
      name: 'Administrateur',
      password: adminPassword,
      role: 'admin',
    }).onConflictDoNothing();

    console.log('✅ Utilisateur admin créé:');
    console.log('   Email: admin@example.com');
    console.log('   Mot de passe: admin123');
    console.log('');

    // Créer un utilisateur customer par défaut
    const customerPassword = await bcrypt.hash('customer123', 10);
    await db.insert(users).values({
      email: 'customer@example.com',
      name: 'Client Test',
      password: customerPassword,
      role: 'customer',
    }).onConflictDoNothing();
    console.log('✅ Utilisateur customer créé:');
    console.log('   Email: customer@example.com');
    console.log('   Mot de passe: customer123');
    console.log('');
    console.log('⚠️  IMPORTANT: Changez ces mots de passe après la première connexion!');
    console.log('');
    console.log('🎉 Base de données initialisée avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
}

seed();