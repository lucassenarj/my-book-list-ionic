import {Injectable} from '@angular/core';
import {Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Events, AlertController, LoadingController} from 'ionic-angular';
import {GlobalVars} from "./global-vars";

@Injectable()
export class ExtendedHttpService extends Http {
    constructor(backend: XHRBackend, defaultOptions: RequestOptions, public events: Events,
                public alertCtrl: AlertController, public globalVars: GlobalVars, public loadingCtrl: LoadingController) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {

        if (typeof url === 'string') {
            if (document.URL.startsWith('file://'))
                url = url.replace('/api/', this.globalVars.getApiUrl() + '/');

            if (!options) {
                options = {headers: new Headers()};
            }
            this.setHeaders(options);
        } else {
            if (document.URL.startsWith('file://'))
                url.url = url.url.replace('/api/', this.globalVars.getApiUrl() + '/');

            this.setHeaders(url);
        }

        return super.request(url, options).catch(this.catchErrors());
    }


    private catchErrors() {

        return (res: Response) => {
            this.loadingCtrl.create().dismissAll();

            if (res.status === 401) { // Unauthorized
                let alert = this.alertCtrl.create({
                    title: 'Aviso!',
                    subTitle: 'Credenciais informadas não correspondem com nossos registros, ou sua conta não foi validada.',
                    buttons: ['OK']
                });
                alert.present();

                this.events.publish('user:logout');
            } else if (res.status === 500) { // Internal Server Error
                try {
                    var resposta = res.json();

                    for (var key in resposta) {
                        let alert = this.alertCtrl.create({
                            title: 'Erro!',
                            subTitle: resposta[key],
                            buttons: ['OK']
                        });
                        alert.present();
                    }
                } catch (ex) {
                    let alert = this.alertCtrl.create({
                        title: 'Erro!',
                        subTitle: 'Erro na comunicação!',
                        buttons: ['OK']
                    });
                    alert.present();
                };

            } else if (res.status === 0) { // ?
                let alert = this.alertCtrl.create({
                    title: 'Sem conexão!',
                    subTitle: 'Falha na comunicação, favor verifique se você tem conexão com internet.!',
                    buttons: ['OK']
                });
                alert.present();
                this.loadingCtrl.create().dismiss();
            }else if(res.status === 403) { // Forbidden
                let alert = this.alertCtrl.create({
                    title: 'Acesso não autorizado!',
                    subTitle: 'Você não possui permissão para acessar esta página.',
                    buttons: ['OK']
                });
                alert.present();
                this.loadingCtrl.create().dismiss();
            }
            else { // Generic error
                let alert = this.alertCtrl.create({
                    title: 'Erro!',
                    subTitle: 'Erro na comunicação!',
                    buttons: ['OK']
                });
                alert.present();
                
            }
            this.loadingCtrl.create().dismissAll();

            return Observable.throw(res);
        };
    }

    private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    }
}