import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, TextInput, Label } from "flowbite-react";
import { HiMail, HiEye } from "react-icons/hi";
import { Datepicker } from "flowbite-react";




const Register = () => {
    const chapters = [
        { code: "US", name: "USA/Canada" },
        { code: "CA", name: "Abuja" },
        { code: "FR", name: "United Kingdom" },
        { code: "DE", name: "Niger State" },
        { code: "DE", name: "Rivers State" },
        { code: "DE", name: "Lagos" },
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1989 + 1 }, (_, index) => currentYear - index);

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedChapter, setSelectedChapter] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/dashboard")
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400">
            <div className="m-7 bg-white rounded shadow-2xl p-4 md:p-8 w-full md:w-[45%] flex flex-col">
                <div className="text-left mb-3 md:mb-5">
                    <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
                </div>
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                    <div>
                        <TextInput className="focus:border-blue-500" type="text" placeholder="First Name" shadow />
                    </div>
                    <div className="">
                        <TextInput className="focus:border-blue-500" type="text" placeholder="Last Name" shadow />
                    </div>
                    <div>
                        <TextInput className="focus:border-blue-500" type="email" icon={HiMail} placeholder="Email" shadow />
                    </div>
                    <div className="">
                        <TextInput className="focus:border-blue-500" type="text" placeholder="Last Name" shadow />
                    </div>
                    <div className="">
                        <TextInput className="focus:border-blue-500" icon={HiEye} type="password" placeholder="Password" shadow />
                    </div>
                    <div className="">
                        <select
                            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 "
                            value={selectedChapter}
                            onChange={(e) => setSelectedChapter(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Choose a Chapter
                            </option>
                            {chapters.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        <select
                            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="" disabled hidden>
                                Year of Graduation
                            </option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        <Label htmlFor="password2" value="Date Of Birth" />

                        <Datepicker title="Select Your DOB" />
                    </div>
                </div>
                <div className="flex justify-end mt-3 md:mt-8">
                    <Button className="bg-bgDArk w-full md:w-1/3 " type="submit" onClick={handleSubmit}>Register</Button>
                </div>
            </div>
        </div>
    )
}

export default Register;



