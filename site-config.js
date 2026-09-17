/* ============================================================
   S JACKSON SERVICES — SITE SETTINGS
   ------------------------------------------------------------
   Edit the values below and every page updates automatically.
   Anything in [brackets] is a placeholder waiting for real info.
   ============================================================ */
window.SITE = {
  businessName: "S Jackson Services",
  tagline: "Services · Automation",

  // Where you work. Shown in the hero and the footer.
  serviceArea: "customers across the United States",

  // Main business phone — used by every "Call" button on the site.
  mainPhone: "937-608-7698",

  // Business email — used by the Contact section and the form.
  email: "sjacksonservices1@gmail.com",

  // Web address shown in the footer (no https://).
  website: "www.sjacksonservices.com",

  // Business hours — plain text, shown in the Contact section.
  hours: "Open 7 days a week",

  // The two of you. To add a headshot, drop the picture in the
  // assets/ folder and set photo to its path, e.g. "assets/steve.jpg".
  // Leave photo empty ("") and the site shows initials instead.
  //
  // Each person also has a profile in the About section:
  //   story    - paragraphs about them (plain text, one per line)
  //   facts    - short label / value pairs shown as a quick-facts list
  //   credentials - certifications and training, shown as a row of tags
  //   approach - "How I work" bullet points
  //   quote    - one sentence in their own words
  //   resume   - path to a PDF in the assets/ folder, e.g. "assets/steve-jackson-resume.pdf".
  //              Leave it empty ("") to hide the button.
  people: [
    {
      name: "Steve Jackson",
      role: "Welding · Inspection · Auditing",
      side: "Trade Services",
      phone: "937-608-7698",
      photo: "",
      resume: "assets/steve-jackson-resume.pdf",
      story: [
        "Steve has spent more than 20 years in the pipeline and oil and gas industry, first as a welder and later as a Certified Welding Inspector. He learned the trade in the U.S. Navy, where he trained in general maintenance welding and high-pressure pipe and plate welding, then built a career that runs from the welding truck to the inspector's clipboard.",
        "He owned and ran S. Jackson Welding LLC for more than a decade, bidding and executing pipe fabrication and repair work at fuel terminals for Sunoco, Marathon and Buckeye, and rehab and testing work for Vectren Gas. As a welder foreman and later site superintendent with United Piping, he ran crews on pipeline projects for Enbridge, TransCanada and Tesoro.",
        "Since 2021 he has worked as a CWI inspector on refinery, pipeline and terminal jobs for BP and MPLX, and most recently as a mechanical lead and owner's representative on large data-center builds for Google and Meta. Contractors call him when they need a qualified welder, an independent inspector, or a job book their client will sign off on."
      ],
      facts: [
        { label: "Trade", value: "Pipe and plate welding, CWI inspection, QA/QC auditing" },
        { label: "Experience", value: "20+ years in pipeline, oil and gas, and industrial construction" },
        { label: "Works with", value: "Contractors only: pipeline, refinery, terminal and data-center projects" },
        { label: "Based in", value: "Dayton, Ohio area" }
      ],
      credentials: [
        "AWS Certified Welding Inspector (CWI)",
        "NCCER Trainer",
        "Veriforce Trainer",
        "OSHA 10",
        "OSHA 30",
        "NFPA 70E Electrical Safety",
        "Lockout / Tagout",
        "Fall Protection Competent Person",
        "CPR and First Aid",
        "U.S. Navy High Pressure Pipe and Plate Welding School",
        "U.S. Navy General Maintenance Welder School",
        "U.S. Navy Hull Technician (A) School"
      ],
      approach: [
        "Starts every shift with a pre-job safety meeting, a safe work permit and a JSA",
        "Inspects to code and to the customer's own procedures, and documents as he goes",
        "Closes out with a complete job book and final package your client can accept"
      ],
      quote: "[A sentence in Steve's own words about why he does this work.]"
    },
    {
      name: "Catherine Jackson",
      role: "AI Receptionist · UX/UI · Websites",
      side: "AI & Design",
      phone: "937-608-3624",
      photo: "",
      resume: "assets/catherine-jackson-resume.pdf",
      story: [
        "Catherine runs the technology side of S Jackson Services. Her focus is the AI receptionist: a phone assistant she sets up and tunes for each business so no customer call goes unanswered, whether the owner is with a client, on a job site, or closed for the night.",
        "She also designs the screens people actually use. [Your background, for example: a degree in design, years working in UX/UI, or projects you are proud of.] Her design work centers on making things simple enough for anyone, from a first-time smartphone user to a busy contractor's office, to use without a manual.",
        "Years around job sites and small shops taught her how a business really runs: the phone rings at the worst possible moment, and paperwork piles up. That is the problem she builds for."
      ],
      facts: [
        { label: "Focus", value: "AI receptionists for local businesses" },
        { label: "Also", value: "UX/UI design and websites" },
        { label: "Background", value: "[for example: design degree, years of experience]" },
        { label: "Works with", value: "Restaurants, salons, shops, clinics and contractors' offices" },
        { label: "Based in", value: "[City, State]" }
      ],
      approach: [
        "A short conversation about your business, in plain language",
        "A setup you can hear and try before it answers a real customer",
        "Support afterward from the same person who set it up"
      ],
      quote: "[A sentence in Catherine's own words about why she does this work.]"
    }
  ]
};
