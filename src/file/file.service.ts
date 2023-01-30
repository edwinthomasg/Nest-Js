import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({scope: Scope.TRANSIENT})
export class FileService implements OnModuleInit {
    constructor(@Inject(INQUIRER) private parent: object){
        console.log("called...") 
    }
    onModuleInit() {
        console.log("the module has been initialized ...")
    }
    getFileName(){
        console.log(`${this.parent?.constructor?.name}`)
        return "config.yaml"
    }
}

// Scope Default - Constructor wont be called on every time
// Scope Req -Constructor called on every reqs
// Scope Transient - Constructor called wherever it is injecting