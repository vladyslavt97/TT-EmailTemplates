import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("xmlgenerator");
    const collection = db.collection("activityLogs");

    const logs = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return Response.json({ logs });
  } catch (e) {
    console.error("Error fetching logs:", e);
    return Response.json({ error: "Failed to fetch logs" }, { status: 500 });
  }
}
