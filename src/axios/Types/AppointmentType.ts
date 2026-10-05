export type AppointmentType = {
    id: number;
    name: string;
    type: string;
    starts_at: Date;
    ends_at: string;
    responsibleUser: number;
}