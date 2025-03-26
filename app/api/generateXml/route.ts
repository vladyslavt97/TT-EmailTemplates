import { NextRequest } from "next/server";

interface IdentityInfo {
  addressee: string;
  fullName: string;
  leaverDate: string;
}

interface EmailArgs {
  identityInfo: IdentityInfo;
  secondNotification: boolean;
  managerEmailBoolean: boolean;
  templateName: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const requestBody = await request.json();
    const { identityInfo, secondNotification, managerEmailBoolean, templateName }: EmailArgs = requestBody;

    // Generate the XML content
    const xmlContent = `<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE EmailTemplate PUBLIC "sailpoint.dtd" "sailpoint.dtd">
<EmailTemplate name="${templateName}">
  <Description>Enter description</Description>
  <Signature>
    <Inputs>
      <Argument name="identityInfo" type="map"/>
      <Argument name="secondNotification" type="boolean"/>
      <Argument name="managerEmailBoolean" type="boolean"/>
    </Inputs>
  </Signature>
  <Subject>Enter subject</Subject>
  <Body>
  <![CDATA[ 
    <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
      <title>Ströer</title>
      <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
      <meta content="utf-8" http-equiv="encoding"/>
    </head>
    <body>
      <div>
        <p>Hallo ${identityInfo.addressee},</p>
        <p>Bei der unten genannten externen Identität hat der interne Manager das Unternehmen verlassen.</p>
        <table>
          <tr>
            <th>Display Name:</th>
            <td>${identityInfo.fullName}</td>
          </tr>
          <tr>
            <th>Leaver Date:</th>
            <td>${identityInfo.leaverDate}</td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  ]]>
  </Body>
</EmailTemplate>`;

    return new Response(xmlContent, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": `attachment; filename="${templateName}.xml"`,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: `Error generating XML file: ${err}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
