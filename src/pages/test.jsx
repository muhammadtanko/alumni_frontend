import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Stepper = () => {
    const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
    const [currentStep, setCurrentStep] = useState(1);
    const [complete, setComplete] = useState(false);

    return (
        <>
            <div className="flex justify-between">
                {steps?.map((step, i) => (
                    <div
                        key={i}
                        className={`relative flex flex-col justify-center items-center w-36 ${currentStep === i + 1 ? "active" : ""
                            } ${i + 1 < currentStep || complete ? "complete" : ""}`}
                    >
                        <div className="w-10 h-10 flex items-center justify-center z-10 relative rounded-full font-semibold text-white bg-slate-700">
                            {i + 1 < currentStep || complete ? <FiMenu size={24} /> : i + 1}
                        </div>
                        <p className="text-gray-500">{step}</p>
                        {i !== steps.length - 1 && (
                            <div className="absolute w-full h-[3px] bg-slate-200 right-2/4 top-1/3 -translate-y-2/4"></div>
                        )}
                    </div>
                ))}
            </div>
            {!complete && (
                <button
                    className="bg-bgDArk"
                    onClick={() => {
                        currentStep === steps.length
                            ? setComplete(true)
                            : setCurrentStep((prev) => prev + 1);
                    }}
                >
                    {currentStep === steps.length ? "Finish" : "Next"}
                </button>
            )}
        </>
    );
};

export default Stepper;
