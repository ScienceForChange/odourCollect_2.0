export interface AppNotification {
    id:              string;
    type:            string;
    isAdded:         undefined | boolean;
    notifiable_type: string;
    notifiable_id:   string;
    data:            NotificationData;
    read_at:         null;
    created_at:      Date;
    updated_at:      Date;
}

export interface NotificationData {
    message:  string;
    resource: number;
    user:     SenderUser;
}

export interface SenderUser {
    id:        number;
    avatar_id: string;
}
