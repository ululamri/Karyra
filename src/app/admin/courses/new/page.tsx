import Link from "next/link";
import { createCourseWithLessonAction } from "../../../actions/admin";
import { SubmitButton } from "../../../../components/submit-button";
import { getServerLanguage } from "../../../../lib/i18n-server";

export default async function NewCoursePage() {
  const language = await getServerLanguage();

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
        <Link href="/admin/courses" className="text-sm text-emerald-300">
          ← {language === "id" ? "Kelola Course" : "Manage Courses"}
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Content Builder
        </p>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          {language === "id" ? "Buat Course Baru" : "Create New Course"}
        </h2>

        <p className="mt-4 leading-8 text-slate-300">
          {language === "id"
            ? "Form ini membuat course, module pertama, dan lesson pertama sekaligus agar admin bisa membuat konten dengan cepat."
            : "This form creates a course, first module, and first lesson at once so admins can create content quickly."}
        </p>
      </section>

      <form
        action={createCourseWithLessonAction}
        className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
      >
        <div className="grid gap-2">
          <label htmlFor="title" className="font-semibold">
            Course Title
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Contoh: Keamanan Wallet untuk Pemula"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="subtitle" className="font-semibold">
            Subtitle
          </label>
          <input
            id="subtitle"
            name="subtitle"
            placeholder="Ringkasan singkat course"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="description" className="font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Jelaskan tujuan course ini..."
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="difficulty" className="font-semibold">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              defaultValue="BEGINNER"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none"
            >
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="status" className="font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="DRAFT"
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>
        </div>

        <div className="mt-4 border-t border-white/10 pt-6">
          <h3 className="text-2xl font-bold">First Lesson</h3>
          <p className="mt-2 text-sm text-slate-400">
            {language === "id"
              ? "Lesson pertama otomatis masuk ke Module 1."
              : "The first lesson will automatically be added to Module 1."}
          </p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="lessonTitle" className="font-semibold">
            Lesson Title
          </label>
          <input
            id="lessonTitle"
            name="lessonTitle"
            required
            placeholder="Contoh: Apa Itu Seed Phrase?"
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="lessonContent" className="font-semibold">
            Lesson Content
          </label>
          <textarea
            id="lessonContent"
            name="lessonContent"
            required
            rows={8}
            placeholder="Tulis materi lesson pertama di sini..."
            className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none placeholder:text-slate-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SubmitButton pendingText="Creating course...">
            Create Course
          </SubmitButton>

          <Link
            href="/admin/courses"
            className="rounded-2xl border border-white/15 px-6 py-4 text-center font-bold text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}