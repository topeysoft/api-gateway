import { ConfigValidator } from './config.validator';
import { HostConfigException } from "../../exceptions/index";
import { HostsConfigMock } from "../../mocks/hosts.config.mock";

const getHostConfigMock = ()=>{
  return Object.assign({}, HostsConfigMock);
}

describe("ConfigValidator", () => {
  it("should implement all necesary methods", () => {
    expect(ConfigValidator.validate).toBeTruthy();
  });

  describe("ConfigValidator.validate", () => {
      it("should throw host config exception when given invalid host config", () => {
        spyOn(HostConfigException, "throw");
        ConfigValidator.validate(null);
        expect(HostConfigException.throw).toHaveBeenCalledTimes(1);
        ConfigValidator.validate({});
        expect(HostConfigException.throw).toHaveBeenCalledTimes(2);
        let config = getHostConfigMock();
        delete config.proxies;
        ConfigValidator.validate(config);
        expect(HostConfigException.throw).toHaveBeenCalledTimes(3);
        config = getHostConfigMock();
        delete config.apps;
        ConfigValidator.validate(config);
        expect(HostConfigException.throw).toHaveBeenCalledTimes(4);
      });
    
    it("should NOT throw host config exception when given valid host config", () => {
      spyOn(HostConfigException, "throw");
      ConfigValidator.validate(getHostConfigMock());
      expect(HostConfigException.throw).toHaveBeenCalledTimes(0);
    });
  });
});

