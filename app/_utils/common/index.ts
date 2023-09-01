import { TisJSON } from '@/app/_interfaces';
import { NextRequest } from 'next/server';



export const _isJSON = (req: NextRequest) => {
  const contentType = req.headers.get("content-type");
  let isJson:TisJSON = null;

  if(!contentType) isJson = null
  else if (contentType === "application/json") isJson = "JSON"
  else if (contentType.includes("multipart/form-data")) isJson = "Form"
  else isJson = "WRONG"

  return isJson;
};