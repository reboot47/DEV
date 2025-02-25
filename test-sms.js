require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

console.log('Twilio設定:', {
  accountSid: accountSid ? accountSid.substring(0, 5) + '...' : 'なし',
  hasAuthToken: !!authToken,
  phoneNumber: twilioPhoneNumber
});

const phoneNumber = '+819014884757';  // 国際形式
const message = 'これはテストメッセージです。';

client.messages.create({
  body: message,
  to: phoneNumber,
  from: twilioPhoneNumber
})
.then(message => {
  console.log('送信成功:', {
    sid: message.sid,
    status: message.status,
    error: message.errorCode
  });
})
.catch(error => {
  console.error('送信エラー:', {
    code: error.code,
    message: error.message,
    moreInfo: error.moreInfo
  });
});
