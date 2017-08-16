import { NOT_FOUND } from 'http-status-codes';
export const four04App = ()=>{
    (req, resp)=>{
        resp.status(NOT_FOUND).send('The requested host was not found')
      }
} 