import { NextRequest, NextResponse } from "next/server";
import { HtmlValidate, ConfigData } from "html-validate"; // Import ConfigData if necessary

export async function POST(request: NextRequest) {
  try {
    const { htmlInput } = await request.json();

    // Correct config structure
    const config: ConfigData = {
      extends: ["html-validate:recommended"],
      rules: {
        "no-trailing-whitespace": ["off"], // Proper structure for disabling the rule
      },
    };

    // Initialize HtmlValidate with the custom config
    const validator = new HtmlValidate(config);

    // Validate HTML input (await the result to access `valid` and other properties)
    const result = await validator.validateString(htmlInput);

    // If there are any errors left, return them
    if (!result.valid) {
      return NextResponse.json({ isValid: false, errors: result.results });
    }

    return NextResponse.json({ isValid: true, message: "HTML is valid." });
  } catch (err) {
    return NextResponse.json(
      { isValid: false, errors: `Error processing HTML: ${err}` },
      { status: 500 }
    );
  }
}
