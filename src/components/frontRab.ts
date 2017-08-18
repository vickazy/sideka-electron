import { Component, NgZone } from '@angular/core';

import SiskeudesService from '../stores/siskeudesService';
import SettingsService from '../stores/settingsService';

@Component({
    selector: 'front-rab',
    templateUrl: 'templates/frontRab.html',
    styles: [`
        :host {
            display: flex;
        }
    `],
})

export default class FrontRabComponent {
    siskeudesMessage: string;
    kodeDesa: string;
    sumAnggaranRAB: any[] = []

    constructor(
        private zone: NgZone,
        private siskeudesService: SiskeudesService,
        private settingsService: SettingsService
    ) {
    }

    ngOnInit(): void {
        this.siskeudesMessage = this.siskeudesService.getSiskeudesMessage();
        this.kodeDesa = this.settingsService.get('kodeDesa');
        this.getRAB();
    }

    getRAB(): void {
        if (this.siskeudesMessage)
            return;

        this.siskeudesService.getSumAnggaranRAB(this.kodeDesa, data => {
            this.zone.run(() => {
                let uniqueYears = [];

                data.forEach(content => {
                    let isUniqueYear = uniqueYears.map(c => c['year']).indexOf(content['Tahun']);
                    let isUniqueDesa = uniqueYears.map(c => c['kd_desa']).indexOf(content['Kd_Desa']);

                    if (isUniqueDesa == -1 && isUniqueYear == -1 || isUniqueDesa == -1 && isUniqueYear != -1) {
                        uniqueYears.push({
                            year: content['Tahun'],
                            kd_desa: content['Kd_Desa'],
                        })
                    }
                })

                uniqueYears.forEach(item => {
                    let content = data.filter(c => c.Tahun == item.year && c.Kd_Desa == item.kd_desa)
                    this.sumAnggaranRAB.push({
                        year: item.year,
                        kd_desa: item.kd_desa,
                        data: content
                    })
                })
            });
        });
    }
}