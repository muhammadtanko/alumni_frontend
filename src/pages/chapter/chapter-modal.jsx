import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
    chapterName: "",
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

// Validation schema for form fields
const validationSchema = Yup.object({
    chapterName: Yup.string().required("Chapter Name is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    positions: Yup.object({
        President: Yup.string().required("President is required"),
        "Vice President": Yup.string().required("Vice President is required"),
        "Sec. General": Yup.string().required("Secretary General is required"),
        "Ass. Sec. General": Yup.string().required("Assistant Secretary General is required"),
        "Financial Sec": Yup.string().required("Financial Secretary is required"),
        Treasurer: Yup.string().required("Treasurer is required"),
        "Public Relation Officer": Yup.string().required("Public Relation Officer is required"),
        "Welfare Officer": Yup.string().required("Welfare Officer is required"),
        Provost: Yup.string().required("Provost is required"),
        "Ex-Officio": Yup.string().required("Ex-Officio is required"),
    }),
});

const onSubmit = (values) => {
    console.log("Form data", values);
};

const ChapterForm = () => (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
    >
        {() => (
            <Form className="space-y-4">
                {/* Chapter Name */}
                <div>
                    <label htmlFor="chapterName" className="block text-sm font-medium text-gray-700">
                        Chapter Name
                    </label>
                    <Field
                        type="text"
                        id="chapterName"
                        name="chapterName"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="chapterName" component="div" className="text-red-600 text-sm mt-1" />
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
);


export default ChapterForm;