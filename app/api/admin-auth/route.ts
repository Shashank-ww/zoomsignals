export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { password } = body;

    if (!password) {
      return Response.json(
        { success: false, error: "No password" },
        { status: 400 }
      );
    }

    if (password === process.env.ADMIN_SECRET) {
      return Response.json({ success: true });
    }

    return Response.json({ success: false }, { status: 401 });
  } catch (err) {

    return Response.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}