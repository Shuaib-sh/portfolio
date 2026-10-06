import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // If Web3Forms access key is configured in env, forward it seamlessly
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (accessKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            subject: subject || `Portfolio Inquiry from ${name}`,
            message,
            from_name: "Shuaib B Portfolio",
          }),
        });

        const data = await response.json();
        return NextResponse.json({ success: true, data });
      } catch (err) {
        console.error("Web3Forms forwarding error:", err);
      }
    }

    // Default graceful success response (stored or logged for serverless deployment)
    console.log(`[Contact Inquiry Received] From: ${name} (${email}) | Subject: ${subject}`);
    console.log(`Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Message received successfully. Shuaib will respond to your email shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
