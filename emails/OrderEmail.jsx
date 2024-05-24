import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import getAwsFilesBaseUrl from "@/middleware/getAwsFilesBaseUrl";

export default function OrderEmail({ first_name }) {
  return (
    <Html lang="en">
      <Section style={main}>
        <Container style={container}>
          <Img
            src="https://mytoparts.com/MTALogo.png"
            alt="Cat"
            width="100"
            height="100"
            style={image}
          />
          <Text style={heading}>Hi {first_name},</Text>
          <Text style={paragraph}>
            Thank you for your purchase! Your support means the world to us. If
            you have any questions or need assistance, please don't hesitate to
            reach out. We're here to help and appreciate your business!
          </Text>
          <Text style={regards}>Best regards,</Text>
          <Text style={team}>MTA Team</Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#fff",
};

const image = {
  margin: "0 auto",
  objectFit: "contain",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  width: "580px",
  backgroundColor: "#F4F4F4",
};

const heading = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const regards = {
  fontSize: "18px",
  color: "#484848",
  padding: "0px",
  lineHeight: "1",
  margin: "0px",
};

const team = {
  fontSize: "18px",
  color: "#484848",
  padding: "0px",
  lineHeight: "1.4",
  margin: "0px",
};
