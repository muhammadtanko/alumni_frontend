import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { configs } from "../../config"; // Ensure configs is imported

// Yup validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  startTime: Yup.date().required("Start time is required").typeError("Invalid date format"),
  endTime: Yup.date()
    .required("End time is required")
    .min(Yup.ref("startTime"), "End time cannot be before start time")
    .typeError("Invalid date format"),
  category: Yup.string()
    .oneOf(["virtual", "onSite"], "Invalid category")
    .required("Category is required"),
  url: Yup.string()
    .url("Invalid URL format")
    .required("URL is required"),
  description: Yup.string().required("Description is required"),
});

const EventForm = () => {
  const [message, setMessage] = useState(null); // For success/error messages
  const [messageType, setMessageType] = useState(""); // For message type (success/error)

  const initialValues = {
    title: "",
    startTime: "",
    endTime: "",
    category: "virtual", // default value
    url: "",
    description: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage(null); // Clear previous messages
    try {
      const response = await fetch(`${configs.baseUrl}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result?.payLoad?.message || "Error submitting the form");
      }

      // Success: Display success message and reset the form
      setMessage(result.payLoad.message);
      setMessageType("success");
      resetForm();
    } catch (error) {
      // Error: Display error message
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Field
              type="text"
              name="title"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Event title"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <Field
              type="datetime-local"
              name="startTime"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <Field
              type="datetime-local"
              name="endTime"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <Field
              as="select"
              name="category"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="virtual">Virtual</option>
              <option value="onSite">On-site</option>
            </Field>
            <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              URL
            </label>
            <Field
              type="text"
              name="url"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="https://example.com"
            />
            <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Event description"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Submit Button and Messages */}
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {/* Success and Error Messages */}
            {message && (
              <div
                className={`mt-4 text-sm ${messageType === "success" ? "text-green-500" : "text-red-500"}`}
              >
                {message}
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
