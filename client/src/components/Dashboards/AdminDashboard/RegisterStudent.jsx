import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// RegisterStudent component
function RegisterStudent() {
  // Function to handle student registration form submission
  const registerStudent = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      setLoading(true); // Set loading state to true while processing

      // Create a student object from form fields
      let student = {
        name: name,
        cms_id: cms,
        room_no: room_no,
        batch: batch,
        dept: dept,
        course: course,
        email: email,
        father_name: fatherName,
        contact: contact,
        address: address,
        dob: dob,
        cnic: cnic,
        hostel: hostel,
        password: password
      };

      // Send a POST request to register the student
      const res = await fetch("http://localhost:3000/api/student/register-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      // Parse the response from the server
      const data = await res.json();

      if (data.success) {
        // Show a success toast if registration is successful
        toast.success(
          'Student ' + data.student.name + ' Registered Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        // Clear form fields after successful registration
        setCms("");
        setName("");
        setRoomNo("");
        setBatch("");
        setDept("");
        setCourse("");
        setEmail("");
        setFatherName("");
        setContact("");
        setAddress("");
        setDob("");
        setCnic("");
        setPassword("");
        setLoading(false); // Set loading state to false
      } else {
        // Show error toast for each validation error
        data.errors.forEach((err) => {
          toast.error(
            err.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
        setLoading(false); // Set loading state to false
      }
    } catch (err) {
      console.log(err); // Log the error to the console
      toast.error(
        err.toString(), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoading(false); // Set loading state to false
    }
  };

  // Retrieve hostel name from local storage
  const hostel = JSON.parse(localStorage.getItem("hostel")).name;

  // Define state variables for form fields
  const [cms, setCms] = useState();
  const [name, setName] = useState();
  const [room_no, setRoomNo] = useState();
  const [batch, setBatch] = useState();
  const [dept, setDept] = useState();
  const [course, setCourse] = useState();
  const [email, setEmail] = useState();
  const [fatherName, setFatherName] = useState();
  const [contact, setContact] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();
  const [cnic, setCnic] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false); // State to manage loading status

  return (
    <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
      <div className="md:w-[70vw] w-full p-10 bg-gray-800 rounded-lg shadow-xl mb-10 overflow-auto">
        {/* Registration form */}
        <form method="post" onSubmit={registerStudent} className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full">
            {/* Input fields for student details */}
            <Input
              field={{
                name: "Name",
                placeholder: "Student's Name",
                type: "text",
                req: true,
                value: name,
                onChange: (e) => setName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "UID",
                placeholder: "Student 6 digit UID",
                type: "number",
                req: true,
                value: cms,
                onChange: (e) => setCms(e.target.value),
              }}
            />
            <Input
              field={{
                name: "DOB",
                placeholder: "Student DOB",
                type: "date",
                req: true,
                value: dob,
                onChange: (e) => setDob(e.target.value),
              }}
            />
            <Input
              field={{
                name: "AADHAR",
                placeholder: "13 digits ID",
                type: "text",
                req: true,
                value: cnic,
                onChange: (e) => setCnic(e.target.value),
              }}
            />
            <Input
              field={{
                name: "E-mail",
                placeholder: "email@domain.com",
                type: "email",
                req: true,
                value: email,
                onChange: (e) => setEmail(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Contact",
                placeholder: "91+(***********)",
                type: "text",
                req: true,
                value: contact,
                onChange: (e) => setContact(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Father's Name",
                placeholder: "Student's Father's Name",
                type: "text",
                req: true,
                value: fatherName,
                onChange: (e) => setFatherName(e.target.value),
              }}
            />
            <Input
              field={{
                name: "room",
                placeholder: "3 digit Room No",
                type: "number",
                req: true,
                value: room_no,
                onChange: (e) => setRoomNo(e.target.value),
              }}
            />
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full">
            <Input
              field={{
                name: "Hostel",
                placeholder: "Hostel",
                type: "text",
                req: true,
                value: hostel,
                disabled: true,
              }}
            />
            <Input
              field={{
                name: "Department",
                placeholder: "Department",
                type: "text",
                req: true,
                value: dept,
                onChange: (e) => setDept(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Course",
                placeholder: "Stream",
                type: "text",
                req: true,
                value: course,
                onChange: (e) => setCourse(e.target.value),
              }}
            />
            <Input
              field={{
                name: "Batch",
                placeholder: "20**",
                type: "number",
                req: true,
                value: batch,
                onChange: (e) => setBatch(e.target.value),
              }}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student's Permanent Resident Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none my-2 resize-none transition-transform transform hover:scale-110"
            />
            <Input
              field={{
                name: "Password",
                placeholder: "Give a Strong Password",
                type: "password",
                req: true,
                value: password,
                onChange: (e) => setPassword(e.target.value),
              }}
            />
          </div>

          <div className="mt-5 flex justify-center transition-transform transform hover:scale-110">
            <Button>
              {loading ? (
                <>
                  <Loader /> Registering...
                </>
              ) : (
                <span>Register Student</span>
              )}
            </Button>
          </div>
        </form>
      </div>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default RegisterStudent;
