import { client } from "@/lib/utils/sanity-client";
import { NextRequest } from "next/server";
import { Resend } from "resend";
import { randomUUID } from "node:crypto";

const resend = new Resend(process.env.RESEND_KEY);
const FROM = process.env.EMAIL_SENDER;
const TO = process.env.EMAIL_RECEIVER;
const uuid = randomUUID();

export async function POST(request: NextRequest){
    const { email, fullname } = await request.json();
    //@ts-ignore
    const createNewsletter = {
        _id: `0x${btoa(email).split('').map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('')}`,
        _type: 'subscriber',
        email: email,
        name: fullname,
        subscribedAt: new Date().toISOString()
    };

    const neswletterResult = await client.createOrReplace(createNewsletter);
    try {
        if (!neswletterResult._id) {
            return new Response(JSON.stringify({ message: 'Subscription failed' }), { status: 402 });
        }
    
        const emailSubject = `Newsletter subscription`;
        const emailHtml = `<p>There's a newsletter subscriber on the website</p>`;
        resend.emails.send({
            from: `deckardtyler+ web <${FROM}>`,
            to: TO!,
            subject: emailSubject,
            html: emailHtml
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'An error occured.' }), { status: 400 });
    }
    
    return new Response(JSON.stringify({message: 'Successfully subscribed'}), {status: 200})
}