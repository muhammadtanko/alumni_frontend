import { useNavigate } from "react-router-dom";
import { Button, TextInput, Label, FileInput } from "flowbite-react";
import { HiMail, HiEye } from "react-icons/hi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { configs } from "../../config";
import { useState } from "react";
import { Spinner } from "flowbite-react";
// import { registerUser } from "../../store/reducers/userSlice";
// import { useSelector, useDispatch } from "react-redux";


const Register = () => {
    // const dispatch = useDispatch();

    const chapters = [
        { name: "USA/Canada", code: "us/canada" },
        { name: "Abuja", code: "abuja" },
        { name: "UK", code: "UK" },
        { name: "Niger", code: "niger" },
        { name: "Rivers", code: "port harcourt" },
        { name: "Kaduna", code: "kaduna" },
        { name: "Lagos", code: "lagos" },
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1989 + 1 }, (_, index) => currentYear - index);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {
        const formDataToSend = new FormData()
        Object.keys(values).forEach(key => {
            if (Array.isArray(values[key])) {
                data[key].forEach((value, index) => {
                    formDataToSend.append(`${key}[${index}]`, value);
                });
            } else {
                formDataToSend.append(key, values[key])
            }
        })
        setLoading(true);
        setMessage('');
        setIsError(false);
        try {
            const response = await fetch(
                `${configs.baseUrl}/user`, {
                method: 'POST',
                body: formDataToSend,
            });
            console.log("response", response);
            const data = await response.json();
            console.log("data", data);
            if (data.ok) {
                setMessage(data.payLoad.message);
                resetForm();
                setLoading(false)
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            } else {
                setIsError(true);
                setMessage(data.message);
                setTimeout(() => {
                    setMessage('');
                    resetForm();
                    setLoading(false)
                }, 3500);
            }
        } catch (error) {
            setLoading(false)
            setMessage('An error occurred. Please try again.');
            setIsError(true);
        }
    };





    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        photo: Yup.mixed().required('Photo is required'),
        chapter: Yup.string().required("Chapter is required"),
        graduationYear: Yup.string().required("Year of Graduation is required"),
        DOB: Yup.date().required("Date of Birth is required"),
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400">
            <div className="m-7 bg-white rounded shadow-2xl p-4 md:p-8 w-full md:w-[45%] flex flex-col">
                <div className="text-left mb-3 md:mb-5">
                    <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
                </div>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        photo: '',
                        chapter: '',
                        graduationYear: '',
                        DOB: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, isValid, dirty }) => (
                        <Form className="flex flex-col md:flex-row flex-wrap gap-4">
                            <div className="w-full md:w-[48%]">
                                <Field as={TextInput} name="firstName" className="focus:border-blue-500 w-full" type="text" placeholder="First Name" shadow="true" />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full md:w-[48%]">
                                <Field as={TextInput} name="lastName" className="focus:border-blue-500 w-full" type="text" placeholder="Last Name" shadow="true" />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full md:w-[48%]">
                                <Field as={TextInput} name="email" className="focus:border-blue-500 w-full" type="email" icon={HiMail} placeholder="Email" shadow="true" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full md:w-[48%]">
                                <Field as={TextInput} name="password" className="focus:border-blue-500 w-full" icon={HiEye} type="password" placeholder="Password" shadow="true" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full md:w-[48%]">
                                <Label htmlFor="chapter" value="Choose a Chapter" />
                                <Field as="select" name="chapter" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full">
                                    <option disabled selected hidden>Please Choose...</option>
                                    <option >Select below ..</option>

                                    {chapters.map((chapter) => (
                                        <option key={chapter.code} value={chapter.code}>
                                            {chapter.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="chapter" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full md:w-[48%]">
                                <Label htmlFor="graduationYear" value=" Year of Graduation" />
                                <Field as="select" name="graduationYear" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full">
                                    <option disabled selected hidden>Please Choose...</option>
                                    <option >Select below ..</option>

                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="graduationYear" component="div" className="text-red-500 text-xs" />
                            </div>


                            <div className="w-full md:w-[48%]">
                                <Label htmlFor="photo" value=" Photo" />
                                <Field name="photo">
                                    {({ form }) => (
                                        <FileInput
                                            className="focus:border-blue-500 w-full"
                                            type="file"
                                            placeholder="photo"
                                            shadow="true"
                                            onChange={(event) => {
                                                form.setFieldValue("photo", event.currentTarget.files[0]); // Set the file in Formik's state
                                            }}
                                        />
                                    )}
                                </Field>

                                <ErrorMessage name="photo" component="div" className="text-red-500 text-xs" />
                            </div>



                            <div className="w-full md:w-[48%]">
                                <Label htmlFor="DOB" value="Date Of Birth" />
                                <Field name="DOB">
                                    {({ field }) => (
                                        <input
                                            type="date"
                                            id="DOB"
                                            {...field}
                                            className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full"
                                            onChange={(e) => setFieldValue("DOB", e.target.value)}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-full flex justify-end mt-3 md:mt-8">
                                <Button
                                    disabled={!(isValid && dirty)}
                                    className="bg-bgDArk w-full md:w-1/3" type="submit"
                                >
                                    {loading ? <Spinner size="sm" /> : 'Register'}

                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
                {message && (
                    <div className={`mt-4 text-center ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
