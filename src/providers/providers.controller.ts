import { Controller, Get, Inject } from "@nestjs/common";
import { TestService } from "src/test/test.service";
import { ConfigData } from "./interfaces/interface.type";
import { OverRideProviders } from "./providers.module";
import { ProvidersService } from "./providers.service";

@Controller('providers')
export class ProvidersController{
    
    constructor(private providersService: ProvidersService,
        @Inject('OVERRIDE_VALUE') private overrideValue: OverRideProviders,
        @Inject('USE_FACTORY') private providerService: ProvidersService,
        @Inject('USE_EXISTING') private existingService: ProvidersService,
        private testService: TestService) {
            console.log("test service 2 : ", TestService)
        }

    @Get()
    getConfigData(): ConfigData{
        return this.providersService.getConfigData()
    }

    @Get('string-token')
    getFullDomain() {
        return this.overrideValue.getConfigData()
    }

    @Get('use-factory/data')
    getDomain(){
        return this.providerService.getConfigData()
    }

    @Get('use-existing/data')
    getDomainConfig(){
        console.log(this.providersService === this.existingService)
        return this.existingService.getConfigData()
    }
}