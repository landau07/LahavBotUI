import { useIntl } from "react-intl";

export type HospitalLinkType = {
  name: string;
  nameLocalized: string;
  whatsAppLink: string;
  alumniWhatsAppLink: string;
};

export function useHospitalLinks(): HospitalLinkType[] {
  const intl = useIntl();
  return [
    {
      name: "telHashomer",
      nameLocalized: intl.formatMessage({ id: "telHashomer" }),
      whatsAppLink: "https://chat.whatsapp.com/FhMfaTvyKWCGjnPZJstDxD",
      alumniWhatsAppLink: "https://chat.whatsapp.com/Dap7gazGH53Fcqv8SK2niq",
    },
    {
      name: "schneider",
      nameLocalized: intl.formatMessage({ id: "schneider" }),
      whatsAppLink: "https://chat.whatsapp.com/BjMuwB1miVBHOSGYEYc2ZL",
      alumniWhatsAppLink: "https://chat.whatsapp.com/L2KvDdXLdby6Bvg5blDxJC",
    },
    {
      name: "rambam",
      nameLocalized: intl.formatMessage({ id: "rambam" }),
      whatsAppLink: "https://chat.whatsapp.com/J8wwyFBqVMjHKcYUmdQ992",
      alumniWhatsAppLink: "https://chat.whatsapp.com/H6fkridoc0o3Kxwsv5WmSk",
    },
    {
      name: "sheareiTzedek",
      nameLocalized: intl.formatMessage({ id: "sheareiTzedek" }),
      whatsAppLink: "https://chat.whatsapp.com/L0LlzrRDkvdHWNiIPe5vb8",
      alumniWhatsAppLink: "https://chat.whatsapp.com/Iz7E5OeQZ966E9E1PABKIt",
    },
    {
      name: "soroka",
      nameLocalized: intl.formatMessage({ id: "soroka" }),
      whatsAppLink: "https://chat.whatsapp.com/LgHrffPKAB20mXKF65HZJS",
      alumniWhatsAppLink: "https://chat.whatsapp.com/HNQwJr555ItJ6YSsFrlaUy",
    },
    {
      name: "wolfson",
      nameLocalized: intl.formatMessage({ id: "wolfson" }),
      whatsAppLink: "https://chat.whatsapp.com/CLeDL0Qda2WEXv0eTFvx44",
      alumniWhatsAppLink: "https://chat.whatsapp.com/Fp7m7uRLLhS5DrDLdCl7B6",
    },
    {
      name: "hadassah",
      nameLocalized: intl.formatMessage({ id: "hadassah" }),
      whatsAppLink: "https://chat.whatsapp.com/HcI4jeAm3w8D9xnNpH59YD",
      alumniWhatsAppLink: "https://chat.whatsapp.com/JQveM2NFo0n2eTBGbUQvth",
    },
    {
      name: "maayaneiHayeshua",
      nameLocalized: intl.formatMessage({ id: "maayaneiHayeshua" }),
      whatsAppLink: "https://chat.whatsapp.com/ET2uOpzvnck4pq0c1jXNc5",
      alumniWhatsAppLink: "https://chat.whatsapp.com/FRSAlQepyNBKJYnIlDgQ39",
    },
  ];
}
