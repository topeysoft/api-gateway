# tsc-api-gateway

This project is generated from the [node-typescript-seed](https://github.com/UIUXEngineering/node-typescript-seed).

# Table of Contents
- [Install](#install)
- [API](#api)
- [TypeScript Usage](#typescript-usage)
- [ES6 Usage](#es6-usage)
- [CommonJS Usage](#commonjs-usage)
- [UMD Usage](#umd-usage)
- [Contribute](#contribute)
- [Report Issues](#report-issues)

# Install

Install using npm or yarn.

```bash
    yarn add tsc-api-gateway
```

# API
TODO - document your api here

## feature
### Return Data Type
### Coniguration params

```typescript

    // How to use

```

## feature
### Return Data Type
### Coniguration params


```typescript

    // How to use

```

# TypeScript Usage

Import from index.ts

```typescript

    // import index.ts
    import 'tsc-api-gateway';
    
    // or import feature
    
    import { someFeature } from 'tsc-api-gateway';
    
    // or import feature file directly
    
    import * as someFeature from 'tsc-api-gateway/[path/to/feature/file]'

```

# ES6 Usage

Import features from the `dist/es6` directory. You may import a file directly from the `dist/es6` directory.

```javascript 1.6

    import 'tsc-api-gateway/dist/es6/index';
    
    // or import feature
        
    import { someFeature } from 'tsc-api-gateway';
    
    // or import feature file directly
    
    import * as someFeature from 'tsc-api-gateway/[path/to/feature/file]'

```

# CommonJS Usage

Import features from the `dist/cjs` directory. You may import a file directly from the `dist/es6` directory.

```javascript

    var someFeature = require('tsc-api-gateway/dist/cjs');
    
    // or
    
    var someFeature = require('tsc-api-gateway/dist/cjs/[path/to/feature/file]');

```

# UMD Usage

Import using either method above, or using `define`:

```javascript

    define(['node_modules/tsc-api-gateway/dist/umd'], function(dep1) {
        // do stuff with module
    });
    
    // or 
    
    define(['node_modules/tsc-api-gateway/dist/umd/[feature filename]'], function(dep1) {
        // do stuff with module
    });

```

# Contribute

To contribute, see the [project repo](https://github.com/topeysoft/api-gateway.git).
See [docs/PROJECT_README.md](docs/PROJECT_README.md) for development guide.


# Report Issues

Report issues to project [issue queue](https://github.com/topeysoft/api-gateway/issues);
