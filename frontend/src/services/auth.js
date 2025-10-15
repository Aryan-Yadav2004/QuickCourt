import emailjs from "emailjs-com";
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const sendOtpMail = async (email,otp) => {
    const templateParams = {
        email: email,
        passcode: otp
    }
    try{
        const response = await emailjs.send(
            serviceId,
            templateId,
            templateParams,
            publicKey
        )
        console.log("email sent successfully", response.status,response.text);
    }
    catch (error) {
        console.log(error.message);
    }
}

export {sendOtpMail};

