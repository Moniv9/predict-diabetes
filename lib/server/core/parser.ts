export const parseCSV = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const csvString = new TextDecoder().decode(uint8Array);
  const lines = csvString.split("\n");
  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().replace(/\r$/, ""));

  const data = lines.slice(1).map((line) => {
    const values = line
      .split(",")
      .map((value) => value.trim().replace(/\r$/, ""));
    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];
      return acc;
    }, {} as Record<string, string>);
  });

  return data;
};
