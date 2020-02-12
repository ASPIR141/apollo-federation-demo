export interface IUser {
    id: string;
    displayName: string;
    surname: string;
    givenName: string;
    userPrincipalName: string;
    businessPhones?: string[];
    jobTitle?: string;
    mail?: string;
    mobilePhone?: string;
    officeLocation?: string;
    preferredLanguage?: string;
}

export interface ICalendar {
    id: string;
    name: string;
    color: string;
    changeKey: string;
    isDefaultCalendar: boolean;
    canShare: boolean;
    canViewPrivateItems: boolean;
    hexColor: string;
    isShared: boolean;
    isSharedWithMe: boolean;
    canEdit: boolean;
    owner: IOwner;
}

export interface IEvent {
    subject: string;
    body: IBody;
    start: ITime;
    end: ITime;
    location: ILocation;
    attendees: IAttendee[];
}

interface IOwner {
    name: string;
    address: string;
}

interface IAttendee {
    emailAddress: IOwner;
    type: string;
}

interface ILocation {
    displayName: string;
}

interface ITime {
    dateTime: Date;
    timeZone: string;
}

interface IBody {
    contentType: string;
    content: string;
}
