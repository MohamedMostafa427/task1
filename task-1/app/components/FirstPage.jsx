"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { MdCloudUpload } from "react-icons/md";
import { useMutation } from 'react-query';
import Link from 'next/link';
const axiosInstance = axios.create({
    baseURL: "https://api.ymtaz.sa/api/client",
    headers: {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS55bXRhei5zYS9hcGkvY2xpZW50L2xvZ2luIiwiaWF0IjoxNzIwMzM1ODA5LCJleHAiOjIxNjAxNzIwMzM1ODA5LCJuYmYiOjE3MjAzMzU4MDksImp0aSI6IngyeTgxcG54NGdseTdYTHMiLCJzdWIiOiIxNjUxIiwicHJ2IjoiMmE4NDY2MmMzMzE1NzU0NmM0M2Y0MDM3NTQ2NDE1YmM3MGQ3OGJiYyJ9.W3Uq_o1mzr9srAYpZcDcvqcoXzd60e26yrt_vM5Hgzg",
    },
});

const submitRequest = async (formData) => {
    try {
        const response = await axiosInstance.post("/services-request", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in request:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const FirstPage = () => {
    const [formState, setFormState] = useState({
        service_id: '36',
        priority: '',
        description: '',
        accept_rules: '1'
    });
    const [file, setFile] = useState(null);

    const { mutate, isLoading, isError, isSuccess, error } = useMutation(submitRequest);

    function handleInputChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }

    function handleFileChange(e) {
        setFile(e.target.files[0]);
    }

    function handleSubmit(e) {
        const formData = new FormData();
        formData.append('service_id', formState.service_id);
        formData.append('priority', formState.priority);
        formData.append('description', formState.description);
        formData.append('accept_rules', formState.accept_rules);

        if (file) {
            formData.append('file', file);
        }
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        mutate(formData, {
            onError: (error) => {
                console.error("Error submitting form:", error.response ? error.response.data : error.message);
            },
            onSuccess: (data) => {
                console.log("Form submitted successfully:", data);
            },
        });
    }

    return (
        <div className='flex flex-col gap-12 mt-5'>
            <h1 className='flex relative font-semibold text-2xl'>الملكية الفكرية</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 text-[#696f79]'>
                <div className='w-[300px] sm:w-[500px] md:w-[700px] lg:w-[920px] flex flex-col'>
                    <label>نوع الخدمة</label>
                    <input
                        name='priority'
                        onChange={handleInputChange}
                        type="text"
                        className='lg:w-full h-12 rounded'
                        placeholder='الملكية الفكرية'
                    />
                </div>
                <div className='flex flex-col'>
                    <label>مستوي الطالب</label>
                    <select
                        onChange={handleInputChange}
                        className='h-12 rounded'
                        name='description'>
                        <option value="مهم جدا">مهم جدا*</option>
                        <option value="تبنهقتهبت">تبنهقتهبت</option>
                        <option value="تبنهقتهبت">تبنهقتهبت</option>
                        <option value="تبنهقتهبت">تبنهقتهبت</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label>محتوي الطالب</label>
                    <textarea
                        name='accept_rules'
                        onChange={handleInputChange}
                        className='h-24'>
                    </textarea>
                </div>
                <div className='flex flex-col gap-2'>
                    <label>المرفقات</label>
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer p-5 bg-white flex flex-col rounded items-center">
                        <input
                            name='file'
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <MdCloudUpload className='text-7xl' />
                        <p className="mt-2 text-xs text-gray-400">مرفقات الطلب اختيارية</p>
                    </label>
                </div>
                <button
                    type="submit"
                    className='p-3 text-white md:w-[35%] rounded mx-auto bg-[#ddb762]'>
                    <Link href="../secound">
                        تأكيد الطلب
                    </Link>
                </button>
            </form>

            {isLoading && <p>Submitting...</p>}
            {isError && <p>There was an error submitting your request: {error.message}</p>}
            {isSuccess && <p>Request submitted successfully!</p>}
        </div>
    );
}
