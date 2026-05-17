import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

type FileCheck = {
  label: string;
  path: string;
};

type ContentCheck = {
  label: string;
  path: string;
  contains: string[];
};

const root = process.cwd();

const requiredFiles: FileCheck[] = [
  {
    label: "Root layout",
    path: "src/app/layout.tsx",
  },
  {
    label: "Homepage",
    path: "src/app/page.tsx",
  },
  {
    label: "Courses page",
    path: "src/app/courses/page.tsx",
  },
  {
    label: "Course detail page",
    path: "src/app/courses/[slug]/page.tsx",
  },
  {
    label: "Lesson detail page",
    path: "src/app/lessons/[slug]/page.tsx",
  },
  {
    label: "Quests page",
    path: "src/app/quests/page.tsx",
  },
  {
    label: "Workshops page",
    path: "src/app/workshops/page.tsx",
  },
  {
    label: "Dashboard page",
    path: "src/app/dashboard/page.tsx",
  },
  {
    label: "Status page",
    path: "src/app/status/page.tsx",
  },
  {
    label: "Changelog page",
    path: "src/app/changelog/page.tsx",
  },
  {
    label: "Impact page",
    path: "src/app/impact/page.tsx",
  },
  {
    label: "Reviewer guide page",
    path: "src/app/reviewer-guide/page.tsx",
  },
  {
    label: "Admin layout",
    path: "src/app/admin/layout.tsx",
  },
  {
    label: "Admin overview",
    path: "src/app/admin/page.tsx",
  },
  {
    label: "Admin courses",
    path: "src/app/admin/courses/page.tsx",
  },
  {
    label: "Admin create course",
    path: "src/app/admin/courses/new/page.tsx",
  },
  {
    label: "Admin submissions",
    path: "src/app/admin/submissions/page.tsx",
  },
  {
    label: "Admin workshops",
    path: "src/app/admin/workshops/page.tsx",
  },
  {
    label: "Admin create workshop",
    path: "src/app/admin/workshops/new/page.tsx",
  },
  {
    label: "Learner actions",
    path: "src/app/actions/learner.ts",
  },
  {
    label: "Admin actions",
    path: "src/app/actions/admin.ts",
  },
  {
    label: "Prisma client",
    path: "src/lib/prisma.ts",
  },
  {
    label: "i18n dictionary",
    path: "src/lib/i18n.ts",
  },
  {
    label: "Admin console nav",
    path: "src/components/admin-console-nav.tsx",
  },
  {
    label: "Submit button",
    path: "src/components/submit-button.tsx",
  },
];

const requiredContent: ContentCheck[] = [
  {
    label: "Admin course creation action",
    path: "src/app/actions/admin.ts",
    contains: ["createCourseWithLessonAction"],
  },
  {
    label: "Admin workshop creation action",
    path: "src/app/actions/admin.ts",
    contains: ["createWorkshopAction"],
  },
  {
    label: "Admin submission review actions",
    path: "src/app/actions/admin.ts",
    contains: ["approveQuestSubmissionAction", "rejectQuestSubmissionAction"],
  },
  {
    label: "Learner course/lesson actions",
    path: "src/app/actions/learner.ts",
    contains: [
      "enrollCourseAction",
      "startLessonAction",
      "completeLessonAction",
    ],
  },
  {
    label: "Learner quest action",
    path: "src/app/actions/learner.ts",
    contains: ["submitQuestAction"],
  },
  {
    label: "Learner workshop actions",
    path: "src/app/actions/learner.ts",
    contains: [
      "registerWorkshopAction",
      "cancelWorkshopRegistrationAction",
    ],
  },
  {
    label: "Admin nav has courses route",
    path: "src/components/admin-console-nav.tsx",
    contains: ["/admin/courses", "/admin/courses/new"],
  },
  {
    label: "Admin nav has workshops route",
    path: "src/components/admin-console-nav.tsx",
    contains: ["/admin/workshops", "/admin/workshops/new"],
  },
];

let hasError = false;

function printOk(message: string) {
  console.log(`✅ ${message}`);
}

function printFail(message: string) {
  console.error(`❌ ${message}`);
  hasError = true;
}

console.log("\nKaryra Route Audit\n");

for (const file of requiredFiles) {
  const absolutePath = join(root, file.path);

  if (existsSync(absolutePath)) {
    printOk(`${file.label}: ${file.path}`);
  } else {
    printFail(`${file.label} missing: ${file.path}`);
  }
}

console.log("\nKaryra Content Audit\n");

for (const check of requiredContent) {
  const absolutePath = join(root, check.path);

  if (!existsSync(absolutePath)) {
    printFail(`${check.label}: file missing ${check.path}`);
    continue;
  }

  const content = readFileSync(absolutePath, "utf8");

  for (const requiredText of check.contains) {
    if (content.includes(requiredText)) {
      printOk(`${check.label}: found "${requiredText}"`);
    } else {
      printFail(`${check.label}: missing "${requiredText}"`);
    }
  }
}

if (hasError) {
  console.error("\nAudit failed. Fix missing files or exports before continuing.\n");
  process.exit(1);
}

console.log("\nAudit passed. Karyra route structure looks good.\n");