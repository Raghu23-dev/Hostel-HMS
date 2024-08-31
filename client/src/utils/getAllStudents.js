// Define an asynchronous function to fetch all students
const getAllStudents = async () => {
    // Retrieve the hostel ID from localStorage, parse it, and extract the _id property
    const hostel = JSON.parse(localStorage.getItem("hostel"))._id;

    // Send a POST request to the specified API endpoint to get all students
    const result = await fetch("http://localhost:3000/api/student/get-all-students", {
        method: "POST", // Use POST method for the request
        headers: {
            "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ hostel }), // Send the hostel ID in the request body as JSON
    });

    // Convert the response data to JSON
    const data = await result.json();

    // Return the parsed data from the API response
    return data;
};

// Export the getAllStudents function as the default export
export default getAllStudents;
