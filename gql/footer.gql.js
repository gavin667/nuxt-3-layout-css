import { localeFragment } from "./fragments.gql"

const linkRecordsFragment = `
  id
  label
  target
`

const sidebarRecordsFragment = `
  id
  label
  sidebar {
    slug
  }
`

export default `query FooterQuery($locale: SiteLocale){
  footer(${localeFragment}) {
    subscribeCopy
    columns {
      id
      label
      items {
        ... on TargetLinkWithTagRecord {
          ${linkRecordsFragment}
          showTag
          tag
        }
        ... on SidebarLinkWithTagRecord {
          ${sidebarRecordsFragment}
          showTag
          tag
        }
      }
    }
    socialLinks {
      id
      icon
      link
    }
    logos {
      id
      svgLogo {
        url
      }
      size
      missionModal {
        modalContent {
          dialogType
          slug
        }
      }
    }
    links {
      ... on TargetLinkRecord {
        ${linkRecordsFragment}
      }
      ... on SidebarLinkRecord {
        ${sidebarRecordsFragment}
      }
      ... on CookieLinkRecord {
        id
        label
        showCookieModal
      }
    }
  }
}`
