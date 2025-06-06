import { NextRequest } from "next/server";

interface EmailInfo {
  germanText: string;
  englishText: string;
  germanAddressee: string;
  englishAddressee: string;
  title: string;
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
  subject2: string;
  germanTables: Table[]; // German tables
  englishTables: Table[]; // English tables
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const requestBody = await request.json();
    console.log("Received body:", requestBody);

    const { emailInfo, argumentsObject, templateName, description, germanTables, englishTables, subject, subject2 }: EmailArgs = requestBody;

    //
    let subjectConfigured = "";
    if(subject2 === ""){
      subjectConfigured = subject;
    } else if (subject !== "" && subject2 ){
      subjectConfigured = `<![CDATA[ #set($as = $workflowCase.get("approvalSet")) #if($as && !$as.hasRejected()) ${subject} #else ${subject2} #end ]]>`;
    }
    console.log("subjectConfigured: ", subjectConfigured);

    // Process argumentsObject into XML format
    const argumentsXML = Object.entries(argumentsObject)
      .map(([name, type]) => `      <Argument name="${name}" type="${type}"/>`)
      .join("\n");
      console.log("argumentsXML: ", argumentsXML);
    // Process German tables into HTML format
    const germanTablesHTML = germanTables
      .map(
        (table) => 
        `<table>
          <tbody>
          ${table
            .map(
              (row) => `  <tr>
              <th scope="col">${row.key}</th>
              <td>${row.value}</td>
            </tr>`
            )
            .join("")}
          </tbody>
        </table>`
      )
      .join(""); // Combine all German tables into one string

    // Process English tables into HTML format
    const englishTablesHTML = englishTables
      .map(
        (table) => 
        `<table>
          <tbody>
          ${table
            .map(
              (row) => `  <tr>
              <th scope="col">${row.key}</th>
              <td>${row.value}</td>
            </tr>`
            )
            .join("")}
          </tbody>
        </table>`
      )
      .join(""); // Combine all English tables into one string

    if (!emailInfo || !templateName || !description) {
      throw new Error("Missing required fields in request body");
    }
      

    const xmlContent = `<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE EmailTemplate PUBLIC "sailpoint.dtd" "sailpoint.dtd">
<EmailTemplate name="STR-EmailTemplate-${templateName}">
  <Description>${description}</Description>
  <Signature>
    <Inputs>
${argumentsXML}
    </Inputs>
  </Signature>
  <Subject>${subjectConfigured}</Subject>
  <Body>
  <![CDATA[ 
    #set($ctx = $spTools.class.forName("sailpoint.api.SailPointFactory").getMethod("getFactory", null).invoke(null,null).getCurrentContext())
		#set($emailTools = $spTools.class.forName("sailpoint.rapidsetup.tools.EmailTools").getMethod("instance", null).invoke(null,null))
    #set($headerTemplate = $emailTools.getEmailSection($ctx, "headerTemplate"))
		#set($footerTemplate = $emailTools.getEmailSection($ctx, "footerTemplate"))

    <!-- Creating a Hashmap with relevant attributes  -->
    #set( $rule = $ctx.getObjectByName($spTools.class.forName("sailpoint.object.Rule"), "STR-Rule-EmailTemplateGeneral") )
    #set( $ruleArgs=$spTools.class.forName("java.util.HashMap").newInstance() )
    #set( $dummy = $ruleArgs.put( "provisioningPlan", $provisioningPlan ) ) 
    #set( $dummy = $ruleArgs.put( "receiver", $receiver ) ) 
    #set( $dummy = $ruleArgs.put( "workflowCase", $workflowCase ) ) 
    #set( $emailVariables = $ctx.runRule($rule, $ruleArgs) )
    
    #if( $headerTemplate )
			  $headerTemplate
    #end

    <h1 class="headerText">
      ${emailInfo.title}
    </h1>

    <div class="content">
      <div class="groupIT">Group IT - IT Compliance - IAM Team</div>
      <div class="german-section">
        <img src="https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg" alt="German Flag" class="flag">
        <p>Hallo ${emailInfo.germanAddressee},</p>
        ${emailInfo.germanText
          .split("\n")
          .filter((line) => line.trim() !== "") // Remove empty lines
          .map((line, index) => (index === 0 ? `<p>${line.trim()}</p>` : `        <p>${line.trim()}</p>`)) // Indent only new lines
          .join("\n")}

        <!-- place for GER table -->
        ${germanTables.length > 0 ? germanTablesHTML : ""}

        <p>Wenn Du Fragen hast, wende Dich bitte an das IAM-Team unter <strong>iam@stroeer.de</strong>.</p>
        <p class="marginBottom">Mit freundlichen Grüßen,<br>Ihr Group IT - IT Compliance - IAM Team</p>
      </div>

      <div class="english-section">
        <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="UK Flag" class="flag">
        <p>Hello ${emailInfo.englishAddressee},</p>
        ${emailInfo.englishText
          .split("\n")
          .filter((line) => line.trim() !== "") // Remove empty lines
          .map((line, index) => (index === 0 ? `<p>${line.trim()}</p>` : `        <p>${line.trim()}</p>`)) // Indent only new lines
          .join("\n")}

        <!-- place for ENG table -->
        ${englishTables.length > 0 ? englishTablesHTML : ""}

        <p>If you have any questions, please contact the IAM team at <strong>iam@stroeer.de</strong>.</p>
        <p class="marginBottom">Best regards,<br>Your Group IT - IT Compliance - IAM Team</p>
      </div>
    </div>

    #if( $footerTemplate )
      $footerTemplate
    #end
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
    console.error("XML generation failed", err);
    return new Response(JSON.stringify({ message: `Error generating XML file: ${err}` }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
