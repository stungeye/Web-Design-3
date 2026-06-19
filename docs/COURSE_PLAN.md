# Web Design 3 Course Plan

## Course identity

**Web Design 3: Accessible, Maintainable, Responsive HTML/CSS Websites**

Student-facing version:

> Plan it clearly. Build it semantically. Style it intentionally. Make it responsive. Test it. Publish it.

WD3 is about building small professional websites with semantic HTML, maintainable CSS, responsive layout, accessibility checks, and simple static deployment.

The course should not become a broad course on SEO, hosting, domains, JavaScript, animation, advanced performance, full design systems, or production infrastructure.

## Course throughline

The course is organized around a simple build process:

1. Structure the content.
2. Style the page with readable defaults.
3. Create intentional layouts.
4. Plan responsive behaviour.
5. Build responsive sections.
6. Organize the CSS.
7. Test the site.
8. Publish a working static version.

Everything taught in the course should support one of those steps.

## Prior knowledge and assumptions

Students have completed Web Design 1 and Web Design 2, so they have likely been introduced to:

- Basic HTML and CSS
- Fonts, colour, images, links, lists, headings, and paragraphs
- Flexbox
- CSS Grid
- CSS variables
- Responsive design
- Media queries
- Figma mockups
- Basic accessibility awareness
- W3C validation
- Browser testing

However, prior exposure does not mean mastery.

WD3 should not assume strong independence with:

- Semantic HTML beyond basic tags
- Accessible document structure
- Keyboard accessibility
- Screen-reader-aware markup
- Maintainable CSS organization
- Deployment
- SEO
- Performance optimization
- Design systems
- JavaScript

## WD3 / WD4 boundary

### WD3 owns

- Semantic HTML
- Accessible document structure
- Logical headings and landmarks
- Descriptive links and meaningful alt text
- Visible focus states
- Base CSS and readable defaults
- Practical Grid and Flexbox layout
- Desktop layout as an intermediate step
- Fluid responsive design
- Basic media query decisions
- CSS custom properties / light tokens
- Simple reusable layout patterns
- Light CSS nesting where helpful
- Basic accessibility and responsive testing
- Basic drag-and-drop Netlify deployment

### WD4 owns

- Deep performance optimization
- Advanced asset optimization
- Cross-browser/platform testing in depth
- Domains, DNS, SSL, Cloudflare, FTP, and hosting configuration
- SEO in depth
- Analytics
- Site management
- Advanced deployment workflows
- Animation-heavy workflows
- Full design systems
- Advanced component architecture

## Assessment structure

| Assessment                               | Weight | Due / Timing | Main purpose                                         |
| ---------------------------------------- | -----: | ------------ | ---------------------------------------------------- |
| A1 — Brochure Content and Structure Plan |    15% | Week 3       | Plan enough to build A2                              |
| A2 — Desktop Brochure Build              |    25% | Week 6       | Build a clean desktop-focused HTML/CSS site          |
| A3 — Website Redesign Plan               |    20% | Week 10      | Plan enough to build A4                              |
| A4 — Responsive Redesign Build           |    30% | Week 14      | Build, test, and publish a small responsive redesign |
| In-Class Challenges                      |    10% | Throughout   | Practise skills that directly support assignments    |

A1 and A3 are planning assignments, but they should not become large research or design-rationale documents. They should be assessed mainly on whether the student is ready to build.

A2 and A4 are the core build assignments.

## Progressive in-class marking

Because the class meets once per week for three hours, some assignment assessment should happen during class while students are still working.

This should reduce grading load and give students feedback before final submission.

### A2 progressive marking

A2 is marked during Weeks 5 and 6.

#### Week 5 — A2 checkpoint

Focus:

- Semantic HTML structure exists
- Headings and landmarks mostly make sense
- Base CSS is started
- Desktop layout is underway
- Grid and/or Flexbox are being used intentionally
- Basic accessibility problems are identified early

This checkpoint should function as course correction, not final judgment.

#### Week 6 — A2 final check

Focus:

- Desktop layout is complete and intentional
- Typography and spacing are readable
- Navigation is usable
- Images, links, and focus states are handled appropriately
- CSS is readable and not overly repetitive
- Submission checklist is complete

### A4 progressive marking

A4 is marked during Weeks 12, 13, and 14.

#### Week 12 — A4 checkpoint: structure and responsive skeleton

Focus:

- Main content/pages exist
- Semantic HTML is mostly complete
- Core layout is started
- Responsive behaviour has begun
- Navigation approach is visible
- No major layout failure is being ignored

#### Week 13 — A4 checkpoint: CSS organization, testing, and deployment draft

Focus:

- CSS is grouped clearly
- Custom properties are used where helpful
- Repeated patterns are styled consistently
- Accessibility and responsive testing have started
- First Netlify deployment has been attempted
- Broken paths or deployment issues have been identified early

#### Week 14 — A4 final check

Focus:

- Live Netlify link works
- Site is responsive at narrow, medium, and wide widths
- Accessibility issues have been checked and addressed
- CSS, images, and internal links work
- Final submission notes or README are included

## Assignment summaries

## A1 — Brochure Content and Structure Plan

**Weight:** 15%
**Assigned:** Week 1
**Due:** Week 3

### Purpose

Students plan a small brochure-style site before building it in A2.

A1 should answer:

> Do you know what content you are building, how it is organized, and what HTML structure it probably needs?

### Deliverables

- Content outline
- Site/page structure
- Semantic HTML outline
- Basic accessibility notes
- Desktop-focused Figma mockup or wireframe

### Assessment focus

- Clear content organization
- Appropriate page/site structure
- Evidence of semantic thinking
- Basic accessibility awareness
- Readiness to begin A2

A1 should not require students to plan every CSS detail, responsive breakpoint, screen-reader behaviour, or testing workflow.

## A2 — Desktop Brochure Build

**Weight:** 25%
**Assigned:** Week 3
**Due:** Week 6
**Progressively marked:** Weeks 5 and 6

### Purpose

Students turn their A1 plan into a clean desktop-focused brochure site.

A2 should answer:

> Can you turn a content plan into a semantic HTML/CSS page with intentional desktop layout?

### Required

- Semantic HTML
- Logical heading structure
- Landmarks
- Descriptive link text
- Appropriate alt text
- Visible focus states
- Readable typography and spacing
- Custom CSS
- Grid for major layout where appropriate
- Flexbox for navigation and small horizontal groups where appropriate
- Block flow, parent-controlled spacing, or Flexbox for vertical stacks where appropriate
- Desktop-width layout targeting laptop/desktop screens

### Not required

- Full responsive layout
- Advanced media queries
- Full token system
- Full component system
- Netlify deployment
- Deep screen-reader testing
- Advanced CSS architecture

### Assessment focus

- HTML structure
- Basic accessibility
- Desktop layout
- Readable visual presentation
- CSS clarity
- Completion and polish

## A3 — Website Redesign Plan

**Weight:** 20%
**Assigned:** Week 7
**Due:** Week 10

### Purpose

Students audit an existing site and create a realistic redesign plan for A4.

A3 should answer:

> Do you understand what is wrong with the existing site, what you intend to improve, and how you will build a realistic redesigned version?

### Deliverables

- Existing-site audit
- Redesign goals
- Content/structure plan
- Figma mockups or wireframes
- Responsive layout plan
- Basic accessibility plan
- A4 build checklist

### Assessment focus

- Clear audit observations
- Practical redesign goals
- Justified content and structure changes
- Responsive planning
- Basic accessibility thinking
- Readiness to begin A4

A3 should be a redesign brief and build plan, not a large UX research report.

## A4 — Responsive Redesign Build

**Weight:** 30%
**Assigned:** Week 10
**Due:** Week 14
**Progressively marked:** Weeks 12, 13, and 14

### Purpose

Students build a small responsive redesign based on their A3 plan.

A4 should answer:

> Can you build a small responsive redesign that is semantic, accessible, organized, tested, and published?

### Recommended size

Students should build one of the following:

- One strong responsive homepage plus one secondary page
- A small 2–3 page site
- A single-page redesign with several meaningful sections

A4 should not become a large multi-page production site.

### Required

- Semantic HTML
- Accessible structure
- Responsive layout
- Custom CSS organized clearly
- Working navigation
- Readable typography and spacing
- Basic accessibility check
- Basic responsive check
- Deployed Netlify link

### Expected evidence

- CSS custom properties used where helpful
- Simple reusable layout patterns
- Light nesting where helpful
- Testing notes or README
- Known issues documented if applicable

### Optional polish

- Cascade layers
- Reduced motion support, if motion is used
- More complete token system
- More advanced CSS organization

## In-Class Challenges

**Weight:** 10%

In-class challenges should directly support the assignments. They should not become a separate hidden course.

Possible challenge types:

- Rewrite messy HTML into semantic HTML
- Apply base styling to unstyled semantic HTML
- Build a desktop page shell
- Build stack, shelf, and card patterns
- Annotate a mockup as a build plan, identifying containers, Grid/Flexbox sections, spacing, navigation, etc
- Refactor a desktop layout into a responsive layout
- Audit a weak existing site
- Convert a mockup section into HTML/CSS planning notes
- Refactor messy CSS using custom properties
- Run accessibility and responsive checks

Assessment should be light and completion-oriented.

## Weekly schedule

## Week 1 — Structure content with semantic HTML

### Focus

- Course introduction
- WD3 identity
- Diagnostic HTML/CSS review
- Semantic page structure
- Landmarks
- Headings
- Content sections
- Basic page anatomy

### In-class activity

Rewrite messy content into semantic HTML with no CSS.

### Assignment

A1 assigned.

### Purpose

Students should understand that good layout starts with good structure.

## Week 2 — Make semantic HTML readable and accessible

### Focus

- Alt text
- Descriptive links
- Heading order
- Keyboard focus (basic)
- Minimal reset
- Box sizing
- Body defaults
- Readable type
- Spacing defaults
- Images and media defaults
- Links and buttons

### In-class activity

Apply a small base stylesheet to semantic HTML from week 1 activity. Students adjust type, spacing, colour, and image defaults.

### Purpose

Students should see that styling starts with readable defaults, not complex layouts.

## Week 3 — Building a Page Shell

### Focus

- Translating a mockup into major page regions
- Reading mockups as build plans, identifying containers, spacing, layout
- Carrying forward base styles from Week 2
- Full-width sections
- Centred content containers
- Readable content widths
- Header, hero, main content sections, and footer
- Simple page grid thinking
- grid-template-areas as a visual planning/demo tool
- Full-bleed sections as one useful layout recipe
- Basic A2 setup: folders, linked CSS, image paths, and starter files
- A2 expectations

### In-class activity

Build a very simple brochure page shell from base style markup from week 2 activity. Sketch a quick mockup and then implement header/nav, hero, main content section, and footer. Proper folder/file setup.

### Assignment

A1 due.
A2 assigned.

### Purpose

Students should understand how to turn a visual plan into a simple, buildable page structure before styling individual sections in detail.

## Week 4 — Build sections with simple layout patterns

### Focus

- Stack pattern for vertical spacing
- Cluster/shelf pattern for navigation, buttons, and small horizontal groups
- Simple Grid pattern for cards and columns
- Choosing between normal flow, Flexbox, and Grid
- Using gap instead of scattered margins
- Parent-controlled spacing
- Reusing simple layout patterns across multiple sections
- Avoiding one-off CSS for every part of the page

### In-class activity

Take base shell layout of site from week three activity. Add:

- a stacked content section
- a header/nav or button cluster
- a simple card grid

### Purpose

Students should leave with a small set of repeatable layout tools they can apply without overcomplicating a site build.

## Week 5 — A2 checkpoint and troubleshooting

### Focus

- A2 studio time
- Layout debugging
- Spacing consistency
- Navigation usability
- Alignment with plan/mockup
- Basic accessibility pass

### In-class activity

A2 checkpoint marking and peer review using an A2 checklist. No new lecture or separate challenge this week.

### Purpose

Students should receive feedback while there is still time to revise.

## Week 6 — A2 final polish and submission

### Focus

- Final A2 lab/check-ins
- Submission prep
- Basic testing notes
- Short submission note

### In-class activity

A2 final marking conferences and submission support. No new lecture or separate challenge this week.

### Assignment

A2 due.

### Purpose

Students should submit a clean desktop-focused brochure build.

## Week 7 — Think responsively before redesigning

### Focus

- How desktop layouts break on smaller screens
- Fluid vs fixed layouts
- Common responsive failure points
- Containers
- Responsive images
- Avoiding horizontal scroll
- Light intro to `clamp()`, `minmax()`, and similar responsive tools
- When a media query represents a real layout decision

### In-class activity

Take an A2-style desktop layout and identify what needs to change at narrow, medium, and wide widths.

### Assignment

A3 assigned.

### Purpose

Students should learn how to think responsively before they design and document their redesign.

## Week 8 — Audit the existing site

### Focus

- Content audit
- Structure audit
- Accessibility audit
- Responsive/layout audit
- Navigation problems
- Hierarchy problems
- Usability problems
- Distinguishing real issues from personal taste

### In-class activity

Audit a weak existing website as a class.

### A3 work

Students complete their audit and identify redesign goals.

### Purpose

Students should learn to diagnose before redesigning.

## Week 9 — Turn audit findings into a redesign plan

### Focus

- Redesign goals
- Content restructuring
- Figma mockups or wireframes
- Responsive layout planning
- Navigation planning
- Accessibility considerations
- Repeated sections and layout patterns

### In-class activity

Peer critique of A3 redesign direction.

Students explain:

- What they are changing
- Why they are changing it
- What layout patterns they expect to use
- What accessibility problems they intend to fix

### Purpose

Students should turn audit findings into a realistic build plan.

## Week 10 — Convert the plan into build tasks

### Focus

- Converting mockups into HTML sections
- Identifying reusable sections/patterns
- Planning responsive behaviour
- Setting up project folders
- Writing a build checklist
- Starting the HTML skeleton

### In-class activity

Convert one mockup section into:

- HTML section outline
- CSS classes/selectors
- layout strategy
- responsive behaviour
- assets/content needed
- next build task

### Assignment

A3 due.
A4 assigned.

### Purpose

Students should move from planning into building without rethinking the whole redesign.

## Week 11 — Build responsive A4 layouts

### Focus

- Responsive implementation
- Responsive navigation patterns
- Responsive card grids
- Responsive hero/content sections
- Image scaling and cropping
- Debugging overflow
- Testing at narrow, medium, and wide widths
- Revising the A3 plan when the build reveals problems

### In-class activity

A4 responsive build studio.

### Purpose

Students should apply responsive layout techniques to their actual A4 project.

## Week 12 — Organize and refactor A4 CSS

### Focus

- CSS custom properties
- Colour, spacing, type, and layout variables
- Grouping CSS into base/layout/components
- Simple reusable patterns
- Light CSS nesting
- Avoiding deep selector chains
- Avoiding repeated one-off styles

### In-class activity

A4 checkpoint marking, troubleshooting, and studio time focused on structure, responsive skeleton, and CSS clarity/reuse. No separate lecture or challenge this week.

### Purpose

Students should make their A4 CSS more maintainable while the project is still in progress.

## Week 13 — Test and deploy A4 draft

### Focus

- Keyboard navigation
- Visible focus states
- Colour contrast
- WAVE or Lighthouse
- Responsive testing
- Source order
- Image path issues
- First Netlify drag-and-drop deployment

### In-class activity

A4 checkpoint marking, troubleshooting, testing checklist, and first deployment support. No separate lecture or challenge this week.

### Purpose

Students should identify testing, accessibility, responsive, and deployment issues before the final deadline.

## Week 14 — Final deployment and submission

### Focus

- Final Netlify deployment
- Live URL check
- Broken image/CSS path troubleshooting
- Final responsive pass
- Final accessibility pass
- Final submission checklist
- Final testing note or README

### In-class activity

A4 final marking conferences, final lab time, and optional mini-showcase.

### Assignment

A4 due.

### Purpose

Students should finish, polish, deploy, and submit.

## Week 15 — Showcase and reflection

### Focus

- Showcase
- Critique
- Code review
- Reflection
- WD4 preview
- Professional next steps

### In-class activity

Students share selected work and reflect on what improved between their first and final builds.

### Purpose

Students should consolidate what they learned and see how WD3 connects to WD4.

No major submissions should be due in Week 15.

## Reusable A2 checklist

### HTML

- `lang` attribute present
- Meaningful page title
- Viewport meta tag
- Semantic landmarks
- One logical `h1`
- Headings follow hierarchy
- Links have descriptive text
- Images have meaningful alt text or are decorative
- Forms have labels where applicable

### CSS

- Minimal reset or reasonable base defaults
- Readable type and spacing
- Images scale safely
- Links and buttons are visually clear
- Visible focus states
- Grid/Flex used intentionally
- CSS is readable and not overly repetitive

### Layout

- Desktop layout matches the intended structure
- Content is aligned and spaced consistently
- Navigation is usable
- Cards/sections are laid out intentionally
- No obvious overflow or broken desktop layout

### Accessibility

- Keyboard navigation works
- Focus is visible
- Images have appropriate alt text
- Links make sense out of context
- Heading order is logical

## Reusable A4 checklist

### HTML

- `lang` attribute present
- Meaningful page title
- Viewport meta tag
- Semantic landmarks
- One logical `h1`
- Headings follow hierarchy
- Links have descriptive text
- Images have meaningful alt text or are decorative
- Forms have labels where applicable

### CSS

- Minimal reset or reasonable base defaults
- Custom properties used where helpful
- Readable type and spacing
- Grid/Flex used intentionally
- Reusable patterns styled consistently
- Light nesting used only where it improves readability
- CSS grouped clearly
- Visible focus states

### Responsive

- Works at narrow, medium, and wide widths
- No unwanted horizontal scrolling
- Images scale correctly
- Navigation remains usable
- Layout changes are intentional
- Fluid CSS is used where appropriate
- Media queries are used where useful

### Accessibility

- Keyboard navigation works
- Focus is visible
- Contrast checked
- WAVE or Lighthouse check completed
- At least one issue identified and fixed
- Source order makes sense

### Deployment

- Netlify URL works
- CSS and images load correctly
- Internal links work
- README or testing notes included
- Known issues are documented if applicable

## 80/20 course material strategy

Do not create polished slide decks for everything.

Prioritize materials in this order:

1. Assignment sheets
2. Rubrics
3. Reusable checklists
4. Code demos/starter files
5. In-class activities
6. Minimal slides

Most teaching should happen through live demos, small code examples, and assignment-connected activities.

A useful weekly lesson can be simple:

1. What problem are we solving?
2. What does the bad version look like?
3. What does the better version look like?
4. What are the key rules?
5. Live demo
6. In-class task
7. Assignment connection

## Recommended demo repo structure

```text
wd3-demo-files/
  week-01-semantic-structure/
  week-02-base-styling-accessibility/
  week-03-layout-shells/
  week-04-layout-patterns/
  week-07-responsive-thinking/
  week-08-redesign-audit/
  week-10-implementation-planning/
  week-11-responsive-implementation/
  week-12-css-organization/
  week-13-testing-deployment/
  checklists/
  starter-files/
```

## Development order

Build course materials in this order:

1. Rewrite A1 assignment sheet.
2. Rewrite A2 assignment sheet.
3. Create A1 and A2 rubrics.
4. Build Weeks 1–6 demo files.
5. Create A2 checklist.
6. Rewrite A3 assignment sheet.
7. Rewrite A4 assignment sheet.
8. Create A3 and A4 rubrics.
9. Create A4 testing/deployment checklist.
10. Build Weeks 7–14 demo files as needed.
11. Create short slides only where needed.

The minimum viable course package is:

- Four updated assignment sheets
- Four rubrics
- One A2 checklist
- One A4 testing/deployment checklist
- One course demo repo
- Short slides only where needed
- Small practical in-class activities tied to assignments
