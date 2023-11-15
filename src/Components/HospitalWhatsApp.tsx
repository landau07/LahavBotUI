import { FormattedMessage, useIntl } from "react-intl";
import { useDecisionTree } from "../DecisionTree/useDecisionTree";
import { hospitalLinks } from "../data/hospitalLinks";
import whatsAppIcon from "../icons/whatsappIcon.png";
import { ExternalLinkMessage } from "./ExternalLinkMessage";

export function HospitalWhatsApp({
  whatsAppGroupType,
}: {
  whatsAppGroupType: "currentlyInHospital" | "alumni";
}) {
  const WHICH_HOSPITAL_STEP_ID = 4;
  const WHICH_HOSPITAL_WERE_YOU_STEP_ID = 14;
  const intl = useIntl();
  const hospitals = hospitalLinks();
  const { getStepResult } = useDecisionTree();

  const hospitalStepResult = getStepResult(WHICH_HOSPITAL_STEP_ID);
  const hospitalAlumniStepResult = getStepResult(
    WHICH_HOSPITAL_WERE_YOU_STEP_ID
  );

  const hospitalDetails = hospitals.filter(
    (h) =>
      h.id === hospitalStepResult?.value ||
      h.id === hospitalAlumniStepResult?.value
  )[0];

  const url =
    whatsAppGroupType === "currentlyInHospital"
      ? hospitalDetails.whatsAppLink
      : hospitalDetails.alumniWhatsAppLink;

  const hospitalNameFormatted = intl.formatMessage({ id: hospitalDetails.id });

  return (
    <ExternalLinkMessage
      url={url}
      urlText={<FormattedMessage id="clickHere" />}
      icon={whatsAppIcon}
    >
      {whatsAppGroupType === "currentlyInHospital" ? (
        <FormattedMessage
          id="joinNICUWhatsapp"
          values={{ hospitalNameFormatted }}
        />
      ) : (
        <FormattedMessage
          id="joinNICUAlumniWhatsapp"
          values={{ hospitalNameFormatted }}
        />
      )}
    </ExternalLinkMessage>
  );
}
