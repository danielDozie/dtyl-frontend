'use client'
import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/sections/Container";
import AppButton from "@/components/ui/app-button";
import { Text } from "@/components/ui/text";
import { ReactElement, useState, FormEvent } from "react";

const CallbackForm = ({ 
    payload,
    setPayload,
    handleSubmit,
    loading 
}: {
    payload: {
        name: string,
        phone: string
    }
    setPayload: ({name, phone}: {name: string, phone: string}) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    loading: boolean
}) => (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 items-center w-full md:w-3/5">
        <span className="py-4 flex flex-col">
            <Text className="text-center text-xl">want to discuss a prospect, an opportunity, or a general enquiry, drop your details and we’ll ring you</Text>
            {/* <Text className="text-center text-xl"></Text> */}
        </span>
        <input
            type="text"
            placeholder="Your Name"
            value={payload.name}
            onChange={(e) => setPayload({...payload, name: e.target.value})}
            className="w-full p-2 border border-foreground focus:outline-none"
            required
            id="callback-name"
        />
        <input
            type="tel"
            placeholder="Your Phone Number"
            value={payload.phone}
            onChange={(e) => setPayload({...payload, phone: e.target.value})}
            className="w-full p-2 border border-foreground focus:outline-none"
            required
            id="callback-phone"
        />
        <AppButton title="Request Callback" fullWidth loading={loading}/>
        
    </form>
);


const MessageForm = ({
    payload,
    setPayload,
    handleSubmit,
    loading
}: {
    payload: {
        name: string;
        email: string;
        message: string;
    }
    setPayload: ({name, email, message}: {name: string; email: string; message: string;}) => void,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    loading: boolean;
}) => (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 items-center w-full md:w-3/5">
        <span className="py-4 flex flex-col">
            <Text className="text-center text-xl">Got something on your mind, drop us a line and we’ll get back to you</Text>
        </span>
        
        <input
            type="text"
            placeholder="Your Name"
            value={payload.name}
            onChange={(e) => setPayload({...payload, name: e.target.value})}
            className="w-full p-2 border border-foreground focus:outline-none"
            required
            id="message-name"
        />
        <input
            type="email"
            placeholder="Your Email"
            value={payload.email}
            onChange={(e) => setPayload({...payload, email: e.target.value})}
            className="w-full p-2 border border-foreground focus:outline-none"
            required
            id="message-email"
        />
        <textarea
            placeholder="Your Message"
            value={payload.message}
            onChange={(e) => setPayload({...payload, message: e.target.value})}
            className="w-full p-2 border border-foreground focus:outline-none"
            rows={4}
            required
            id="message-content"
        ></textarea>
        <AppButton title="Send Message" fullWidth paddingVertical loading={loading} />
    </form>
);

export default function ContactPage(): ReactElement {
    const [selectedOption, setSelectedOption] = useState<'callback' | 'message'>('callback');
    
    const initialPayload ={
        name: '',
        email: '',
        phone: '',
        message: ''
    }
    const [payload, setPayload] = useState(initialPayload);
    const initialStatus = {
        success: '',
        error: ''
    }
    const [status, setStatus] = useState<{success?: string, error?: string}>(initialStatus)

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/mailer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...payload, selectedOption})
            });
            if(!res.ok){
                setStatus({error: 'An error occured submtting the form'});
                setTimeout(() => {
                    setStatus(initialStatus)
                }, 2000);
                return;
            }
            const data = await res.json();
            if(data.message){
                setStatus({success: 'Message sent successfully'});
                setPayload(initialPayload);
                setTimeout(() => {
                    setStatus(initialStatus)
                }, 2000);
            }
            
        } catch (error) {
            setStatus({error: 'Message sending failed'});
            setTimeout(() => {
                setStatus(initialStatus)
            }, 2000);
        }finally{
            setLoading(false);
        }
    };


    return (
        <Container>
            <>
                <Breadcrumb title={'contact'} link={'/contact'} />
                <div className='w-full flex flex-start flex-col space-y-4 md:my-4'>
                    <div className="flex w-full md:w-[75%] flex-col mx-auto justify-center items-center mt-8">
                    <div className="flex flex-col justify-center items-center">
                        <Text size={'heading'} className="!text-4xl text-center md:text-[40px] pb-12 md:pb-0">We will be glad to talk to you</Text>
                        <div className="w-full flex mt-8 border-2 items-center justify-center mx-auto border-foreground space-x-2">
                            <span 
                                className={`w-1/2 flex px-6 py-2 cursor-pointer !text-center ${selectedOption === 'callback' ? 'bg-foreground text-background' : ''}`}
                                onClick={() => setSelectedOption('callback')}
                            >
                                Request a call back
                            </span>
                            <span 
                                className={`w-1/2 flex px-6 py-2 cursor-pointer !text-center ${selectedOption === 'message' ? 'bg-foreground text-background' : ''}`}
                                onClick={() => setSelectedOption('message')}
                            >
                                Send us a message
                            </span>
                        </div>
                    </div>

                        {selectedOption === 'callback' ? (
                            <CallbackForm
                                payload={payload}
                                setPayload={(values) => setPayload({ 
                                    ...payload, 
                                    ...values 
                                })}
                                handleSubmit={handleSubmit}
                                loading={loading}
                            />
                        ) : (
                            <MessageForm
                                payload={payload}
                                setPayload={(values) => setPayload({ 
                                    ...payload, 
                                    ...values 
                                })}
                                handleSubmit={handleSubmit}
                                loading={loading}
                            />
                        )}
                    </div>
                    <span className={`flex justify-center text-sm items-center ${status.success && '!text-green-600'} ${status.error && '!text-red'}`}>
                        {status.success || status.error}
                    </span>
                </div>
            </>
        </Container>
    )
}