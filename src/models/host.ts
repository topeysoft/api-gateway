export class Host{
    name:string;
    type:string;
    origins:[Origin];
    target:[Origin];
}

export class Origin{
    hostname:string;
    path:string;
}
export class target{
    host?:string;
    app_path?:string;
}