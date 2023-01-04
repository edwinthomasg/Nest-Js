import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    getAdminProfile(){
        return "Hi admin profile.."
    }
    signIn(){
        return "Signing in.."
    }
}
