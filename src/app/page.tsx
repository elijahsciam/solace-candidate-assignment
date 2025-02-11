'use client';

import { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_ColumnDef} from 'material-react-table'

export type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: string;
  phoneNumber: string;
};


export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);


  useEffect(() => {
    console.log('fetching advocates...');
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);



  const columns = useMemo<MRT_ColumnDef<Advocate>[]>(
    () => [
      {
        id: 'advocates',
        header: "Solace Advocates",
        columns: [
          { accessorKey: 'firstName',
            id: 'first_name',
            header: 'First Name',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
          {
            accessorKey: 'lastName',
            header: 'Last Name',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
          {
            accessorKey: 'city',
            header: 'City',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
          {
            accessorKey: 'degree',
            header: 'Degree',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
          {
            accessorFn: (row) => row.specialties.map((s) => <div key={s}>{s}</div>),
            header: 'Specialties',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
          {
            accessorKey: 'yearsOfExperience',
            header: 'Years of Experience',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
           {
            accessorKey: 'phoneNumber',
            header: 'Phone Number',
            size: 250,
            Cell: ({renderedCellValue, row}) => (
              <span>{renderedCellValue}</span>
            )
          },
        ]
      }
    ], []
  )

  const table = useMaterialReactTable({
    columns,
    data: advocates,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableStickyHeader: true,
  })

  return (
    <main style={{ margin: '24px' }}>
      <MaterialReactTable table={table} />
    </main>
  );
}
