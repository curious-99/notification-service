import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.error("Twilio account SID and auth token must be defined in the .env file.");
  process.exit(1); 
}

export const client = twilio(accountSid, authToken);

export interface TwilioSMSOptions {
  from: string;
  to: string;
  body: string;
}

export interface TwilioWhatsAppOptions {
  from: string;
  to: string;
  body: string;
}

export interface TwilioCallOptions {
  from: string;
  to: string;
  url: string;
}

export const createSMSMsgOptions = (phoneNumber: string, messageBody: string): TwilioSMSOptions => {
  return {
    from: '+14155238886',  
    to: `${phoneNumber}`,
    body: messageBody,
  };
};

export const createWhatsAppMsgOptions = (phoneNumber: string, messageBody: string): TwilioWhatsAppOptions => {
  return {
    from: 'whatsapp:+14155238886',  
    to: `whatsapp:${phoneNumber}`,
    body: messageBody,
  };
};

export const createCallOptions = (phoneNumber: string): TwilioCallOptions => {

  return {
    from: '+14788452536',  
    to: `${phoneNumber}`,
    url: "https://handler.twilio.com/twiml/EH2787fb6aa828e55ea8ce4803a1247b3a"
  }
}