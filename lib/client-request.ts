'use client'

import { navigate } from "./request"
import { Session } from "./types"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

/**
 * @param {Object} options - The request options.
 * @param {string} options.url - The URL to send the request to.
 * @param {string} [options.method] - The HTTP method to use (GET, POST, PUT, DELETE).
 * @param {object} [options.body] - The request body to send (for POST, PUT).
 * @param {boolean} [options.auth] - Whether to include authentication headers.   
 * @param {boolean} [options.cache] - Whether to use cache or not.
 * @param {object} [options.session] - The session object containing user information.
 * @returns {Promise<object|boolean>} - The response data or false if an error occurs.
*/

interface ClientRequest {
  url: string
  method?: string
  body?: object
  auth?: boolean
  cache?: boolean
  session?: Session
}

export const sendClientRequest = async ({ url, method = 'GET', body = {}, auth = true, cache = false, session }: ClientRequest) => {
  if(!url) return false
  let methodType = ['get', 'post', 'put', 'delete'], accessToken = '', headers = {}, fetchOptions = {}, res
  if(!methodType.includes(method.toLowerCase())) return false
  if(auth){
    if(!session) { navigate('/login'); return false }
    if(!session.user) { navigate('/login'); return false }
    accessToken = session.user.accessToken
    if(!accessToken) { navigate('/login'); return false }
    headers = {"Authorization" : `Bearer ${accessToken}`, "Content-Type": "application/json" }
  }
  else headers = {"Content-Type": "application/json"}
  if(method.toLowerCase() == 'get' || method.toLowerCase() == 'delete') fetchOptions = { method, headers, credentials: 'include' }
  else fetchOptions = { method, headers, body: JSON.stringify(body), credentials: 'include' }
  if(!cache) fetchOptions = { ...fetchOptions, cache: 'no-store' }
  else fetchOptions = { ...fetchOptions, cache: 'force-cache' }
  try {
    res = await fetch(API_URL + url, fetchOptions)
  } catch(err){
    return false
  }
  if(!res) return false
  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) return false
  const result = await res.json()
  if(!result) return false
  if(result.status == 502) return navigate('/logout')
  return result
}