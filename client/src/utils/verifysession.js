// Function to verify the user's session
const verifysession = async () => {
  // Send a POST request to verify the session using the stored token
  let response = await fetch("http://localhost:3000/api/auth/verifysession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify({ token: localStorage.getItem("token") }) // Send the token in the request body
  });

  // Parse the JSON response
  let result = await response.json();
  
  // Check if the response indicates success
  if (result.success) {
    console.log(result.data.isAdmin); // Log whether the user is an admin
    
    // Redirect based on user role
    if (result.data.isAdmin) {
      // Redirect to admin dashboard if the user is an admin
      window.location.href = "/admin-dashboard";
    } else {
      // Redirect to student dashboard if the user is not an admin
      window.location.href = "/student-dashboard";
    }
  } else {
    // If verification fails, clear the token and student data from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("student");
  }
};

// Export the `verifysession` function as the default export
export default verifysession;
