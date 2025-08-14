import { useTranslation } from "react-i18next"

export const ExperienceItem = ({ title, company, location, dates, points }: any) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>
        {company} - {location} ({dates})
      </p>
      <ul>
        {points.map((point: string, index: number) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  )
}

export const SkillBadge = ({ children }: any) => {
  return (
    <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
      {children}
    </div>
  )
}

export const Achievement = ({ t, d }: any) => {
  const { t: translate } = useTranslation()
  return (
    <li>
      <strong>{translate(t)}</strong>: {translate(d)}
    </li>
  )
}
