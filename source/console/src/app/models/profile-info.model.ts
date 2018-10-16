// declare let _: any;
import { _ } from 'underscore';

export class ProfileInfo {
    user_id: string;
    name: string;
    email: string;
    enabled: boolean;
    groups: any[];
    mapboxToken: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    isAdmin(): boolean {
        return _.contains(this.groups, 'Administrators');
    }

}
