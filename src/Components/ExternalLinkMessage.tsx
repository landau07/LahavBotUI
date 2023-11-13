import { ReactNode } from "react";
import { ExternalLink } from "react-feather";
import { FormattedMessage } from "react-intl";
import whatsAppIcon from "../assets/whatsAppIcon.png";
import { useHospitalLinks } from "../hooks/useHospitalLinks";

export type ExternalLinkMessageProps = {
  url: string;
  children: string | ReactNode;
  urlText: string | ReactNode;
  icon?: string;
};

export function ExternalLinkMessage({
  url,
  children,
  urlText,
  icon,
}: ExternalLinkMessageProps) {
  return (
    <div>
      <div>{children}</div>
      <a
        href={url}
        target="_blank"
        className="flex gap-1 text-blue-500 items-center mt-1"
      >
        {icon && <img className="h-7 me-1" src={icon} />}
        <span>{urlText}</span>
        <ExternalLink className="h-4 rtl:scale-x-[-1]" />
      </a>
    </div>
  );
}

export function HospitalAlumniWhatsapp({ hospital }: { hospital: string }) {
  const hospitals = useHospitalLinks();

  const hospitalAlumniLink = hospitals.filter(
    (h) => h.nameLocalized === hospital
  )[0].alumniWhatsAppLink;

  return (
    <ExternalLinkMessage
      url={hospitalAlumniLink}
      urlText={<FormattedMessage id="clickHere" />}
      icon={whatsAppIcon}
    >
      <FormattedMessage id="joinNICUAlumniWhatsapp" values={{ hospital }} />
    </ExternalLinkMessage>
  );
}
