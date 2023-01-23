import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { VersionService } from './version.service';


@Controller({
    version: VERSION_NEUTRAL,
    path: 'version'
})
export class VersionController3{
    @Get()
    greetOther(){
        return "hi, hello i am neutral"
    }
}

@Controller({
    version: ['1', '3'],
    path: 'version'
})
export class VersionController {

    constructor(private readonly versionService: VersionService) {}
    
    // @Version('1')
    @Get()
    greetBrowser(){
        return this.versionService.greetOthers()
    }

    // @Version('2')
    @Get('others')
    greetBrowser2(){
        return this.versionService.greetOthers2()
    }
}

@Controller({
    version: '2',
    path: 'version'
})
export class VersionController2 {

    constructor(private readonly versionService: VersionService) {}

    @Get()
    greetBrowser(){
        return "hi"
    }
}
