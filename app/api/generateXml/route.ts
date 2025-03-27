import { NextRequest } from "next/server";

interface EmailInfo {
  germanText: string;
  englishText: string;
  germanAddressee: string;
  englishAddressee: string;
}

interface ArgumentsObject {
  [key: string]: string; // Key is the argument name, value is the type (e.g., "boolean", "map")
}

interface TableRow {
  key: string;
  value: string;
}

type Table = TableRow[];

interface EmailArgs {
  emailInfo: EmailInfo;
  argumentsObject: ArgumentsObject;
  templateName: string;
  description: string;
  subject: string;
  germanTables: Table[]; // German tables
  englishTables: Table[]; // English tables
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const requestBody = await request.json();
    const { emailInfo, argumentsObject, templateName, description, germanTables, englishTables, subject }: EmailArgs = requestBody;

    console.log("German Tables: ", germanTables);
    console.log("English Tables: ", englishTables);

    // Process argumentsObject into XML format
    const argumentsXML = Object.entries(argumentsObject)
      .map(([name, type]) => `      <Argument name="${name}" type="${type}"/>`)
      .join("\n");

    // Process German tables into HTML format
    const germanTablesHTML = germanTables
      .map(
        (table) => `
                    <table>
                    ${table
                      .map(
                        (row) => `  <tr>
                        <th>${row.key}</th>
                        <td>${row.value}</td>
                      </tr>`
              )
              .join("")}
                    </table>`
      )
      .join(""); // Combine all German tables into one string

    // Process English tables into HTML format
    const englishTablesHTML = englishTables
      .map(
        (table) => `
                    <table>
                    ${table
                      .map(
                        (row) => `  <tr>
                        <th>${row.key}</th>
                        <td>${row.value}</td>
                      </tr>`
              )
              .join("")}
                    </table>`
      )
      .join(""); // Combine all English tables into one string
      

    const xmlContent = `<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE EmailTemplate PUBLIC "sailpoint.dtd" "sailpoint.dtd">
<EmailTemplate name="STR-EmailTemplate-${templateName}">
  <Description>${description}</Description>
  <Signature>
    <Inputs>
${argumentsXML}
    </Inputs>
  </Signature>
  <Subject>${subject}</Subject>
  <Body>
  <![CDATA[ 
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <title>Ströer</title>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
        <meta content="utf-8" http-equiv="encoding"/>
        <style>
            body {
                background-color: #f5f7fa;
                font-family: Arial, sans-serif;
                padding: 20px;
                color: #08204A;
            }

            img {
                max-width: 150px;
                height: auto;
                margin-bottom: 10px;
            }

            p {
                margin: 0;
                padding: 0;
                font: 10pt Arial;
                line-height: 15pt;
                margin-bottom: 18px;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }

            .header, .footer {
                background-color: #08204A;
                padding: 20px;
                text-align: center;
            }

            .header h1, .footer h1 {
                color: #ffffff;
                margin: 0;
                font: bold 14pt Arial;
            }

            .content {
                padding: 20px;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 15px;
                margin-bottom: 25px;
                border: 1px solid #ccc;
                border-radius: 8px;
                overflow: hidden;
                background-color: #eff1fa;
            }

            th {
                background-color: #f0f8ff;
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid #ccc;
                font-size: 14px;
            }

            td {
                padding: 12px;
                border-bottom: 1px solid #eee;
                font-size: 14px;
            }

            tr:last-child td {
                border-bottom: none;
            }

            .footer-note {
                font-size: 13px;
                font-style: italic;
                color: #555;
                margin-top: 20px;
            }

            a {
                color: #08204A;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }

            .logo-container {
                background-color: white;
                display: inline-block;
                padding: 8px 8px 0px 8px;
                border-radius: 4px;
                margin-bottom: 10px;
            }

            .hrline {
                border: none;
                border-top: 1px solid #ccc;
                margin: 30px 0;
            }

            .marginBottom {
                margin-bottom: 20px;
            }

            .groupIT {
                color: #333;
                font: bold 10pt Arial;
                margin-bottom: 16px;
            }

            .german-section {
                background-color: #f8f9fc;
                padding: 20px;
                border-radius: 8px;
                position: relative;
            }

            .english-section {
                position: relative;
                background-color: #dde4eb;
                padding: 20px;
                border-radius: 8px;
                margin-top: 20px;
            }
            .flag {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 20px;
                height: auto;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo-container">
                    <img alt="Ströer logo" src="https://iam-dev.stroeer.com/images/EmailLogo.png" class="logo"/>
                </div>
                <h1>Externe Mitarbeiter Antrag</h1>
            </div>

            <div class="content">
                <div class="groupIT">Group IT - IT Compliance - IAM Team</div>
                <div class="german-section">
                    <img src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" alt="German Flag" class="flag"/>
                    <p>Hallo ${emailInfo.germanAddressee},</p>
${emailInfo.germanText
  .split("\n")
  .filter((line) => line.trim() !== "") // Remove empty lines
  .map((line) => `                    <p>${line.trim()}</p>`) // Add indentation
  .join("\n")}
                    
                    
                    <!-- place for GER table -->
                    ${germanTables.length > 0 ? germanTablesHTML : ""}

                    <p>Wenn Du Fragen hast, wende Dich bitte an das IAM-Team unter <strong>iam@stroeer.de</strong>.</p>
                    <p class="marginBottom">Mit freundlichen Grüßen,<br/>Ihr Group IT - IT Compliance - IAM Team</p>
                </div>

                <div class="english-section">
                    <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="UK Flag" class="flag"/>
                    <p>Hello ${emailInfo.englishAddressee},</p>
${emailInfo.englishText
  .split("\n")
  .filter((line) => line.trim() !== "") // Remove empty lines
  .map((line) => `                    <p>${line.trim()}</p>`) // Add indentation
  .join("\n")}

                    <!-- place for ENG table -->
                    ${englishTables.length > 0 ? englishTablesHTML : ""}

                    <p>If you have any questions, please contact the IAM team at <strong>iam@stroeer.de</strong>.</p>
                    <p class="marginBottom">Best regards,<br/>Your Group IT - IT Compliance - IAM Team</p>
                </div>

                <p class="footer-note">Diese Nachricht wurde automatisch erstellt. Antworten auf diese E-Mail werden nicht gelesen.</p>
                <p><a href="https://iam.stroeer.com/faq">Häufig gestellte Fragen (FAQ)</a></p>
            </div>

            <div class="footer">
                <h1>Ströer IT Compliance - IAM</h1>
            </div>
        </div>
    </body>
    </html>
  ]]>
  </Body>
</EmailTemplate>

`;

    return new Response(xmlContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": `attachment; filename="STR-EmailTemplate${templateName}.xml"`,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: `Error generating XML file: ${err}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
