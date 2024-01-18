import crypto from "crypto";

export const encrypt = function (plainText, workingKey) {
  let m = crypto.createHash("md5");
  m.update(workingKey);
  const key = m.digest();
  const iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
  let cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encoded = cipher.update(plainText, "utf8", "hex");
  encoded += cipher.final("hex");
  return encoded;
};

export const decrypt = function (encText, workingKey) {
  let m = crypto.createHash("md5");
  m.update(workingKey);
  const key = m.digest();
  const iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
  let decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decoded = decipher.update(encText, "hex", "utf8");
  decoded += decipher.final("utf8");
  return decoded;
};
