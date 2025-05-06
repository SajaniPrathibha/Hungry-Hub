// import ExcelJS from 'exceljs';
// import { useEffect, useState } from 'react';

// const useCalorieData = () => {
//     const [calorieData, setCalorieData] = useState({});

//     useEffect(() => {
//         const loadCalorieData = async () => {
//             try {
//                 // Fetch the .xlsx file as a binary Blob
//                 const response = await fetch('./calories.xlsx'); // Adjust the path to your .xlsx file
//                 const blob = await response.blob(); // Fetch as Blob (binary)

//                 // Convert Blob to ArrayBuffer
//                 const arrayBuffer = await blob.arrayBuffer();

//                 // Initialize a new ExcelJS Workbook and load the array buffer
//                 const workbook = new ExcelJS.Workbook();
//                 await workbook.xlsx.load(arrayBuffer);

//                 // Assuming the data is in the first sheet
//                 const worksheet = workbook.getWorksheet(1);
//                 const data = {};

//                 // Iterate over each row in the worksheet
//                 worksheet.eachRow((row, rowNumber) => {
//                     const ingredient = row.getCell(1).value; // Ingredient name in column 1
//                     const caloriesPer100g = parseFloat(row.getCell(2).value); // Calories in column 2

//                     if (ingredient && !isNaN(caloriesPer100g)) {
//                         data[ingredient] = caloriesPer100g; // Store the calorie data
//                     }
//                 });

//                 setCalorieData(data); // Set the parsed calorie data in state
//             } catch (error) {
//                 console.error('Error loading calorie data:', error);
//             }
//         };

//         loadCalorieData();
//     }, []);

//     return calorieData;
// };

// export default useCalorieData;
