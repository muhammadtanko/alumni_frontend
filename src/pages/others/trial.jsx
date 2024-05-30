

import { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    };
    const prevStep = () => {
        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base mb-5">
                            <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${currentStep === 1 ? 'text-blue-600' : ''}`}>
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                    </svg>
                                    Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                </span>
                            </li>
                            <li className={`flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${currentStep === 2 ? 'text-blue-600' : ''}`}>
                                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                                    <span className="me-2">2</span>
                                    Career <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                                </span>
                            </li>
                            <li className={`flex items-center ${currentStep === 3 ? 'text-blue-600' : ''}`}>
                                <span className="me-2">3</span>
                                Others
                            </li>
                        </ol>

                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">{currentStep === 1 ? "Personal Details" : currentStep === 2 ? "Career Details" : "Other Details"}</p>
                                <p>Please fill out all the fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                {currentStep === 1 && <PersonalInfo nextStep={nextStep} />}
                                {currentStep === 2 && <CareerInfo nextStep={nextStep} prevStep={prevStep} />}
                                {currentStep === 3 && <OtherInfo prevStep={prevStep} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




// const PersonalInfo = ({ nextStep }) => {
//     const validationSchema = Yup.object({
//         phone: Yup.string().required('Phone number is required'),
//         city: Yup.string().required('City is required'),
//         photo: Yup.mixed().required('Photo is required'),
//         sports: Yup.array().of(Yup.string().required('At least one sport is required')),
//         socialLinks: Yup.array().of(Yup.string().required('At least one social link is required')),
//         country: Yup.string().required('Country is required'),
//     });

//     return (
//         <Formik
//             initialValues={{ phone: '', city: '', photo: '', sports: [''], socialLinks: [''], country: 'Nigeria' }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//                 console.log(values);
//                 nextStep();
//             }}
//         >
//             <Form className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-5">
//                 <div className="md:col-span-5">
//                     <label htmlFor="phone">Phone</label>
//                     <Field name="phone" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                     <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
//                 </div>
//                 <div className="md:col-span-5">
//                     <label htmlFor="city">City</label>
//                     <Field name="city" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                     <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
//                 </div>
//                 <div className="md:col-span-5">
//                     <label htmlFor="photo">Photo</label>
//                     <Field name="photo" type="" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                     <ErrorMessage name="photo" component="div" className="text-red-500 text-xs" />
//                 </div>
//                 <div className="md:col-span-5">
//                     <label htmlFor="sports">Sports</label>
//                     <FieldArray name="sports">
//                         {({ push, remove, form }) => (
//                             <div>
//                                 {form.values.sports.map((_, index) => (
//                                     <div key={index} className="flex items-center mb-2">
//                                         <Field name={`sports.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                                         <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
//                                     </div>
//                                 ))}
//                                 <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Sport</button>
//                             </div>
//                         )}
//                     </FieldArray>
//                     <ErrorMessage name="sports" component="div" className="text-red-500 text-xs" />
//                 </div>
//                 <div className="md:col-span-5">
//                     <label htmlFor="socialLinks">Social Links</label>
//                     <FieldArray name="socialLinks">
//                         {({ push, remove, form }) => (
//                             <div>
//                                 {form.values.socialLinks.map((_, index) => (
//                                     <div key={index} className="flex items-center mb-2">
//                                         <Field name={`socialLinks.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                                         <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
//                                     </div>
//                                 ))}
//                                 <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Link</button>
//                             </div>
//                         )}
//                     </FieldArray>
//                     <ErrorMessage name="socialLinks" component="div" className="text-red-500 text-xs" />
//                 </div>
//                 <div className="md:col-span-5">
//                     <label htmlFor="country">Country</label>
//                     <Field as="select" name="country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
//                         <option value="Nigeria">Nigeria</option>
//                         <option value="Canada">Canada</option>
//                         <option value="United Kingdom">United Kingdom</option>
//                     </Field>
//                     <ErrorMessage name="country" component="div" className="text-red-500 text-xs" />
//                 </div>
//                 <div className="md:col-span-5 flex justify-right">
//                     {/* <button type="button" onClick={prevStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button> */}
//                     <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
//                 </div>
//             </Form>
//         </Formik>
//     );
// };

// val, single in row
const PersonalInfo = ({ nextStep, prevStep }) => {
    const validationSchema = Yup.object({
        phone: Yup.string().required('Phone number is required'),
        city: Yup.string().required('City is required'),
        photo: Yup.mixed().required('Photo is required'),
        sports: Yup.array().of(Yup.string().required('At least one sport is required')),
        socialLinks: Yup.array().of(Yup.string().required('At least one social link is required')),
        country: Yup.string().required('Country is required'),
    });

    return (
        <Formik
            initialValues={{ phone: '', city: '', photo: null, sports: [''], socialLinks: [''], country: 'Nigeria' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                nextStep();
            }}
        >
            {({ setFieldValue }) => (
                <Form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
                    <div className="md:col-span-1">
                        <label htmlFor="phone">Phone</label>
                        <Field name="phone" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="photo">Photo</label>
                        <input
                            name="photo"
                            type="file"
                            onChange={(event) => {
                                setFieldValue("photo", event.currentTarget.files[0]);
                            }}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                        <ErrorMessage name="photo" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="country">Country</label>
                        <Field as="select" name="country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                            <option value="Nigeria">Nigeria</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                        </Field>
                        <ErrorMessage name="country" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="city">City</label>
                        <Field name="city" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                        <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
                    </div>
                    
                    <div className="md:col-span-1">
                        <label htmlFor="sports">Sports</label>
                        <FieldArray name="sports">
                            {({ push, remove, form }) => (
                                <div>
                                    {form.values.sports.map((_, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Field name={`sports.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Sport</button>
                                </div>
                            )}
                        </FieldArray>
                        <ErrorMessage name="sports" component="div" className="text-red-500 text-xs" />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="socialLinks">Social Links</label>
                        <FieldArray name="socialLinks">
                            {({ push, remove, form }) => (
                                <div>
                                    {form.values.socialLinks.map((_, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <Field name={`socialLinks.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Link</button>
                                </div>
                            )}
                        </FieldArray>
                        <ErrorMessage name="socialLinks" component="div" className="text-red-500 text-xs" />
                    </div>
                   
                    <div className="md:col-span-2 flex justify-between">
                        <button type="button" onClick={prevStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};


// no val many in row
// const PersonalInfo = ({ nextStep }) => {
//     const validationSchema = Yup.object({
//         phone: Yup.string().required('Phone number is required'),
//         country: Yup.string().oneOf(['Nigeria', 'Canada', 'United Kingdom'], 'Invalid Country').required('Country of residence is required'),
//         city: Yup.string().required('City/State of residence is required'),
//         photo: Yup.mixed().required('Photo is required'),
//         sports: Yup.array().of(Yup.string().required('Sport is required')),
//         socialLinks: Yup.array().of(Yup.string().url('Invalid URL').required('Social media link is required')),
//     });

//     return (
//         <Formik
//             initialValues={{ phone: '', country: '', city: '', photo: null, sports: [''], socialLinks: [''] }}
//             validationSchema={validationSchema}
//             onSubmit={(values) => {
//                 console.log("here oooo",values);
//                 nextStep();
//             }}
//         >
//             {({ setFieldValue }) => (
//                 <Form className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2">
//                     <div>
//                         <label htmlFor="phone">Phone Number</label>
//                         <Field name="phone" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                         <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
//                     </div>
//                     <div>
//                         <label htmlFor="country">Country of Residence</label>
//                         <Field name="country" as="select" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
//                             <option value="">Select Country</option>
//                             <option value="Nigeria">Nigeria</option>
//                             <option value="Canada">Canada</option>
//                             <option value="United Kingdom">United Kingdom</option>
//                         </Field>
//                         <ErrorMessage name="country" component="div" className="text-red-500 text-xs" />
//                     </div>
//                     <div>
//                         <label htmlFor="city">State or City of Residence</label>
//                         <Field name="city" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                         <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
//                     </div>
//                     <div>
//                         <label htmlFor="photo">Photo</label>
//                         <input name="photo" type="file" onChange={(event) => setFieldValue('photo', event.currentTarget.files[0])} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                         <ErrorMessage name="photo" component="div" className="text-red-500 text-xs" />
//                     </div>
//                     <div>
//                         <label>Sports</label>
//                         <FieldArray name="sports">
//                             {({ push, remove, form }) => (
//                                 <div>
//                                     {form.values.sports.map((_, index) => (
//                                         <div key={index} className="flex items-center mb-2">
//                                             <Field name={`sports.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                                             <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
//                                         </div>
//                                     ))}
//                                     <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Sport</button>
//                                 </div>
//                             )}
//                         </FieldArray>
//                     </div>
//                     <div>
//                         <label>Links to Social Media Accounts</label>
//                         <FieldArray name="socialLinks">
//                             {({ push, remove, form }) => (
//                                 <div>
//                                     {form.values.socialLinks.map((_, index) => (
//                                         <div key={index} className="flex items-center mb-2">
//                                             <Field name={`socialLinks.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
//                                             <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
//                                         </div>
//                                     ))}
//                                     <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Link</button>
//                                 </div>
//                             )}
//                         </FieldArray>
//                     </div>
//                     <div className="md:col-span-2 flex justify-between">
//                         <button type="button" onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     );
// };





const CareerInfo = ({ nextStep, prevStep }) => {
    const validationSchema = Yup.object({
        fieldOfStudy: Yup.array().of(Yup.string().required('Field of study is required')),
        profession: Yup.array().of(Yup.string().required('Profession is required')),
        businessVentures: Yup.array().of(Yup.string().required('Business ventures are required')),
    });

    return (
        <Formik
            initialValues={{ fieldOfStudy: [''], profession: [''], businessVentures: [''] }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                nextStep();
            }}
        >
            <Form className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-5">
                <div className="md:col-span-5">
                    <label htmlFor="fieldOfStudy">Field of Study</label>
                    <FieldArray name="fieldOfStudy">
                        {({ push, remove, form }) => (
                            <div>
                                {form.values.fieldOfStudy.map((_, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <Field name={`fieldOfStudy.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Field</button>
                            </div>
                        )}
                    </FieldArray>
                    <ErrorMessage name="fieldOfStudy" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="md:col-span-5">
                    <label htmlFor="profession">Profession</label>
                    <FieldArray name="profession">
                        {({ push, remove, form }) => (
                            <div>
                                {form.values.profession.map((_, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <Field name={`profession.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Profession</button>
                            </div>
                        )}
                    </FieldArray>
                    <ErrorMessage name="profession" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="md:col-span-5">
                    <label htmlFor="businessVentures">Business Ventures</label>
                    <FieldArray name="businessVentures">
                        {({ push, remove, form }) => (
                            <div>
                                {form.values.businessVentures.map((_, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <Field name={`businessVentures.${index}`} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">Remove</button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => push('')} className="mt-2 text-blue-500">Add Venture</button>
                            </div>
                        )}
                    </FieldArray>
                    <ErrorMessage name="businessVentures" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="md:col-span-5 flex justify-between">
                    <button type="button" onClick={prevStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
                </div>
            </Form>
        </Formik>
    );
};


const OtherInfo = ({ prevStep }) => {
    const validationSchema = Yup.object({
        hobbies: Yup.string().required('Hobbies are required'),
        bio: Yup.string().required('Bio is required'),
    });

    return (
        <Formik
            initialValues={{ hobbies: '', bio: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                alert('Form Submitted');
            }}
        >
            <Form className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-5">
                <div className="md:col-span-5">
                    <label htmlFor="hobbies">Hobbies</label>
                    <Field name="hobbies" type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    <ErrorMessage name="hobbies" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="md:col-span-5">
                    <label htmlFor="bio">Short Bio</label>
                    <Field name="bio" as="textarea" className="h-24 border mt-1 rounded px-4 w-full bg-gray-50" />
                    <ErrorMessage name="bio" component="div" className="text-red-500 text-xs" />
                </div>
                <div className="md:col-span-5 flex justify-between">
                    <button type="button" onClick={prevStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back</button>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
            </Form>
        </Formik>
    );
};

