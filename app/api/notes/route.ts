import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { serialize } from "object-to-formdata";
import { TisJSON } from "@/app/_interfaces";
import { _isJSON } from "@/app/_utils";
import prisma from "../_base";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    let data = null;
    const errors: string[] = [];

    const contentType:TisJSON = _isJSON(req);
    if(!contentType)
    {
      return NextResponse.json({ message: "Data in a body is not known" }, { status: 401 });
    }

    if(contentType === "JSON")  data = serialize(await req.json())
    if(contentType === "Form" ) data = await req.formData()
    if(contentType === "WRONG") {
      return NextResponse.json({ message: "Only JSON or Form data is valid" }, { status: 402 });
    }

    const title: string = data?.get("title")?.toString() || "";
    const details: string = data?.get("details")?.toString() || "";

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
      return NextResponse.json(
        { message: "Couldn't create note" },
        { status: 401 }
      );
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

export async function GET(req:NextRequest) {
  try {
    const params = req.nextUrl.searchParams
    let pageNumber = params.get('page');
    let pageSize = params.get('limit');
    
    if(!(pageNumber && pageSize))
    {
      const notes = await prisma.notes.findMany({
        orderBy: {
          createdAt : 'asc'
        }
      });
      return NextResponse.json({ data: notes, pagination: {
        page: 0,
        limit: 0
      } }, { status: 200 });
    }

    

    const notes = await prisma.notes.findMany({
      skip: (Number(pageNumber) - 1) *  Number(pageSize),
      take: Number(pageSize),
      orderBy: {
        createdAt: 'asc'
      }
    });
    return NextResponse.json({ data: notes, pagination: {
      page: pageNumber,
      limit: pageSize
    } }, { status: 200 });
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const deleted = await prisma.notes.deleteMany({});

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "No notes deleted :(" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: `${deleted.count} Notes Deleted Successfully` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
