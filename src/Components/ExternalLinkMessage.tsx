import { ReactNode } from "react";
import { ExternalLink } from "react-feather";
import { FormattedMessage, useIntl } from "react-intl";
import { hospitalLinks } from "../data/hospitalLinks";
import whatsAppIcon from "../icons/whatsappIcon.png";

export type ExternalLinkMessageProps = {
  url: string;
  children: string | ReactNode;
  urlText: string | ReactNode;
  icon?: string | ReactNode;
};

export function ExternalLinkMessage({
  url,
  children,
  urlText,
  icon,
}: ExternalLinkMessageProps) {
  const IconComponent: ReactNode =
    (icon && typeof icon == "object" && icon) ?? undefined;
  return (
    <div>
      <div>{children}</div>
      <a
        href={url}
        target="_blank"
        className="flex gap-1 text-blue-500 items-center mt-1 hover:underline"
      >
        {icon && typeof icon == "string" && (
          <img className="h-7 me-1" src={icon} />
        )}
        {IconComponent}
        <span>{urlText}</span>
        <ExternalLink className="h-4 rtl:scale-x-[-1]" />
      </a>
    </div>
  );
}

export function HospitalAlumniWhatsapp({
  hospitalNameFormatted,
  whatsAppGroupType,
}: {
  hospitalNameFormatted: string;
  whatsAppGroupType: "currentlyInHospital" | "alumni";
}) {
  const hospitals = hospitalLinks();
  const intl = useIntl();

  const hospitalDetails = hospitals.filter(
    (h) => intl.formatMessage({ id: h.id }) === hospitalNameFormatted
  )[0];

  const url =
    whatsAppGroupType === "currentlyInHospital"
      ? hospitalDetails.whatsAppLink
      : hospitalDetails.alumniWhatsAppLink;

  return (
    <ExternalLinkMessage
      url={url}
      urlText={<FormattedMessage id="clickHere" />}
      icon={whatsAppIcon}
    >
      <FormattedMessage
        id="joinNICUAlumniWhatsapp"
        values={{ hospital: hospitalNameFormatted }}
      />
    </ExternalLinkMessage>
  );
}
