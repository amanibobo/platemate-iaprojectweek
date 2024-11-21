import React, { useState, useEffect } from "react";

interface ExcelDataRow {
  [key: string]: string | number | null;
}

export default function TestingData() {
  const [excelData, setExcelData] = useState<ExcelDataRow[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/excel-data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExcelData(data.data as ExcelDataRow[]);
      } catch (error: any) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (excelData === null) {
    return <p>Loading...</p>;
  }
  
  return (
    <div>
      <h1>Excel Data</h1>
      <pre>{JSON.stringify(excelData, null, 2)}</pre>
    </div>
  );

}
