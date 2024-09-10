import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { HiMail, HiEye } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Spinner } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, clearMessage, clearError } from "../../store/reducers/userSlice";
import { useEffect } from "react";



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const registrationStatus = useSelector((state) => state.user.registrationStatus);
  const { message, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      if (registrationStatus === "incomplete") {
        const timer = setTimeout(() => {
          dispatch(clearMessage());
          navigate('/onboarding');
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          dispatch(clearMessage());
          navigate('/set');
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [loginStatus, registrationStatus])
  const handleClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(loginUser(values));

  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
 
  const displayMessage = error ? (typeof error === 'string' ? error : error?.message)
    : (typeof message === 'string' ? message : message?.message);

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
                {loginStatus === "loading" ? <Spinner size="sm" /> : 'Login'}
              </Button>

            </Form>
          )}
        </Formik>
        {displayMessage && (
          <div className={`mt-4 text-center ${error ? 'text-red-500' : 'text-green-500'}`}>
            {displayMessage}
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
