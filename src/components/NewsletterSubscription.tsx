'use client'
import React, { FormEvent, useState } from 'react'
import { Text } from './ui/text';
import AppButton from './ui/app-button';
import { CheckCircle, CheckCircle2, CheckIcon, Mail } from 'lucide-react';
import { FaEnvelopesBulk } from 'react-icons/fa6';
import Link from 'next/link';

export default function NewsletterSubscription() {
    const initialPayload = {
        email: '',
        fullname: ''
    }
    const [payload, setPayload] = useState(initialPayload);
    const [switchForm, setSwitchForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubscription = async (e:  FormEvent<HTMLFormElement>) => {
        setLoading(true)

        e.preventDefault();
        if(!payload.email){
            //display error then
            setLoading(false);
            return;
        }
        setSwitchForm(true);
        if(!payload.fullname){
            setLoading(false)
            return;
        }
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if(res.status == 200){
              setSuccessMessage(data.message)
            }
        } catch (error) {
            console.log(error)
            setSuccessMessage('Subscription failed' as any)
        } finally{
            setSwitchForm(false);
            setPayload(initialPayload);
            setLoading(false)
            setTimeout(() => {
              setSuccessMessage('')
            }, 3500);
        }

    };
  return (
    <>
        <form className="w-full md:w-[30%] mt-8 md:mt-0" onSubmit={handleSubscription}>
              <h4 className="text-xl md:text-lg font-medium mb-3">Newsletter</h4>
              <Text className="mb-4">
                Stay updated with our latest news and offers.
              </Text>
              <div className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={payload.email}
                  onChange={(e) => setPayload({ ...payload, email: e.target.value })}
                  className={`p-2 border-none rounded focus:outline-none focus:ring-1 focus:ring-transparent focus:border-transparent bg-gray-100 dark:bg-gray-800 ${switchForm && 'hidden'}`}
                />
                <input
                  type="fullname"
                  placeholder="Enter full name to confirm"
                  value={payload.fullname}
                  onChange={(e) => setPayload({ ...payload, fullname: e.target.value })}
                  className={`p-2 border-none rounded focus:outline-none focus:ring-1 focus:ring-transparent focus:border-transparent bg-green-100 dark:bg-green-800 hidden ${switchForm && ' !flex' }`}
                />
                {successMessage && <span className="flex text-sm gap-x-2 font-semibold text-yellow-600 transition-all">{successMessage} </span>}
              </div>
              <div className="flex justify-between items-center my-4">
                <div className="float-left">
                  <Text size={"sm"} className="font-extralight italic">
                    We don&apos;t spam, we promise.
                    <sup className="text-red">*</sup>
                  </Text>
                </div>
                <div className="float-right">
                  <AppButton title={!switchForm ? 'Subscribe' : 'Confirm'} icon={Mail} loading={loading} />
                </div>
              </div>

              <div className="flex space-x-2 mt-4 group">
                <Link href={'https://webmail.deckardtyler.com/'} target="_blank">
                <Text size='lg' className="uppercase group-hover:text-red font-bold">Team Access</Text>
                </Link>
                <FaEnvelopesBulk size={28} className="group-hover:text-red" />
              </div>
            </form>
    </>

  )
}
