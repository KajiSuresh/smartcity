// types.ts

// Entity Definitions

export interface Business {
    businessId: number;
    name: string;
    category: "RESTAURANT" | "CAFE" | "RETAIL" | "SERVICE" | "ENTERTAINMENT" | "HEALTHCARE" | "EDUCATION" | "FINANCE" | "TECHNOLOGY" | "TRAVEL";
    address: string;
    contactInfo?: string;
    description?: string;
    website?: string;
    image?: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface StudentModule {
    studentId: number;
    name: string;
    type: "LIBRARY" | "COACHING_CENTER" | "COLLEGE" | "UNIVERSITY" | "SCHOOL" | "ONLINE_COURSE" | "TRAINING_INSTITUTE";
    address: string;
    contact?: string;
    description?: string;
    image?: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface Tourism {
    tourismId: number;
    name: string;
    type: "HOTEL" | "RESTAURANT" | "ATTRACTION" | "ATM" | "THEATRE" | "MUSEUM" | "PARK" | "SHOPPINGMALL" | "AIRPORT" | "TRAINSTATION";
    address: string;
    phone?: string;
    description?: string;
    image?: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface Job {
    jobId: number;
    title: string;
    companyName: string;
    industry: "TECHNOLOGY" | "FINANCE" | "HEALTHCARE" | "EDUCATION" | "RETAIL" | "MANUFACTURING" | "HOSPITALITY" | "CONSTRUCTION" | "MARKETING" | "REAL_ESTATE";
    address?: string;
    description?: string;
    salaryRange?: string;
    postingDate?: string;
    contactEmail?: string;
    image?: string;
    latitude?: number;
    longitude?: number;
  }
  
  // Union Type for All Entities
  export type Entity = Business | StudentModule | Tourism | Job;
  
  // Type Guards
  
  export const isBusiness = (entity: Entity): entity is Business => {
    return (entity as Business).businessId !== undefined;
  };
  
  export const isStudentModule = (entity: Entity): entity is StudentModule => {
    return (entity as StudentModule).studentId !== undefined;
  };
  
  export const isTourism = (entity: Entity): entity is Tourism => {
    return (entity as Tourism).tourismId !== undefined;
  };
  
  export const isJob = (entity: Entity): entity is Job => {
    return (entity as Job).jobId !== undefined;
  };
  