import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// Interface for the arguments you'll pass
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request body:', req.body);
  // Extract arguments from request body
  const { identityInfo, secondNotification, managerEmailBoolean, templateName }: EmailArgs = req.body;

  // Function to generate the XML content
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

  // Generate the XML content using the arguments
  const xmlContent = generateXML({ identityInfo, secondNotification, managerEmailBoolean, templateName });

  // Define file path
  const filePath = path.join(process.cwd(), `${templateName}.xml`);

  // Save the XML content to a file
  fs.writeFile(filePath, xmlContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the XML file:', err);
      res.status(500).json({ message: `Error writing the XML file: ${err.message}` });
      return;
    }
  
    console.log("XML file written successfully:", filePath);
    res.status(200).json({ message: 'XML file created successfully', filePath });
  });
}
