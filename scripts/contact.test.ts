import { test } from "node:test";
import assert from "node:assert/strict";
import { validateContact, CONTACT_LIMITS } from "../src/data/contact";
import handler from "../api/contact";
const valid = {
  name: " Studio ",
  phone: "+82 (10) 1234-5678",
  email: "artist@example.com",
  workType: "영상 뷰티 리터칭",
  message: "Line one\nLine two",
};
test("valid international contact is trimmed; optional fields default empty", () => {
  const result = validateContact(valid);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.name, "Studio");
    assert.equal(result.data.volume, "");
    assert.equal(result.data.message, valid.message);
  }
});
test("reject non-object bodies and non-string fields", () => {
  for (const body of [
    null,
    undefined,
    [],
    "text",
    1,
    { ...valid, name: {} },
    { ...valid, email: [] },
    { ...valid, message: 123 },
  ])
    assert.equal(validateContact(body).ok, false);
});
test("reject blanks, unsupported work types, invalid email and header injection", () => {
  for (const patch of [
    { name: "   " },
    { phone: " " },
    { workType: "other" },
    { phone: "call me" },
    { phone: "123" },
    { email: "invalid" },
    { email: "a@example.com\r\nBcc: b@example.com" },
    { name: "a\nb" },
    { message: "text\u0000" },
  ])
    assert.equal(validateContact({ ...valid, ...patch }).ok, false);
});
test("enforce field limits including message boundary", () => {
  assert.equal(
    validateContact({ ...valid, message: "x".repeat(CONTACT_LIMITS.message) })
      .ok,
    true,
  );
  for (const field of [
    "name",
    "email",
    "phone",
    "volume",
    "deadline",
    "message",
  ])
    assert.equal(
      validateContact({
        ...valid,
        [field]: "x".repeat(CONTACT_LIMITS[field] + 1),
      }).ok,
      false,
    );
});
test("API rejects invalid input before mail configuration or transport", async () => {
  for (const body of [
    null,
    [],
    { ...valid, name: " " },
    { ...valid, phone: "bad" },
    { ...valid, workType: "bad" },
    { ...valid, email: "invalid" },
    { ...valid, message: "x".repeat(5001) },
  ]) {
    const res = {
      code: 0,
      status(n: number) {
        this.code = n;
        return this;
      },
      json(value: unknown) {
        return value;
      },
    };
    await handler({ method: "POST", body } as any, res as any);
    assert.equal(res.code, 400);
  }
});
test("API method restrictions advertise POST", async () => {
  const res = {
    code: 0,
    allow: "",
    status(n: number) {
      this.code = n;
      return this;
    },
    setHeader(_: string, v: string) {
      this.allow = v;
    },
    json(v: unknown) {
      return v;
    },
  };
  await handler({ method: "GET" } as any, res as any);
  assert.equal(res.code, 405);
  assert.equal(res.allow, "POST");
});
