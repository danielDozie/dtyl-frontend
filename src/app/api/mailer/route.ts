import { Resend } from 'resend';
import { client } from '@/lib/utils/sanity-client';
import { NextRequest } from 'next/server';
import { randomUUID } from 'node:crypto';

const resend = new Resend(process.env.RESEND_KEY);
const FROM = process.env.EMAIL_SENDER;
const TO = process.env.EMAIL_RECEIVER;

export async function POST(request: NextRequest) {
    const { selectedOption, name, phone, email, message } = await request.json();
    const uuid = randomUUID();

    //@ts-ignore
    const createMessage = (type, title, fields) => ({
        _id: uuid,
        _type: 'message',
        isCallbackRequest: type === 'callback',
        title,
        ...fields,
        createdAt: new Date().toISOString()
    });

    const messageOptions = {
        message: {
            title: `Contact message received from ${name}`,
            fields: { name, email, message }
        },
        callback: {
            title: `Callback request from ${name}`,
            fields: { callbackName: name, callbackPhoneNumber: phone }
        }
    };

    try {
        //@ts-ignore
        const { title, fields } = messageOptions[selectedOption];
        const mutationResult = await client.createOrReplace(createMessage(selectedOption, title, fields));
        if (!mutationResult._id) {
            return new Response(JSON.stringify({ message: 'failed to send' }), { status: 402 });
        }

        const emailSubject = `A new ${selectedOption} notification from the website contact page`;
        const emailHtml = selectedOption === 'message' 
            ? `<p>There's a new message notification from ${name}.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>
               <p><strong>DATE AND TIME:</strong> ${new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase()}</p>`
            : `<p>There's a new callback request from ${name}.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Phone:</strong> ${phone}</p>
               <p><strong>DATE AND TIME:</strong> ${new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toUpperCase()}</p>`;
        resend.emails.send({
            from: `deckardtyler+ web <${FROM}>`,
            to: TO!,
            subject: emailSubject,
            html: emailHtml
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: error }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: 'success' }), { status: 200 });
};