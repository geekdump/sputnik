import { Component, Input, AfterViewInit } from '@angular/core';
declare var Gauge: any;

@Component({
    selector: 'app-gauge',
    template: '<canvas id="{{id}}-gauge" class="gaugejs" style="width: 100%"></canvas>'
})
export class GaugeComponent implements AfterViewInit {
    private gauge = null;

    private _value = '0';

    @Input() id = '';
    @Input() opts: any;
    @Input() maxValue = '0';
    @Input() minValue = '0';
    @Input() animationSpeed = '0';

    constructor() {}

    ngAfterViewInit() {
        console.log(this.opts);
        if (!this.opts) {
            this.opts = {
                angle: 0,
                lineWidth: 0.42,
                radiusScale: 1,
                pointer: { length: 0.64, strokeWidth: 0.04, color: '#000000' },
                limitMax: false,
                limitMin: false,
                colorStart: '#009efb',
                colorStop: '#009efb',
                strokeColor: '#E0E0E0',
                generateGradient: true,
                highDpiSupport: true
            };
        }
        const id = this.id + '-gauge';
        const target = document.getElementById(id); // your canvas element
        this.gauge = new Gauge(target).setOptions(this.opts); // create sexy gauge!
        this.gauge.maxValue = parseInt(this.maxValue || '0', 10); // set max gauge value
        this.gauge.setMinValue = parseInt(this.minValue || '0', 10); // set max gauge value
        this.gauge.animationSpeed = parseInt(this.animationSpeed || '0', 10); // set max gauge value
        this.gauge.set(parseInt(this._value || '0', 10)); // set actual value
    }

    @Input()
    set value(val: any) {
        this._value = val;
        if (this.gauge) {
            this.gauge.set(this._value);
        }
    }

}
