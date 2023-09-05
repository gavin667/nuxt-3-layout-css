import { subscribeToQuery } from 'datocms-listen'
import { AsyncData } from 'nuxt/app'

interface Options {
  query: string
  variables?: Record<string, any>
}

export default (options: Options): AsyncData<any, any> => {
  const { query, variables = {} } = options

  const { public: {
    datoApiToken: token,
    datoEnvironment: environment,
    datoEndpoint: endpoint
  } } = useRuntimeConfig()

  // Assuming useRuntimeConfig and useRoute are properly typed
  const { query: queryParameters } = useRoute()
  const previewMode = ['true', '1'].includes(queryParameters?.preview as string)

  // In preview mode we need to add the 'X-Include-Drafts: true' header
  const additionalHeaders: Record<string, any> = {}
  if (previewMode) {
    additionalHeaders['X-Include-Drafts'] = true
  }

  // Add environment header if needed
  if (environment) {
    additionalHeaders['X-Environment'] = environment
  }

  // Create a key for the query
  const key = JSON.stringify({ query, variables, environment, previewMode })

  const response = useFetch(endpoint, {
    key,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      ...additionalHeaders
    },
    body: {
      query,
      variables
    },
    transform: ({ data, errors }: { data: any; errors: any }) => {
      if (errors) {
        throw new Error(errors)
      }

      return data
    }
  })

  // Subscribe to the query and update the data when it changes
  if (previewMode && process.client) {
    subscribeToQuery({
      query: query,
      variables,
      preview: true,
      token,
      environment,
      onUpdate: (update: { response: { data: any } }) => {
        response.data.value = update.response.data
      }
    })
  }

  return response
}
