import { TisJSON } from "@/interfaces";
import { _isJSON } from "@/utils";
import { Prisma, PrismaClient } from "@prisma/client";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "object-to-formdata";
import prisma from '../../_base';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  const id = params.id;
  try {

    if (id === ':id')
    {
      return NextResponse.json(
        { data: "Please provide the id in query variable" },
        { status: 400 }
      );
    }
    const note = await prisma.notes.findFirst({
      where: {
        id,
      },
    });
    if (_.isEmpty(note)) {
      return NextResponse.json(
        { data: "No Note found against the id" },
        { status: 401 }
      );
    }
    return NextResponse.json({ data: note }, { status: 200 });
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let data = null;
    const errors: string[] = [];
    const contentType: TisJSON = _isJSON(req);
    if (!contentType) {
      return NextResponse.json(
        { message: "Data in a body is not known" },
        { status: 401 }
      );
    }

    if (contentType === "JSON") data = serialize(await req.json());
    if (contentType === "Form") data = await req.formData();
    if (contentType === "WRONG") {
      return NextResponse.json(
        { message: "Only JSON or Form data is valid" },
        { status: 402 }
      );
    }

    const title: string = data?.get("title")?.toString() || "";
    const details: string = data?.get("details")?.toString() || "";

    if (_.isEmpty(title)) errors.push("Title field is required");
    if (_.isEmpty(details)) errors.push("Details field is required");

    if (!_.isEmpty(errors)) {
      return NextResponse.json({ message: errors }, { status: 400 });
    }

    const note = await prisma.notes.findFirst({
      where: {
        id,
      },
    });

    let notesData: any = null;

    if (_.isEmpty(note)) {
      notesData = await prisma.notes.create({
        data: {
          title: title,
          details: details,
        },
      });
    } else {
      notesData = await prisma.notes.update({
        where: {
          id,
        },
        data: {
          title: title,
          details: details,
          createdAt: note.createdAt,
        },
      });
    }

    await prisma.$disconnect();

    if (_.isEmpty(notesData)) {
      return NextResponse.json(
        { message: "Couldn't update note" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Note updated successfully", data: notesData },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    let data = null;
    const contentType: TisJSON = _isJSON(req);
    if (!contentType) {
      return NextResponse.json(
        { message: "Data in a body is not known" },
        { status: 401 }
      );
    }

    if (contentType === "JSON") data = serialize(await req.json());
    if (contentType === "Form") data = await req.formData();
    if (contentType === "WRONG") {
      return NextResponse.json(
        { message: "Only JSON or Form data is valid" },
        { status: 402 }
      );
    }

    let title: string = data?.get("title")?.toString() || "";
    let details: string = data?.get("details")?.toString() || "";

    if (_.isEmpty(title) && _.isEmpty(details))
      return NextResponse.json(
        { message: "At least one field is required to apply update" },
        { status: 400 }
      );

    const note = await prisma.notes.findFirst({
      where: {
        id,
      },
    });

    if (_.isEmpty(note)) {
      return NextResponse.json(
        { message: "Note not found against the given id" },
        { status: 404 }
      );
    }

    title = _.isEmpty(title) ? note.title : title
    details = _.isEmpty(details) ? note.details : details



    const notesData = await prisma.notes.update({
      where: {
        id,
      },
      data: {
        title: title,
        details: details,
      },
    });

    await prisma.$disconnect();

    if (_.isEmpty(notesData)) {
      return NextResponse.json(
        { message: "Couldn't update note" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Note updated successfully", data: notesData },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error : ", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const isPost = await prisma.notes.findFirst({
      where: {
        id,
      },
    });

    if (_.isEmpty(isPost)) {
      return NextResponse.json({ message: "Post Not Found" }, { status: 401 });
    }

    const deleted = await prisma.notes.delete({
      where: {
        id,
      },
    });

    if (_.isEmpty(deleted)) {
      return NextResponse.json(
        { message: "Nothing deleted :(" },
        { status: 402 }
      );
    }

    return NextResponse.json(
      { message: "Delete Successfully", data: deleted },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
