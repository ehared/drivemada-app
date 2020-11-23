import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from "@angular/core";
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class UtilService {

    constructor(private toastCtlr: ToastController, private alertCtlr: AlertController) { }

    /**
     * Creates and present a toast with a message 
     * @param message message to be shown in toast
     */
    async presentToast(message: string) {
        let toast = this.toastCtlr.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        })
            ; (await toast).present();
    }

    /**
     * Creates and presents an alert dialog
     * @param message message to be showin in alert dialog
     */
    async presentAlert(message: string) {
        let alert = this.alertCtlr.create({
            message: message,
            buttons: ['OK']

        });
        (await alert).present()
    }

    /**
     * Converts JSON to FormData
     * @param json - json to be converted
     * @returns formData: FormData - formData from JSON conversion
     */
    jsonToFormData(json: any) {
        const formData = new FormData();
        for (const key in json) {
            formData.append(key, json[key]);
        }
        return formData;
    }

    /**
     * Prints response onto the console
     * @param res response
     */
    logResponeToConsole(res: any) {
        console.log(JSON.stringify(res));
    }

    /**
     * Prints error onto the console 
     * @param err error
     */
    logErrorToConsole(err: any) {
        console.log(JSON.stringify(err));
    }
}