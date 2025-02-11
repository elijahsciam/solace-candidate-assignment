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
  // get advocate data
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
  // create object map for quick access
  const advocateMap: Record<
    number,
    {
      id: number;
      firstName: string;
      lastName: string;
      city: string;
      degree: string;
      yearsOfExperience: number;
      phoneNumber: number;
      specialties: string[];
    }
  > = Object.fromEntries(data.map((a) => [a.id, { ...a, specialties: [] }]));

  // assign associated speciality to advocate using map
  for (const { advocateId, specialtyName } of advSp) {
    advocateMap[advocateId]?.specialties.push(specialtyName);
  }

  // send array to FE
  const transformedData = Object.values(advocateMap);
  return Response.json({ data: transformedData });
}
