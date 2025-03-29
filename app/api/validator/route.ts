import { NextRequest, NextResponse } from "next/server";
import { HtmlValidate } from "html-validate";

export async function POST(request: NextRequest) {
  try {
    const { htmlInput } = await request.json();
    console.log("hello world")
    // Initialize the HtmlValidate instance
    const validator = new HtmlValidate();

    // Validate the HTML input
    const result = validator.validateString(htmlInput);
    console.log("hello world2", result.results)
    // If there are any errors, return them
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
