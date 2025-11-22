import db from "./drizzle.js";
import { items, users } from "./schema.js";

const seedUsers = [
  { name: "Grukthar the Mighty", email: "grukthar@orcclan.com" },
  { name: "Zog Bloodaxe", email: "zog.bloodaxe@darkforge.net" },
  { name: "Thrak Ironjaw", email: "thrak@ironjaw.war" },
  { name: "Morgok Skullcrusher", email: "morgok@skullcrusher.clan" },
  { name: "Gorak the Destroyer", email: "gorak@destruction.org" },
  { name: "Urgok Bonebreaker", email: "urgok@bonebreaker.tribe" },
  { name: "Draknar Firefist", email: "draknar@firefist.stronghold" },
  { name: "Kragnak Shadowblade", email: "kragnak@shadowblade.net" },
];

const seedItems = [
  {
    name: "Bloodthirsty Axe",
    type: "weapon",
    description:
      "A massive double-bladed axe forged in the fires of Mount Doom",
    value: 500,
  },
  {
    name: "Skullcrusher Mace",
    type: "weapon",
    description: "A heavy mace adorned with the skulls of fallen enemies",
    value: 450,
  },
  {
    name: "Ironjaw Helmet",
    type: "armor",
    description: "A fearsome helmet that strikes terror into enemies",
    value: 300,
  },
  {
    name: "Shadowblade Dagger",
    type: "weapon",
    description: "A dark dagger that never misses its mark",
    value: 250,
  },
  {
    name: "Bonebreaker Gauntlets",
    type: "armor",
    description: "Gauntlets that can crush stone with ease",
    value: 200,
  },
  {
    name: "Firefist Ring",
    type: "accessory",
    description: "A ring that channels the power of fire",
    value: 150,
  },
  {
    name: "Warhammer of Destruction",
    type: "weapon",
    description: "A legendary warhammer passed down through generations",
    value: 600,
  },
  {
    name: "Orcish Battle Shield",
    type: "armor",
    description: "A sturdy shield made from dragon scales",
    value: 350,
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log("🗑️  Clearing existing data...");
    await db.delete(items);
    await db.delete(users);

    // Seed users
    console.log("👥 Seeding users...");
    const insertedUsers = await db.insert(users).values(seedUsers).returning();
    console.log(`✅ Inserted ${insertedUsers.length} users`);

    // Seed items
    console.log("⚔️  Seeding items...");
    const insertedItems = await db.insert(items).values(seedItems).returning();
    console.log(`✅ Inserted ${insertedItems.length} items`);

    console.log("✨ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
