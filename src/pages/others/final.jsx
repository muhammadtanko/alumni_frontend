import { useState } from 'react';

export default function Onboading() {
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
                Other Info
              </li>
            </ol>

            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-2 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="email@domain.com" />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" placeholder="" />
                    </div>
                    <div className={`md:col-span-5 ${currentStep === 1 ? "text-right" : "flex justify-between"}`}  >
                      {currentStep > 1 && currentStep <= 3 ? (<div className="inline-flex items-end">
                        <button onClick={prevStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{'Back'}</button>
                      </div>) : null}


                      <div className="inline-flex items-end">
                        <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{currentStep === 3 ? 'Submit' : 'Next'}</button>
                      </div>

                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PersonalInfo = () => {
  return (
    <>
    </>
  )
}

// const CareerInfo = () => {
//   return (
   
//   )
// }

// const Others = () => {
//   return (
    
//   )
// }