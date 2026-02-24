import type { Locale } from './config'

const courseDictionaries = {
  en: () => import('./dictionaries/course.en.json').then((m) => m.default),
  fr: () => import('./dictionaries/course.fr.json').then((m) => m.default),
  ru: () => import('./dictionaries/course.ru.json').then((m) => m.default),
  uz: () => import('./dictionaries/course.uz.json').then((m) => m.default),
}

export type CourseDictionary = Awaited<ReturnType<(typeof courseDictionaries)['en']>>

export const getCourseDictionary = async (locale: Locale) => {
  return courseDictionaries[locale]()
}
