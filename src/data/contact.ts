export const WORK_TYPES = [
  "영상 뷰티 리터칭",
  "오브젝트 클리닝",
  "뷰티 리터칭 + 클리닝",
  "기타 / 상담 후 결정",
] as const;
export const CONTACT_LIMITS = {
  name: 100,
  phone: 40,
  email: 254,
  workType: 80,
  volume: 200,
  deadline: 100,
  message: 5000,
} as const;
export type ContactData = Record<keyof typeof CONTACT_LIMITS, string>;
export function validateContact(
  body: unknown,
): { ok: true; data: ContactData } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body))
    return { ok: false, error: "INVALID_BODY" };
  const source = body as Record<string, unknown>;
  const data = {} as ContactData;
  for (const field of Object.keys(CONTACT_LIMITS) as (keyof ContactData)[]) {
    const value = source[field];
    if (value != null && typeof value !== "string")
      return { ok: false, error: field };
    const text = typeof value === "string" ? value.trim() : "";
    if (
      text.length > CONTACT_LIMITS[field] ||
      (field === "message"
        ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/
        : /[\u0000-\u001F\u007F]/
      ).test(text)
    )
      return { ok: false, error: field };
    data[field] = text;
  }
  if (
    !data.name ||
    !data.phone ||
    !WORK_TYPES.includes(data.workType as (typeof WORK_TYPES)[number])
  )
    return { ok: false, error: "REQUIRED_FIELDS" };
  const digits = data.phone.replace(/\D/g, "");
  if (
    !/^[+()\d .-]+$/.test(data.phone) ||
    digits.length < 7 ||
    digits.length > 20
  )
    return { ok: false, error: "phone" };
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return { ok: false, error: "email" };
  return { ok: true, data };
}
