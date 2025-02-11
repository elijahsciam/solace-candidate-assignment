import db from '../../../db';
import {
  advocates,
  specialties,
  advocateSpecialties,
} from '../../../db/schema';
import { advocateData, specialtyData } from '../../../db/seed/advocates';

const randomForeignKeys = () => {
  const advId = Math.floor(Math.random() * 15);
  const specId = Math.floor(Math.random() * 26);

  return [advId, specId];
};

export async function POST() {
  // create advocate dummy data
  for (const adv of advocateData) {
    await db.insert(advocates).values(adv).onConflictDoNothing();
  }
  // create specialties dummy data
  for (const sp of specialtyData) {
    await db.insert(specialties).values(sp).onConflictDoNothing();
  }
  // create associations between advocates & specialties
  for (let i = 0; i < 100; i++) {
    const ids = randomForeignKeys();
    if (ids[0] === 0 || ids[1] === 0) {
      continue;
    }
    await db
      .insert(advocateSpecialties)
      .values({ advocateId: ids[0], specialtiesId: ids[1] });
  }

  return Response.json({ advocateData });
}
