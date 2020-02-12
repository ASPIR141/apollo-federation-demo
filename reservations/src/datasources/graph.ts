import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { IUser, ICalendar, IEvent } from './types';

export class GraphAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://graph.microsoft.com/beta';
    }

    public willSendRequest(request: RequestOptions) {
        request.headers.set('Authorization', this.context.user.access_token);
    }

    public async getUser(): Promise<IUser> {
        return this.get(`/me`);
    }

    public async getUsers(): Promise<{ value: IUser[] }> {
        return this.get(`/users`);
    }

    public async getCalendars(): Promise<ICalendar[]> {
        return this.get(`/me/calendars`);
    }

    public async createEvent(event: IEvent) {
        return this.post(`/me/events`, event);
    }
}
