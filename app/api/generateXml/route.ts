import fs from 'fs';
import path from 'path';

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

export async function POST(request: Request) {
  // Parse request body
  const requestBody = await request.json();
  console.log("requestBody: ",requestBody);
  
  const { identityInfo, secondNotification, managerEmailBoolean, templateName }: EmailArgs = requestBody;

  // Generate the XML content based on the data
  const generateXML = ({ identityInfo, secondNotification, managerEmailBoolean, templateName }: EmailArgs): string => {
    return `<?xml version='1.0' encoding='UTF-8'?>
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
  };

  // Generate the XML content
  const xmlContent = generateXML({ identityInfo, secondNotification, managerEmailBoolean, templateName });

  // Sanitize the template name
  const sanitizedTemplateName = templateName.replace(/[^a-zA-Z0-9]/g, '_');
  
  // Define the file path to save the XML file
  const filePath = path.join(process.cwd(), `${sanitizedTemplateName}.xml`);

  try {
    // Write the XML content to a file
    fs.writeFileSync(filePath, xmlContent, 'utf8');
    
    // Return success response
    return new Response(JSON.stringify({ message: 'XML file created successfully', filePath }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error writing the XML file:', err);
    
    // Return error response
    return new Response(JSON.stringify({ message: `Error writing the XML file: ${err}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
