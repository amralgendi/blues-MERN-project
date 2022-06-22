import nodemailer from 'nodemailer'

interface messageOptionsInput {
    to: string
    subject: string
    text: string
}
interface fullMessageOptions extends messageOptionsInput {
    from: string
}

const sendMail = async (options: messageOptionsInput): Promise<void> => {
    const client = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    })
    const messageOptions: fullMessageOptions = {
        from: process.env.EMAIL as string,
        ...options,
    }

    try {
        await client.sendMail(messageOptions)
    } catch (error) {
        console.log(error)
    }
}

const sendVerificationCode = async (
    email: string,
    code: string
): Promise<void> => {
    await sendMail({
        to: email,
        subject: 'Email Verification',
        text: 'Your email verification code is ' + code,
    })
}

export { sendVerificationCode }
