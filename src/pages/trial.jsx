import React, { useState } from 'react';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

function HorizontalNonLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    {steps.map((label, index) => (
                        <button
                            key={label}
                            className={`${activeStep === index
                                    ? 'bg-blue-500 text-white'
                                    : completed[index]
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-700'
                                } py-2 px-4 rounded-full mr-2 focus:outline-none`}
                            onClick={handleStep(index)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                {allStepsCompleted() ? (
                    <div className="mt-4 mb-2">
                        <p className="text-lg">All steps completed - you're finished</p>
                        <div className="flex items-center justify-end mt-2">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none" onClick={handleReset}>
                                Reset
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-4">
                        <p className="text-lg">Step {activeStep + 1}</p>
                        <div className="flex items-center justify-end mt-2">
                            <button
                                className={`${activeStep === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white py-2 px-4 rounded mr-2 focus:outline-none`}
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button
                                className={`${completed[activeStep]
                                        ? 'bg-green-500 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                    } text-white py-2 px-4 rounded mr-2 focus:outline-none`}
                                onClick={completed[activeStep] ? null : handleComplete}
                            >
                                {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HorizontalNonLinearStepper;
