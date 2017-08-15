# Setup Child app and Proxies
    Read hosts config
    Loop through hosts and determine whether or not it's proxy or child apps
    if type is proxy,
        using http-proxy-middleware
            setup proxy
    If type is child app
        Using vhost 
            setup child app
    

## Setting up proxy
Proxies are just pass-through/pathway to another app hosted locally or remotely. This does not requre any knowledge of how the app is setup nor does it care about it's implementation detail or framework.
### Implementation detail
- The following are the options needed to implement proxy
    -  origin: This is the orgin of the request. eg. www.topeysoft.com, www.elyir.com, api.elyir.com 
    -  Target: This is the target host (hostname, port, path and query string)
    -  policies: these are the required middleware to executed before passing the request accross. (this may be an empty array). Example of policies include:
        -   Authentication and authorization (i.e. Oauth)
        -   Cross Origin Resource Sharing (CORS)
        