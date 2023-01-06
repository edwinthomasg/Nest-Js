import { Inject, Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class AdminService {
    getAdminProfile(){
        return "Hi admin profile.."
    }
    signIn(){
        return "Signing in.."
    }
}
