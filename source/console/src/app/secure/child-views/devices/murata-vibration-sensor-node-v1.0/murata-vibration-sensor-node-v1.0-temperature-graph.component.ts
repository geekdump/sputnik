import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import * as ChartPluginAnnotation from 'chartjs-plugin-annotation';
import * as ChartPluginDraggable from 'chartjs-plugin-draggable';

import { IoTPubSuberComponent } from '../../../common/iot-pubsuber.component';
import { IOTService } from '@services/iot.service';
import { Device } from '@models/device.model';

declare var $: any;

@Component({
    selector: 'app-murata-temperature-graph',
    template: `
        <div class="card card-outline-info">
            <div class="card-body">
                <h5 class="card-title">Temperature</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ surfaceTemperature | number: '.1' }}°C</h6>
                <div class="card-text">
                    <canvas                        
                        baseChart
                        [datasets]="[
                            {
                                data: data,
                                label: 'Temperature',
                                yAxisID: 'y-axis-0',
                                fill: false,
                                borderColor: 'rgb(0, 0, 255)',
                                backgroundColor: 'rgb(0, 0, 255)',
                                borderWidth: 1
                            }
                        ]"
                        [options]="options"
                        [plugins]="chartPlugins"
                        [legend]="true"
                        [labels]="labels"
                        [chartType]="'line'"
                    ></canvas>
                </div>
            </div>
        </div>
    `
})
export class MurataTemperatureGraphComponent implements OnInit {
    @Input() device: Device = new Device();
    @Input() surfaceTemperatureHigh: number;
    @Input() surfaceTemperatureLow: number;
    @Input() surfaceTemperature: number;
    @Input() labels: number;
    @Input() data: [number];
    @Output() thresholdChanged: EventEmitter<any> = new EventEmitter();

    constructor(private iotService: IOTService) {}

    public chartPlugins = [ChartPluginAnnotation, ChartPluginDraggable];
    public options: any;

    ngOnInit() {
        const self = this;

        self.options = {
            elements: { point: { hitRadius: 2, hoverRadius: 2, radius: 0 } },
            tooltips: {
                enabled: true
            },
            responsive: true,
            scales: {
                // We use this empty structure as a placeholder for dynamic theming.
                xAxes: [{}],
                yAxes: [
                    {
                        id: 'y-axis-0',
                        position: 'left',
                        ticks: {
                            min: 0,
                            max: Math.max(self.surfaceTemperatureHigh, self.surfaceTemperature) * 1.25
                        }
                    }
                ]
            },
            annotation: {
                events: ['click'],
                annotations: [
                    {
                        id: 'lowLine',
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: self.surfaceTemperatureLow,
                        borderColor: 'rgb(255, 0, 0)',
                        borderWidth: 1,
                        label: {
                            enabled: true,
                            backgroundColor: '#FF0000',
                            content: 'Low Temperature'
                        },
                        draggable: true,
                        onDragEnd: e => {
                            // console.log(e.subject.config.value);
                            self.surfaceTemperatureLow = e.subject.config.value;
                            self.updateThresholds();
                        }
                    },
                    {
                        id: 'highLine',
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: self.surfaceTemperatureHigh,
                        borderColor: 'rgb(255, 0, 0)',
                        borderWidth: 1,
                        label: {
                            backgroundColor: '#FF0000',
                            enabled: true,
                            content: 'High Temperature'
                        },
                        draggable: true,
                        onDragEnd: e => {
                            // console.log(e.subject.config.value);
                            self.surfaceTemperatureHigh = e.subject.config.value;
                            self.updateThresholds();
                        }
                    }
                ]
            }
        };
    }

    private updateThresholds() {
        this.thresholdChanged.emit([this.surfaceTemperatureLow, this.surfaceTemperatureHigh]);

        this.iotService
            .updateThingShadow({
                thingName: this.device.thingName,
                payload: JSON.stringify({
                    state: {
                        desired: {
                            thresholds: {
                                surfaceTemperatureHigh: this.surfaceTemperatureHigh,
                                surfaceTemperatureLow: this.surfaceTemperatureLow
                            }
                        }
                    }
                })
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                console.error(err);
            });
    }
}
