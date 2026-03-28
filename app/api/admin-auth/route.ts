export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.password) {
      return Response.json(
        { success: false, error: "Password missing" },
        { status: 400 }
      );
    }

    const { password } = body;

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