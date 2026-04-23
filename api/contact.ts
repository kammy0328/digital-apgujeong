import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, workType, volume, deadline, message } = req.body;

  if (!name || !phone || !workType) {
    return res.status(400).json({ error: '이름, 연락처, 작업 종류는 필수 항목입니다.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'digitalapgujeong@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailText = `
새로운 견적 문의가 접수되었습니다.

■ 이름: ${name}
■ 연락처: ${phone}
■ 이메일: ${email || '미입력'}
■ 작업 종류: ${workType}
■ 영상 분량: ${volume || '미입력'}
■ 희망 납기일: ${deadline || '미입력'}
■ 추가 요청사항:
${message || '없음'}

---
디지털 압구정 웹사이트 견적 문의 폼
  `.trim();

  const mailHtml = `
<div style="font-family: 'Apple SD Gothic Neo', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background: #fafafa; border: 1px solid #e5e5e5;">
  <h2 style="font-size: 20px; color: #171717; margin: 0 0 8px 0;">새로운 견적 문의</h2>
  <p style="color: #888; font-size: 13px; margin: 0 0 32px 0;">디지털 압구정 웹사이트에서 접수된 문의입니다.</p>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; width: 120px; vertical-align: top;">이름</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #171717; font-size: 14px;">${name}</td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; vertical-align: top;">연락처</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #171717; font-size: 14px;">${phone}</td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; vertical-align: top;">이메일</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #171717; font-size: 14px;">${email || '미입력'}</td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; vertical-align: top;">작업 종류</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #171717; font-size: 14px; font-weight: 600;">${workType}</td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; vertical-align: top;">영상 분량</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #171717; font-size: 14px;">${volume || '미입력'}</td></tr>
    <tr><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; vertical-align: top;">희망 납기일</td><td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; color: #171717; font-size: 14px;">${deadline || '미입력'}</td></tr>
    <tr><td style="padding: 12px 0; color: #888; font-size: 12px; vertical-align: top;">추가 요청사항</td><td style="padding: 12px 0; color: #171717; font-size: 14px; white-space: pre-line;">${message || '없음'}</td></tr>
  </table>
  <p style="margin: 32px 0 0 0; color: #aaa; font-size: 11px; border-top: 1px solid #e5e5e5; padding-top: 16px;">디지털 압구정 · digitalapgujeong@gmail.com</p>
</div>
  `.trim();

  try {
    await transporter.sendMail({
      from: '"디지털 압구정 문의" <digitalapgujeong@gmail.com>',
      to: 'digitalapgujeong@gmail.com',
      replyTo: email || undefined,
      subject: `[견적 문의] ${workType} — ${name}`,
      text: mailText,
      html: mailHtml,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: '메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.' });
  }
}
