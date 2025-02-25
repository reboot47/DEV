import twilio from 'twilio';
import 'dotenv/config';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Missing Twilio credentials');
}

console.log('=== Twilio Library Configuration ===');
console.log('Account SID:', accountSid ? `${accountSid.slice(0, 4)}...${accountSid.slice(-4)}` : 'missing');
console.log('Auth Token:', authToken ? 'present' : 'missing');
console.log('Phone Number:', twilioPhoneNumber);
console.log('=================================');

export const twilioClient = new twilio.Twilio(accountSid, authToken);

export const sendVerificationCode = async (phoneNumber: string, code: string) => {
  try {
    console.log('Twilio Credentials:', {
      accountSid,
      phoneNumber: twilioPhoneNumber,
      hasAuthToken: !!authToken
    });
    
    console.log('Attempting to send SMS to:', phoneNumber);
    
    // 電話番号を国際形式に変換
    const formattedPhoneNumber = phoneNumber.startsWith('+')
      ? phoneNumber
      : phoneNumber.startsWith('0')
        ? '+81' + phoneNumber.slice(1)
        : '+81' + phoneNumber;

    console.log('Formatted phone number:', formattedPhoneNumber);
    
    const message = await twilioClient.messages.create({
      body: `【LINEBUZZ】認証コード: ${code}\n※このコードは5分間有効です。`,
      from: twilioPhoneNumber,
      to: formattedPhoneNumber,
    });

    console.log('SMS sent successfully, message details:', {
      sid: message.sid,
      status: message.status,
      errorCode: message.errorCode,
      errorMessage: message.errorMessage
    });
    
    return message.sid;
  } catch (error) {
    console.error('Twilio error full details:', error);
    console.error('Twilio error details:', {
      code: (error as any).code,
      message: (error as any).message,
      status: (error as any).status,
      moreInfo: (error as any).moreInfo,
      raw: error
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
