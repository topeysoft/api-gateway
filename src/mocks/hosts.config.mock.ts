// tslint:disable:quotemark

export const HostsConfigMock = {
  // example one (Proxy)
  proxies: [
    {
      policies: [
          {
              name:"enforce_https"
          },
          {
              name:"cors",
              options:{
                  allowed_domains:'*'
              },
          },

      ],
      origins: [{
        hostname: "example1.com",
        path: "/"
      }],
      // options:{

      // },
      target: {
        url: "http://localhost:3000/abc/123/?test=true#here"
      }
    }
  ],
  apps: [
    {
      origins: [{
        hostname: "example2.com",
        path: "/"
      }],
      target: {
        path: "./"
      }
    }
  ]
};
