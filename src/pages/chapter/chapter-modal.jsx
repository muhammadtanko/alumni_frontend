import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
// Validation schema for form fields
import { configs } from "../../config";

const validationSchema = Yup.object({
    name: Yup.string().required("Chapter Name is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    positions: Yup.object({
        President: Yup.string(),
        "Vice President": Yup.string(),
        "Sec. General": Yup.string(),
        "Ass. Sec. General": Yup.string(),
        "Financial Sec": Yup.string(),
        Treasurer: Yup.string(),
        "Public Relation Officer": Yup.string(),
        "Welfare Officer": Yup.string(),
        Provost: Yup.string(),
        "Ex-Officio": Yup.string(),
    }),
});
export default function ChapterForm() {
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);



    const initialValues = {
        name: "",
        country: "",
        city: "",
        positions: {
            President: "",
            "Vice President": "",
            "Sec. General": "",
            "Ass. Sec. General": "",
            "Financial Sec": "",
            Treasurer: "",
            "Public Relation Officer": "",
            "Welfare Officer": "",
            Provost: "",
            "Ex-Officio": "",
        },
    };






    const onSubmit = async (values, { resetForm }) => {
        console.log(values);
        try {
            console.log("it ran");
            const response = await fetch(`${configs.baseUrl}/chapter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    country: values.country,
                    city: values.city,
                    positions: values.positions,
                }),
            });
            console.log("res", response);
            const data = await response.json();
            console.log("data", data);
            if (data.ok) {
                setMessage("Chapter created successfully.");
                setIsError(false);
                resetForm(); // Reset the form after successful submission
            } else {
                setMessage("Error creating chapter.");
                setIsError(true);
            }
        } catch (error) {
            setMessage("Error creating chapter.");
            setIsError(true);
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {() => (
                <Form className="space-y-4">
                    {/* Chapter Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Chapter Name
                        </label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    {/* Country */}
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <Field
                            type="text"
                            id="country"
                            name="country"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="country" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    {/* City */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <Field
                            type="text"
                            id="city"
                            name="city"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage name="city" component="div" className="text-red-600 text-sm mt-1" />
                    </div>

                    {/* Positions */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Positions</h2>
                        {Object.keys(initialValues.positions).map((position) => (
                            <div key={position} className="mb-4">
                                <label htmlFor={`positions.${position}`} className="block text-sm font-medium text-gray-700">
                                    {position}
                                </label>
                                <Field
                                    type="text"
                                    id={`positions.${position}`}
                                    name={`positions.${position}`}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                />
                                <ErrorMessage name={`positions.${position}`} component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                        ))}
                    </div>
                    {message && (
                        <div className={`text-sm ${isError ? "text-red-600" : "text-green-600"} mt-2`}>
                            {message}
                        </div>
                    )}
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )

}


