import { SectionHeader } from "@/components/section-header"
import { ContactActions } from "@/components/contact-actions"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <SectionHeader eyebrow={"Let’s build"} title={"Contact"} />
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/80">
            {"Tell me about your product, timeline, and what success looks like. I’ll get back within 24–48 hours."}
          </p>
          <div className="mt-6">
            <ContactActions
              email={"bigyatuladhar07@gmail.com"}
              phone={"+977 9818372334"}
              location={"Kathmandu, Nepal"}
              linkedinUrl={"https://www.linkedin.com/in/bigya-tuladhar/"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
