import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Missing Twilio credentials');
}

console.log('Initializing Twilio client with:', {
  accountSid,
  phoneNumber: twilioPhoneNumber,
  // Don't log the auth token for security reasons
});

export const twilioClient = twilio(accountSid, authToken);

export const sendVerificationCode = async (phoneNumber: string, code: string) => {
  try {
    console.log('Attempting to send SMS to:', phoneNumber);
    
    const message = await twilioClient.messages.create({
      body: `【LINEBUZZ】認証コード: ${code}\n※このコードは5分間有効です。`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log('SMS sent successfully, message SID:', message.sid);
    return message.sid;
  } catch (error) {
    console.error('Twilio error details:', {
      code: (error as any).code,
      message: (error as any).message,
      status: (error as any).status,
      moreInfo: (error as any).moreInfo,
    });
    
    // Twilioのエラーメッセージを日本語に変換
    let errorMessage = 'SMSの送信に失敗しました';
    if ((error as any).code === 21614) {
      errorMessage = '無効な電話番号です';
    } else if ((error as any).code === 21211) {
      errorMessage = '電話番号のフォーマットが正しくありません';
    } else if ((error as any).code === 21408) {
      errorMessage = 'この電話番号はSMSを受信できません';
    }
    
    throw new Error(errorMessage);
  }
};
