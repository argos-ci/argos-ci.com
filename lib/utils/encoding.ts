export const base64Encode = (obj: any): string => {
  return Buffer.from(JSON.stringify(obj), "utf8").toString("base64");
};
