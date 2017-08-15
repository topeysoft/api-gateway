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
      origin: {
        hostname: "example1.com",
        path: "/"
      },
      target: {
        hostname: "localhost",
        port: 3000,
        path: "/",
        query_string: ""
      }
    }
  ],
  apps: [
    {
      origin: {
        hostname: "example2.com",
        path: "/"
      },
      target: {
        path: "./"
      }
    }
  ]
};
