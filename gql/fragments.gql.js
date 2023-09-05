export const seoFragment = `meta: _seoMetaTags {
    attributes
    content
    tag
  }`

export const ctaFragment = `
  ctaLink
  ctaCopy
  showCta
`

export const mediaFragment = (
  mediaType = "image",
  imgixParams = null,
  autoFormat = true
) => {
  if (autoFormat) {
    if (imgixParams) {
      imgixParams = `${imgixParams.replace(/}\s*$/, "")}, auto: [format] }`
    } else {
      imgixParams = "{ auto: [format] }"
    }
  }

  return `${mediaType} {
    id
    alt
    height
    width
    title
    format
    src: url(imgixParams: ${imgixParams})
    focalPoint {
      x
      y
    }
  }`
}

export const responsiveMediaFragment = (
  mediaType = "image",
  imgixParams = null,
  autoFormat = true
) => {
  if (autoFormat) {
    if (imgixParams) {
      imgixParams = `${imgixParams.replace(/}\s*$/, "")}, auto: [format] }`
    } else {
      imgixParams = "{ auto: [format] }"
    }
  }

  return `${mediaType} {
    id
    responsiveImage${imgixParams ? `(imgixParams: ${imgixParams})` : ""} {
      srcSet
      webpSrcSet
      sizes
      src
      width
      height
      aspectRatio
      alt
      title
      bgColor
      base64
    }
    focalPoint {
      x
      y
    }
  }`
}

export const responsiveMediaTransparentFragment = (
  mediaType = "image",
  imgixParams = null
) =>
  `${mediaType} {
    id
    responsiveImage${imgixParams ? `(imgixParams: ${imgixParams})` : ""} {
      srcSet
      webpSrcSet
      sizes
      src
      width
      height
      aspectRatio
      alt
      title
    }
    focalPoint {
      x
      y
    }
  }`

export const splitTestVariantFragment = `
  splitTestVariant {
    id
    variantId
    splitTestKey
  }
`

export const typeFragment = "type: _modelApiKey"
export const displayFragment = `
  visibility
  skuPattern
  disableBottomMargin
  ${splitTestVariantFragment}
`

export const headingFragment = `
  ${typeFragment}
  ${displayFragment}
  title
  titleGradient
  titleSize
  titleTag
  subtitle
  subtitleTag
  subtitleGradient
  fullWidthSubtitle
  copy
  copySize
  copyTag
  fullWidthCopy
  showCta
  ctaCopy
  ctaLink
  centerContent
`

export const headingRecord = `
  ... on HeadingRecord {
    id
    ${headingFragment}
  }`

export const standfirstRecord = `
  ... on StandfirstRecord {
    id
    ${typeFragment}
    ${displayFragment}
    title
    titleTag
    largeTitle
    subtitle
    fullWidth
  }`

export const dividerRecord = `
  ... on DividerRecord {
    id
    ${typeFragment}
    ${displayFragment}
  }`

export const bannerFragment = `
  ${typeFragment}
  ${displayFragment}
  ${mediaFragment()}
  ${mediaFragment("mobileImage")}
  overlayOpacity
  mobileOverlayOpacity
  ${ctaFragment}
  displayTitle
  titleSize
  titleTag
  copy
  useRichText
  richTextCopy
  halfWidthCopy
  fullWidthCopy
  inlineCopy
  primaryColour
  headingGradient
  fullWidth
  ctaGradient
  bannerHeightAuto
  matchHeightToContent
  minHeight
  bottomPadding
  disableParallax
  contentAlignment
  hidden
  displayOnlyWithUrlParam
  features {
    id
    icon {
      url
    }
    text
  }
`

export const bannerRecord = `
  ... on BannerRecord {
    id
    ${bannerFragment}
  }`

export const customisedProductFragment = `
  _modelApiKey
  sku
  title
  subTitle
  frameSwatchOverride
  lensSwatchOverride
  swatchIconOverride {
    url(imgixParams: {w: "50", h: "50"})
  }
  lensPart
  limitedEdition
  stockManagedPart
`

export const stackFragment = `
  ${typeFragment}
  ${mediaFragment()}
  ${ctaFragment}
  link
  title
  titleSize
  titleTag
  subtitle
  copy
  copySize
  ctaType
  ctaStyle
  aspectRatio
  fullHeight
`

export const productCardFragment = `
  ${typeFragment}
  showTag
  tagCopy
  imageNumber
  useBaseProduct
  showSwatchSelector
  showReviewStars
  isPrescriptionProducts
  titleTag
  products {
    ${typeFragment}
    sku
    title
    subTitle
    frameSwatchOverride
    lensSwatchOverride
    swatchIconOverride {
      url(imgixParams: {w: "50", h: "50"})
    }
    lensPart
    limitedEdition
    ${mediaFragment("logo", '{ w: "200", h: "100", fit: fill }')}
    stockManagedPart
    theme
    baseProduct {
      sku
      swatchIconOverride {
        url(imgixParams: {w: "50", h: "50"})
      }
      theme
    }
  }
  baseProduct {
    ${typeFragment}
    sku
  }
  onGiftingPage
  showGiftCard
  seeMoreLinkOverride
`
export const sustainabilityBlockFragment = `
  id
  customClass
  backgroundColour
  ${mediaFragment("desktopBackground", '{ w: "1400", h: "1300", fit: clip }')}
  ${mediaFragment("mobileBackground", '{ w: "1000", h: "900", fit: clip }')}
  ${mediaFragment("icon", '{ w: "320", h: "200", fit: clip }')}
  iconPosition
  heading {
    ... on HighlighterHeadingRecord {
      __typename
      _modelApiKey
      id
      highlightType
      heading {
        value
      }
    }
  }
  modalContent {
    slug
  }
  showSubheading
  subheading {
    blocks
    value
  }
  subheadingColour
`

export const multiColumnRecord = `
  ... on MultiColumnRecord {
    id
    ${typeFragment}
    ${displayFragment}
    columns {
      ... on BlankRecord {
        id
        ${typeFragment}
      }
      ... on ProductCardRecord {
        id
        ${productCardFragment}
      }
      ... on StackRecord {
        id
        ${stackFragment}
      }
      ... on BannerCardRecord {
        id
        ${typeFragment}
        ${mediaFragment()}
        displayTitle
        titleSize
        primaryColour
        copy
      }
    }
  }`

export const videoRecord = `
  ... on VideoRecord {
    ${typeFragment}
    ${displayFragment}
    id
    loop
    muted
    autoPlay
    previewStartTime
    previewDuration
    fullWidth
    transform
    transformSizing
    ${mediaFragment("video", null, false)}
  }`

export const richTextRecord = `
  ... on RichTextRecord {
    ${typeFragment}
    id
    content
    matchPaddingToBanner
    ${ctaFragment}
    ctaGradient
    ${displayFragment}
  }`

export const carouselRecord = `
  ... on CarouselRecord {
    ${typeFragment}
    id
    title
    items {
      id
      title
      target
      overlayOpacity
      ${mediaFragment()}
    }
  }`

export const styledBannerRecord = `
  ... on StyledBannerRecord {
    ${typeFragment}
    id
    backgroundColour
    condensedView
    style
    ${mediaFragment()}
    ${mediaFragment("mobileImage")}
  }`

export const sustainabilityBlockRecord = `
  ... on SustainabilityBlockRecord {
    ${typeFragment}
    id
    ${sustainabilityBlockFragment}
  }
`

export const formBlockRecord = `
  ... on FormBlockRecord {
    ${typeFragment}
    id
    formId
    disableBottomMargin
  }
`

export const faqBlockRecord = `
  ... on FaqBlockRecord {
    ${typeFragment}
    id
    uid
    title
    disableBottomMargin
    footerCopy
    articles {
      id
      title
      bodyCopy
    }
  }
`

export const anchorButtonRowRecord = `
  ... on AnchorButtonRowRecord {
    ${typeFragment}
    id
    anchorButtonContainer {
      id
      buttonText
      sectionId
    }
  }
`

export const competitionBlockRecord = `
  ... on CompetitionBlockRecord {
    ${typeFragment}
    id
    competition {
      id
      competitionName
      competitionMode
      slug
      competitionId
      closingDatetime
      inIframe
    }
  }
`

export const rowsFragment = `{
    ${headingRecord}
    ${dividerRecord}
    ${bannerRecord}
    ${videoRecord}
    ${standfirstRecord}
    ${multiColumnRecord}
    ${richTextRecord}
    ${carouselRecord}
    ${styledBannerRecord}
    ${sustainabilityBlockRecord}
    ${formBlockRecord}
    ${faqBlockRecord}
    ${anchorButtonRowRecord}
    ${competitionBlockRecord}
  }
`

export const builderFragment = `
  pageTheme
  rows ${rowsFragment}
  title
  ${seoFragment}
`

export const commerceTagFragment = `
  ... on CommerceTagRecord {
    title
    value
  }
`

export const productCategoryFragment = `
  __typename
  id
  isComingSoon
  contentFilter {
    ${commerceTagFragment}
  }
  optionContent {
    value
    links {
      __typename
      ${styledBannerRecord}
    }
  }
  heading
`

export const localeFragment = "fallbackLocales: en, locale: $locale"
