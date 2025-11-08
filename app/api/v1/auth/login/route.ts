export async function POST(req: Request) {
    const { email, password } = await req.json();
    console.log(email, password);
    if (email === "saquibali353@gmail.com" ) {
        return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
    }
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
}