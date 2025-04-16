import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log("starting generation. Session:", session)

  if (!session) {
    return Response.json(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const requestBody = await request.json();
  const { action, templateName } = requestBody;

  try {
    const client = await clientPromise;
    const db = client.db("xmlgenerator"); // Or your actual DB name
    const collection = db.collection("activityLogs");

    const logEntry = {
      email: session.user?.email || "anonymous",
      action: action || "generateXml",
      templateName: templateName || "test...",
      timestamp: new Date(),
    };

    await collection.insertOne(logEntry);
    console.log("generated logs succussfully by: ", session.user?.email)
    return Response.json({ message: "Log entry recorded successfully" });
  } catch (e) {
    console.error("Error logging action:", e);
    return Response.json({ message: "Logging failed" }, { status: 500 });
  }
}