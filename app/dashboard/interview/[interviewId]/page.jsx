"use client"
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { use } from 'react' // Use `use()` for unwrapping params

function Interview({ params }) {
    // Resolve params using `use()`
    const resolvedParams = use(params);

    const [interviewData, setInterviewData] = useState(null);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    const GetInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, resolvedParams.interviewId));

        console.log(result);
        setInterviewData(result[0]);
    };

    useEffect(() => {
        if (resolvedParams?.interviewId) {
            console.log('Interview ID:', resolvedParams.interviewId);
            GetInterviewDetails();
        }
    }, [resolvedParams?.interviewId]); // Add dependency on resolvedParams

    if (!interviewData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-10">
            <h2 className="font-bold text-2xl">Let's get Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col my-5 gap-5">
                    <div className="flex flex-col p-5 rounded-lg border gap-5">
                        <h2 className="text-lg">
                            <strong>Job Role/Job Position: </strong>
                            {interviewData.jobPosition}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Job Description/Tech Stack: </strong>
                            {interviewData.jobDesc}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Years of Experience: </strong>
                            {interviewData.jobExperience}
                        </h2>
                    </div>
                    <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
                        <h2 className="flex gap-2 items-center text-yellow-500">
                            <Lightbulb />
                            <strong>Information</strong>
                        </h2>
                        <h2 className="mt-3 text-yellow-500">
                            {process.env.NEXT_PUBLIC_INFORMATION}
                        </h2>
                    </div>
                </div>

                <div>
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => setWebCamEnabled(true)}
                            >
                                Enable Web Cam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-end items-end">
                <Link href={'/dashboard/interview/' + resolvedParams.interviewId + '/start'}>
                    <Button className='hover:bg-slate-400'>Start Interview</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
