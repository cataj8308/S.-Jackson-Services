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
  //   approach - "How I work" bullet points
  //   quote    - one sentence in their own words
  people: [
    {
      name: "Steve Jackson",
      role: "Welding · Inspection · Auditing",
      side: "Trade Services",
      phone: "937-608-7698",
      photo: "",
      story: [
        "Steve has been welding, inspecting and auditing for [number] years. He started [how he got into the trade, for example as an apprentice at a fabrication shop] and has since worked on [types of work, for example structural steel, piping and equipment repair] for contractors of every size.",
        "He works with contractors only. When a general contractor, mechanical crew or welding shop needs a qualified hand, an independent inspection, or an audit their client will trust, they call Steve.",
        "What he is known for: showing up when he says he will, telling you straight what he found, and leaving you with a written report you can hand to anyone."
      ],
      facts: [
        { label: "Trade", value: "Welding, inspection and auditing" },
        { label: "Experience", value: "[number] years" },
        { label: "Works with", value: "Contractors only" },
        { label: "Certifications", value: "[for example: AWS Certified Welder, CWI, OSHA 30]" },
        { label: "Based in", value: "[City, State]" }
      ],
      approach: [
        "A quick call to understand the job before quoting it",
        "On site when promised, with the right equipment",
        "A straight pass or fail and a written report, every time"
      ],
      quote: "[A sentence in Steve's own words about why he does this work.]"
    },
    {
      name: "Catherine Jackson",
      role: "AI Receptionist · UX/UI · Websites",
      side: "AI & Design",
      phone: "937-608-3624",
      photo: "",
      story: [
        "Catherine runs the technology side of the family business. Her focus is the AI receptionist: a phone assistant she sets up and tunes for each business so no customer call goes unanswered, whether the owner is with a client, on a job site, or closed for the night.",
        "She also designs the screens people actually use. [Your background, for example: a degree in design, years working in UX/UI, or projects you are proud of.] Her design work centers on making things simple enough for anyone, from a first-time smartphone user to a busy contractor's office, to use without a manual.",
        "Growing up around her dad's trade work taught her how a small business really runs: the phone rings at the worst possible moment, and paperwork piles up. That is the problem she builds for."
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
