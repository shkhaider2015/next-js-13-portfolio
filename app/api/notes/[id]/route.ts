import { PrismaClient } from "@prisma/client";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Params : ", params);
  const id = params.id;
  try {
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
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: "Put Notes" });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ message: "Patch Notes" });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const isPost = await prisma.notes.findFirst({
        where: {
            id
        }
    })

    if (_.isEmpty(isPost)) {
        return NextResponse.json(
          { message: "Post Not Found" },
          { status: 401 }
        );
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
