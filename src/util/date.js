export function formatDateFromArray(dateArray) {
   // Validate the input to ensure it's an array with the expected number of elements
   if (!Array.isArray(dateArray) || dateArray.length !== 7) {
    throw new Error('Input must be an array with exactly 7 elements.');
}

// Extract the components from the array
const [year, month, day] = dateArray.slice(0, 3); // Only take year, month, and day

// Validate that each component is a number
if (![year, month, day].every(Number.isInteger)) {
    throw new Error('The first three elements in the array (year, month, day) must be integers.');
}

// Format the date to dd/mm/yyyy format
const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

return formattedDate;
}
