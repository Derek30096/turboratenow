# CLOUDFLARE ERROR 522 EMERGENCY FIX

## PROBLEM
turboratenow.net showing Error 522 - Connection timeout between Cloudflare and origin server

## CAUSE
Worker cannot reach the Replit development URL. Possible reasons:
1. Replit URL changed (Replit generates new URLs when restarted)
2. Network connectivity issue
3. Replit development server not responding

## SOLUTION
Update the worker with the current working Replit URL from the console logs

## CURRENT REPLIT URL
From console logs: 84558308-661e-4d2e-89a3-c392a1fd57a3-00-2phr21a0sgnke.spock.replit.dev

## UPDATED WORKER CODE
```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Updated with current working Replit URL
  const targetUrl = 'https://84558308-661e-4d2e-89a3-c392a1fd57a3-00-2phr21a0sgnke.spock.replit.dev'
  
  const url = new URL(request.url)
  const proxyUrl = targetUrl + url.pathname + url.search
  
  const modifiedRequest = new Request(proxyUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })
  
  const response = await fetch(modifiedRequest)
  
  const modifiedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...Object.fromEntries(response.headers),
      'X-Powered-By': 'AutoRatesComparison',
      'Access-Control-Allow-Origin': '*'
    }
  })
  
  return modifiedResponse
}
```

## BACKUP SOLUTION
If Replit URL keeps changing, we can implement URL detection or fallback logic.