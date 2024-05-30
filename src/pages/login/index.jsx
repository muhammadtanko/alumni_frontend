import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail, HiEye } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Spinner } from "flowbite-react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const handleClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://localhost:4000/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.ok) {
        setMessage(JSON.stringify(data.payLoad.message));
        resetForm();
        setLoading(false)
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500);
      } else {
        setIsError(true);
        setMessage(data.message);
        setTimeout(() => {
          setMessage('');
          setLoading(false)
        }, 1500);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setIsError(true);
    }


  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 p-4">
      <div className="bg-white rounded shadow-2xl p-4 md:p-8 w-full md:w-[35%]">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Label htmlFor="email" value="Your email" />
                <Field
                  as={TextInput}
                  id="email"
                  name="email"
                  type="email"
                  icon={HiMail}
                  placeholder="example@gmail.com"
                  shadow
                  className={
                    errors.email && touched.email ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="password" value="Your password" />
                <Field
                  as={TextInput}
                  id="password"
                  name="password"
                  type="password"
                  icon={HiEye}
                  placeholder="Password"
                  shadow
                  className={
                    errors.password && touched.password ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                {/* {errors} */}
              </div>
              <div className="my-4">
                <p className="text-base text-gray-500">
                  No account?{" "}
                  <span
                    className="underline cursor-pointer"
                    onClick={handleClick}
                  >
                    Register
                  </span>
                </p>
              </div>
              <Button
                disabled={!(isValid && dirty)}
                className="bg-bgDArk" type="submit">
                {loading ? <Spinner size="sm" /> : 'Login'}
              </Button>

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

export default Login;
