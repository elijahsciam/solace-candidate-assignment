import db from '../../../db';
import { Advocate } from '../../page';
import {
  advocates,
  advocateSpecialties,
  specialties,
} from '../../../db/schema';
import { eq } from 'drizzle-orm';
import { advocateData } from '../../../db/seed/advocates';

export async function GET() {
  // Uncomment this line to use a database
  const data = await db
    .select({
      id: advocates.id,
      firstName: advocates.firstName,
      lastName: advocates.lastName,
      city: advocates.city,
      degree: advocates.degree,
      yearsOfExperience: advocates.yearsOfExperience,
      phoneNumber: advocates.phoneNumber,
    })
    .from(advocates);

  const advSp = await db
    .select({
      advocateId: advocateSpecialties.advocateId,
      specialtyName: specialties.name,
    })
    .from(advocateSpecialties)
    .innerJoin(
      specialties,
      eq(advocateSpecialties.specialtiesId, specialties.id)
    );

  const transformedData: Record<number, any> = {};

  for (const sp of advSp) {
    const current = transformedData[sp.advocateId];
    if (current) {
      current.specialties.push(sp.specialtyName);
    } else {
      transformedData[sp.advocateId] = data[sp.advocateId];
      transformedData[sp.advocateId].specialties = [];
    }
  }

  const d = Object.values(transformedData);
  return Response.json({ data: d });
}
