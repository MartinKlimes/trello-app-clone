
export type ID = string | number

export interface Column{
    id: ID
    title: string;
    tasks: Task[]
}

export interface Label {
    name: string;
  }
  
  export interface Task {
    id: ID;
    title: string;
    createdAt: Date;
    labels: Label[]; 
  }

