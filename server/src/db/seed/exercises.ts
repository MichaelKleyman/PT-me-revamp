import { exercisesTable } from "../schema/exercises";
import { exercises } from "../../../mock/practice/mockExercises";
import { db } from "../index";

async function seed() {
  console.log("Seeding platform auto-created exercises...");

  await db.insert(exercisesTable).values(exercises);

  console.log(`Seeded ${exercises.length} exercises`);
}

seed()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
