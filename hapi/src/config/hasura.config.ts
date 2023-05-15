export const url = process.env.HAPI_HASURA_URL
export const adminSecret = process.env.HAPI_HASURA_ADMIN_SECRET

if (!url || !adminSecret) {
  throw new Error('Missing required hasura env variables')
}
