export type HospitalLinkType = {
  id: string; // for localization
  whatsAppLink: string;
  alumniWhatsAppLink: string;
};

export function hospitalLinks(): HospitalLinkType[] {
  return [
    {
      id: "telHashomer",
      whatsAppLink: "https://chat.whatsapp.com/FhMfaTvyKWCGjnPZJstDxD",
      alumniWhatsAppLink: "https://chat.whatsapp.com/Dap7gazGH53Fcqv8SK2niq",
    },
    {
      id: "schneider",
      whatsAppLink: "https://chat.whatsapp.com/BjMuwB1miVBHOSGYEYc2ZL",
      alumniWhatsAppLink: "https://chat.whatsapp.com/L2KvDdXLdby6Bvg5blDxJC",
    },
    {
      id: "rambam",
      whatsAppLink: "https://chat.whatsapp.com/J8wwyFBqVMjHKcYUmdQ992",
      alumniWhatsAppLink: "https://chat.whatsapp.com/H6fkridoc0o3Kxwsv5WmSk",
    },
    {
      id: "sheareiTzedek",
      whatsAppLink: "https://chat.whatsapp.com/L0LlzrRDkvdHWNiIPe5vb8",
      alumniWhatsAppLink: "https://chat.whatsapp.com/Iz7E5OeQZ966E9E1PABKIt",
    },
    {
      id: "soroka",
      whatsAppLink: "https://chat.whatsapp.com/LgHrffPKAB20mXKF65HZJS",
      alumniWhatsAppLink: "https://chat.whatsapp.com/HNQwJr555ItJ6YSsFrlaUy",
    },
    {
      id: "wolfson",
      whatsAppLink: "https://chat.whatsapp.com/CLeDL0Qda2WEXv0eTFvx44",
      alumniWhatsAppLink: "https://chat.whatsapp.com/Fp7m7uRLLhS5DrDLdCl7B6",
    },
    {
      id: "hadassah",
      whatsAppLink: "https://chat.whatsapp.com/HcI4jeAm3w8D9xnNpH59YD",
      alumniWhatsAppLink: "https://chat.whatsapp.com/JQveM2NFo0n2eTBGbUQvth",
    },
    {
      id: "maayaneiHayeshua",
      whatsAppLink: "https://chat.whatsapp.com/ET2uOpzvnck4pq0c1jXNc5",
      alumniWhatsAppLink: "https://chat.whatsapp.com/FRSAlQepyNBKJYnIlDgQ39",
    },
  ];
}
