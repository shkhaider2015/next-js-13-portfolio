import { NextApiRequest, NextApiResponse } from "next";
// import { Fields, Files, IncomingForm } from "formidable";
// import formidable from 'formidable';
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { serialize } from "object-to-formdata";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    let data = null;
    const errors: string[] = [];
    if (_isJSON(req)) {
      data = serialize(await req.json());
    } else {
      data = await req.formData();
    }
    const title: string = data.get("title")?.toString() || "";
    const details: string = data.get("details")?.toString() || "";

    if (_.isEmpty(title)) errors.push("Title field is required");
    if (_.isEmpty(details)) errors.push("Details field is required");

    if (!_.isEmpty(errors)) {
      return NextResponse.json({ message: errors }, { status: 400 });
    }

    const notesData = await prisma.notes.create({
      data: {
        title: title,
        details: details,
      },
    });

    await prisma.$disconnect();

    if (_.isEmpty(notesData)) {
      return NextResponse.json({ message: "Couldn't create note" }, {status: 401});
    }

    return NextResponse.json(
      { message: "Note created successfully", data: notesData },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }

  // const errors: string[] = [];

  // if (!note_title && _.isEmpty(note_title)) errors.push("Title is required");
  // if (!note_details && _.isEmpty(note_details))
  //   errors.push("Details is required");

  // NextResponse.json({ note_title, note_details });
  // return;

  // if (errors.length > 0) {
  //   NextResponse.json({ message: errors });
  //   return;
  // }

  // const notesData = await prisma.notes.create({
  //   data: {
  //     title: note_title,
  //     details: note_details,
  //   },
  // });

  // await prisma.$disconnect();

  // if (_.isEmpty(notesData)) {
  //   NextResponse.json({ message: "Something went wrong!" });
  //   return;
  // }

  // NextResponse.json({ message: "Created Successfully", data: notesData });
}

export async function GET() {
  return NextResponse.json({ message: "Get Notes" });
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  return NextResponse.json({ message: "Put Notes" });
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  return NextResponse.json({ message: "Patch Notes" });
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  return NextResponse.json({ message: "Delete Notes" });
}

// const normalizeFormData = async (req: NextApiRequest) => {
//   const data: { err: string; fields: formidable.Fields; files: formidable.Files } = await new Promise(
//     (resolve, reject) => {
//       const form = new formidable.IncomingForm();
//      form.parse(req, (err, fields, files) => {
//         if (err) reject({ err });
//         resolve({ err, fields, files });
//       });
//     }
//   );

//   return data;
// };

const _isJSON = (req: NextRequest) => {
  const contentType = req.headers.get("content-type");
  let isJson = false;
  if (contentType === "application/json") {
    isJson = true;
  }

  return isJson;
};
