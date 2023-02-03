import { Controller, Get } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry } from '@nestjs/schedule';

@Controller('cron')
export class CronController {

    constructor(private scheduleRegistry: SchedulerRegistry) {}

    @Get()
    getCronGreetings(){
        const job =this.scheduleRegistry.getCronJob("everyfive")
        job.stop()
        const interval = setInterval(() => {
            console.log("every 3 seconds")
        }, 3000)
        this.scheduleRegistry.addInterval("EVERY_3_SECONDS", interval)
        const timeout = setTimeout(() => {
            console.log("called once after 5s")
        }, 5000)
        this.scheduleRegistry.addTimeout("CALLED_5S", timeout)
        return "hello"
    }

    // @Cron('5 * * * * *', {name: "everyfive"})
    // executeTask(){
    //     console.log("every 5 seconds in a minute")
    // }

    @Get('stop-task')
    stopTask(){
        this.scheduleRegistry.deleteInterval("EVERY_3_SECONDS")
        this.scheduleRegistry.deleteTimeout("CALLED_5S")
    }
    // @Interval(2000)
    // executeTaskEveryTwoSeconds(){
    //     console.log("every 2 seconds...")
    // }

}
