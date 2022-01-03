export type Citizen = { 
    id: string, 
    age: string, 
    name: string, 
    city: string 
};

export type AddCitizenFormValues = {
    age: string,
    city: string,
    name: string,
    note: string,
}