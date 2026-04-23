import { motion } from 'motion/react';
import { Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WORK_TYPES = [
  '상업 영상 — 광고',
  '상업 영상 — 뮤직비디오',
  '상업 영상 — 드라마 / 영화',
  '웨딩 영상',
  '퍼스널 영상 (유튜브 / 브이로그 등)',
  '기타',
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function Consultation() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    workType: '',
    volume: '',
    deadline: '',
    message: '',
  });
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.workType) {
      setErrorMsg('이름, 연락처, 작업 종류는 필수 항목입니다.');
      return;
    }
    setState('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setState('success');
        setForm({ name: '', phone: '', email: '', workType: '', volume: '', deadline: '', message: '' });
      } else {
        setErrorMsg(data.error || '오류가 발생했습니다.');
        setState('error');
      }
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      setState('error');
    }
  };

  const inputClass = "w-full border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 focus:outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-300";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 min-h-screen flex flex-col bg-white"
    >
      <div className="max-w-4xl mx-auto px-6 w-full flex-grow">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">상담 안내</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">CONSULTATION</p>
        </div>

        {/* Contact Info */}
        <div className="bg-neutral-50 p-12 md:p-16 mb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-6 break-keep">디지털 압구정 DIAP 고객센터</h2>
            <p className="text-neutral-500 font-light leading-relaxed break-keep">
              영상 리터칭에 대한 모든 문의를 환영합니다.<br />
              아래 견적 문의 폼을 이용하시면 더욱 빠르게 상담받으실 수 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full mr-5 flex-shrink-0">
                <Phone size={20} className="text-neutral-700" />
              </div>
              <div className="pt-1">
                <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">PHONE</h3>
                <a href="tel:01058231350" className="text-base text-neutral-900 font-light hover:text-neutral-500 transition-colors">
                  010-5823-1350
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full mr-5 flex-shrink-0">
                <Mail size={20} className="text-neutral-700" />
              </div>
              <div className="pt-1">
                <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">EMAIL</h3>
                <a
                  href="mailto:digitalapgujeong@gmail.com"
                  className="text-base text-neutral-900 font-light hover:text-neutral-500 transition-colors"
                >
                  digitalapgujeong@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full mr-5 flex-shrink-0">
                <Clock size={20} className="text-neutral-700" />
              </div>
              <div className="pt-1">
                <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">HOURS</h3>
                <p className="text-base text-neutral-900 font-light">평일 10:00 – 19:00</p>
                <p className="text-neutral-500 text-sm mt-1 font-light">주말 및 공휴일 휴무</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-200 flex items-start">
            <div className="w-12 h-12 bg-white shadow-sm flex items-center justify-center rounded-full mr-5 flex-shrink-0">
              <MessageCircle size={20} className="text-neutral-700" />
            </div>
            <div className="pt-1">
              <h3 className="text-xs font-bold tracking-[0.2em] mb-2 text-neutral-400">KAKAOTALK</h3>
              <a
                href="https://pf.kakao.com/_xxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-neutral-900 font-light hover:text-neutral-500 transition-colors"
              >
                @디지털압구정
              </a>
              <p className="text-neutral-400 text-xs mt-1 font-light">긴급·주말 작업 문의는 카카오톡 채널로 연락해 주세요.</p>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">견적 문의</h2>
            <p className="text-neutral-400 tracking-[0.2em] text-xs">INQUIRY FORM</p>
          </div>

          {state === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-neutral-50"
            >
              <div className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-xl font-serif mb-3">문의가 접수되었습니다</p>
              <p className="text-neutral-400 text-sm font-light">빠른 시일 내에 연락드리겠습니다.</p>
              <button
                onClick={() => setState('idle')}
                className="mt-8 text-xs tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors underline underline-offset-4"
              >
                새 문의 작성
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-0 border border-neutral-200">
              <div className="grid md:grid-cols-2">
                <div className="border-b border-r-0 md:border-r border-neutral-200">
                  <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                    이름 <span className="text-neutral-900">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none placeholder:text-neutral-300"
                  />
                </div>
                <div className="border-b border-neutral-200">
                  <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                    연락처 <span className="text-neutral-900">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none placeholder:text-neutral-300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="border-b border-r-0 md:border-r border-neutral-200">
                  <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                    이메일 <span className="text-neutral-300 font-normal">(선택)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="answer@email.com"
                    className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none placeholder:text-neutral-300"
                  />
                </div>
                <div className="border-b border-neutral-200">
                  <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                    작업 종류 <span className="text-neutral-900">*</span>
                  </label>
                  <select
                    name="workType"
                    value={form.workType}
                    onChange={handleChange}
                    className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>선택해 주세요</option>
                    {WORK_TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2">
                <div className="border-b border-r-0 md:border-r border-neutral-200">
                  <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                    영상 분량 <span className="text-neutral-300 font-normal">(선택)</span>
                  </label>
                  <input
                    type="text"
                    name="volume"
                    value={form.volume}
                    onChange={handleChange}
                    placeholder="예) 3분 30초 / 약 50컷"
                    className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none placeholder:text-neutral-300"
                  />
                </div>
                <div className="border-b border-neutral-200">
                  <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                    희망 납기일 <span className="text-neutral-300 font-normal">(선택)</span>
                  </label>
                  <input
                    type="text"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    placeholder="예) 2025년 5월 초 / 협의 가능"
                    className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none placeholder:text-neutral-300"
                  />
                </div>
              </div>

              <div className="border-b border-neutral-200">
                <label className="block px-6 pt-5 pb-1 text-[10px] tracking-[0.2em] text-neutral-400 font-bold">
                  추가 요청사항 <span className="text-neutral-300 font-normal">(선택)</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="원하시는 보정 방향, 참고 영상 링크, 기타 요청사항을 자유롭게 작성해 주세요."
                  className="w-full px-6 pb-5 pt-1 text-sm text-neutral-900 bg-white focus:outline-none placeholder:text-neutral-300 resize-none"
                />
              </div>

              {errorMsg && (
                <p className="px-6 py-3 text-xs text-red-500 bg-red-50">{errorMsg}</p>
              )}

              <div className="p-6 flex items-center justify-between bg-neutral-50">
                <p className="text-[11px] text-neutral-400 font-light">
                  * 표시 항목은 필수 입력입니다
                </p>
                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="bg-neutral-900 text-white px-10 py-3.5 text-xs tracking-[0.2em] font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state === 'loading' ? '전송 중...' : '문의 전송'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
