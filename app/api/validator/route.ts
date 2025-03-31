import { NextRequest, NextResponse } from "next/server";
import { HtmlValidate } from "html-validate";

export async function POST(request: NextRequest) {
  try {
    const { htmlInput } = await request.json();

    // Initialize the HtmlValidate instance
    const validator = new HtmlValidate();

    // Validate the HTML input and await the result
    const result = await validator.validateString(htmlInput);

    // Filter out "Trailing whitespace" errors
    result.results.forEach((res) => {
      res.messages = res.messages.filter(
        (msg) => !msg.message.includes("Trailing whitespace")
      );
    });

    // If there are any remaining errors, return them
    if (!result.valid) {
      return NextResponse.json(
        { isValid: false, errors: result.results },
      );
    }

    return NextResponse.json({ isValid: true, message: "HTML is valid." });
  } catch (err) {
    return NextResponse.json(
      { isValid: false, errors: `Error processing HTML: ${err}` },
      { status: 500 }
    );
  }
}
